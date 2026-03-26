/**
 * CAML (Corpus Article Markup Language) type definitions.
 *
 * These types represent the JSON intermediate representation (IR) that the
 * CAML parser produces and the renderer consumes. Authors never see this —
 * they write .caml source files.
 */

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

export interface CamlHero {
  kicker?: string;
  title: string[];
  subtitle?: string;
  stats?: string[];
}

export interface CamlFooterNav {
  label: string;
  href: string;
}

export interface CamlFooter {
  nav?: CamlFooterNav[];
  notice?: string;
}

export interface CamlFrontmatter {
  version?: string;
  site?: string;
  hero?: CamlHero;
  footer?: CamlFooter;
}

// ---------------------------------------------------------------------------
// Block types
// ---------------------------------------------------------------------------

export interface CamlProse {
  type: "prose";
  content: string; // Raw markdown
}

export interface CamlCardItem {
  label: string;
  meta?: string;
  accent?: string;
  body?: string;
  footer?: string;
}

export interface CamlCards {
  type: "cards";
  columns?: number;
  items: CamlCardItem[];
}

export interface CamlPillItem {
  bigText: string;
  label: string;
  detail?: string;
  status?: string;
  statusColor?: string;
}

export interface CamlPills {
  type: "pills";
  items: CamlPillItem[];
}

export interface CamlTabSection {
  heading: string;
  highlight?: boolean;
  content: string; // Markdown content within the section
}

export interface CamlTabSource {
  name: string;
}

export interface CamlTab {
  label: string;
  status?: string;
  color?: string;
  sections: CamlTabSection[];
  sources: CamlTabSource[];
}

export interface CamlTabs {
  type: "tabs";
  tabs: CamlTab[];
}

export interface CamlTimelineLegendItem {
  label: string;
  color: string;
}

export interface CamlTimelineItem {
  date: string;
  label: string;
  /**
   * Legend category for this timeline entry.
   * Must match a legend label (case-insensitive) to receive that legend item's color.
   * The parser lowercases this value; legend labels are also lowercased for lookup.
   */
  side: string;
}

export interface CamlTimeline {
  type: "timeline";
  legend: CamlTimelineLegendItem[];
  items: CamlTimelineItem[];
}

export interface CamlCtaButton {
  label: string;
  href: string;
  primary?: boolean;
}

export interface CamlCta {
  type: "cta";
  items: CamlCtaButton[];
}

export interface CamlSignup {
  type: "signup";
  title?: string;
  button?: string;
  body: string;
}

export interface CamlCorpusStatItem {
  key: string;
  label: string;
}

export interface CamlCorpusStats {
  type: "corpus-stats";
  items: CamlCorpusStatItem[];
}

export interface CamlAnnotationEmbed {
  type: "annotation-embed";
  ref: string;
}

export type CamlBlock =
  | CamlProse
  | CamlCards
  | CamlPills
  | CamlTabs
  | CamlTimeline
  | CamlCta
  | CamlSignup
  | CamlCorpusStats
  | CamlAnnotationEmbed;

// ---------------------------------------------------------------------------
// Chapters
// ---------------------------------------------------------------------------

export interface CamlChapter {
  id: string;
  theme?: "light" | "dark";
  gradient?: boolean;
  centered?: boolean;
  kicker?: string;
  title?: string;
  blocks: CamlBlock[];
}

// ---------------------------------------------------------------------------
// Document (top-level)
// ---------------------------------------------------------------------------

export interface CamlDocument {
  frontmatter: CamlFrontmatter;
  chapters: CamlChapter[];
}
