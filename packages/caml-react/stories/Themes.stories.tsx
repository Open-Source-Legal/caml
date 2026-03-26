import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlShowcase } from "./CamlShowcase";

const meta: Meta = {
  title: "CAML/Themes",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

// ---------------------------------------------------------------------------
// Dark Chapter
// ---------------------------------------------------------------------------

const darkChapterSource = `::: chapter {#regulatory-landscape, theme: dark}
>! Section 02
## Regulatory Landscape

The regulatory environment continues to evolve rapidly. Our monitoring
systems tracked **47 significant regulatory changes** across monitored
jurisdictions in 2024 alone.

Key areas of regulatory activity include digital asset classification,
AI governance frameworks, and cross-border data transfer mechanisms.
Organizations must maintain adaptive compliance programs to keep pace.

>>> "Organizations that implemented automated contract monitoring reduced
their compliance violations by 73% compared to those relying on manual
review processes."
:::`;

export const DarkChapter: StoryObj = {
  render: () => <CamlShowcase source={darkChapterSource} />,
};

// ---------------------------------------------------------------------------
// Gradient
// ---------------------------------------------------------------------------

const gradientSource = `::: chapter {#cta-section, gradient: true, centered: true}
## Ready to Transform Your Contract Analysis?

Join leading legal teams using AI-powered document analytics to reduce
review time by 60% and improve compliance accuracy.
:::`;

export const Gradient: StoryObj = {
  render: () => <CamlShowcase source={gradientSource} />,
};

// ---------------------------------------------------------------------------
// Centered
// ---------------------------------------------------------------------------

const centeredSource = `::: chapter {#centered-section, centered: true}
>! Our Approach
## AI-Powered Contract Intelligence

We combine **natural language processing** with domain-specific legal
ontologies to deliver contract analysis that understands context, not
just keywords.

Our models are trained on millions of legal documents across dozens
of practice areas. The result is extraction accuracy that matches
experienced attorneys at a fraction of the time and cost.
:::`;

export const Centered: StoryObj = {
  render: () => <CamlShowcase source={centeredSource} />,
};
