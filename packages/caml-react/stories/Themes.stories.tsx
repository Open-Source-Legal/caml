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

const darkChapterSource = `---
hero:
  title:
    - "Dark Theme Chapter"
---

::: chapter {#regulatory-landscape, theme: dark}
>! Section 02
## Regulatory Landscape

The regulatory environment continues to evolve rapidly. Our monitoring
systems tracked **47 significant regulatory changes** across monitored
jurisdictions in 2024 alone.

Key areas of regulatory activity include digital asset classification,
AI governance frameworks, and cross-border data transfer mechanisms.
Organizations must maintain adaptive compliance programs to keep pace.

::: timeline
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
:::

:::`;

export const DarkChapter: StoryObj = {
  render: () => <CamlShowcase source={darkChapterSource} />,
};

// ---------------------------------------------------------------------------
// Gradient
// ---------------------------------------------------------------------------

const gradientSource = `---
hero:
  title:
    - "Gradient Chapter"
---

::: chapter {#cta-section, gradient: true, centered: true}
## Ready to Transform Your Contract Analysis?

Join leading legal teams using AI-powered document analytics to reduce
review time by 60% and improve compliance accuracy.

::: cta
- [Start Free Trial](#trial) {primary}
- [Schedule Demo](#demo)
:::

:::`;

export const Gradient: StoryObj = {
  render: () => <CamlShowcase source={gradientSource} />,
};

// ---------------------------------------------------------------------------
// Centered
// ---------------------------------------------------------------------------

const centeredSource = `---
hero:
  title:
    - "Centered Chapter"
---

::: chapter {#centered-section, centered: true}
>! Our Approach
## AI-Powered Contract Intelligence

We combine **natural language processing** with domain-specific legal
ontologies to deliver contract analysis that understands context, not
just keywords.

Our models are trained on millions of legal documents across dozens
of practice areas. The result is extraction accuracy that matches
experienced attorneys at a fraction of the time and cost.

::: pills
- 98.5% | **Accuracy** | Clause extraction
  status: Verified | #0f766e
- 60% | **Time Saved** | Per document review
  status: Measured | #2563eb
:::

:::`;

export const Centered: StoryObj = {
  render: () => <CamlShowcase source={centeredSource} />,
};
