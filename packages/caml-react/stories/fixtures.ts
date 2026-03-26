/**
 * Shared fixture data for Storybook stories.
 *
 * All content uses realistic legal/document-analysis themes
 * rather than lorem ipsum.
 */
import type { CamlDocument, CamlChapter, CamlBlock } from "@os-legal/caml";
import type { CamlStats } from "../src/theme";

// ---------------------------------------------------------------------------
// Block fixtures
// ---------------------------------------------------------------------------

export const proseBlock: CamlBlock = {
  type: "prose",
  content: `Our analysis of **1,247 commercial contracts** across 14 jurisdictions reveals significant patterns in force majeure clause adoption following the 2020 pandemic.

>>> "Contracts executed after March 2020 were 3.4x more likely to include pandemic-specific force majeure language than pre-pandemic agreements."

The data shows a clear inflection point in Q2 2020, with adoption rates stabilizing at approximately 78% by Q4 2021. Notably, contracts in the **financial services** and **healthcare** sectors led this trend, while **real estate** agreements showed the slowest adoption curve.`,
};

export const cardsBlock: CamlBlock = {
  type: "cards",
  columns: 3,
  items: [
    {
      label: "Indemnification Clauses",
      meta: "412 instances",
      accent: "#0f766e",
      body: "Mutual indemnification found in 67% of reviewed contracts, with carve-outs for willful misconduct.",
      footer: "Avg. cap: 2x contract value",
    },
    {
      label: "Limitation of Liability",
      meta: "389 instances",
      accent: "#7c3aed",
      body: "Consequential damage exclusions present in 91% of agreements. Direct damage caps vary by sector.",
      footer: "Median cap: $5M",
    },
    {
      label: "Termination for Convenience",
      meta: "298 instances",
      accent: "#ea580c",
      body: "30-day notice period is the most common term. 23% include wind-down provisions for ongoing work.",
      footer: "Notice range: 15-90 days",
    },
  ],
};

export const pillsBlock: CamlBlock = {
  type: "pills",
  items: [
    {
      bigText: "247",
      label: "Documents Reviewed",
      detail: "Q4 2024",
      status: "Complete",
      statusColor: "#16a34a",
    },
    {
      bigText: "94%",
      label: "Compliance Rate",
      detail: "Across all jurisdictions",
      status: "Above Target",
      statusColor: "#0f766e",
    },
    {
      bigText: "12",
      label: "Critical Findings",
      detail: "Requires remediation",
      status: "Action Required",
      statusColor: "#dc2626",
    },
    {
      bigText: "3.2d",
      label: "Avg. Review Time",
      detail: "Per document",
      status: "On Track",
      statusColor: "#2563eb",
    },
  ],
};

export const tabsBlock: CamlBlock = {
  type: "tabs",
  tabs: [
    {
      label: "North America",
      status: "94% compliant",
      color: "#0f766e",
      sections: [
        {
          heading: "United States",
          highlight: true,
          content:
            "Federal regulations analyzed across **SEC**, **CFPB**, and **OCC** frameworks. State-level variations identified in Delaware, New York, and California corporate governance requirements.",
        },
        {
          heading: "Canada",
          highlight: false,
          content:
            "Provincial securities commissions reviewed. Notable divergence in Quebec civil law treatment of contractual obligations versus common law provinces.",
        },
      ],
      sources: [
        { name: "SEC EDGAR" },
        { name: "CFPB Regulations" },
        { name: "CSA National Instruments" },
      ],
    },
    {
      label: "European Union",
      status: "87% compliant",
      color: "#7c3aed",
      sections: [
        {
          heading: "GDPR Impact on Contracts",
          highlight: true,
          content:
            "Data processing agreements reviewed for **Article 28** compliance. Standard contractual clauses updated per June 2021 implementing decision.",
        },
        {
          heading: "MiFID II Obligations",
          highlight: false,
          content:
            "Investment services agreements analyzed for best execution policies, cost transparency, and product governance requirements.",
        },
      ],
      sources: [
        { name: "EUR-Lex" },
        { name: "ESMA Guidelines" },
        { name: "EDPB Opinions" },
      ],
    },
    {
      label: "Asia-Pacific",
      status: "In Progress",
      color: "#ea580c",
      sections: [
        {
          heading: "Cross-Border Considerations",
          highlight: false,
          content:
            "Analysis of bilateral investment treaties and free trade agreement provisions affecting contract enforcement across APAC jurisdictions.",
        },
      ],
      sources: [{ name: "HKEX Listing Rules" }, { name: "ASIC Regulatory Guides" }],
    },
  ],
};

