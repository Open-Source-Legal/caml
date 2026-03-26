import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlChapterRenderer } from "../src/CamlChapter";
import { proseBlock, cardsBlock, timelineBlock } from "./fixtures";
import { SourcePreview } from "./SourcePreview";

const meta: Meta<typeof CamlChapterRenderer> = {
  title: "CamlChapter",
  component: CamlChapterRenderer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    chapter: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof CamlChapterRenderer>;

export const LightTheme: Story = {
  args: {
    chapter: {
      id: "key-findings",
      theme: "light",
      kicker: "Section 01",
      title: "Key Findings",
      blocks: [proseBlock, cardsBlock],
    },
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: chapter {#key-findings}
>! Section 01
## Key Findings

Our analysis of **1,247 commercial contracts** across 14 jurisdictions...

>>> "Contracts executed after March 2020 were 3.4x more likely to include
pandemic-specific force majeure language than pre-pandemic agreements."

::: cards {columns: 3}
- **Indemnification Clauses** | 412 instances | #0f766e
  Mutual indemnification found in 67% of reviewed contracts.
  ~ Avg. cap: 2x contract value

- **Limitation of Liability** | 389 instances | #7c3aed
  Consequential damage exclusions present in 91% of agreements.
  ~ Median cap: $5M

- **Termination for Convenience** | 298 instances | #ea580c
  30-day notice period is the most common term.
  ~ Notice range: 15-90 days
:::

:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const DarkTheme: Story = {
  args: {
    chapter: {
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
    },
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: chapter {#regulatory-landscape, theme: dark}
>! Section 02
## Regulatory Landscape

The regulatory environment continues to evolve rapidly. Our monitoring
systems tracked **47 significant regulatory changes** across monitored
jurisdictions in 2024 alone.

::: timeline
legend:
- regulatory | #0f766e
- enforcement | #dc2626
- guidance | #2563eb

- Jan 2024 | SEC adopts final climate disclosure rules | regulatory
- Mar 2024 | CFPB enforcement action | enforcement
- Jun 2024 | EU AI Act enters into force | regulatory
:::

:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const Gradient: Story = {
  args: {
    chapter: {
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
        {
          type: "cta",
          items: [
            { label: "Start Free Trial", href: "#trial", primary: true },
            { label: "Schedule Demo", href: "#demo" },
          ],
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <SourcePreview
        source={`::: chapter {#cta-section, gradient: true, centered: true}
## Ready to Transform Your Contract Analysis?

Join leading legal teams using AI-powered document analytics to reduce
review time by 60% and improve compliance accuracy.

::: cta
- [Start Free Trial](#trial) {primary}
- [Schedule Demo](#demo)
:::

:::`}
      >
        <Story />
      </SourcePreview>
    ),
  ],
};

export const CenteredLight: Story = {
  name: "Centered (Light)",
  args: {
    chapter: {
      id: "centered-section",
      centered: true,
      kicker: "Our Approach",
      title: "AI-Powered Contract Intelligence",
      blocks: [
        {
          type: "prose",
          content:
            "We combine **natural language processing** with domain-specific legal ontologies to deliver contract analysis that understands context, not just keywords.",
        },
      ],
    },
  },
};

export const NoHeader: Story = {
  name: "No Header (Blocks Only)",
  args: {
    chapter: {
      id: "blocks-only",
      blocks: [proseBlock],
    },
  },
};
