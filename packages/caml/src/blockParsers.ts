/**
 * CAML Block Parsers — Pass 2: Type-specific parsing.
 *
 * Each function takes raw block body text and returns the typed block
 * object for the JSON IR.
 */

import type {
  CamlBlock,
  CamlProse,
  CamlCards,
  CamlCardItem,
  CamlPills,
  CamlPillItem,
  CamlTabs,
  CamlTab,
  CamlTabSection,
  CamlTimeline,
  CamlTimelineLegendItem,
  CamlTimelineItem,
  CamlCta,
  CamlCtaButton,
  CamlSignup,
  CamlCorpusStats,
  CamlAnnotationEmbed,
  CamlMap,
  CamlMapLegendItem,
  CamlMapStateItem,
  CamlCaseHistory,
  CamlCaseHistoryEntry,
} from "./types";
import { extractInlineDirectives } from "./inlineDirectives";

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function parseCards(attrs: Record<string, string>, body: string): CamlCards {
  const columns = attrs.columns ? parseInt(attrs.columns, 10) : undefined;
  const items = splitListItems(body).map(parseCardItem);

  return { type: "cards", columns, items };
}

function parseCardItem(raw: string): CamlCardItem {
  const lines = raw.split("\n");
  const headerLine = lines[0].trim();

  // Parse header: **Label** | meta | #color
  const parts = headerLine.split("|").map((s) => s.trim());
  const boldMatch = parts[0].match(/^\*\*([^*]+)\*\*$/);

  const item: CamlCardItem = {
    label: boldMatch ? boldMatch[1].trim() : parts[0],
    meta: parts[1] || undefined,
    accent: parts[2]?.match(/^#[0-9a-fA-F]{6}$/) ? parts[2] : undefined,
  };

  // Parse body and footer from remaining lines
  const bodyLines: string[] = [];
  for (let i = 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith("~ ")) {
      item.footer = trimmed.slice(2).trim();
    } else if (trimmed) {
      bodyLines.push(trimmed);
    }
  }

  if (bodyLines.length > 0) {
    item.body = bodyLines.join(" ");
  }

  return item;
}

// ---------------------------------------------------------------------------
// Pills
// ---------------------------------------------------------------------------

function parsePills(_attrs: Record<string, string>, body: string): CamlPills {
  const items = splitListItems(body).map(parsePillItem);
  return { type: "pills", items };
}

