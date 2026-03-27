# CAML Syntax Guide

CAML (Corpus Article Markup Language) is a markdown superset for authoring structured, interactive legal articles. This guide documents every feature of the language as implemented by the parser and renderer.

## Document Structure

A CAML document has two parts: an optional **frontmatter** block and a **body** containing chapters and blocks.

```
---
(frontmatter)
---

(body)
```

The frontmatter is delimited by `---` on its own line. Both the opening and closing `---` must be followed by a newline. The body is everything after the closing `---\n`.

If no frontmatter is present, the entire document is treated as the body.

## Frontmatter

Frontmatter uses a YAML subset. The parser supports scalars, lists, nested objects, multi-line strings (folded with `>`), quoted strings, and comments (`#`).

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | No | Document version |
| `site` | string | No | Site name |
| `hero` | object | No | Hero section (see below) |
| `footer` | object | No | Footer section (see below) |

### Hero

```yaml
hero:
  kicker: "Annual Report"
  title:
    - "First Line"
    - "{Accented Line}"
  subtitle: >
    A multi-line subtitle that gets
    folded into a single string.
  stats:
    - "500 documents"
    - "12 jurisdictions"
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `kicker` | string | No | Small text above the title |
| `title` | list of strings | Yes | Title lines. Text inside `{curly braces}` renders with accent styling. |
| `subtitle` | string | No | Paragraph below the title. Use `>` for multi-line. |
| `stats` | list of strings | No | Badge-like items displayed below the subtitle. |

### Footer

```yaml
footer:
  nav:
    - label: Documentation
      href: https://docs.example.com
    - label: GitHub
      href: https://github.com/example
  notice: "Copyright 2024 Example Corp."
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nav` | list of objects | No | Navigation links. Each object has `label` and `href`. |
| `notice` | string | No | Footer notice text. |

## Fence Depths

CAML uses colon-fenced directives at three nesting depths:

| Depth | Syntax | Usage |
|-------|--------|-------|
| 3 | `:::` | Chapters and top-level blocks |
| 4 | `::::` | Blocks nested inside chapters |
| 5 | `:::::` | Tab sub-fences inside a tabs block |

A fence opens with `:::` (or `::::`, `:::::`) followed by a type name, and closes with a matching bare fence:

```
::: type {attributes}
(body)
:::
```

Attributes are comma-separated key-value pairs inside curly braces. An `#id` shorthand sets the `id` attribute:

```
::: chapter {#my-id, theme: dark, centered: true}
```

### Unclosed Fences

If a fence is never closed, its body is recovered as prose to prevent silent data loss.

### Unknown Block Types

Any fenced block with an unrecognized type name is treated as a prose block containing the raw body text.

## Chapters

Chapters are the top-level structural unit of a CAML document. They use depth-3 fences with the type `chapter`:

```
::: chapter {#findings, theme: dark, gradient: true, centered: true}
>! Section 01
## Key Findings

Prose content here.

:::: cards {columns: 2}
(cards content)
::::

:::
```

### Chapter Attributes

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `#id` | any string | `chapter-N` | Section ID for linking |
| `theme` | `light`, `dark` | none | Visual theme |
| `gradient` | `true` | none | Gradient background |
| `centered` | `true` | none | Center-aligned text |

### Chapter Metadata

Inside a chapter's prose (not inside a block), two special line prefixes are recognized:

- **`>! text`** — Sets the chapter kicker (small text above the title). If multiple `>!` lines appear, the **last** one wins.
- **`## text`** — Sets the chapter title. Only the **first** `##` heading is consumed; subsequent `##` headings remain as prose.

These lines are extracted from the prose and do not appear in the rendered prose content.

### Implicit Chapters

Content that appears at the top level outside of any `::: chapter` fence is wrapped in an implicit chapter:

- Top-level prose gets an implicit chapter with id `intro-N`.
- Top-level blocks (e.g., a bare `::: cards ... :::`) get an implicit chapter with id `block-N`.

## Blocks

Blocks are the content units within chapters. When at the top level, blocks use depth-3 fences (`:::`). When nested inside a chapter, blocks use depth-4 fences (`::::`).

### Prose

Prose is not a fenced block — it is any text inside a chapter that is not inside a block fence. Standard markdown is supported (bold, italic, links, lists, headings, code blocks).

The parser stores prose content as-is in `CamlProse.content`. The **renderer** (not the parser) processes two special features within prose:

**Pullquotes** use the `>>>` prefix:

