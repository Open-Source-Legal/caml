import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlBlockRenderer } from "../src/CamlBlocks";
import {
  proseBlock,
  cardsBlock,
  pillsBlock,
  tabsBlock,
  timelineBlock,
  ctaBlock,
  signupBlock,
  corpusStatsBlock,
  sampleStats,
} from "./fixtures";
import { SourcePreview } from "./SourcePreview";

const meta: Meta<typeof CamlBlockRenderer> = {
  title: "Blocks",
  component: CamlBlockRenderer,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof CamlBlockRenderer>;

export const Prose: Story = {
  args: {
    block: proseBlock,
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`Our analysis of **1,247 commercial contracts** across 14 jurisdictions
reveals significant patterns in force majeure clause adoption following
the 2020 pandemic.

>>> "Contracts executed after March 2020 were 3.4x more likely to include
pandemic-specific force majeure language than pre-pandemic agreements."

The data shows a clear inflection point in Q2 2020, with adoption rates
stabilizing at approximately 78% by Q4 2021. Notably, contracts in the
**financial services** and **healthcare** sectors led this trend, while
**real estate** agreements showed the slowest adoption curve.`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const ProseDark: Story = {
  name: "Prose (Dark)",
  args: {
    block: {
      type: "prose",
      content: `The enforcement landscape shifted dramatically in 2024. Regulatory bodies across **major financial centers** issued a combined 156 enforcement actions related to contractual non-compliance.

>>> "Organizations that implemented automated contract monitoring reduced their compliance violations by 73% compared to those relying on manual review processes."

This underscores the critical importance of proactive compliance infrastructure.`,
    },
    dark: true,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a, #1e293b)",
          padding: "2rem",
          minHeight: "300px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Cards: Story = {
  args: {
    block: cardsBlock,
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: cards {columns: 3}
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
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const CardsTwoColumn: Story = {
  name: "Cards (Two Column)",
  args: {
    block: {
      type: "cards",
      columns: 2,
      items: [
        {
          label: "Data Processing Agreements",
          meta: "GDPR Article 28",
          accent: "#2563eb",
          body: "Standard contractual clauses reviewed for adequacy. 14 agreements flagged for missing sub-processor notification requirements.",
          footer: "89% compliant",
        },
        {
          label: "Cross-Border Transfers",
          meta: "Schrems II Impact",
          accent: "#dc2626",
          body: "Transfer impact assessments completed for all EU-US data flows. Supplementary measures documented for 8 high-risk transfers.",
          footer: "Action required for 3 transfers",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: cards {columns: 2}
- **Data Processing Agreements** | GDPR Article 28 | #2563eb
  Standard contractual clauses reviewed for adequacy. 14 agreements
  flagged for missing sub-processor notification requirements.
  ~ 89% compliant

- **Cross-Border Transfers** | Schrems II Impact | #dc2626
  Transfer impact assessments completed for all EU-US data flows.
  Supplementary measures documented for 8 high-risk transfers.
  ~ Action required for 3 transfers
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const Pills: Story = {
  args: {
    block: pillsBlock,
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: pills
- 247 | **Documents Reviewed** | Q4 2024
  status: Complete | #16a34a
- 94% | **Compliance Rate** | Across all jurisdictions
  status: Above Target | #0f766e
- 12 | **Critical Findings** | Requires remediation
  status: Action Required | #dc2626
- 3.2d | **Avg. Review Time** | Per document
  status: On Track | #2563eb
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const Tabs: Story = {
  args: {
    block: tabsBlock,
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: tabs
:::: tab {label: "North America", status: "94% compliant", color: #0f766e}
#### United States {highlight}
Federal regulations analyzed across **SEC**, **CFPB**, and **OCC**
frameworks. State-level variations identified in Delaware, New York,
and California corporate governance requirements.

#### Canada
Provincial securities commissions reviewed. Notable divergence in
Quebec civil law treatment of contractual obligations.

\u00a7 SEC EDGAR
\u00a7 CFPB Regulations
\u00a7 CSA National Instruments
::::

:::: tab {label: "European Union", status: "87% compliant", color: #7c3aed}
#### GDPR Impact on Contracts {highlight}
Data processing agreements reviewed for **Article 28** compliance.

#### MiFID II Obligations
Investment services agreements analyzed for best execution policies.

\u00a7 EUR-Lex
\u00a7 ESMA Guidelines
\u00a7 EDPB Opinions
::::

:::: tab {label: "Asia-Pacific", status: "In Progress", color: #ea580c}
#### Cross-Border Considerations
Analysis of bilateral investment treaties and free trade agreement
provisions affecting contract enforcement across APAC jurisdictions.

\u00a7 HKEX Listing Rules
\u00a7 ASIC Regulatory Guides
::::
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const Timeline: Story = {
  args: {
    block: timelineBlock,
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: timeline
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
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const CTA: Story = {
  args: {
    block: ctaBlock,
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: cta
- [View Full Report](#report) {primary}
- [Download Summary](#download)
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const CTASingleButton: Story = {
  name: "CTA (Single Button)",
  args: {
    block: {
      type: "cta",
      items: [
        {
          label: "Request Access to Full Analysis",
          href: "#request",
          primary: true,
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: cta
- [Request Access to Full Analysis](#request) {primary}
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const Signup: Story = {
  args: {
    block: signupBlock,
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: signup
title: Stay Informed
body: >
  Get weekly regulatory updates and contract analysis insights
  delivered to your inbox.
button: Subscribe to Updates
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const CorpusStats: Story = {
  args: {
    block: corpusStatsBlock,
    stats: sampleStats,
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: corpus-stats
- documents | Documents
- annotations | Annotations
- contributors | Contributors
- threads | Discussion Threads
:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const CorpusStatsNoData: Story = {
  name: "Corpus Stats (No Data)",
  args: {
    block: corpusStatsBlock,
  },
};