export const timelineBlock: CamlBlock = {
  type: "timeline",
  legend: [
    { label: "regulatory", color: "#0f766e" },
    { label: "enforcement", color: "#dc2626" },
    { label: "guidance", color: "#2563eb" },
  ],
  items: [
    {
      date: "Jan 2024",
      label: "SEC adopts final climate disclosure rules",
      side: "regulatory",
    },
    {
      date: "Mar 2024",
      label: "CFPB enforcement action on contract terms transparency",
      side: "enforcement",
    },
    {
      date: "Jun 2024",
      label: "EU AI Act enters into force",
      side: "regulatory",
    },
    {
      date: "Sep 2024",
      label: "Updated guidance on digital asset contract classification",
      side: "guidance",
    },
    {
      date: "Nov 2024",
      label: "Record fine for non-compliant data processing agreements",
      side: "enforcement",
    },
    {
      date: "Jan 2025",
      label: "New model contractual clauses published by ICC",
      side: "guidance",
    },
  ],
};

export const ctaBlock: CamlBlock = {
  type: "cta",
  items: [
    { label: "View Full Report", href: "#report", primary: true },
    { label: "Download Summary", href: "#download" },
  ],
};

export const signupBlock: CamlBlock = {
  type: "signup",
  title: "Stay Informed",
  body: "Get weekly regulatory updates and contract analysis insights delivered to your inbox.",
  button: "Subscribe to Updates",
};

export const corpusStatsBlock: CamlBlock = {
  type: "corpus-stats",
  items: [
    { key: "documents", label: "Documents" },
    { key: "annotations", label: "Annotations" },
    { key: "contributors", label: "Contributors" },
    { key: "threads", label: "Discussion Threads" },
  ],
};

// ---------------------------------------------------------------------------
// Stats fixture
// ---------------------------------------------------------------------------

export const sampleStats: CamlStats = {
  documents: 1247,
  annotations: 8934,
  contributors: 23,
  threads: 156,
};

// ---------------------------------------------------------------------------
// Chapter fixtures
// ---------------------------------------------------------------------------

export const lightChapter: CamlChapter = {
  id: "key-findings",
  theme: "light",
  kicker: "Section 01",
  title: "Key Findings",
  blocks: [proseBlock, cardsBlock],
};

export const darkChapter: CamlChapter = {
  id: "regulatory-landscape",
  theme: "dark",
  kicker: "Section 02",
  title: "Regulatory Landscape",
  blocks: [
    {
      type: "prose",
      content: `The regulatory environment continues to evolve rapidly. Our monitoring systems tracked **47 significant regulatory changes** across monitored jurisdictions in 2024 alone.

Key areas of regulatory activity include digital asset classification, AI governance frameworks, and cross-border data transfer mechanisms. Organizations must maintain adaptive compliance programs to keep pace.`,
    },
    timelineBlock,
  ],
};

export const gradientChapter: CamlChapter = {
  id: "cta-section",
  gradient: true,
  centered: true,
  title: "Ready to Transform Your Contract Analysis?",
  blocks: [
    {
      type: "prose",
      content:
        "Join leading legal teams using AI-powered document analytics to reduce review time by 60% and improve compliance accuracy.",
    },
    ctaBlock,
  ],
};

// ---------------------------------------------------------------------------
// Full document fixture
// ---------------------------------------------------------------------------

export const fullDocument: CamlDocument = {
  frontmatter: {
    version: "1",
    site: "OpenContracts",
    hero: {
      kicker: "Annual Compliance Report",
      title: [
        "Regulatory Compliance Analysis",
        "{2024 Annual Review}",
      ],
      subtitle:
        "A comprehensive review of contract compliance across 14 jurisdictions, covering 1,247 commercial agreements.",
      stats: [
        "1,247 contracts analyzed",
        "14 jurisdictions covered",
        "94% compliance rate",
      ],
    },
    footer: {
      nav: [
        { label: "Documentation", href: "https://docs.example.com" },
        { label: "GitHub", href: "https://github.com/example/opencontracts" },
        { label: "Support", href: "https://support.example.com" },
      ],
      notice:
        "Copyright 2024 OpenContracts. All rights reserved. This report is generated from automated contract analysis and should be reviewed by qualified legal counsel.",
    },
  },
  chapters: [
    {
      id: "overview",
      kicker: "Section 01",
      title: "Executive Overview",
      blocks: [proseBlock, pillsBlock],
    },
    {
      id: "analysis",
      kicker: "Section 02",
      title: "Clause Analysis",
      blocks: [cardsBlock, tabsBlock],
    },
    darkChapter,
    {
      id: "metrics",
      kicker: "Section 04",
      title: "Corpus Metrics",
      blocks: [corpusStatsBlock, signupBlock],
    },
    gradientChapter,
  ],
};

export const emptyDocument: CamlDocument = {
  frontmatter: {},
  chapters: [],
};

export const minimalDocument: CamlDocument = {
  frontmatter: {
    hero: {
      title: ["Contract Analysis Report"],
    },
  },
  chapters: [
    {
      id: "intro",
      blocks: [
        {
          type: "prose",
          content: "This is a minimal CAML document with a single prose block.",
        },
      ],
    },
  ],
};
