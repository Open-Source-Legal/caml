/**
 * Unit tests for CAML inline directive extraction.
 *
 * Covers: basic extraction, scope resolution (sentence/paragraph/block),
 * argument parsing, multiple directives, edge cases, and integration
 * with parseCaml.
 */
import { describe, it, expect } from "vitest";
import { extractInlineDirectives } from "../src/inlineDirectives";
import { parseCaml } from "../src/index";
import type { CamlProse } from "../src/types";

describe("extractInlineDirectives", () => {
  describe("basic extraction", () => {
    it("should extract a simple directive with no args", () => {
      const content = "The clause was updated. {{@cite sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.directives.length).toBe(1);
      expect(result.directives[0].agent).toBe("cite");
      expect(result.directives[0].scope).toBe("sentence");
      expect(result.directives[0].args).toEqual({});
    });

    it("should strip directive markers from content", () => {
      const content = "The clause was updated. {{@cite sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.content).toBe("The clause was updated.");
      expect(result.content).not.toContain("{{");
      expect(result.content).not.toContain("}}");
    });

    it("should return empty directives array for content without directives", () => {
      const content = "Plain text with no directives.";
      const result = extractInlineDirectives(content);

      expect(result.content).toBe("Plain text with no directives.");
      expect(result.directives).toEqual([]);
    });

    it("should preserve the offset of the directive in the original content", () => {
      const content = "Hello. {{@cite sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].offset).toBe(7);
    });
  });

  describe("agent names", () => {
    it("should parse various valid agent names", () => {
      const agents = ["cite", "review", "summarize", "translate", "my-agent", "agent_2"];
      for (const agent of agents) {
        const content = `Text. {{@${agent} sentence}}`;
        const result = extractInlineDirectives(content);
        expect(result.directives[0].agent).toBe(agent);
      }
    });
  });

  describe("scope resolution", () => {
    it("should resolve sentence scope to the preceding sentence", () => {
      const content =
        "First sentence. Second sentence here. {{@cite sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].scope).toBe("sentence");
      expect(result.directives[0].context).toBe("Second sentence here.");
    });

    it("should resolve sentence scope when directive follows immediately", () => {
      const content = "Only sentence. {{@cite sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].context).toBe("Only sentence.");
    });

    it("should resolve paragraph scope to the containing paragraph", () => {
      const content =
        "First paragraph text.\n\nSecond paragraph with directive. {{@cite paragraph}}\n\nThird paragraph.";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].scope).toBe("paragraph");
      expect(result.directives[0].context).toBe(
        "Second paragraph with directive."
      );
    });

    it("should resolve paragraph scope for first paragraph", () => {
      const content =
        "First paragraph. {{@cite paragraph}}\n\nSecond paragraph.";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].context).toBe("First paragraph.");
    });

    it("should resolve paragraph scope for last paragraph", () => {
      const content =
        "First paragraph.\n\nLast paragraph here. {{@cite paragraph}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].context).toBe("Last paragraph here.");
    });

    it("should resolve block scope to the entire content", () => {
      const content =
        "First paragraph.\n\nSecond paragraph. {{@review block}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].scope).toBe("block");
      expect(result.directives[0].context).toBe(
        "First paragraph.\n\nSecond paragraph."
      );
    });

    it("should strip other directives from block-scope context", () => {
      const content =
        "Sentence one. {{@cite sentence}} More text. {{@review block}}";
      const result = extractInlineDirectives(content);

      const reviewDirective = result.directives.find(
        (d) => d.agent === "review"
      );
      expect(reviewDirective?.context).not.toContain("{{");
    });

    it("should handle sentence scope at paragraph boundary", () => {
      const content =
        "End of first paragraph.\n\nStart of second. {{@cite sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].context).toBe("Start of second.");
    });
  });

  describe("argument parsing", () => {
    it("should parse key=value args", () => {
      const content = "Text. {{@cite sentence mode=all limit=5}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].args).toEqual({
        mode: "all",
        limit: "5",
      });
    });

    it("should parse double-quoted values", () => {
      const content = 'Text. {{@review block reason="stale data"}}';
      const result = extractInlineDirectives(content);

      expect(result.directives[0].args).toEqual({
        reason: "stale data",
      });
    });

    it("should parse single-quoted values", () => {
      const content = "Text. {{@review block reason='old info'}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].args).toEqual({
        reason: "old info",
      });
    });

    it("should parse multiple mixed args", () => {
      const content =
        'Text. {{@cite paragraph mode=all limit=5 reason="testing it"}}';
      const result = extractInlineDirectives(content);

      expect(result.directives[0].args).toEqual({
        mode: "all",
        limit: "5",
        reason: "testing it",
      });
    });

    it("should return empty args when none are provided", () => {
      const content = "Text. {{@cite sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].args).toEqual({});
    });

    it("should handle args with hyphens and underscores in keys", () => {
      const content = "Text. {{@cite sentence max-results=10 min_score=0.5}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].args).toEqual({
        "max-results": "10",
        min_score: "0.5",
      });
    });
  });

  describe("multiple directives", () => {
    it("should extract multiple directives from the same content", () => {
      const content =
        "First sentence. {{@cite sentence}} Second sentence. {{@review paragraph}}";
      const result = extractInlineDirectives(content);

      expect(result.directives.length).toBe(2);
      expect(result.directives[0].agent).toBe("cite");
      expect(result.directives[1].agent).toBe("review");
    });

    it("should strip all directive markers from content", () => {
      const content =
        "Sentence A. {{@cite sentence}} Sentence B. {{@review paragraph}}";
      const result = extractInlineDirectives(content);

      expect(result.content).not.toContain("{{");
      expect(result.content).not.toContain("}}");
      expect(result.content).toContain("Sentence A.");
      expect(result.content).toContain("Sentence B.");
    });

    it("should preserve correct offsets for multiple directives", () => {
      const content =
        "A. {{@cite sentence}} B. {{@review block}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].offset).toBeLessThan(
        result.directives[1].offset
      );
    });
  });

  describe("edge cases", () => {
    it("should handle empty string", () => {
      const result = extractInlineDirectives("");
      expect(result.content).toBe("");
      expect(result.directives).toEqual([]);
    });

    it("should not match malformed directives (missing agent)", () => {
      const content = "Text. {{@ sentence}}";
      const result = extractInlineDirectives(content);
      expect(result.directives).toEqual([]);
      expect(result.content).toContain("{{@");
    });

    it("should not match directives without scope", () => {
      const content = "Text. {{@cite}}";
      const result = extractInlineDirectives(content);
      expect(result.directives).toEqual([]);
    });

    it("should not match directives with invalid scope", () => {
      const content = "Text. {{@cite word}}";
      const result = extractInlineDirectives(content);
      expect(result.directives).toEqual([]);
    });

    it("should handle directive at the very start of content", () => {
      const content = "{{@review block}}";
      const result = extractInlineDirectives(content);

      expect(result.directives.length).toBe(1);
      expect(result.directives[0].agent).toBe("review");
      expect(result.content).toBe("");
    });

    it("should handle directive on its own line", () => {
      const content = "Some text.\n\n{{@review block}}\n\nMore text.";
      const result = extractInlineDirectives(content);

      expect(result.directives.length).toBe(1);
      expect(result.content).toBe("Some text.\n\nMore text.");
    });

    it("should handle consecutive directives", () => {
      const content =
        "Text here. {{@cite sentence}} {{@review sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.directives.length).toBe(2);
    });

    it("should handle directives in multiline content", () => {
      const content = `First paragraph with some text.

Multiple jurisdictions require different notice periods.
These range from 30 to 90 days. {{@cite paragraph mode=all limit=5}}

Third paragraph here.`;
      const result = extractInlineDirectives(content);

      expect(result.directives.length).toBe(1);
      expect(result.directives[0].scope).toBe("paragraph");
      expect(result.directives[0].context).toContain(
        "Multiple jurisdictions"
      );
      expect(result.directives[0].context).toContain("30 to 90 days");
    });

    it("should handle content with markdown formatting", () => {
      const content =
        "The **force majeure** clauses were updated. {{@cite sentence}}";
      const result = extractInlineDirectives(content);

      expect(result.directives[0].context).toContain("force majeure");
      expect(result.content).toBe(
        "The **force majeure** clauses were updated."
      );
    });
  });

  describe("integration with parseCaml", () => {
    it("should extract directives from prose within a chapter", () => {
      const source = `::: chapter {#test}
## Test Chapter

The clause was updated. {{@cite sentence}}

More content here.
:::`;

      const doc = parseCaml(source);
      const proseBlocks = doc.chapters[0].blocks.filter(
        (b) => b.type === "prose"
      ) as CamlProse[];

      // Find the prose block with directives
      const blockWithDirectives = proseBlocks.find(
        (b) => b.directives && b.directives.length > 0
      );
      expect(blockWithDirectives).toBeDefined();
      expect(blockWithDirectives!.directives![0].agent).toBe("cite");
      expect(blockWithDirectives!.directives![0].scope).toBe("sentence");
      expect(blockWithDirectives!.content).not.toContain("{{");
    });

    it("should leave prose without directives unchanged (no directives field)", () => {
      const source = `::: chapter {#test}
## Test
Plain content without directives.
:::`;

      const doc = parseCaml(source);
      const prose = doc.chapters[0].blocks[0] as CamlProse;
      expect(prose.directives).toBeUndefined();
    });

    it("should extract directives from top-level implicit prose", () => {
      const source = "Top-level text. {{@review block}}";
      const doc = parseCaml(source);

      const prose = doc.chapters[0].blocks[0] as CamlProse;
      expect(prose.directives).toBeDefined();
      expect(prose.directives![0].agent).toBe("review");
    });

    it("should extract multiple directives from the same prose block", () => {
      const source = `::: chapter {#test}
## Test

First sentence with citation. {{@cite sentence}}

Second paragraph with review request. {{@review paragraph}}
:::`;

      const doc = parseCaml(source);
      const proseBlocks = doc.chapters[0].blocks.filter(
        (b) => b.type === "prose"
      ) as CamlProse[];

      const allDirectives = proseBlocks.flatMap(
        (b) => b.directives ?? []
      );
      expect(allDirectives.length).toBe(2);
      expect(allDirectives.map((d) => d.agent)).toContain("cite");
      expect(allDirectives.map((d) => d.agent)).toContain("review");
    });

    it("should not affect non-prose blocks", () => {
      const source = `::: chapter {#test}
## Test

:::: cards {columns: 2}
- **Card A** | meta
  Body text
::::

:::`;

      const doc = parseCaml(source);
      const cardsBlock = doc.chapters[0].blocks.find(
        (b) => b.type === "cards"
      );
      expect(cardsBlock).toBeDefined();
      expect(cardsBlock!.type).toBe("cards");
    });

    it("should handle realistic legal content with multiple directive types", () => {
      const source = `::: chapter {#analysis}
## Contract Analysis

The force majeure clauses were updated significantly in 2024. {{@cite sentence}}

Multiple jurisdictions require different notice periods.
These range from 30 to 90 days. {{@cite paragraph mode=all limit=5}}

{{@review block reason="stale data"}}
:::`;

      const doc = parseCaml(source);
      const proseBlocks = doc.chapters[0].blocks.filter(
        (b) => b.type === "prose"
      ) as CamlProse[];

      const allDirectives = proseBlocks.flatMap(
        (b) => b.directives ?? []
      );
      expect(allDirectives.length).toBe(3);

      const citeDirectives = allDirectives.filter(
        (d) => d.agent === "cite"
      );
      expect(citeDirectives.length).toBe(2);
      expect(citeDirectives[0].scope).toBe("sentence");
      expect(citeDirectives[1].scope).toBe("paragraph");
      expect(citeDirectives[1].args.mode).toBe("all");
      expect(citeDirectives[1].args.limit).toBe("5");

      const reviewDirective = allDirectives.find(
        (d) => d.agent === "review"
      );
      expect(reviewDirective).toBeDefined();
      expect(reviewDirective!.scope).toBe("block");
      expect(reviewDirective!.args.reason).toBe("stale data");
    });

    it("should preserve backward compatibility — content is always clean", () => {
      const source = `::: chapter {#test}
## Test

Some text with a directive. {{@cite sentence}}
:::`;

      const doc = parseCaml(source);
      const prose = doc.chapters[0].blocks.find(
        (b) => b.type === "prose"
      ) as CamlProse;

      // Content should never contain directive markers
      expect(prose.content).not.toContain("{{@");
      expect(prose.content).not.toContain("}}");
      // Clean text should be present
      expect(prose.content).toContain("Some text with a directive.");
    });
  });
});
