*@os-legal/caml*

# Corpus Article Markup Language

A human-readable markdown superset for authoring beautiful, interactive legal articles and knowledge bases.

`Zero dependencies (parser)` · `React renderer` · `GFM compiler`

---

*Overview*

## What is CAML?

CAML (Corpus Article Markup Language) is a markdown superset designed for legal document analytics. Write human-readable source files that render as beautiful, interactive articles with cards, pills, tabs, timelines, maps, and court case trackers.

> *Write like markdown. Render like a publication.*


*Packages*

## Two Packages

| Item | Details | Description |
|------|---------|-------------|
| **@os-legal/caml** | Parser | Zero-dependency parser and GFM compiler. Works in Node, browsers, and CLI. Parses .caml source into a JSON IR, or compiles to GitHub-Flavored Markdown. *npm install @os-legal/caml* |
| **@os-legal/caml-react** | React Renderer | Themed React components that render CAML articles with interactive blocks, dark/gradient sections, and customizable design tokens. *npm install @os-legal/caml-react* |


*Blocks*

## Supported Block Types

| Item | Details | Description |
|------|---------|-------------|
| **Prose** | Markdown | Standard markdown with pullquote support via >>> syntax. |
| **Cards** | Grid Layout | Multi-column card grids with accent colors, metadata, and footers. |
| **Pills** | Metrics | Big-number metric displays with status badges. |
| **Tabs** | Tabbed Content | Interactive tabbed panels with section headings and source chips. |
| **Timeline** | Events | Chronological event display with color-coded legend categories. |
| **CTA** | Buttons | Call-to-action button rows with primary/secondary styling. |
| **Map** | US Tile Grid | State-level data visualization with categorical, heatmap, and count modes. |
| **Case History** | Court Tracker | Visual court progression from trial through appellate to supreme court. |
| **Corpus Stats** | Live Data | Dynamic stat displays bound to corpus metrics. |


*Getting Started*

## Quick Start

Parse CAML source:

```typescript
import { parseCaml } from "@os-legal/caml";

const doc = parseCaml(camlSource);
// doc.frontmatter, doc.chapters, doc.chapters[0].blocks...
```

Render with React:

```tsx
import { CamlArticle, CamlThemeProvider } from "@os-legal/caml-react";
import { parseCaml } from "@os-legal/caml";

function Article({ source }) {
  const doc = parseCaml(source);
  return (
    <CamlThemeProvider>
      <CamlArticle document={doc} />
    </CamlThemeProvider>
  );
}
```

Compile to GitHub Markdown:

```bash
npx @os-legal/caml caml-to-md README.caml > README.md
```


---

[npm: @os-legal/caml](https://www.npmjs.com/package/@os-legal/caml) | [npm: @os-legal/caml-react](https://www.npmjs.com/package/@os-legal/caml-react) | [Storybook](https://open-source-legal.github.io/os-legal-caml/)

*MIT License. Built for the legal industry by Open Source Legal.*
