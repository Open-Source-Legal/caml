/**
 * CAML Block Parsers — Pass 2: Type-specific parsing.
 *
 * Each function takes raw block body text and returns the typed block
 * object for the JSON IR.
 */

import type {
  CamlBlock,
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
} from "./types";

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
  const headerMatch = headerLine.match(
    /^\*\*(.+?)\*\*(?:\s*\|\s*(.+?))?(?:\s*\|\s*(#[0-9a-fA-F]{6}))?$/
  );

  const item: CamlCardItem = {
    label: headerMatch ? headerMatch[1].trim() : headerLine,
    meta: headerMatch?.[2]?.trim(),
    accent: headerMatch?.[3]?.trim(),
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
  const headerMatch = headerLine.match(
    /^(.+?)\s*\|\s*\*\*(.+?)\*\*(?:\s*\|\s*(.+))?$/
  );

  const item: CamlPillItem = {
    bigText: headerMatch ? headerMatch[1].trim() : headerLine,
    label: headerMatch ? headerMatch[2].trim() : "",
    detail: headerMatch?.[3]?.trim(),
  };

  // Parse status line
  for (let i = 1; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    const statusMatch = trimmed.match(
      /^status:\s*(.+?)(?:\s*\|\s*(#[0-9a-fA-F]{6}))?$/
    );
    if (statusMatch) {
      item.status = statusMatch[1].trim();
      item.statusColor = statusMatch[2]?.trim();
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
    const headingMatch = trimmed.match(
      /^####\s+(.+?)(?:\s*\{highlight\})?\s*$/
    );
    if (headingMatch) {
      flushSection();
      currentSection = {
        heading: headingMatch[1].trim(),
        highlight: trimmed.includes("{highlight}"),
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
        const legendMatch = trimmed
          .slice(2)
          .match(/^(.+?)\s*\|\s*(#[0-9a-fA-F]{6})\s*$/);
        if (legendMatch) {
          legend.push({
            label: legendMatch[1].trim(),
            color: legendMatch[2],
          });
        }
      } else if (trimmed === "" || trimmed.startsWith("-")) {
        inLegend = false;
      } else {
        continue;
      }
    }

    if (!inLegend && trimmed.startsWith("- ")) {
      const itemMatch = trimmed
        .slice(2)
        .match(/^(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)$/);
      if (itemMatch) {
        items.push({
          date: itemMatch[1].trim(),
          label: itemMatch[2].trim(),
          side: itemMatch[3].trim().toLowerCase(),
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
    const match = trimmed.match(/^-\s*\[(.+?)\]\((.+?)\)(?:\s*\{primary\})?$/);
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
    const kvMatch = trimmed.match(/^(title|button):\s*(.+)$/);
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
    const match = trimmed.slice(2).match(/^(.+?)\s*\|\s*(.+)$/);
    if (match) {
      items.push({ key: match[1].trim(), label: match[2].trim() });
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
        const legendMatch = trimmed
          .slice(2)
          .match(/^(.+?)\s*\|\s*(#[0-9a-fA-F]{6})\s*$/);
        if (legendMatch) {
          legend.push({
            label: legendMatch[1].trim(),
            color: legendMatch[2],
          });
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
      const stateMatch = trimmed
        .slice(2)
        .match(/^([A-Z]{2})\s*\|\s*(.+)$/);
      if (stateMatch) {
        states.push({
          code: stateMatch[1],
          status: stateMatch[2].trim(),
        });
      }
    }
  }

  return { type: "map", mapType, legend, states };
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
    default:
      // Unknown block type — treat as prose
      return { type: "prose", content: body };
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