```
Regular paragraph text.

>>> "This text renders as a styled pullquote."

More paragraph text.
```

The renderer strips the `>>>` prefix, removes surrounding quotes if present, and renders the text as a styled pullquote. Multiple consecutive `>>>` lines are joined into a single pullquote.

### Cards

Grid layout of card items.

**Top-level:**
```
::: cards {columns: 3}
- **Label** | meta text | #0f766e
  Body text for this card.
  ~ Footer text

- **Another Card** | meta
  Body text here.
:::
```

**Inside a chapter:**
```
:::: cards {columns: 2}
- **Label** | meta | #0f766e
  Body text.
  ~ Footer
::::
```

#### Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `columns` | integer | none | Number of grid columns |

#### Item Format

```
- **Label** | meta | #hexcolor
  Body text (continuation lines joined with spaces).
  ~ Footer text
```

| Part | Required | Description |
|------|----------|-------------|
| `**Label**` | Yes | Card heading. Must be wrapped in `**bold**`. |
| `meta` | No | Secondary text in the card header. Separated by `\|`. |
| `#hexcolor` | No | 6-digit hex color for the card's accent border. Separated by `\|`. |
| Body lines | No | Indented continuation lines after the header. Joined with spaces. |
| `~ footer` | No | Footer text. Line must start with `~ `. |

Items are separated by the `- ` prefix. Blank lines between items are ignored.

### Pills

Metric display with big numbers.

```
::: pills
- 247 | **Documents Reviewed** | Q4 2024
  status: Complete | #16a34a
- 94% | **Compliance Rate** | Across all jurisdictions
  status: Above Target | #0f766e
:::
```

#### Item Format

```
- BIG_TEXT | **Label** | detail
  status: Status Text | #hexcolor
```

| Part | Required | Description |
|------|----------|-------------|
| `BIG_TEXT` | Yes | Large display number or text. |
| `**Label**` | Yes | Must be wrapped in `**bold**`. |
| `detail` | No | Additional context text. Separated by `\|`. |
| `status:` | No | Status badge. On a continuation line. |
| `#hexcolor` | No | Status badge background color. Separated by `\|` after status text. |

### Tabs

Tabbed content panels. Tabs blocks use depth-4 fences (`::::`), and individual tab sub-fences use depth-5 (`:::::`) when nested inside a chapter. At the top level, tabs use `:::` and tab sub-fences use `:::::`.

**Inside a chapter:**
```
:::: tabs
::::: tab {label: "North America", status: Active, color: #0f766e}
#### United States {highlight}
Federal regulations analyzed.

#### Canada
Provincial review complete.

§ SEC EDGAR
§ CFPB Regulations
:::::

::::: tab {label: "European Union", color: #7c3aed}
#### GDPR
Data processing reviewed.

§ EUR-Lex
:::::
::::
```

**At the top level:**
```
::: tabs
::::: tab {label: "Tab One", color: #0f766e}
Content here.
:::::
:::
```

#### Tab Attributes

| Attribute | Format | Required | Description |
|-----------|--------|----------|-------------|
| `label` | `"quoted string"` | Yes | Tab button text. Must be quoted. |
| `status` | single word | No | Status badge text. **Single word only** (e.g., `Active`, `Review`). Multi-word or special characters are not supported. |
| `color` | `#hexcolor` | No | Tab accent color. |

#### Tab Content

Inside each tab:

- **`#### Heading {highlight}`** — Section headings. The `{highlight}` suffix marks the section for visual emphasis. The heading text does not include `{highlight}`.
- **Prose** — Standard markdown between headings.
- **`§ Source Name`** — Source citation chips. The `§` prefix is stripped.

Content before the first `####` heading becomes an unnamed section.

### Timeline

Chronological event display with color-coded legend.

```
::: timeline
legend:
- Regulatory | #0f766e
- Enforcement | #dc2626
- Guidance | #2563eb

- Jan 2024 | SEC adopts climate disclosure rules | Regulatory
- Mar 2024 | CFPB enforcement action | Enforcement
- Jun 2024 | EU AI Act enters into force | Regulatory
:::
```

#### Legend Format

The `legend:` keyword starts the legend section. Each item:

```
- Label | #hexcolor
```

The legend section ends at a blank line or a bare `-` without a space. A `- ` list item that does not match the `Label | #hexcolor` pattern is silently skipped (the legend section remains active).

#### Item Format

```
- Date | Event description | Category
```

