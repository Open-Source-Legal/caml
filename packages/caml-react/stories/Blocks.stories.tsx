import React, { useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlShowcase } from "./CamlShowcase";
import { parseCaml } from "@os-legal/caml";
import type { CamlUnknownBlock } from "@os-legal/caml";
import { CamlArticle } from "../src/CamlArticle";
import { CamlThemeProvider } from "../src/CamlThemeProvider";

const meta: Meta = {
  title: "CAML/Blocks",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// ---------------------------------------------------------------------------
// Prose
// ---------------------------------------------------------------------------

const proseSource = `Our analysis of **1,247 commercial contracts** across 14 jurisdictions
reveals significant patterns in force majeure clause adoption following
the 2020 pandemic.

>>> "Contracts executed after March 2020 were 3.4x more likely to include
pandemic-specific force majeure language than pre-pandemic agreements."

The data shows a clear inflection point in Q2 2020, with adoption rates
stabilizing at approximately 78% by Q4 2021. Notably, contracts in the
**financial services** and **healthcare** sectors led this trend, while
**real estate** agreements showed the slowest adoption curve.`;

export const Prose: StoryObj = {
  render: () => <CamlShowcase source={proseSource} />,
};

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

const cardsSource = `::: cards {columns: 3}
- **Indemnification Clauses** | 412 instances | #0f766e
  Mutual indemnification found in 67% of reviewed contracts,
  with carve-outs for willful misconduct.
  ~ Avg. cap: 2x contract value

- **Limitation of Liability** | 389 instances | #7c3aed
  Consequential damage exclusions present in 91% of agreements.
  Direct damage caps vary by sector.
  ~ Median cap: $5M

- **Termination for Convenience** | 298 instances | #ea580c
  30-day notice period is the most common term. 23% include
  wind-down provisions for ongoing work.
  ~ Notice range: 15-90 days
:::`;

export const Cards: StoryObj = {
  render: () => <CamlShowcase source={cardsSource} />,
};

// ---------------------------------------------------------------------------
// Pills
// ---------------------------------------------------------------------------

const pillsSource = `::: pills
- 247 | **Documents Reviewed** | Q4 2024
  status: Complete | #16a34a
- 94% | **Compliance Rate** | Across all jurisdictions
  status: Above Target | #0f766e
- 12 | **Critical Findings** | Requires remediation
  status: Action Required | #dc2626
- 3.2d | **Avg. Review Time** | Per document
  status: On Track | #2563eb
:::`;

export const Pills: StoryObj = {
  render: () => <CamlShowcase source={pillsSource} />,
};

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

const tabsSource = `::: tabs
::::: tab {label: "North America", status: "94% compliant", color: #0f766e}
#### United States {highlight}
Federal regulations analyzed across **SEC**, **CFPB**, and **OCC**
frameworks. State-level variations identified in Delaware, New York,
and California corporate governance requirements.

#### Canada
Provincial securities commissions reviewed. Notable divergence in
Quebec civil law treatment of contractual obligations versus common
law provinces.

\u00a7 SEC EDGAR
\u00a7 CFPB Regulations
\u00a7 CSA National Instruments
:::::

::::: tab {label: "European Union", status: "87% compliant", color: #7c3aed}
#### GDPR Impact on Contracts {highlight}
Data processing agreements reviewed for **Article 28** compliance.
Standard contractual clauses updated per June 2021 implementing decision.

#### MiFID II Obligations
Investment services agreements analyzed for best execution policies,
cost transparency, and product governance requirements.

\u00a7 EUR-Lex
\u00a7 ESMA Guidelines
\u00a7 EDPB Opinions
:::::

::::: tab {label: "Asia-Pacific", status: "In Progress", color: #ea580c}
#### Cross-Border Considerations
Analysis of bilateral investment treaties and free trade agreement
provisions affecting contract enforcement across APAC jurisdictions.

\u00a7 HKEX Listing Rules
\u00a7 ASIC Regulatory Guides
:::::
:::`;

export const Tabs: StoryObj = {
  render: () => <CamlShowcase source={tabsSource} />,
};

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

const timelineSource = `::: timeline
legend:
- regulatory | #0f766e
- enforcement | #dc2626
- guidance | #2563eb

- Jan 2024 | SEC adopts final climate disclosure rules | regulatory
- Mar 2024 | CFPB enforcement action on contract terms transparency | enforcement
- Jun 2024 | EU AI Act enters into force | regulatory
- Sep 2024 | Updated guidance on digital asset contract classification | guidance
- Nov 2024 | Record fine for non-compliant data processing agreements | enforcement
- Jan 2025 | New model contractual clauses published by ICC | guidance
:::`;

export const Timeline: StoryObj = {
  render: () => <CamlShowcase source={timelineSource} />,
};

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

const ctaSource = `::: cta
- [View Full Report](#report) {primary}
- [Download Summary](#download)
:::`;

export const CTA: StoryObj = {
  render: () => <CamlShowcase source={ctaSource} />,
};

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------

const signupSource = `::: signup
title: Stay Informed
button: Subscribe to Updates
Get weekly regulatory updates and contract analysis insights
delivered to your inbox.
:::`;

export const Signup: StoryObj = {
  render: () => <CamlShowcase source={signupSource} />,
};

// ---------------------------------------------------------------------------
// Corpus Stats
// ---------------------------------------------------------------------------

const corpusStatsSource = `::: corpus-stats
- documents | Documents
- annotations | Annotations
- contributors | Contributors
- threads | Discussion Threads
:::`;

const sampleStats = {
  documents: 1247,
  annotations: 8934,
  contributors: 23,
  threads: 156,
};

export const CorpusStats: StoryObj = {
  render: () => (
    <CamlShowcase source={corpusStatsSource} stats={sampleStats} />
  ),
};

// ---------------------------------------------------------------------------
// US Map
// ---------------------------------------------------------------------------

const usMapSource = `::: map {type: us}
legend:
- Compliant | #0f766e
- Pending Review | #f59e0b
- Non-compliant | #dc2626

- CA | Compliant
- NY | Compliant
- TX | Pending Review
- FL | Non-compliant
- IL | Compliant
- WA | Pending Review
- PA | Compliant
- OH | Compliant
- GA | Non-compliant
- NC | Pending Review
- MI | Compliant
- NJ | Compliant
- VA | Compliant
- MA | Compliant
- AZ | Pending Review
- CO | Compliant
- TN | Non-compliant
- MN | Compliant
- MD | Compliant
- OR | Pending Review
- CT | Compliant
- DE | Compliant
:::`;

export const USMap: StoryObj = {
  render: () => <CamlShowcase source={usMapSource} />,
};

// ---------------------------------------------------------------------------
// US Map (Heatmap)
// ---------------------------------------------------------------------------

const usMapHeatmapSource = `::: map {type: us, mode: heatmap, low: #dbeafe, high: #1e3a8a}
- CA | 1247
- NY | 892
- TX | 634
- FL | 421
- IL | 387
- PA | 312
- OH | 278
- GA | 245
- NC | 198
- MI | 167
:::`;

export const USMapHeatmap: StoryObj = {
  render: () => <CamlShowcase source={usMapHeatmapSource} />,
};

// ---------------------------------------------------------------------------
// US Map with Counts and Links
// ---------------------------------------------------------------------------

const usMapWithCountsSource = `::: map {type: us}
legend:
- Compliant | #0f766e
- Non-compliant | #dc2626

- CA | Compliant | 247
- NY | Compliant | 189 | /c/legal/new-york
- TX | Non-compliant | 56 | /c/legal/texas
- FL | Compliant | 134
:::`;

export const USMapWithCounts: StoryObj = {
  render: () => <CamlShowcase source={usMapWithCountsSource} />,
};

// ---------------------------------------------------------------------------
// Case History
// ---------------------------------------------------------------------------

const caseHistorySource = `::: case-history

title: SEC v. Meridian Capital Partners LLC
docket: No. 22-cv-04817 (S.D.N.Y.)
status: Affirmed

- District Court | S.D.N.Y. | 2022-06-10 | SEC Motion for Temporary Restraining Order | Granted
  Court issued TRO freezing defendant's assets pending investigation into alleged securities fraud under Section 10(b) and Rule 10b-5.

- District Court | S.D.N.Y. | 2022-09-22 | Defendant's Motion to Dismiss | Denied
  Judge Chen found that the SEC adequately pleaded scienter through circumstantial evidence of insider trading patterns.

- District Court | S.D.N.Y. | 2023-03-15 | Cross-Motions for Summary Judgment | Granted in Part
  Partial summary judgment for SEC on liability. Disgorgement amount and civil penalties reserved for trial.

- Court of Appeals | 2nd Circuit | 2023-11-08 | Interlocutory Appeal on Disgorgement | Affirmed
  Panel (3-0) held that disgorgement calculation properly followed Liu v. SEC, 591 U.S. 71 (2020). No abuse of discretion in asset freeze scope.

- Supreme Court | SCOTUS | 2024-03-25 | Petition for Certiorari | Cert Denied
  Cert petition denied without comment. Justice Thomas noted dissent from denial.

:::`;

export const CaseHistory: StoryObj = {
  render: () => <CamlShowcase source={caseHistorySource} />,
};

// ---------------------------------------------------------------------------
// Extract Embed
// ---------------------------------------------------------------------------

const extractEmbedSource = `::: extract-embed {ref: @extract:e1f3, columns: Clause|Type|Risk Level}
:::`;

export const ExtractEmbed: StoryObj = {
  render: () => <CamlShowcase source={extractEmbedSource} />,
};

// ---------------------------------------------------------------------------
// Custom Blocks (via customBlocks prop)
// ---------------------------------------------------------------------------

const customBlocksSource = `::: chapter {#custom-demo}
## Custom Block Types

This chapter demonstrates the customBlocks render prop.

:::: citation-chip {query: "force majeure pandemic", style: inline}
::::

:::: live-indicator {status: active, service: contract-analysis}
::::

:::: data-grid {ref: grid-001, columns: Name|Date|Status|Action}
Row data would go here, parsed by the host app.
::::

:::`;

function CustomBlocksDemo() {
  const parsed = useMemo(() => parseCaml(customBlocksSource), []);

  return (
    <CamlThemeProvider>
      <CamlArticle
        document={parsed}
        customBlocks={{
          "citation-chip": (block) => {
            const b = block as CamlUnknownBlock;
            return (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  color: "#166534",
                  margin: "1rem 0",
                }}
              >
                <span style={{ fontSize: "1rem" }}>&#128269;</span>
                <span>AI Citation: &ldquo;{b.attrs.query}&rdquo;</span>
                <span
                  style={{
                    background: "#16a34a",
                    color: "white",
                    padding: "0.125rem 0.5rem",
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                  }}
                >
                  {b.attrs.style}
                </span>
              </div>
            );
          },
          "live-indicator": (block) => {
            const b = block as CamlUnknownBlock;
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.75rem 1.25rem",
                  background: "#fefce8",
                  border: "1px solid #fde68a",
                  borderRadius: "0.5rem",
                  margin: "1rem 0",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: b.attrs.status === "active" ? "#22c55e" : "#94a3b8",
                    boxShadow:
                      b.attrs.status === "active"
                        ? "0 0 6px #22c55e"
                        : "none",
                  }}
                />
                <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                  {b.attrs.service}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  {b.attrs.status}
                </span>
              </div>
            );
          },
          "data-grid": (block) => {
            const b = block as CamlUnknownBlock;
            const columns = b.attrs.columns?.split("|") ?? [];
            return (
              <div
                style={{
                  margin: "1rem 0",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "0.5rem 1rem",
                    background: "#f1f5f9",
                    borderBottom: "1px solid #e2e8f0",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#475569",
                    textTransform: "uppercase",
                    gap: "1rem",
                  }}
                >
                  {columns.map((col, i) => (
                    <span key={i} style={{ flex: 1 }}>
                      {col}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    padding: "1rem",
                    fontSize: "0.8125rem",
                    color: "#64748b",
                    fontStyle: "italic",
                  }}
                >
                  Data grid ref: {b.attrs.ref} &mdash; {b.body.trim() || "No rows"}
                </div>
              </div>
            );
          },
        }}
      />
    </CamlThemeProvider>
  );
}

export const CustomBlocks: StoryObj = {
  render: () => <CustomBlocksDemo />,
};
