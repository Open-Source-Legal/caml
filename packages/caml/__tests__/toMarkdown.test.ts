/**
 * Unit tests for the CAML-to-Markdown compiler (camlToMarkdown).
 *
 * Covers: hero, cards, pills, tabs, timeline, CTA, signup, corpus-stats,
 * map (categorical + heatmap), case-history, prose pullquotes, footer.
 */
import { describe, it, expect } from "vitest";
import { camlToMarkdown } from "../src/toMarkdown";

describe("camlToMarkdown", () => {
  it("should convert hero to markdown heading", () => {
    const source = `---
hero:
  kicker: "Annual Report"
  title:
    - "Contract Analysis"
    - "{2024 Review}"
  subtitle: A comprehensive review.
  stats:
    - "500 docs"
    - "12 jurisdictions"
---

`;
    const md = camlToMarkdown(source);
    expect(md).toContain("# Contract Analysis 2024 Review");
    expect(md).toContain("*Annual Report*");
    expect(md).toContain("A comprehensive review.");
    expect(md).toContain("`500 docs`");
    expect(md).toContain("`12 jurisdictions`");
    // Accent marks should be stripped
    expect(md).not.toContain("{");
    expect(md).not.toContain("}");
  });

  it("should handle hero with single-line title", () => {
    const source = `---
hero:
  title:
    - "Simple Title"
---

`;
    const md = camlToMarkdown(source);
    expect(md).toContain("# Simple Title");
  });

  it("should convert cards to a table", () => {
    const source = `::: cards {columns: 2}
- **Indemnification** | 412 instances | #0f766e
  Mutual indemnification found in 67%.
  ~ Avg. cap: 2x
- **Liability** | 389 instances | #7c3aed
  Consequential damages excluded.
  ~ Median: $5M
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("| **Indemnification**");
    expect(md).toContain("Mutual indemnification");
    expect(md).toContain("| **Liability**");
    expect(md).toContain("Consequential damages");
    // Should contain table headers
    expect(md).toContain("| Item | Details | Description |");
  });

  it("should convert pills to an inverted table", () => {
    const source = `::: pills
- 247 | **Documents Reviewed** | Across 5 jurisdictions
- 94% | **Compliance Rate**
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("247");
    expect(md).toContain("Documents Reviewed");
    expect(md).toContain("94%");
    expect(md).toContain("Compliance Rate");
  });

  it("should convert tabs to details/summary", () => {
    const source = `::: tabs
::::: tab {label: "Tab One", status: Active, color: #0f766e}
#### Heading
Content here.

§ Source A
:::::
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("<details>");
    expect(md).toContain("<summary>");
    expect(md).toContain("Tab One");
    expect(md).toContain("</details>");
    expect(md).toContain("#### Heading");
    expect(md).toContain("Content here.");
    expect(md).toContain("*Sources: Source A*");
  });

  it("should convert tabs without status", () => {
    const source = `::: tabs
::::: tab {label: "Plain Tab", color: #0f766e}
#### Section
Body text.
:::::
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("**Plain Tab**");
    expect(md).not.toContain("\u{2014}"); // no em-dash when no status
  });

  it("should convert timeline to a table", () => {
    const source = `::: timeline
legend:
- regulatory | #0f766e
- enforcement | #dc2626

- Jan 2024 | SEC adopts rules | regulatory
- Mar 2024 | CFPB enforcement | enforcement
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("| Jan 2024 |");
    expect(md).toContain("SEC adopts rules");
    expect(md).toContain("| Date | Event | Category |");
    // Should have colored-circle emoji from legend mapping
    expect(md).toContain("\u{1F7E2}"); // green for first legend item
    expect(md).toContain("\u{1F534}"); // red for second legend item
  });

  it("should convert CTA to bold linked buttons", () => {
    const source = `::: cta
- [View Report](#report) {primary}
- [Download](#download)
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("**[View Report](#report)**");
    expect(md).toContain("[Download](#download)");
    // Primary should be bold, secondary should not
    expect(md).not.toContain("**[Download]");
  });

  it("should convert signup to blockquote", () => {
    const source = `::: signup
title: Stay Informed
button: Subscribe
Get weekly regulatory updates.
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("> **Stay Informed**");
    expect(md).toContain("> Get weekly regulatory updates.");
  });

  it("should convert corpus-stats to a table with placeholder values", () => {
    const source = `::: corpus-stats
- documents | Documents
- annotations | Annotations
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("| Metric | Value |");
    expect(md).toContain("| Documents |");
    expect(md).toContain("| Annotations |");
    expect(md).toContain("\u{2014}"); // em-dash placeholder
  });

  it("should convert case-history to a table", () => {
    const source = `::: case-history
title: Smith v. Jones
docket: No. 22-1234
status: Affirmed

- District Court | S.D.N.Y. | 2022-03-15 | Motion to Dismiss | Denied
  Judge ruled plaintiff stated a claim.
- Court of Appeals | 2nd Circuit | 2023-06-20 | Appeal | Affirmed
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("### Smith v. Jones");
    expect(md).toContain("**Affirmed**");
    expect(md).toContain("*No. 22-1234*");
    expect(md).toContain("| District Court (S.D.N.Y.)");
    expect(md).toContain("| Court of Appeals (2nd Circuit)");
    expect(md).toContain("| Court | Date | Action | Outcome |");
  });

  it("should convert categorical map to a state table", () => {
    const source = `::: map {type: us}
legend:
- Active | #0f766e

- CA | Active | 247
- TX | Active | 56
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("| CA |");
    expect(md).toContain("247");
    expect(md).toContain("| State | Status | Count |");
  });

  it("should convert categorical map without counts", () => {
    const source = `::: map {type: us}
legend:
- Active | #0f766e

- CA | Active
- TX | Active
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("| State | Status |");
    // Should not have Count column
    expect(md).not.toContain("| Count |");
  });

  it("should convert heatmap map to a sorted table", () => {
    const source = `::: map {type: us, mode: heatmap, low: #dbeafe, high: #1e3a8a}
- CA | 1247
- NY | 892
- TX | 634
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("| State | Count |");
    // Should be sorted descending by value
    const caIdx = md.indexOf("CA");
    const nyIdx = md.indexOf("NY");
    const txIdx = md.indexOf("TX");
    expect(caIdx).toBeLessThan(nyIdx);
    expect(nyIdx).toBeLessThan(txIdx);
  });

  it("should convert prose pullquotes to blockquotes", () => {
    const source = `::: chapter {#c}
## Test

Regular text here.

>>> "This is a pullquote."

More text.
:::`;
    const md = camlToMarkdown(source);
    expect(md).toContain("> *This is a pullquote.*");
    expect(md).toContain("Regular text here.");
    expect(md).toContain("More text.");
  });

  it("should convert footer to links and notice", () => {
    const source = `---
footer:
  nav:
    - label: Docs
      href: https://docs.example.com
    - label: GitHub
      href: https://github.com/example
  notice: "Copyright 2024"
---

`;
    const md = camlToMarkdown(source);
    expect(md).toContain("[Docs](https://docs.example.com)");
    expect(md).toContain("[GitHub](https://github.com/example)");
    expect(md).toContain("*Copyright 2024*");
    expect(md).toContain("---");
  });

  it("should handle empty input", () => {
    const md = camlToMarkdown("");
    expect(md).toBe("");
  });

  it("should handle full document with hero, chapters, and footer", () => {
    const source = `---
version: "1.0"
hero:
  kicker: "Report"
  title:
    - "Full {Test}"
  subtitle: A test document.
footer:
  nav:
    - label: Home
      href: /
  notice: "2024"
---

::: chapter {#first}
>! Overview
## First Chapter

Hello world.
:::

::: chapter {#second}
## Second Chapter

:::: cards {columns: 2}
- **Card A** | meta
  Body text.
::::

:::`;
    const md = camlToMarkdown(source);
    // Hero
    expect(md).toContain("# Full Test");
    expect(md).toContain("*Report*");
    // Chapters
    expect(md).toContain("## First Chapter");
    expect(md).toContain("*Overview*");
    expect(md).toContain("Hello world.");
    expect(md).toContain("## Second Chapter");
    // Cards
    expect(md).toContain("| **Card A**");
    // Footer
    expect(md).toContain("[Home](/)");
    expect(md).toContain("*2024*");
  });

  it("should skip annotation-embed blocks", () => {
    const source = `::: annotation-embed {ref: @annotation:abc123}
:::`;
    const md = camlToMarkdown(source);
    // Should not produce any meaningful content for annotation embeds
    expect(md).not.toContain("annotation");
  });
});