function parsePillItem(raw: string): CamlPillItem {
  const lines = raw.split("\n");
  const headerLine = lines[0].trim();

  // Parse header: BIG_TEXT | **Label** | detail
  const parts = headerLine.split("|").map((s) => s.trim());
  const boldMatch = parts[1]?.match(/^\*\*([^*]+)\*\*$/);

  const item: CamlPillItem = {
    bigText: parts[0] || headerLine,
    label: boldMatch ? boldMatch[1].trim() : (parts[1] || ""),
    detail: parts[2] || undefined,
  };

  // Parse status line
  for (let i = 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed.startsWith("status:")) {
      const statusParts = trimmed.slice(7).split("|").map((s) => s.trim());
      item.status = statusParts[0];
      const colorPart = statusParts[1];
      if (colorPart?.match(/^#[0-9a-fA-F]{6}$/)) {
        item.statusColor = colorPart;
      }
    }
  }

  return item;
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

function parseTabs(_attrs: Record<string, string>, body: string): CamlTabs {
  // Split on ::::: sub-fences (depth 5).
  // Tabs block uses :::: (depth 4), tab sub-fences use ::::: (depth 5).
  const tabs: CamlTab[] = [];
  const tabPattern = /^:::::\s*tab\s*\{(.*?)\}\s*$/;
  const closePattern = /^:::::\s*$/;

  const lines = body.split("\n");
  let currentTabAttrs: string | null = null;
  let tabBody: string[] = [];

  const flushTab = () => {
    if (currentTabAttrs !== null) {
      tabs.push(parseTabContent(currentTabAttrs, tabBody.join("\n")));
      tabBody = [];
      currentTabAttrs = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (closePattern.test(trimmed) && currentTabAttrs !== null) {
      flushTab();
      continue;
    }

    const tabMatch = trimmed.match(tabPattern);
    if (tabMatch) {
      flushTab();
      currentTabAttrs = tabMatch[1];
      continue;
    }

    if (currentTabAttrs !== null) {
      tabBody.push(line);
    }
  }

  flushTab();
  return { type: "tabs", tabs };
}

function parseTabContent(attrsStr: string, body: string): CamlTab {
  // Parse attributes: label: "...", status: ..., color: #...
  const labelMatch = attrsStr.match(/label:\s*"([^"]+)"/);
  const statusMatch = attrsStr.match(/status:\s*(\w+)/);
  const colorMatch = attrsStr.match(/color:\s*(#[0-9a-fA-F]{6})/);

  const tab: CamlTab = {
    label: labelMatch ? labelMatch[1] : "Untitled",
    status: statusMatch ? statusMatch[1] : undefined,
    color: colorMatch ? colorMatch[1] : undefined,
    sections: [],
    sources: [],
  };

  // Parse sections by #### headings, and collect § sources
  const lines = body.split("\n");
  let currentSection: CamlTabSection | null = null;
  let sectionContent: string[] = [];

  const flushSection = () => {
    if (currentSection) {
      currentSection.content = sectionContent.join("\n").trim();
      tab.sections.push(currentSection);
      sectionContent = [];
      currentSection = null;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Source chips: § source name
    if (trimmed.startsWith("§ ")) {
      tab.sources.push({ name: trimmed.slice(2).trim() });
      continue;
    }

    // Section heading: #### Heading {highlight}
    if (trimmed.startsWith("#### ")) {
      flushSection();
      let headingText = trimmed.slice(4).trim();
      const isHighlight = headingText.endsWith("{highlight}");
      if (isHighlight) {
        headingText = headingText.slice(0, -"{highlight}".length).trim();
      }
      currentSection = {
        heading: headingText,
        highlight: isHighlight,
        content: "",
      };
      continue;
    }

    if (currentSection) {
      sectionContent.push(line);
    } else {
      // Content before first heading — add as unnamed section
      if (trimmed) {
        sectionContent.push(line);
      }
    }
  }

  // Flush last section
  if (currentSection) {
    flushSection();
  } else if (sectionContent.join("\n").trim()) {
    tab.sections.push({
      heading: "",
      content: sectionContent.join("\n").trim(),
    });
  }

  return tab;
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

function parseTimeline(
  _attrs: Record<string, string>,
  body: string
): CamlTimeline {
  const lines = body.split("\n");
  const legend: CamlTimelineLegendItem[] = [];
  const items: CamlTimelineItem[] = [];
  let inLegend = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "legend:") {
      inLegend = true;
      continue;
    }

    if (inLegend) {
      if (trimmed.startsWith("- ")) {
        const parts = trimmed.slice(2).split("|").map((s) => s.trim());
        if (parts[1]?.match(/^#[0-9a-fA-F]{6}$/)) {
          legend.push({ label: parts[0], color: parts[1] });
        }
      } else if (trimmed === "" || trimmed.startsWith("-")) {
        inLegend = false;
      } else {
        continue;
      }
    }

    if (!inLegend && trimmed.startsWith("- ")) {
      const parts = trimmed.slice(2).split("|").map((s) => s.trim());
      if (parts.length >= 3) {
        items.push({
          date: parts[0],
          label: parts[1],
          side: parts[2].toLowerCase(),
        });
      }
    }
  }

  return { type: "timeline", legend, items };
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

function parseCta(_attrs: Record<string, string>, body: string): CamlCta {
  const items: CamlCtaButton[] = [];
  const lines = body.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("- ")) continue;

    // Parse: - [Label](href) {primary}
    const match = trimmed.match(/^-\s*\[([^\]]+)\]\(([^)]+)\)(?:\s*\{primary\})?$/);
    if (match) {
      items.push({
        label: match[1],
        href: match[2],
        primary: trimmed.includes("{primary}"),
      });
    }
  }

  return { type: "cta", items };
}

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------

function parseSignup(_attrs: Record<string, string>, body: string): CamlSignup {
  const lines = body.split("\n");
  const result: CamlSignup = { type: "signup", body: "" };
  const bodyLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const kvMatch = trimmed.match(/^(title|button):[ \t]*(\S.*)$/);
    if (kvMatch) {
      if (kvMatch[1] === "title") result.title = kvMatch[2].trim();
      if (kvMatch[1] === "button") result.button = kvMatch[2].trim();
    } else if (trimmed) {
      bodyLines.push(trimmed);
    }
  }

  result.body = bodyLines.join(" ");
  return result;
}

// ---------------------------------------------------------------------------
// Corpus Stats
// ---------------------------------------------------------------------------

function parseCorpusStats(
  _attrs: Record<string, string>,
  body: string
): CamlCorpusStats {
  const items: { key: string; label: string }[] = [];
  const lines = body.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("- ")) continue;
    const parts = trimmed.slice(2).split("|").map((s) => s.trim());
    if (parts.length >= 2) {
      items.push({ key: parts[0], label: parts[1] });
    }
  }

  return { type: "corpus-stats", items };
}

// ---------------------------------------------------------------------------
// Annotation Embed
// ---------------------------------------------------------------------------

function parseAnnotationEmbed(
  attrs: Record<string, string>,
  _body: string
): CamlAnnotationEmbed {
  // ref comes from attrs: {ref: @annotation:a7f2}
  const ref = attrs.ref?.replace(/^@annotation:/, "") || "";
  return { type: "annotation-embed", ref };
}

// ---------------------------------------------------------------------------
// Map
// ---------------------------------------------------------------------------

