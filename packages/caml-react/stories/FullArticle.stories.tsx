import React, { useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlShowcase } from "./CamlShowcase";
import { parseCaml } from "@os-legal/caml";
import type { CamlUnknownBlock } from "@os-legal/caml";
import { CamlArticle } from "../src/CamlArticle";
import { CamlThemeProvider } from "../src/CamlThemeProvider";

const fullArticleSource = `---
version: "1"
site: OpenContracts

hero:
  kicker: "Annual Compliance Report"
  title:
    - "Regulatory Compliance Analysis"
    - "{2024 Annual Review}"
  subtitle: >
    A comprehensive review of contract compliance across 14 jurisdictions,
    covering 1,247 commercial agreements.
  stats:
    - "1,247 contracts analyzed"
    - "14 jurisdictions covered"
    - "94% compliance rate"

footer:
  nav:
    - label: Documentation
      href: https://docs.example.com
    - label: GitHub
      href: https://github.com/example/opencontracts
    - label: Support
      href: https://support.example.com
  notice: >
    Copyright 2024 OpenContracts. All rights reserved. This report is
    generated from automated contract analysis and should be reviewed
    by qualified legal counsel.
---

::: chapter {#overview}
>! Section 01
## Executive Overview

Our analysis of **1,247 commercial contracts** across 14 jurisdictions
reveals significant patterns in force majeure clause adoption following
the 2020 pandemic.

>>> "Contracts executed after March 2020 were 3.4x more likely to include
pandemic-specific force majeure language than pre-pandemic agreements."

The data shows a clear inflection point in Q2 2020, with adoption rates
stabilizing at approximately 78% by Q4 2021. Notably, contracts in the
**financial services** and **healthcare** sectors led this trend, while
**real estate** agreements showed the slowest adoption curve.

:::: pills
- 247 | **Documents Reviewed** | Q4 2024
  status: Complete | #16a34a
- 94% | **Compliance Rate** | Across all jurisdictions
  status: Above Target | #0f766e
- 12 | **Critical Findings** | Requires remediation
  status: Action Required | #dc2626
- 3.2d | **Avg. Review Time** | Per document
  status: On Track | #2563eb
::::

:::

::: chapter {#analysis}
>! Section 02
## Clause Analysis

:::: cards {columns: 3}
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
::::

:::: tabs
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
::::

:::

::: chapter {#regulatory-landscape, theme: dark}
>! Section 03
## Regulatory Landscape

The regulatory environment continues to evolve rapidly. Our monitoring
systems tracked **47 significant regulatory changes** across monitored
jurisdictions in 2024 alone.

Key areas of regulatory activity include digital asset classification,
AI governance frameworks, and cross-border data transfer mechanisms.
Organizations must maintain adaptive compliance programs to keep pace.

:::: timeline
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
::::

:::

::: chapter {#metrics}
>! Section 04
## Corpus Metrics

:::: corpus-stats
- documents | Documents
- annotations | Annotations
- contributors | Contributors
- threads | Discussion Threads
::::

:::: extract-embed {ref: @extract:compliance-summary, columns: Clause|Count|Rate}
::::

:::: signup
title: Stay Informed
button: Subscribe to Updates
Get weekly regulatory updates and contract analysis insights
delivered to your inbox.
::::

:::

::: chapter {#cta-section, gradient: true, centered: true}
## Ready to Transform Your Contract Analysis?

Join leading legal teams using AI-powered document analytics to reduce
review time by 60% and improve compliance accuracy.

:::: cta
- [View Full Report](#report) {primary}
- [Download Summary](#download)
::::

:::`;

const sampleStats = {
  documents: 1247,
  annotations: 8934,
  contributors: 23,
  threads: 156,
};

const meta: Meta = {
  title: "CAML/Full Article",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => <CamlShowcase source={fullArticleSource} stats={sampleStats} />,
};

// ---------------------------------------------------------------------------
// Full Article with customBlocks
// ---------------------------------------------------------------------------

const fullArticleWithCustomBlocksSource = `---
version: "1"
site: OpenContracts
hero:
  kicker: "Custom Blocks Demo"
  title:
    - "Full Article with"
    - "{Custom Block Types}"
  subtitle: >
    Demonstrates how host applications can register renderers for
    arbitrary block types using the customBlocks prop.
---

::: chapter {#overview}
>! Section 01
## Overview

This article uses both built-in and custom block types.

:::: pills
- 3 | **Custom Block Types** | Registered via customBlocks
  status: Active | #16a34a
- 100% | **Backward Compat** | renderAnnotationEmbed still works
  status: Verified | #0f766e
::::

:::

::: chapter {#custom}
>! Section 02
## Custom Blocks in Action

:::: citation-chip {query: "force majeure pandemic", confidence: 0.94}
::::

:::: extract-embed {ref: @extract:demo-grid}
::::

:::: live-dashboard {service: contract-analysis, region: us-east}
Active workers: 12
Queue depth: 347
::::

:::

::: chapter {#cta, gradient: true, centered: true}
## Try Custom Blocks

Build your own block types without modifying the CAML parser.

:::: cta
- [View Documentation](#docs) {primary}
- [View Source](#source)
::::

:::`;

function FullArticleWithCustomBlocks() {
  const parsed = useMemo(
    () => parseCaml(fullArticleWithCustomBlocksSource),
    []
  );

  return (
    <CamlThemeProvider>
      <CamlArticle
        document={parsed}
        stats={sampleStats}
        customBlocks={{
          "citation-chip": (block) => {
            const b = block as CamlUnknownBlock;
            return (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  borderRadius: "999px",
                  fontSize: "0.875rem",
                  color: "#166534",
                  margin: "1rem 0",
                }}
              >
                AI Citation: &ldquo;{b.attrs.query}&rdquo; (confidence:{" "}
                {b.attrs.confidence})
              </div>
            );
          },
          "extract-embed": (block) => {
            const b = block as { ref: string; columns?: string[] };
            return (
              <div
                style={{
                  margin: "1rem 0",
                  padding: "1rem",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "0.5rem",
                  fontSize: "0.875rem",
                  color: "#475569",
                }}
              >
                Extract Embed: <strong>{b.ref}</strong>
                {" — "}
                <em>Data grid would be rendered by the host application</em>
              </div>
            );
          },
          "live-dashboard": (block) => {
            const b = block as CamlUnknownBlock;
            return (
              <div
                style={{
                  margin: "1rem 0",
                  padding: "1rem 1.25rem",
                  background: "#0f172a",
                  borderRadius: "0.5rem",
                  color: "#e2e8f0",
                  fontSize: "0.875rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#22c55e",
                      boxShadow: "0 0 6px #22c55e",
                    }}
                  />
                  <strong>{b.attrs.service}</strong>
                  <span style={{ color: "#64748b", fontSize: "0.75rem" }}>
                    {b.attrs.region}
                  </span>
                </div>
                <pre
                  style={{
                    margin: 0,
                    fontSize: "0.8125rem",
                    color: "#94a3b8",
                  }}
                >
                  {b.body.trim()}
                </pre>
              </div>
            );
          },
        }}
      />
    </CamlThemeProvider>
  );
}

export const WithCustomBlocks: StoryObj = {
  render: () => <FullArticleWithCustomBlocks />,
};
