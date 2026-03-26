import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlShowcase } from "./CamlShowcase";

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