| Part | Required | Description |
|------|----------|-------------|
| `Date` | Yes | Display date text (free-form string). |
| `Event` | Yes | Event description. |
| `Category` | Yes | Must match a legend label for coloring. The parser **lowercases** this value; the renderer lowercases legend labels during lookup, so matching is case-insensitive. |

### CTA (Call to Action)

Button-style links.

```
::: cta
- [View Full Report](#report) {primary}
- [Download Summary](#download)
:::
```

#### Item Format

```
- [Label](href) {primary}
```

| Part | Required | Description |
|------|----------|-------------|
| `[Label]` | Yes | Button text in markdown link syntax. |
| `(href)` | Yes | URL. The parser accepts any string. The renderer validates with `isSafeHref` — only `http://`, `https://`, `/`, and `#` URLs are rendered; others are silently dropped. |
| `{primary}` | No | Marks the button as primary (bold/accent styling). |

### Signup

Newsletter-style signup box.

```
::: signup
title: Stay Informed
button: Subscribe to Updates
Get weekly regulatory updates and contract analysis
insights delivered to your inbox.
:::
```

#### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title:` | No | Heading text. Parsed as a key-value line. |
| `button:` | No | Button text. Parsed as a key-value line. |
| (remaining lines) | Yes | Body text. Non-key-value lines are joined with spaces. |

### Corpus Stats

Live data display bound to corpus metrics.

```
::: corpus-stats
- documents | Documents
- annotations | Annotations
- contributors | Contributors
- threads | Discussion Threads
:::
```

#### Item Format

```
- key | Display Label
```

| Part | Required | Description |
|------|----------|-------------|
| `key` | Yes | Data key used to look up the value from the `stats` prop at render time. |
| `Display Label` | Yes | Human-readable label shown below the value. |

Values are provided at render time via the `stats` prop on `CamlArticle`, not in the CAML source.

### Annotation Embed

Embeds a referenced annotation (placeholder in v1).

```
::: annotation-embed {ref: @annotation:a7f2}
:::
```

The `ref` attribute value has the `@annotation:` prefix stripped, leaving just the ID.

### Map

US state tile grid with categorical or heatmap coloring.

#### Categorical Mode

```
::: map {type: us}
legend:
- Compliant | #0f766e
- Pending | #f59e0b
- Non-compliant | #dc2626

- CA | Compliant
- NY | Compliant | 247
- TX | Pending | 56 | /details/texas
- FL | Non-compliant
:::
```

#### Heatmap Mode

```
::: map {type: us, mode: heatmap, low: #dbeafe, high: #1e3a8a}
- CA | 1247
- NY | 892 | /details/new-york
- TX | 634
:::
```

#### Map Attributes

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `type` | `us` | `us` | Map type. Currently only US is supported. |
| `mode` | `heatmap` | none (categorical behavior) | When set to `heatmap`, states are colored by numeric gradient. When omitted, states are colored by legend category. |
| `low` | `#hexcolor` | none | Heatmap gradient start color (lowest value). |
| `high` | `#hexcolor` | none | Heatmap gradient end color (highest value). |

#### Legend Format (Categorical Only)

`- Label | #hexcolor` format. The legend section ends at a blank line or a `- ` list item that does not match the `Label | #hexcolor` pattern (unlike timeline, where non-matching `- ` items are silently skipped).

#### State Item Format

**Categorical mode:**
```
- CODE | Status | count | /link
```

| Part | Required | Description |
|------|----------|-------------|
| `CODE` | Yes | Two-letter uppercase state code (e.g., `CA`, `NY`, `TX`). |
| `Status` | Yes | Must match a legend label for coloring. |
| `count` | No | Numeric value displayed on the tile. If the third field is not a number, it is treated as `href` instead. |
| `/link` | No | URL. Makes the tile clickable. |

**Heatmap mode:**
```
- CODE | value | /link
```

| Part | Required | Description |
|------|----------|-------------|
| `CODE` | Yes | Two-letter uppercase state code. |
| `value` | Yes | Numeric value. Determines color intensity on the gradient and is displayed on the tile. |
| `/link` | No | URL. Makes the tile clickable. |

States not listed in the source render as neutral gray tiles.

### Case History

Court progression tracker showing a case moving through the judicial system.

