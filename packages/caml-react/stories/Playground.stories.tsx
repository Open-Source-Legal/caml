import React, { useState, useMemo } from "react";
import type { Meta } from "@storybook/react";
import { parseCaml } from "@os-legal/caml";
import type { CamlDocument } from "@os-legal/caml";
import { CamlArticle } from "../src/CamlArticle";
import { CamlThemeProvider } from "../src/CamlThemeProvider";
import styled from "styled-components";

// ---------------------------------------------------------------------------
// Default CAML source — demonstrates every block type with legal content
// ---------------------------------------------------------------------------

const DEFAULT_SOURCE = `---
version: "1.0"

hero:
  kicker: "Open Source Legal \u00b7 Annual Review"
  title:
    - "Contract Analysis"
    - "{2024 Insights}"
  subtitle: >
    A comprehensive review of contract patterns, regulatory changes,
    and compliance trends across 500+ analyzed documents.
  stats:
    - "500+ documents analyzed"
    - "12 jurisdictions covered"
    - "98.5% accuracy rate"

footer:
  nav:
    - label: "Methodology"
      href: "https://example.com/methodology"
    - label: "Full Dataset"
      href: "https://example.com/data"
  notice: "\u00a9 2024 Open Source Legal Project. Published under CC BY 4.0."
---

::: chapter {#executive-summary, theme: dark}
>! Executive Summary
## Key Findings

Our analysis of 500+ commercial contracts reveals significant shifts
in force majeure clauses, data protection provisions, and liability
limitations following recent regulatory changes.

>>> "The most significant trend is the 340% increase in AI-specific liability clauses compared to 2023."

::: pills
- 500+ | **Documents** | Analyzed across 12 jurisdictions
  status: Complete | #0f766e
- 340% | **AI Clauses** | Year-over-year increase
  status: Trending | #dc2626
- 98.5% | **Accuracy** | Extraction confidence score
  status: Verified | #2563eb
:::

:::

::: chapter {#clause-analysis}
>! Section 1
## Clause Distribution

Analysis of clause types across the document corpus reveals concentration
in three primary categories.

::: cards {columns: 3}
- **Force Majeure** | 89% of contracts | #0f766e
  Updated language addressing pandemic, cyber events, and supply chain disruption.
  ~ Source: Clause Database v4.2

- **Data Protection** | 94% of contracts | #2563eb
  GDPR, CCPA, and emerging AI regulation compliance provisions.
  ~ Source: Regulatory Tracker

- **Liability Caps** | 76% of contracts | #dc2626
  Increased adoption of tiered liability with carve-outs for IP and data breach.
  ~ Source: Risk Assessment Module
:::

::: tabs
:::: tab {label: "North America", status: Active, color: #0f766e}
#### CCPA Compliance {highlight}
California Consumer Privacy Act provisions found in 92% of
US-based contracts, up from 78% in 2023.

#### Standard Clauses
Most contracts follow the ACC model clause framework with
jurisdiction-specific modifications.

\u00a7 ACC Model Clauses v3.1
\u00a7 State AG Enforcement Database
::::

:::: tab {label: "European Union", status: Review, color: #2563eb}
#### GDPR Article 28
Data processing agreements show increased specificity around
cross-border transfer mechanisms post-Schrems II.

#### AI Act Provisions
Early adoption of AI Act compliance clauses in 23% of
technology contracts.

\u00a7 EU DPA Guidelines 2024
\u00a7 AI Act Impact Assessment
::::
:::

:::

::: chapter {#timeline-section}
>! Section 2
## Regulatory Timeline

::: timeline
legend:
- Privacy | #2563eb
- AI Regulation | #dc2626
- Contract Law | #0f766e

- Jan 2024 | EU AI Act final text adopted | AI Regulation
- Mar 2024 | CCPA enforcement actions surge | Privacy
- Jun 2024 | Model AI clauses published by ABA | AI Regulation
- Sep 2024 | Cross-border data framework updated | Privacy
- Nov 2024 | UCC Article 12 (digital assets) effective | Contract Law
:::

::: cta
- [View Full Report](https://example.com/report) {primary}
- [Download Dataset](https://example.com/data)
:::

:::
`;

// ---------------------------------------------------------------------------
// Styled components for the playground layout
// ---------------------------------------------------------------------------

const PlaygroundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background: #0f172a;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1.25rem;
  background: #0f172a;
  border-bottom: 1px solid #1e3a5f;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h1`
  font-size: 0.9375rem;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HeaderBadge = styled.span`
  font-size: 0.625rem;
  font-weight: 600;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background: rgba(15, 118, 110, 0.2);
  color: #5eead4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const HeaderHelp = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

const SplitPane = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const EditorPane = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  background: #1e293b;
  border-right: 1px solid #334155;
`;

const EditorLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: #1e293b;
  border-bottom: 1px solid #334155;
  flex-shrink: 0;
`;

const EditorLabelText = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

const EditorTextarea = styled.textarea`
  flex: 1;
  width: 100%;
  padding: 1rem;
  background: #0f172a;
  color: #e2e8f0;
  font-family: "SF Mono", "Fira Code", "Cascadia Code", Menlo, Monaco,
    "Courier New", monospace;
  font-size: 0.8125rem;
  line-height: 1.7;
  border: none;
  outline: none;
  resize: none;
  tab-size: 2;

  &::selection {
    background: rgba(15, 118, 110, 0.4);
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #0f172a;
  }

  &::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #475569;
  }
`;

const PreviewPane = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  background: white;
`;

const PreviewLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  flex-shrink: 0;
`;

const PreviewLabelText = styled.span`
  font-size: 0.6875rem;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

const PreviewStatusDot = styled.span<{ $error?: boolean }>`
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $error }) => ($error ? "#ef4444" : "#22c55e")};
  margin-right: 0.375rem;
`;

const PreviewStatus = styled.span<{ $error?: boolean }>`
  display: inline-flex;
  align-items: center;
  font-size: 0.6875rem;
  font-weight: 500;
  color: ${({ $error }) => ($error ? "#ef4444" : "#94a3b8")};
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

const PreviewScroll = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f8fafc;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const ErrorCard = styled.div`
  max-width: 480px;
  width: 100%;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #fecaca;
  background: #fef2f2;
`;

const ErrorTitle = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  color: #991b1b;
  margin: 0 0 0.75rem;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

const ErrorMessage = styled.pre`
  font-size: 0.8125rem;
  font-family: "SF Mono", "Fira Code", Menlo, Monaco, "Courier New", monospace;
  color: #dc2626;
  background: #fff5f5;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #fecaca;
  white-space: pre-wrap;
  word-break: break-word;
  margin: 0;
  line-height: 1.5;
`;

const ErrorHint = styled.p`
  font-size: 0.75rem;
  color: #b91c1c;
  margin: 0.75rem 0 0;
  line-height: 1.5;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
`;

// ---------------------------------------------------------------------------
// CamlPlayground component
// ---------------------------------------------------------------------------

type ParseResult =
  | { ok: true; document: CamlDocument }
  | { ok: false; error: string };

function CamlPlayground() {
  const [source, setSource] = useState(DEFAULT_SOURCE);

  const result: ParseResult = useMemo(() => {
    try {
      const document = parseCaml(source);
      return { ok: true, document };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown parse error";
      return { ok: false, error: message };
    }
  }, [source]);

  return (
    <PlaygroundWrapper>
      <Header>
        <HeaderTitle>
          CAML Playground <HeaderBadge>Live</HeaderBadge>
        </HeaderTitle>
        <HeaderHelp>
          Edit the source on the left to see a live preview on the right
        </HeaderHelp>
      </Header>
      <SplitPane>
        <EditorPane>
          <EditorLabel>
            <EditorLabelText>Source</EditorLabelText>
            <EditorLabelText>
              {source.split("\n").length} lines
            </EditorLabelText>
          </EditorLabel>
          <EditorTextarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </EditorPane>
        <PreviewPane>
          <PreviewLabel>
            <PreviewLabelText>Preview</PreviewLabelText>
            <PreviewStatus $error={!result.ok}>
              <PreviewStatusDot $error={!result.ok} />
              {result.ok ? "Parsed" : "Error"}
            </PreviewStatus>
          </PreviewLabel>
          <PreviewScroll>
            {result.ok ? (
              <CamlThemeProvider>
                <CamlArticle document={result.document} />
              </CamlThemeProvider>
            ) : (
              <ErrorContainer>
                <ErrorCard>
                  <ErrorTitle>Parse Error</ErrorTitle>
                  <ErrorMessage>{result.error}</ErrorMessage>
                  <ErrorHint>
                    Check the CAML source for syntax issues. Common causes
                    include unclosed ::: blocks, malformed frontmatter YAML, or
                    mismatched indentation.
                  </ErrorHint>
                </ErrorCard>
              </ErrorContainer>
            )}
          </PreviewScroll>
        </PreviewPane>
      </SplitPane>
    </PlaygroundWrapper>
  );
}

// ---------------------------------------------------------------------------
// Storybook meta & stories
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: "CAML/Playground",
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
};

export default meta;

export const Default = {
  render: () => <CamlPlayground />,
};
