import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlThemeProvider } from "../src/CamlThemeProvider";
import { CamlArticle } from "../src/CamlArticle";
import { minimalDocument, sampleStats } from "./fixtures";
import type { CamlDocument } from "@os-legal/caml";

/**
 * Wraps CamlArticle with a custom CamlThemeProvider so we can
 * demonstrate theme overrides. The preview decorator provides the
 * default theme; this story overrides it with a nested provider.
 */
function ThemedArticle({
  document,
  accentColor,
  accentHoverColor,
  accentAlpha,
}: {
  document: CamlDocument;
  accentColor: string;
  accentHoverColor: string;
  accentAlpha: (opacity: number) => string;
}) {
  return (
    <CamlThemeProvider
      theme={{
        colors: {
          accent: accentColor,
          accentHover: accentHoverColor,
        },
        accentAlpha,
      }}
    >
      <CamlArticle document={document} stats={sampleStats} />
    </CamlThemeProvider>
  );
}

const themedDocument: CamlDocument = {
  frontmatter: {
    hero: {
      kicker: "Theme Preview",
      title: ["Contract Intelligence", "{Custom Branded}"],
      subtitle:
        "This article demonstrates theme customization with accent color overrides.",
      stats: ["Custom theme", "Branded colors"],
    },
    footer: {
      notice: "Theme customization example. Colors are fully configurable.",
    },
  },
  chapters: [
    {
      id: "demo",
      kicker: "Preview",
      title: "Themed Components",
      blocks: [
        {
          type: "prose",
          content:
            "The accent color flows through all interactive elements: **links**, **pill status badges**, **tab indicators**, and **CTA buttons**. Override any theme token to match your brand.",
        },
        {
          type: "pills",
          items: [
            {
              bigText: "42",
              label: "Active Contracts",
              status: "Monitored",
              statusColor: "currentColor",
            },
            {
              bigText: "98%",
              label: "Compliance Score",
              status: "Excellent",
              statusColor: "currentColor",
            },
          ],
        },
        {
          type: "cta",
          items: [
            { label: "Primary Action", href: "#primary", primary: true },
            { label: "Secondary Action", href: "#secondary" },
          ],
        },
      ],
    },
  ],
};

const meta: Meta<typeof ThemedArticle> = {
  title: "Theme Customization",
  component: ThemedArticle,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    accentColor: {
      control: "color",
      description: "Primary accent color used across all components",
    },
    accentHoverColor: {
      control: "color",
      description: "Hover state for accent-colored elements",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemedArticle>;

export const DefaultTheme: Story = {
  args: {
    document: themedDocument,
    accentColor: "#0f766e",
    accentHoverColor: "#0d6860",
    accentAlpha: (opacity: number) => `rgba(15, 118, 110, ${opacity})`,
  },
};

export const BlueTheme: Story = {
  args: {
    document: themedDocument,
    accentColor: "#2563eb",
    accentHoverColor: "#1d4ed8",
    accentAlpha: (opacity: number) => `rgba(37, 99, 235, ${opacity})`,
  },
};

export const PurpleTheme: Story = {
  args: {
    document: themedDocument,
    accentColor: "#7c3aed",
    accentHoverColor: "#6d28d9",
    accentAlpha: (opacity: number) => `rgba(124, 58, 237, ${opacity})`,
  },
};

export const WarmTheme: Story = {
  args: {
    document: themedDocument,
    accentColor: "#ea580c",
    accentHoverColor: "#c2410c",
    accentAlpha: (opacity: number) => `rgba(234, 88, 12, ${opacity})`,
  },
};