```
::: case-history
title: SEC v. Meridian Capital Partners LLC
docket: No. 22-cv-04817 (S.D.N.Y.)
status: Affirmed

- District Court | S.D.N.Y. | 2022-06-10 | Motion for TRO | Granted
  Court issued TRO freezing defendant's assets.

- Court of Appeals | 2nd Circuit | 2023-11-08 | Appeal | Affirmed
  Panel (3-0) held disgorgement calculation proper.

- Supreme Court | SCOTUS | 2024-03-25 | Certiorari | Cert Denied
:::
```

#### Header Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title:` | Yes | Case name. |
| `docket:` | No | Docket number. |
| `status:` | No | Overall case status. |

#### Entry Format

```
- Court Level | Court Name | Date | Action | Outcome
  Detail text on continuation lines.
```

| Part | Required | Description |
|------|----------|-------------|
| `Court Level` | Yes | E.g., `District Court`, `Court of Appeals`, `Supreme Court`. |
| `Court Name` | Yes | E.g., `S.D.N.Y.`, `2nd Circuit`, `SCOTUS`. |
| `Date` | Yes | Date string (free-form). |
| `Action` | Yes | Motion or procedural action. |
| `Outcome` | Yes | Disposition. Renderer color-codes: green (Granted, Affirmed), red (Denied, Reversed), amber (Remanded, Partial), gray (others). |
| Detail lines | No | Indented continuation lines after the entry. Joined with spaces. |

Entries require at least 5 pipe-separated fields. Lines with fewer fields are ignored. Extra fields beyond the fifth are silently discarded.

## Complete Example

```
---
version: "1.0"

hero:
  kicker: "Annual Compliance Report"
  title:
    - "Regulatory Compliance Analysis"
    - "{2024 Annual Review}"
  subtitle: >
    A comprehensive review of contract compliance
    across 14 jurisdictions.
  stats:
    - "1,247 contracts analyzed"
    - "14 jurisdictions covered"

footer:
  nav:
    - label: Documentation
      href: https://docs.example.com
    - label: GitHub
      href: https://github.com/example
  notice: "Copyright 2024 Example Corp."
---

::: chapter {#overview}
>! Section 01
## Executive Overview

Our analysis of **1,247 commercial contracts** reveals
significant patterns in force majeure clause adoption.

>>> "Contracts executed after March 2020 were 3.4x more
likely to include pandemic-specific language."

:::: pills
- 247 | **Documents** | Q4 2024
  status: Complete | #16a34a
- 94% | **Compliance** | All jurisdictions
  status: Above Target | #0f766e
::::

:::

::: chapter {#analysis}
>! Section 02
## Clause Analysis

:::: cards {columns: 2}
- **Force Majeure** | 89% adoption | #0f766e
  Updated language for pandemic and cyber events.
  ~ Source: Clause Database v4.2

- **Data Protection** | 94% adoption | #2563eb
  GDPR and CCPA compliance provisions.
  ~ Source: Regulatory Tracker
::::

:::: tabs
::::: tab {label: "Domestic", status: Active, color: #0f766e}
#### Federal {highlight}
SEC and CFPB frameworks analyzed.

#### State
Delaware and New York variations identified.

§ SEC EDGAR
§ CFPB Regulations
:::::

::::: tab {label: "International", color: #7c3aed}
#### EU
GDPR Article 28 compliance reviewed.

§ EUR-Lex
:::::
::::

:::

::: chapter {#landscape, theme: dark}
>! Section 03
## Regulatory Timeline

:::: timeline
legend:
- Regulatory | #0f766e
- Enforcement | #dc2626

- Jan 2024 | Climate disclosure rules adopted | Regulatory
- Mar 2024 | Contract transparency enforcement | Enforcement
::::

:::

::: chapter {#cta, gradient: true, centered: true}
## Ready to Get Started?

Join leading legal teams using document analytics.

:::: cta
- [View Report](#report) {primary}
- [Download](#download)
::::

:::
```

## Parsing Rules Summary

1. Frontmatter is extracted first if the document starts with `---`.
2. The body is tokenized at depth 3 — `:::` fences become chapters or top-level blocks.
3. Content recognized as `::: chapter` is parsed as a chapter; all other `::: type` fences are parsed as blocks wrapped in implicit chapters; bare prose becomes implicit prose chapters.
4. Inside each chapter, the body is re-tokenized at depth 4 — `::::` fences become blocks.
5. Inside a `:::: tabs` block, the body is scanned for `::::: tab` sub-fences at depth 5.
6. Unclosed fences are recovered as prose.
7. Unknown block types are treated as prose containing the raw body text.
8. Chapter metadata (`>!` kicker and `## title`) is extracted from prose and removed from rendered content.
