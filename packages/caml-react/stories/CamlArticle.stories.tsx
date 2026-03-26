import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlArticle } from "../src/CamlArticle";
import { fullDocument, emptyDocument, sampleStats } from "./fixtures";

const meta: Meta<typeof CamlArticle> = {
  title: "CamlArticle",
  component: CamlArticle,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CamlArticle>;

export const Default: Story = {
  args: {
    document: fullDocument,
  },
};

export const WithStats: Story = {
  args: {
    document: fullDocument,
    stats: sampleStats,
  },
  argTypes: {
    stats: { control: "object" },
  },
};

export const CustomMarkdownRenderer: Story = {
  args: {
    document: fullDocument,
    renderMarkdown: (content: string) => (
      <div
        style={{
          padding: "1rem",
          border: "2px dashed #94a3b8",
          borderRadius: "8px",
          fontFamily: "monospace",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          color: "#475569",
          background: "#f8fafc",
        }}
      >
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#0f766e",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            marginBottom: "0.5rem",
          }}
        >
          Custom Renderer
        </div>
        <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{content}</pre>
      </div>
    ),
  },
};

export const EmptyDocument: Story = {
  args: {
    document: emptyDocument,
  },
};
