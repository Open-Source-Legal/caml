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
  CamlCaseHistory,
  CamlImage,
  CamlExtractEmbed,
  CamlUnknownBlock,
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

    it("should parse map with counts and links in categorical mode", () => {
      const source = `::: map {type: us}

legend:
- Active | #0f766e

- CA | Active | 1247 | /c/legal/california
- NY | Active | 892 | /c/legal/new-york
- TX | Active | 56

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlMap;
      expect(block.type).toBe("map");
      expect(block.mode).toBeUndefined();
      expect(block.states.length).toBe(3);
      expect(block.states[0].code).toBe("CA");
      expect(block.states[0].status).toBe("Active");
      expect(block.states[0].count).toBe(1247);
      expect(block.states[0].href).toBe("/c/legal/california");
      expect(block.states[1].code).toBe("NY");
      expect(block.states[1].count).toBe(892);
      expect(block.states[1].href).toBe("/c/legal/new-york");
      expect(block.states[2].code).toBe("TX");
      expect(block.states[2].count).toBe(56);
      expect(block.states[2].href).toBeUndefined();
    });

    it("should parse map with href but no count in categorical mode", () => {
      const source = `::: map {type: us}

legend:
- Active | #0f766e

- CA | Active | /c/legal/california

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlMap;
      expect(block.states[0].count).toBeUndefined();
      expect(block.states[0].href).toBe("/c/legal/california");
    });

    it("should parse heatmap mode with gradient colors", () => {
      const source = `::: map {type: us, mode: heatmap, low: #dbeafe, high: #1e3a8a}

- CA | 1247
- NY | 892
- TX | 634

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlMap;
      expect(block.type).toBe("map");
      expect(block.mode).toBe("heatmap");
      expect(block.lowColor).toBe("#dbeafe");
      expect(block.highColor).toBe("#1e3a8a");
      expect(block.legend.length).toBe(0);
      expect(block.states.length).toBe(3);
      expect(block.states[0].code).toBe("CA");
      expect(block.states[0].status).toBe("1247");
      expect(block.states[0].count).toBe(1247);
      expect(block.states[1].count).toBe(892);
      expect(block.states[2].count).toBe(634);
    });

    it("should parse heatmap mode with links", () => {
      const source = `::: map {type: us, mode: heatmap, low: #dbeafe, high: #1e3a8a}

- CA | 1247 | /c/legal/california
- NY | 892
- TX | 634 | https://example.com

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlMap;
      expect(block.mode).toBe("heatmap");
      expect(block.states[0].href).toBe("/c/legal/california");
      expect(block.states[0].count).toBe(1247);
      expect(block.states[1].href).toBeUndefined();
      expect(block.states[2].href).toBe("https://example.com");
    });

    it("should parse case-history block with entries and details", () => {
      const source = `::: case-history

title: Smith v. Jones Corp.
docket: No. 22-1234
status: Cert Denied

- District Court | S.D.N.Y. | 2022-03-15 | Defendant's Motion to Dismiss | Denied
  Judge Martinez ruled that plaintiff adequately stated a claim under Section 10(b).

- Court of Appeals | 2nd Circuit | 2023-06-20 | Appeal | Affirmed
  Panel (2-1) affirmed district court.

- Supreme Court | SCOTUS | 2024-01-08 | Certiorari | Denied

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlCaseHistory;
      expect(block.type).toBe("case-history");
      expect(block.title).toBe("Smith v. Jones Corp.");
      expect(block.docket).toBe("No. 22-1234");
      expect(block.status).toBe("Cert Denied");
      expect(block.entries.length).toBe(3);

      // First entry with detail
      expect(block.entries[0].courtLevel).toBe("District Court");
      expect(block.entries[0].courtName).toBe("S.D.N.Y.");
      expect(block.entries[0].date).toBe("2022-03-15");
      expect(block.entries[0].action).toBe("Defendant's Motion to Dismiss");
      expect(block.entries[0].outcome).toBe("Denied");
      expect(block.entries[0].detail).toContain("Judge Martinez");

      // Second entry with detail
      expect(block.entries[1].courtLevel).toBe("Court of Appeals");
      expect(block.entries[1].courtName).toBe("2nd Circuit");
      expect(block.entries[1].outcome).toBe("Affirmed");
      expect(block.entries[1].detail).toContain("Panel (2-1)");

      // Third entry without detail
      expect(block.entries[2].courtLevel).toBe("Supreme Court");
      expect(block.entries[2].courtName).toBe("SCOTUS");
      expect(block.entries[2].outcome).toBe("Denied");
      expect(block.entries[2].detail).toBeUndefined();
    });

    it("should parse case-history block with minimal fields", () => {
      const source = `::: case-history

title: Doe v. State

- Trial Court | County Court | 2023-01-01 | Verdict | Guilty

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlCaseHistory;
      expect(block.type).toBe("case-history");
      expect(block.title).toBe("Doe v. State");
      expect(block.docket).toBeUndefined();
      expect(block.status).toBeUndefined();
      expect(block.entries.length).toBe(1);
      expect(block.entries[0].courtLevel).toBe("Trial Court");
    });

    it("should parse image block with all attributes and body fields", () => {
      const source = `::: image {src: corpus://current, size: lg, shape: avatar}
caption: SEC Filings Collection
alt: Corpus icon
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      expect(block.type).toBe("image");
      expect(block.src).toBe("corpus://current");
      expect(block.size).toBe("lg");
      expect(block.shape).toBe("avatar");
      expect(block.caption).toBe("SEC Filings Collection");
      expect(block.alt).toBe("Corpus icon");
    });

    it("should parse image block with https URL and no body", () => {
      const source = `::: image {src: https://example.com/logo.png, size: sm, shape: rounded}
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      expect(block.type).toBe("image");
      expect(block.src).toBe("https://example.com/logo.png");
      expect(block.size).toBe("sm");
      expect(block.shape).toBe("rounded");
      expect(block.caption).toBeUndefined();
      expect(block.alt).toBeUndefined();
    });

    it("should parse image block with only src (minimal)", () => {
      const source = `::: image {src: upload:cover.png}
caption: Report cover page
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      expect(block.type).toBe("image");
      expect(block.src).toBe("upload:cover.png");
      expect(block.size).toBeUndefined();
      expect(block.shape).toBeUndefined();
      expect(block.caption).toBe("Report cover page");
    });

    it("should parse image block with md size and cropped shape", () => {
      const source = `::: image {src: https://example.com/photo.jpg, size: md, shape: cropped}
alt: Team photo
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      expect(block.type).toBe("image");
      expect(block.size).toBe("md");
      expect(block.shape).toBe("cropped");
      expect(block.alt).toBe("Team photo");
    });

    it("should parse image block with native shape", () => {
      const source = `::: image {src: https://example.com/chart.png, shape: native}
caption: Revenue chart
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      expect(block.shape).toBe("native");
    });

    it("should ignore invalid size and shape values", () => {
      const source = `::: image {src: https://example.com/img.png, size: xl, shape: diamond}
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      expect(block.type).toBe("image");
      expect(block.src).toBe("https://example.com/img.png");
      expect(block.size).toBeUndefined();
      expect(block.shape).toBeUndefined();
    });

    it("should handle image block with empty src", () => {
      const source = `::: image
caption: Missing source
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      expect(block.type).toBe("image");
      expect(block.src).toBe("");
      expect(block.caption).toBe("Missing source");
    });

    it("should prefer body alt over attrs alt", () => {
      const source = `::: image {src: https://example.com/img.png, alt: attr-alt}
alt: body-alt
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      // Body alt is parsed first, so it takes priority
      expect(block.alt).toBe("body-alt");
    });

    it("should use attrs alt when body alt is absent", () => {
      const source = `::: image {src: https://example.com/img.png, alt: fallback-alt}
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlImage;
      expect(block.alt).toBe("fallback-alt");
    });

    it("should parse image block nested inside a chapter", () => {
      const source = `::: chapter {#branding}
## Our Brand

:::: image {src: corpus://current, size: lg, shape: avatar}
caption: Our corpus icon
::::

Some text after the image.
:::`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(1);
      // Find the image block regardless of exact block count
      const imageBlock = doc.chapters[0].blocks.find(
        (b) => b.type === "image"
      ) as CamlImage;
      expect(imageBlock).toBeDefined();
      expect(imageBlock.type).toBe("image");
      expect(imageBlock.src).toBe("corpus://current");
      expect(imageBlock.size).toBe("lg");
      expect(imageBlock.shape).toBe("avatar");
      expect(imageBlock.caption).toBe("Our corpus icon");
      // Verify there's also prose content
      const proseBlocks = doc.chapters[0].blocks.filter(
        (b) => b.type === "prose"
      );
      expect(proseBlocks.length).toBeGreaterThan(0);
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

    it("should pass through unknown block types as CamlUnknownBlock", () => {
      const source = `::: unknown-block-type

This is unknown content.

:::`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(1);
      const block = doc.chapters[0].blocks[0] as CamlUnknownBlock;
      expect(block.type).toBe("unknown-block-type");
      expect(block.attrs).toEqual({});
      expect(block.body).toContain("This is unknown content.");
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

  describe("extract-embed", () => {
    it("should parse extract-embed block with ref", () => {
      const source = `::: extract-embed {ref: @extract:e1f3}
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlExtractEmbed;
      expect(block.type).toBe("extract-embed");
      expect(block.ref).toBe("e1f3");
    });

    it("should parse extract-embed with columns", () => {
      const source = `::: extract-embed {ref: @extract:abc123, columns: Name|Date|Status}
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlExtractEmbed;
      expect(block.type).toBe("extract-embed");
      expect(block.ref).toBe("abc123");
      expect(block.columns).toEqual(["Name", "Date", "Status"]);
    });

    it("should parse extract-embed without columns", () => {
      const source = `::: extract-embed {ref: myExtract}
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlExtractEmbed;
      expect(block.type).toBe("extract-embed");
      expect(block.ref).toBe("myExtract");
      expect(block.columns).toBeUndefined();
    });

    it("should parse extract-embed nested inside a chapter", () => {
      const source = `::: chapter {#data}
## Extract Data

:::: extract-embed {ref: @extract:nested1}
::::

:::`;

      const doc = parseCaml(source);
      expect(doc.chapters[0].id).toBe("data");
      const block = doc.chapters[0].blocks[0] as CamlExtractEmbed;
      expect(block.type).toBe("extract-embed");
      expect(block.ref).toBe("nested1");
    });
  });

  describe("unknown block passthrough", () => {
    it("should pass through unknown types with attributes", () => {
      const source = `::: corpus-live-stats {mode: realtime, refresh: 30}

- documents | Documents
- annotations | Annotations

:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlUnknownBlock;
      expect(block.type).toBe("corpus-live-stats");
      expect(block.attrs).toEqual({ mode: "realtime", refresh: "30" });
      expect(block.body).toContain("- documents | Documents");
      expect(block.body).toContain("- annotations | Annotations");
    });

    it("should pass through cite-me block type", () => {
      const source = `::: cite-me {query: "force majeure pandemic"}
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlUnknownBlock;
      expect(block.type).toBe("cite-me");
      expect(block.attrs).toEqual({ query: '"force majeure pandemic"' });
    });

    it("should preserve body content for unknown blocks", () => {
      const source = `::: custom-widget {#widget-1, variant: compact}
line 1
line 2
line 3
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlUnknownBlock;
      expect(block.type).toBe("custom-widget");
      expect(block.attrs.id).toBe("widget-1");
      expect(block.attrs.variant).toBe("compact");
      expect(block.body).toContain("line 1");
      expect(block.body).toContain("line 2");
      expect(block.body).toContain("line 3");
    });

    it("should handle unknown blocks nested inside chapters", () => {
      const source = `::: chapter {#demo}
## Demo

:::: my-custom-block {color: #0f766e}
Custom content here.
::::

:::`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(1);
      const block = doc.chapters[0].blocks[0] as CamlUnknownBlock;
      expect(block.type).toBe("my-custom-block");
      expect(block.attrs.color).toBe("#0f766e");
      expect(block.body).toContain("Custom content here.");
    });

    it("should handle multiple unknown block types in one document", () => {
      const source = `::: chapter {#mixed}
## Mixed Content

:::: extract-grid {ref: e1}
::::

:::: cite-all {scope: document}
::::

:::`;

      const doc = parseCaml(source);
      const blocks = doc.chapters[0].blocks;
      // extract-grid is unknown, cite-all is unknown
      const extractGrid = blocks[0] as CamlUnknownBlock;
      expect(extractGrid.type).toBe("extract-grid");
      expect(extractGrid.attrs.ref).toBe("e1");

      const citeAll = blocks[1] as CamlUnknownBlock;
      expect(citeAll.type).toBe("cite-all");
      expect(citeAll.attrs.scope).toBe("document");
    });

    it("should pass through unknown blocks with empty body", () => {
      const source = `::: live-indicator {status: active}
:::`;

      const doc = parseCaml(source);
      const block = doc.chapters[0].blocks[0] as CamlUnknownBlock;
      expect(block.type).toBe("live-indicator");
      expect(block.attrs.status).toBe("active");
      expect(block.body.trim()).toBe("");
    });

    it("should not break existing known block types", () => {
      const source = `::: cards {columns: 2}
- **Card A**
  Body A
:::

::: some-future-block {key: val}
future content
:::`;

      const doc = parseCaml(source);
      expect(doc.chapters.length).toBe(2);
      const cards = doc.chapters[0].blocks[0] as CamlCards;
      expect(cards.type).toBe("cards");
      expect(cards.items[0].label).toBe("Card A");

      const unknown = doc.chapters[1].blocks[0] as CamlUnknownBlock;
      expect(unknown.type).toBe("some-future-block");
      expect(unknown.attrs.key).toBe("val");
      expect(unknown.body).toContain("future content");
    });
  });

});