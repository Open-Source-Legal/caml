import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlHeroRenderer } from "../src/CamlHero";

const meta: Meta<typeof CamlHeroRenderer> = {
  title: "CamlHero",
  component: CamlHeroRenderer,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    hero: { control: "object" },
  },
};

export default meta;
type Story = StoryObj<typeof CamlHeroRenderer>;

export const Default: Story = {
  args: {
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
  },
};

export const Minimal: Story = {
  args: {
    hero: {
      title: ["Contract Analysis Report"],
    },
  },
};

export const MultiLineAccents: Story = {
  args: {
    hero: {
      kicker: "Quarterly Update",
      title: [
        "Force Majeure Clause Adoption",
        "{Post-Pandemic Trends} in",
        "Commercial {Contracts}",
      ],
      subtitle: "Tracking how pandemic-era provisions became standard practice.",
    },
  },
};

export const WithStatsBadges: Story = {
  args: {
    hero: {
      kicker: "Case Law Analysis",
      title: ["{Precedent Tracker}"],
      subtitle:
        "Monitoring landmark decisions affecting contract enforceability across common law jurisdictions.",
      stats: [
        "847 cases indexed",
        "12 circuit courts",
        "Updated weekly",
        "98.2% accuracy",
      ],
    },
  },
};
