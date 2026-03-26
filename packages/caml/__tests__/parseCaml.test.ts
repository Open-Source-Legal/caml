/**
 * Unit tests for the CAML parser (parseCaml).
 *
 * Covers: frontmatter extraction, chapter parsing, block type parsing,
 * edge cases (unclosed fences, empty input, malformed YAML).
 *
 * NOTE: Top-level blocks use ::: (depth 3) fences. Blocks nested inside
 * chapters use :::: (depth 4) fences to avoid closing-fence ambiguity.
 * Tabs inside a tabs block also use :::: fences.
 */
import { describe, it, expect } from "vitest";
import { parseCaml } from "../src/index";
import type {
  CamlCards,
  CamlPills,
  CamlTabs,
  CamlTimeline,
  CamlCta,
  CamlSignup,
  CamlCorpusStats,
  CamlProse,
  CamlMap,
} from "../src/types";

describe("parseCaml", () => {
  describe("frontmatter", () => {
    it("should parse YAML frontmatter with version and hero", () => {
      const source = `---
version: "1.0"
hero:
  kicker: "Test kicker"
  title:
    - "Hello"
    - "{World}"
  subtitle: "A test subtitle"
---

::: chapter {#intro}
## Intro
Hello
:::`;

      const doc = parseCaml(source);
      expect(doc.frontmatter.version).toBe("1.0");
      expect(doc.frontmatter.hero?.kicker).toBe("Test kicker");
      expect(doc.frontmatter.hero?.title).toEqual(["Hello", "{World}"]);
      expect(doc.frontmatter.hero?.subtitle).toBe("A test subtitle");
    });

    it("should handle missing frontmatter", () => {
      const source = `::: chapter {#test}
## Test
Hello
:::`;

      const doc = parseCaml(source);
      expect(doc.frontmatter).toEqual({});
      expect(doc.chapters.length).toBe(1);
    });

    it("should parse frontmatter with trailing newline", () => {
      const source = `---
version: "2.0"
---

Some content`;

      const doc = parseCaml(source);
      expect(doc.frontmatter.version).toBe("2.0");
    });
  });

  describe("chapters", () => {
    it("should parse a single chapter with kicker and title", () => {
      const source = `::: chapter {#findings}
>! Chapter 1
## Key Findings

Some prose content here.
:::`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(1);
      expect(doc.chapters[0].id).toBe("findings");
      expect(doc.chapters[0].kicker).toBe("Chapter 1");
      expect(doc.chapters[0].title).toBe("Key Findings");
    });

    it("should parse chapter with dark theme and gradient", () => {
      const source = `::: chapter {#dark, theme: dark, gradient: true}
## Dark Chapter
Content in dark mode.
:::`;

      const doc = parseCaml(source);
      expect(doc.chapters[0].theme).toBe("dark");
      expect(doc.chapters[0].gradient).toBe(true);
    });

    it("should parse chapter with centered attribute", () => {
      const source = `::: chapter {#center, centered: true}
## Centered
Centered content.
:::`;

      const doc = parseCaml(source);
      expect(doc.chapters[0].centered).toBe(true);
    });

    it("should assign positional IDs when no id attribute is given", () => {
      const source = `::: chapter
## First
Content
:::

::: chapter
## Second
Content
:::`;

      const doc = parseCaml(source);
      expect(doc.chapters[0].id).toBe("chapter-0");
      expect(doc.chapters[1].id).toBe("chapter-1");
    });

    it("should produce stable IDs across re-parses", () => {
      const source = `::: chapter {#stable}
## Test
Content
:::`;

      const doc1 = parseCaml(source);
      const doc2 = parseCaml(source);
      expect(doc1.chapters[0].id).toBe(doc2.chapters[0].id);
    });

    it("should wrap top-level prose in implicit chapters", () => {
      const source = `Some top-level prose outside any chapter.`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(1);
      const block = doc.chapters[0].blocks[0] as CamlProse;
      expect(block.type).toBe("prose");
      expect(block.content).toContain("top-level prose");
    });
  });

  describe("block types (top-level)", () => {
    it("should parse cards block with columns", () => {
      const source = `::: cards {columns: 3}

- **Card A** | meta-a | #0f766e
  Body text for A.
  ~ Footer: source A

- **Card B** | meta-b
  Body text for B.

:::`;

      const doc = parseCaml(source);
      // Top-level non-chapter block wrapped in implicit chapter
      expect(doc.chapters.length).toBe(1);
      const block = doc.chapters[0].blocks[0] as CamlCards;
      expect(block.type).toBe("cards");
      expect(block.columns).toBe(3);
      expect(block.items.length).toBe(2);
      expect(block.items[0].label).toBe("Card A");
      expect(block.items[0].meta).toBe("meta-a");
      expect(block.items[0].accent).toBe("#0f766e");
      expect(block.items[0].body).toBe("Body text for A.");
      expect(block.items[0].footer).toBe("Footer: source A");
      expect(block.items[1].label).toBe("Card B");
    });

    it("should parse pills block with status", () => {
      const source = `::: pills

- 42 | **Documents** | Across 3 jurisdictions
  status: Complete | #22c55e

- 1.2K | **Annotations**
  status: Active | #3b82f6

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlPills;
      expect(block.type).toBe("pills");
      expect(block.items.length).toBe(2);
      expect(block.items[0].bigText).toBe("42");
      expect(block.items[0].label).toBe("Documents");
      expect(block.items[0].status).toBe("Complete");
      expect(block.items[0].statusColor).toBe("#22c55e");
    });

    it("should parse tabs block with sections and sources", () => {
      const source = `::: tabs

::::: tab {label: "Risk", status: High, color: #dc2626}
#### Key Risks {highlight}
Supply chain disruption risk.

§ Agreement-A.pdf
:::::

::::: tab {label: "Compliance", color: #16a34a}
#### Regulatory Alignment
All agreements comply.
:::::

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlTabs;
      expect(block.type).toBe("tabs");
      expect(block.tabs.length).toBe(2);
      expect(block.tabs[0].label).toBe("Risk");
      expect(block.tabs[0].status).toBe("High");
      expect(block.tabs[0].color).toBe("#dc2626");
      expect(block.tabs[0].sections[0].heading).toBe("Key Risks");
      expect(block.tabs[0].sections[0].highlight).toBe(true);
      expect(block.tabs[0].sources[0].name).toBe("Agreement-A.pdf");
      expect(block.tabs[1].label).toBe("Compliance");
    });

    it("should parse timeline block with legend and entries", () => {
      const source = `::: timeline

legend:
- Executed | #0f766e
- Amended | #dc2626

- Jan 2023 | Master Agreement signed | Executed
- Jun 2023 | Amendment 1 | Amended

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlTimeline;
      expect(block.type).toBe("timeline");
      expect(block.legend.length).toBe(2);
      expect(block.legend[0].label).toBe("Executed");
      expect(block.legend[0].color).toBe("#0f766e");
      expect(block.items.length).toBe(2);
      expect(block.items[0].date).toBe("Jan 2023");
      expect(block.items[0].label).toBe("Master Agreement signed");
      // Parser lowercases the side value for case-insensitive legend lookup
      expect(block.items[0].side).toBe("executed");
    });

    it("should parse CTA block with primary and secondary buttons", () => {
      const source = `::: cta

- [Explore](https://example.com) {primary}
- [Source](/data)

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlCta;
      expect(block.type).toBe("cta");
      expect(block.items.length).toBe(2);
      expect(block.items[0].label).toBe("Explore");
      expect(block.items[0].href).toBe("https://example.com");
      expect(block.items[0].primary).toBe(true);
      expect(block.items[1].primary).toBe(false);
    });

    it("should parse signup block", () => {
      const source = `::: signup

title: Stay Updated
button: Subscribe
Get the latest analysis delivered to your inbox.

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlSignup;
      expect(block.type).toBe("signup");
      expect(block.title).toBe("Stay Updated");
      expect(block.button).toBe("Subscribe");
      expect(block.body).toContain("latest analysis");
    });

    it("should parse corpus-stats block", () => {
      const source = `::: corpus-stats

- documents | Documents
- annotations | Annotations
- contributors | Contributors

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlCorpusStats;
      expect(block.type).toBe("corpus-stats");
      expect(block.items.length).toBe(3);
      expect(block.items[0].key).toBe("documents");
      expect(block.items[0].label).toBe("Documents");
    });

    it("should parse map block with legend and state entries", () => {
      const source = `::: map {type: us}

legend:
- Active | #0f766e
- Pending | #f59e0b

- CA | Active
- NY | Active
- TX | Pending

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlMap;
      expect(block.type).toBe("map");
      expect(block.mapType).toBe("us");
      expect(block.legend.length).toBe(2);
      expect(block.legend[0].label).toBe("Active");
      expect(block.legend[0].color).toBe("#0f766e");
      expect(block.legend[1].label).toBe("Pending");
      expect(block.legend[1].color).toBe("#f59e0b");
      expect(block.states.length).toBe(3);
      expect(block.states[0].code).toBe("CA");
      expect(block.states[0].status).toBe("Active");
      expect(block.states[1].code).toBe("NY");
      expect(block.states[1].status).toBe("Active");
      expect(block.states[2].code).toBe("TX");
      expect(block.states[2].status).toBe("Pending");
    });

    it("should parse map block with no legend", () => {
      const source = `::: map {type: us}

- CA | Active
- FL | Inactive

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlMap;
      expect(block.type).toBe("map");
      expect(block.legend.length).toBe(0);
      expect(block.states.length).toBe(2);
    });

    it("should default map type to 'us' when not specified", () => {
      const source = `::: map

- CA | Active

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlMap;
      expect(block.mapType).toBe("us");
    });

    it("should parse prose with pullquotes", () => {
      const source = `::: chapter {#c}
## Test

Regular prose here.

>>> "This is a pullquote."

More prose after.
:::`;

      const doc = parseCaml(source);
      const proseBlocks = doc.chapters[0].blocks.filter(
        (b) => b.type === "prose"
      );
      expect(proseBlocks.length).toBeGreaterThan(0);
      // The pullquote is inside the prose content (renderer handles splitting)
      const allContent = proseBlocks
        .map((b) => (b as CamlProse).content)
        .join("\n");
      expect(allContent).toContain("pullquote");
    });
  });

  describe("edge cases", () => {
    it("should handle empty input", () => {
      const doc = parseCaml("");
      expect(doc.frontmatter).toEqual({});
      expect(doc.chapters).toEqual([]);
    });

    it("should recover content from unclosed fences", () => {
      const source = `::: chapter {#c}
## Test
Content inside unclosed chapter.`;

      const doc = parseCaml(source);
      // The unclosed fence content should be recovered as prose
      expect(doc.chapters.length).toBeGreaterThan(0);
    });

    it("should handle multiple chapters", () => {
      const source = `::: chapter {#a}
## Chapter A
Content A
:::

::: chapter {#b}
## Chapter B
Content B
:::

::: chapter {#c}
## Chapter C
Content C
:::`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(3);
      expect(doc.chapters[0].id).toBe("a");
      expect(doc.chapters[1].id).toBe("b");
      expect(doc.chapters[2].id).toBe("c");
    });

    it("should handle unknown block types as prose", () => {
      const source = `::: unknown-block-type

This is unknown content.

:::`;

      const doc = parseCaml(source);
      // Unknown block types wrapped in implicit chapter
      expect(doc.chapters.length).toBe(1);
      const blocks = doc.chapters[0].blocks;
      const proseBlocks = blocks.filter((b) => b.type === "prose");
      expect(proseBlocks.length).toBeGreaterThan(0);
    });

    it("should handle whitespace-only body", () => {
      const source = `

  `;

      const doc = parseCaml(source);
      expect(doc.chapters).toEqual([]);
    });

    it("should parse :::: blocks nested inside ::: chapters", () => {
      const source = `::: chapter {#demo, theme: dark}
## Dark Section

Some intro prose.

:::: cards {columns: 2}
- **Item One** | meta | #0f766e
  Body text.
  ~ Footer
- **Item Two** | meta | #7c3aed
  Body text.
::::

:::: timeline
legend:
- regulatory | #0f766e

- Jan 2024 | Test event | regulatory
::::

:::`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(1);
      const ch = doc.chapters[0];
      expect(ch.theme).toBe("dark");
      expect(ch.title).toBe("Dark Section");
      expect(ch.blocks.length).toBe(3);
      expect(ch.blocks[0].type).toBe("prose");
      expect(ch.blocks[1].type).toBe("cards");
      expect(ch.blocks[2].type).toBe("timeline");

      const cards = ch.blocks[1] as CamlCards;
      expect(cards.columns).toBe(2);
      expect(cards.items.length).toBe(2);

      const timeline = ch.blocks[2] as CamlTimeline;
      expect(timeline.items.length).toBe(1);
      expect(timeline.legend.length).toBe(1);
    });

    it("should parse multiple top-level blocks into separate implicit chapters", () => {
      const source = `::: cards {columns: 2}
- **A**
  Body A
:::

::: cta
- [Click](https://example.com) {primary}
:::`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(2);
      expect(doc.chapters[0].blocks[0].type).toBe("cards");
      expect(doc.chapters[1].blocks[0].type).toBe("cta");
    });
  });
});
