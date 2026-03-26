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
};

export const Pills: Story = {
  args: {
    block: pillsBlock,
  },
};

export const Tabs: Story = {
  args: {
    block: tabsBlock,
  },
};

export const Timeline: Story = {
  args: {
    block: timelineBlock,
  },
};

export const CTA: Story = {
  args: {
    block: ctaBlock,
  },
};

export const CTASingleButton: Story = {
  name: "CTA (Single Button)",
  args: {
    block: {
      type: "cta",
      items: [
        { label: "Request Access to Full Analysis", href: "#request", primary: true },
      ],
    },
  },
};

export const Signup: Story = {
  args: {
    block: signupBlock,
  },
};

export const CorpusStats: Story = {
  args: {
    block: corpusStatsBlock,
    stats: sampleStats,
  },
};

export const CorpusStatsNoData: Story = {
  name: "Corpus Stats (No Data)",
  args: {
    block: corpusStatsBlock,
  },
};
