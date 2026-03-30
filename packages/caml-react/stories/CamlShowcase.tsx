import React, { useMemo } from "react";
import type { ReactNode } from "react";
import { parseCaml } from "@os-legal/caml";
import type { CamlInlineDirective } from "@os-legal/caml";
import { CamlArticle } from "../src/CamlArticle";
import { CamlThemeProvider } from "../src/CamlThemeProvider";

interface CamlShowcaseProps {
  /** Raw CAML source string */
  source: string;
  /** Optional stats for corpus-stats blocks */
  stats?: Record<string, number>;
  /** Optional directive renderer */
  renderDirective?: (directive: CamlInlineDirective) => ReactNode;
}

export function CamlShowcase({ source, stats, renderDirective }: CamlShowcaseProps) {
  const parsed = useMemo(() => {
    try {
      return parseCaml(source);
    } catch (e) {
      return null;
    }
  }, [source]);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Source pane */}
      <div
        style={{
          flex: "0 0 45%",
          background: "#0f172a",
          color: "#e2e8f0",
          overflow: "auto",
          borderRight: "2px solid #1e293b",
        }}
      >
        <div
          style={{
            padding: "1rem 1.25rem",
            borderBottom: "1px solid #1e3a5f",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#5eead4",
            }}
          />
          CAML Source
        </div>
        <pre
          style={{
            margin: 0,
            padding: "1.25rem",
            fontFamily: '"SF Mono", "Fira Code", Menlo, monospace',
            fontSize: "0.8125rem",
            lineHeight: 1.7,
            whiteSpace: "pre",
            tabSize: 2,
          }}
        >
          {source.trim()}
        </pre>
      </div>

      {/* Render pane */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          background: "white",
        }}
      >
        <div
          style={{
            padding: "1rem 1.25rem",
            borderBottom: "1px solid #e2e8f0",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "#64748b",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#0f766e",
            }}
          />
          Rendered Output
        </div>
        <CamlThemeProvider>
          {parsed ? (
            <CamlArticle
              document={parsed}
              stats={stats}
              renderDirective={renderDirective}
            />
          ) : (
            <div style={{ padding: "2rem", color: "#dc2626" }}>
              Parse error — check CAML source syntax
            </div>
          )}
        </CamlThemeProvider>
      </div>
    </div>
  );
}
