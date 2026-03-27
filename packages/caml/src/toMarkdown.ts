/**
 * CAML-to-Markdown compiler.
 *
 * Converts a CAML source string into clean GitHub-Flavored Markdown (GFM).
 * Zero external dependencies — only imports from the same package.
 */

import { parseCaml } from "./tokenizer";
import type {
  CamlDocument,
  CamlBlock,
  CamlChapter,
  CamlHero,
  CamlFooter,
  CamlProse,
  CamlCards,
  CamlPills,
  CamlTabs,
  CamlTimeline,
  CamlTimelineLegendItem,
  CamlCta,
  CamlSignup,
  CamlCorpusStats,
  CamlMap,
  CamlCaseHistory,
} from "./types";

// ---------------------------------------------------------------------------
// Color-to-emoji mapping for legend categories
// ---------------------------------------------------------------------------

const LEGEND_EMOJI_CYCLE = [
  "\u{1F7E2}", // green
  "\u{1F534}", // red
  "\u{1F535}", // blue
  "\u{1F7E1}", // yellow
  "\u{1F7E0}", // orange
  "\u{1F7E3}", // purple
  "\u{26AA}",  // white
  "\u{26AB}",  // black
];

/** Map of status keywords to emoji for categorical maps. */
const STATUS_EMOJI: Record<string, string> = {
  compliant: "\u{2705}",
  active: "\u{2705}",
  "non-compliant": "\u{274C}",
  inactive: "\u{274C}",
  pending: "\u{23F3}",
  "in progress": "\u{23F3}",
};

