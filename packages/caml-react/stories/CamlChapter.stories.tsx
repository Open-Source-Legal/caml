import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlChapterRenderer } from "../src/CamlChapter";
import { proseBlock, cardsBlock, timelineBlock } from "./fixtures";

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