function parseMap(attrs: Record<string, string>, body: string): CamlMap {
  const mapType = attrs.type || "us";
  const mode =
    attrs.mode === "heatmap"
      ? ("heatmap" as const)
      : undefined;
  const lowColor = attrs.low || undefined;
  const highColor = attrs.high || undefined;
  const legend: CamlMapLegendItem[] = [];
  const states: CamlMapStateItem[] = [];
  let inLegend = false;

  for (const line of body.split("\n")) {
    const trimmed = line.trim();

    if (trimmed === "legend:") {
      inLegend = true;
      continue;
    }

    if (inLegend) {
      if (trimmed.startsWith("- ")) {
        const parts = trimmed.slice(2).split("|").map((s) => s.trim());
        if (parts[1]?.match(/^#[0-9a-fA-F]{6}$/)) {
          legend.push({ label: parts[0], color: parts[1] });
        } else {
          inLegend = false;
        }
      } else if (trimmed === "") {
        inLegend = false;
      } else {
        continue;
      }
    }

    if (!inLegend && trimmed.startsWith("- ")) {
      const parts = trimmed.slice(2).split("|").map((s) => s.trim());
      const codeMatch = parts[0]?.match(/^[A-Z]{2}$/);

      if (codeMatch && parts.length >= 2) {
        const item: CamlMapStateItem = {
          code: parts[0],
          status: parts[1],
        };

        if (mode === "heatmap") {
          // Heatmap: - CODE | value | href?
          const numVal = parseFloat(parts[1]);
          if (!isNaN(numVal)) item.count = numVal;
          if (parts[2]) item.href = parts[2];
        } else {
          // Categorical: - CODE | status | count? | href?
          if (parts[2]) {
            const num = parseFloat(parts[2]);
            if (!isNaN(num)) {
              item.count = num;
            } else {
              item.href = parts[2];
            }
          }
          if (parts[3]) item.href = parts[3];
        }

        states.push(item);
      }
    }
  }

  return { type: "map", mapType, mode, lowColor, highColor, legend, states };
}

// ---------------------------------------------------------------------------
// Case History
// ---------------------------------------------------------------------------

function parseCaseHistory(
  _attrs: Record<string, string>,
  body: string
): CamlCaseHistory {
  const result: CamlCaseHistory = {
    type: "case-history",
    title: "",
    entries: [],
  };

  const lines = body.split("\n");
  let currentEntry: CamlCaseHistoryEntry | null = null;
  let detailLines: string[] = [];

  const flushEntry = () => {
    if (currentEntry) {
      if (detailLines.length > 0) {
        currentEntry.detail = detailLines.join(" ").trim();
      }
      result.entries.push(currentEntry);
      currentEntry = null;
      detailLines = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Key-value header
    const kvMatch = trimmed.match(/^(title|docket|status):[ \t]*(\S.*)$/);
    if (kvMatch) {
      const key = kvMatch[1] as "title" | "docket" | "status";
      result[key] = kvMatch[2].trim();
      continue;
    }

    // Entry line: - Court Level | Court Name | Date | Action | Outcome
    if (trimmed.startsWith("- ")) {
      flushEntry();
      const parts = trimmed.slice(2).split("|").map((s) => s.trim());
      if (parts.length >= 5) {
        currentEntry = {
          courtLevel: parts[0],
          courtName: parts[1],
          date: parts[2],
          action: parts[3],
          outcome: parts[4],
        };
      }
      continue;
    }

    // Detail continuation
    if (trimmed && currentEntry) {
      detailLines.push(trimmed);
    }
  }

  flushEntry();
  return result;
}

// ---------------------------------------------------------------------------
// Dispatcher
// ---------------------------------------------------------------------------

/**
 * Parse a fenced block by type name into the appropriate CamlBlock.
 */
export function parseBlock(
  type: string,
  attrs: Record<string, string>,
  body: string
): CamlBlock | null {
  switch (type) {
    case "cards":
      return parseCards(attrs, body);
    case "pills":
      return parsePills(attrs, body);
    case "tabs":
      return parseTabs(attrs, body);
    case "timeline":
      return parseTimeline(attrs, body);
    case "cta":
      return parseCta(attrs, body);
    case "signup":
      return parseSignup(attrs, body);
    case "corpus-stats":
      return parseCorpusStats(attrs, body);
    case "annotation-embed":
      return parseAnnotationEmbed(attrs, body);
    case "map":
      return parseMap(attrs, body);
    case "case-history":
      return parseCaseHistory(attrs, body);
    default: {
      // Unknown block type — treat as prose (with directive extraction)
      const result = extractInlineDirectives(body);
      const prose: CamlProse = { type: "prose", content: result.content };
      if (result.directives.length > 0) {
        prose.directives = result.directives;
      }
      return prose;
    }
  }
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/**
 * Split a block body into individual list items (separated by ^- lines).
 * Handles continuation lines (indented text after the - line).
 */
function splitListItems(body: string): string[] {
  const items: string[] = [];
  let current: string[] = [];

  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      if (current.length > 0) {
        items.push(current.join("\n"));
      }
      current = [trimmed.slice(2)]; // Remove "- " prefix
    } else if (trimmed && current.length > 0) {
      current.push(line); // Keep indentation for body text
    }
  }

  if (current.length > 0) {
    items.push(current.join("\n"));
  }

  return items;
}
