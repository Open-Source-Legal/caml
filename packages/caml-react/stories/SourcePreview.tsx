/**
 * SourcePreview -- Collapsible CAML source panel for Storybook stories.
 *
 * Wraps a story with an expandable code block showing the raw CAML markup
 * that would produce the rendered output below. This helps visitors
 * understand the CAML syntax by example.
 */
import React, { useState } from "react";

interface SourcePreviewProps {
  /** The raw CAML markup source string. */
  source: string;
  /** The rendered story content. */
  children: React.ReactNode;
}

const containerStyle: React.CSSProperties = {
  width: "100%",
};

const toggleButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 1rem",
  margin: "0.75rem 1rem",
  background: "#1e293b",
  color: "#94a3b8",
  border: "1px solid #334155",
  borderRadius: "6px",
  fontSize: "0.8125rem",
  fontWeight: 600,
  fontFamily:
    '"SF Mono", "Fira Code", "Cascadia Code", Menlo, Monaco, monospace',
  cursor: "pointer",
  transition: "all 0.15s",
  letterSpacing: "0.02em",
};

const codeBlockStyle: React.CSSProperties = {
  margin: "0 1rem 1rem",
  padding: "1.25rem",
  background: "#0f172a",
  border: "1px solid #1e3a5f",
  borderRadius: "8px",
  overflow: "auto",
  maxHeight: "500px",
};

const preStyle: React.CSSProperties = {
  margin: 0,
  fontFamily:
    '"SF Mono", "Fira Code", "Cascadia Code", Menlo, Monaco, monospace',
  fontSize: "0.8125rem",
  lineHeight: 1.7,
  color: "#e2e8f0",
  whiteSpace: "pre",
  tabSize: 2,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.375rem 0.75rem",
  marginBottom: "0.75rem",
  fontSize: "0.6875rem",
  fontWeight: 600,
  color: "#64748b",
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  borderBottom: "1px solid #1e3a5f",
  paddingBottom: "0.75rem",
};

const dotStyle: React.CSSProperties = {
  display: "inline-block",
  width: "6px",
  height: "6px",
  borderRadius: "50%",
  background: "#5eead4",
};

export const SourcePreview: React.FC<SourcePreviewProps> = ({
  source,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={containerStyle}>
      <div>
        <button
          type="button"
          style={toggleButtonStyle}
          onClick={() => setExpanded((v) => !v)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#334155";
            e.currentTarget.style.color = "#e2e8f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1e293b";
            e.currentTarget.style.color = "#94a3b8";
          }}
        >
          {expanded ? "\u25BC" : "\u25B6"} View CAML Source
        </button>

        {expanded && (
          <div style={codeBlockStyle}>
            <div style={labelStyle}>
              <span style={dotStyle} />
              CAML Source
            </div>
            <pre style={preStyle}>{source.trim()}</pre>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};