/** Map of outcome keywords to emoji for case history. */
const OUTCOME_EMOJI: Record<string, string> = {
  granted: "\u{2705}",
  affirmed: "\u{2705}",
  denied: "\u{274C}",
  reversed: "\u{274C}",
  remanded: "\u{1F504}",
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Convert CAML source text to GitHub-Flavored Markdown.
 */
export function camlToMarkdown(source: string): string {
  const doc: CamlDocument = parseCaml(source);
  const lines: string[] = [];

  // Render hero
  if (doc.frontmatter.hero) {
    renderHero(doc.frontmatter.hero, lines);
  }

  // Render chapters
  for (const chapter of doc.chapters) {
    renderChapter(chapter, lines);
  }

  // Render footer
  if (doc.frontmatter.footer) {
    renderFooter(doc.frontmatter.footer, lines);
  }

  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function renderHero(hero: CamlHero, lines: string[]): void {
  if (hero.kicker) {
    lines.push(`*${hero.kicker}*`, "");
  }

  if (hero.title) {
    const titleParts = Array.isArray(hero.title) ? hero.title : [hero.title];
    const titleText = titleParts
      .map((line) => String(line).replace(/\{([^}]+)\}/g, "$1"))
      .join(" ");
    lines.push(`# ${titleText}`, "");
  }

  if (hero.subtitle) {
    lines.push(hero.subtitle, "");
  }

  if (hero.stats && hero.stats.length > 0) {
    lines.push(
      hero.stats.map((s) => `\`${s}\``).join(" \u{00B7} "),
      ""
    );
  }

  lines.push("---", "");
}

// ---------------------------------------------------------------------------
// Chapter
// ---------------------------------------------------------------------------

function renderChapter(chapter: CamlChapter, lines: string[]): void {
  if (chapter.kicker) {
    lines.push(`*${chapter.kicker}*`, "");
  }

  if (chapter.title) {
    lines.push(`## ${chapter.title}`, "");
  }

  for (const block of chapter.blocks) {
    renderBlock(block, lines);
  }

  lines.push("");
}

// ---------------------------------------------------------------------------
// Block dispatcher
// ---------------------------------------------------------------------------

function renderBlock(block: CamlBlock, lines: string[]): void {
  switch (block.type) {
    case "prose":
      return renderProse(block, lines);
    case "cards":
      return renderCards(block, lines);
    case "pills":
      return renderPills(block, lines);
    case "tabs":
      return renderTabs(block, lines);
    case "timeline":
      return renderTimeline(block, lines);
    case "cta":
      return renderCta(block, lines);
    case "signup":
      return renderSignup(block, lines);
    case "corpus-stats":
      return renderCorpusStats(block, lines);
    case "map":
      return renderMap(block, lines);
    case "case-history":
      return renderCaseHistory(block, lines);
    case "annotation-embed":
      return; // Skip — no meaningful markdown representation
  }
}

// ---------------------------------------------------------------------------
// Prose (with pullquote support)
// ---------------------------------------------------------------------------

function renderProse(block: CamlProse, lines: string[]): void {
  const content = block.content;

  // Split on >>> pullquotes
  const parts = content.split(/^>>>[ \t]*/m);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i].trim();
    if (!part) continue;

    if (i === 0) {
      // First part is always regular prose (before any >>>)
      lines.push(part, "");
    } else {
      // This part starts with a pullquote. The pullquote text may be followed
      // by more regular prose separated by blank lines.
      const subParts = part.split(/\n\n+/);
      const quoteText = subParts[0].trim().replace(/^"(.*)"$/, "$1");
      lines.push(`> *${quoteText}*`, "");

      // Remaining sub-parts are regular prose
      for (let j = 1; j < subParts.length; j++) {
        const sub = subParts[j].trim();
        if (sub) {
          lines.push(sub, "");
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function renderCards(block: CamlCards, lines: string[]): void {
  if (block.items.length === 0) return;

  // Table headers
  lines.push("| Item | Details | Description |");
  lines.push("|------|---------|-------------|");

  for (const item of block.items) {
    const label = `**${item.label}**`;
    const meta = item.meta || "";
    const desc = [item.body, item.footer ? `*${item.footer}*` : ""]
      .filter(Boolean)
      .join(" ");
    lines.push(`| ${label} | ${meta} | ${desc} |`);
  }

  lines.push("");
}

// ---------------------------------------------------------------------------
// Pills
// ---------------------------------------------------------------------------

function renderPills(block: CamlPills, lines: string[]): void {
  if (block.items.length === 0) return;

  // Big numbers on top row, labels on bottom (inverted table for visual impact)
  const topCells = block.items.map((item) => ` ${item.bigText} `);
  const separators = block.items.map((item) => {
    const width = Math.max(item.bigText.length, item.label.length, 3);
    return "-".repeat(width + 2);
  });
  const bottomCells = block.items.map((item) => ` ${item.label} `);

  lines.push(`|${topCells.join("|")}|`);
  lines.push(`|${separators.join("|")}|`);
  lines.push(`|${bottomCells.join("|")}|`);

  lines.push("");
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

function renderTabs(block: CamlTabs, lines: string[]): void {
  for (const tab of block.tabs) {
    const summaryParts = [tab.label];
    if (tab.status) {
      summaryParts[0] = `**${tab.label}** \u{2014} ${tab.status}`;
    } else {
      summaryParts[0] = `**${tab.label}**`;
    }

    lines.push("<details>");
    lines.push(`<summary>${summaryParts[0]}</summary>`, "");

    for (const section of tab.sections) {
      if (section.heading) {
        lines.push(`#### ${section.heading}`, "");
      }
      if (section.content.trim()) {
        lines.push(section.content.trim(), "");
      }
    }

    if (tab.sources.length > 0) {
      const sourceText = tab.sources.map((s) => s.name).join(", ");
      lines.push(`*Sources: ${sourceText}*`, "");
    }

    lines.push("</details>", "");
  }
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

function renderTimeline(block: CamlTimeline, lines: string[]): void {
  if (block.items.length === 0) return;

  // Build legend label -> emoji map
  const legendEmojiMap = buildLegendEmojiMap(block.legend);

  lines.push("| Date | Event | Category |");
  lines.push("|------|-------|----------|");

  for (const item of block.items) {
    const emoji = legendEmojiMap.get(item.side.toLowerCase()) || "";
    const categoryLabel = findLegendLabel(block.legend, item.side) || item.side;
    const categoryCell = emoji ? `${emoji} ${categoryLabel}` : categoryLabel;
    lines.push(`| ${item.date} | ${item.label} | ${categoryCell} |`);
  }

  lines.push("");
}

function buildLegendEmojiMap(
  legend: CamlTimelineLegendItem[]
): Map<string, string> {
  const map = new Map<string, string>();
  for (let i = 0; i < legend.length; i++) {
    map.set(
      legend[i].label.toLowerCase(),
      LEGEND_EMOJI_CYCLE[i % LEGEND_EMOJI_CYCLE.length]
    );
  }
  return map;
}

function findLegendLabel(
  legend: CamlTimelineLegendItem[],
  side: string
): string | undefined {
  const lower = side.toLowerCase();
  const item = legend.find((l) => l.label.toLowerCase() === lower);
  return item?.label;
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

function renderCta(block: CamlCta, lines: string[]): void {
  if (block.items.length === 0) return;

  const parts = block.items.map((item) => {
    if (item.primary) {
      return `**[${item.label}](${item.href})**`;
    }
    return `[${item.label}](${item.href})`;
  });

  lines.push(parts.join(" | "), "");
}

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------

function renderSignup(block: CamlSignup, lines: string[]): void {
  if (block.title) {
    lines.push(`> **${block.title}**`);
    lines.push(">");
  }
  if (block.body) {
    lines.push(`> ${block.body}`);
  }
  lines.push("");
}

// ---------------------------------------------------------------------------
// Corpus Stats
// ---------------------------------------------------------------------------

function renderCorpusStats(block: CamlCorpusStats, lines: string[]): void {
  if (block.items.length === 0) return;

  lines.push("| Metric | Value |");
  lines.push("|--------|-------|");

  for (const item of block.items) {
    lines.push(`| ${item.label} | \u{2014} |`);
  }

  lines.push("");
}

// ---------------------------------------------------------------------------
// Map
// ---------------------------------------------------------------------------

function renderMap(block: CamlMap, lines: string[]): void {
  if (block.states.length === 0) return;

  if (block.mode === "heatmap") {
    renderMapHeatmap(block, lines);
  } else {
    renderMapCategorical(block, lines);
  }
}

function renderMapCategorical(block: CamlMap, lines: string[]): void {
  const hasCount = block.states.some((s) => s.count !== undefined);

  if (hasCount) {
    lines.push("| State | Status | Count |");
    lines.push("|-------|--------|-------|");
  } else {
    lines.push("| State | Status |");
    lines.push("|-------|--------|");
  }

  for (const state of block.states) {
    const statusEmoji =
      STATUS_EMOJI[state.status.toLowerCase()] || "";
    const statusText = statusEmoji
      ? `${statusEmoji} ${state.status}`
      : state.status;

    if (hasCount) {
      const count =
        state.count !== undefined ? formatNumber(state.count) : "";
      lines.push(`| ${state.code} | ${statusText} | ${count} |`);
    } else {
      lines.push(`| ${state.code} | ${statusText} |`);
    }
  }

  lines.push("");
}

function renderMapHeatmap(block: CamlMap, lines: string[]): void {
  // Sort by value descending
  const sorted = [...block.states].sort((a, b) => {
    const aVal = a.count ?? 0;
    const bVal = b.count ?? 0;
    return bVal - aVal;
  });

  lines.push("| State | Count |");
  lines.push("|-------|-------|");

  for (const state of sorted) {
    const count =
      state.count !== undefined ? formatNumber(state.count) : state.status;
    lines.push(`| ${state.code} | ${count} |`);
  }

  lines.push("");
}

// ---------------------------------------------------------------------------
// Case History
// ---------------------------------------------------------------------------

function renderCaseHistory(block: CamlCaseHistory, lines: string[]): void {
  // Header
  lines.push(`### ${block.title}`, "");

  const metaParts: string[] = [];
  if (block.docket) {
    metaParts.push(`*${block.docket}*`);
  }
  if (block.status) {
    metaParts.push(`**${block.status}**`);
  }
  if (metaParts.length > 0) {
    lines.push(metaParts.join(" \u{2014} "), "");
  }

  if (block.entries.length === 0) return;

  // Table
  lines.push("| Court | Date | Action | Outcome |");
  lines.push("|-------|------|--------|---------|");

  for (const entry of block.entries) {
    const courtText = `${entry.courtLevel} (${entry.courtName})`;
    const outcomeEmoji =
      OUTCOME_EMOJI[entry.outcome.toLowerCase()] || "";
    const outcomeText = outcomeEmoji
      ? `${outcomeEmoji} ${entry.outcome}`
      : entry.outcome;
    lines.push(
      `| ${courtText} | ${entry.date} | ${entry.action} | ${outcomeText} |`
    );
  }

  lines.push("");
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function renderFooter(footer: CamlFooter, lines: string[]): void {
  lines.push("---", "");

  if (footer.nav && footer.nav.length > 0) {
    const links = footer.nav.map((n) => `[${n.label}](${n.href})`);
    lines.push(links.join(" | "), "");
  }

  if (footer.notice) {
    lines.push(`*${footer.notice}*`, "");
  }
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
