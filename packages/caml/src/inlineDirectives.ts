/**
 * CAML Inline Directives — extraction and scope resolution.
 *
 * Extracts {{@agent scope [key=value ...]}} markers from prose content.
 * Pure function, zero dependencies.
 */

import type { CamlInlineDirective } from "./types";

/**
 * Pattern for inline directives: {{@agent scope [key=value ...]}}
 *
 * - agent: word characters (letters, digits, underscore, hyphen)
 * - scope: sentence | paragraph | block
 * - args: everything between scope and closing }}
 *
 * The args group uses [^}]* (no overlapping quantifiers) to prevent
 * ReDoS. The parseArgs function handles trimming leading whitespace.
 */
const DIRECTIVE_PATTERN =
  /\{\{@([a-zA-Z][a-zA-Z0-9_-]*) +(sentence|paragraph|block)([^}]*)\}\}/g;

/**
 * Parse key=value argument pairs from a directive's argument string.
 *
 * Supports: key=value, key="quoted value", key='quoted value'
 *
 * Uses a manual character-by-character parser instead of regex
 * to avoid ReDoS vulnerabilities on untrusted input.
 */
function parseArgs(raw: string | undefined): Record<string, string> {
  const args: Record<string, string> = {};
  if (!raw) return args;

  const str = raw.trim();
  let i = 0;

  while (i < str.length) {
    // Skip whitespace
    while (i < str.length && str[i] === " ") i++;
    if (i >= str.length) break;

    // Read key: [a-zA-Z_][a-zA-Z0-9_-]*
    const keyStart = i;
    if (!/[a-zA-Z_]/.test(str[i])) { i++; continue; }
    i++;
    while (i < str.length && /[a-zA-Z0-9_-]/.test(str[i])) i++;
    const key = str.slice(keyStart, i);

    // Expect '='
    if (i >= str.length || str[i] !== "=") continue;
    i++; // skip '='

    // Read value: quoted or unquoted
    let value: string;
    if (i < str.length && (str[i] === '"' || str[i] === "'")) {
      const quote = str[i];
      i++; // skip opening quote
      const valStart = i;
      while (i < str.length && str[i] !== quote) i++;
      value = str.slice(valStart, i);
      if (i < str.length) i++; // skip closing quote
    } else {
      const valStart = i;
      while (i < str.length && str[i] !== " ") i++;
      value = str.slice(valStart, i);
    }

    if (key && value !== undefined) {
      args[key] = value;
    }
  }

  return args;
}

/**
 * Resolve the context string for a directive based on its scope.
 *
 * - `sentence`: The sentence containing/preceding the directive.
 * - `paragraph`: The paragraph containing the directive.
 * - `block`: The entire content string.
 */
function resolveContext(
  content: string,
  offset: number,
  scope: "sentence" | "paragraph" | "block"
): string {
  if (scope === "block") {
    // Strip all directives from the full content
    return content.replace(DIRECTIVE_PATTERN, "").trim();
  }

  if (scope === "paragraph") {
    // Find the paragraph boundaries (double newlines)
    const before = content.lastIndexOf("\n\n", offset);
    const after = content.indexOf("\n\n", offset);
    const start = before === -1 ? 0 : before + 2;
    const end = after === -1 ? content.length : after;
    return content
      .slice(start, end)
      .replace(DIRECTIVE_PATTERN, "")
      .trim();
  }

  // scope === "sentence"
  // The directive annotates the sentence immediately preceding it.
  // Strategy: take the text before the directive, trim whitespace,
  // then find the last complete sentence in that text.
  const textBefore = content.slice(0, offset).trimEnd();

  // Find all sentence-ending positions (., !, ?)
  const endings: number[] = [];
  for (let i = 0; i < textBefore.length; i++) {
    if (textBefore[i] === "." || textBefore[i] === "!" || textBefore[i] === "?") {
      endings.push(i);
    }
  }

  if (endings.length === 0) {
    // No sentence-ending punctuation — use all text before the directive
    return textBefore.replace(DIRECTIVE_PATTERN, "").trim();
  }

  // The last ending is the end of the sentence we want.
  const sentenceEnd = endings[endings.length - 1] + 1;

  // Find where this sentence starts: after the previous sentence ending + whitespace,
  // or after a paragraph break, or the start of text.
  let sentenceStart = 0;

  if (endings.length >= 2) {
    // Start after the previous sentence's ending punctuation + whitespace
    const prevEnd = endings[endings.length - 2] + 1;
    sentenceStart = prevEnd;
    // Skip whitespace after the previous sentence
    while (sentenceStart < sentenceEnd && /\s/.test(textBefore[sentenceStart])) {
      sentenceStart++;
    }
  }

  // Check if there's a paragraph break that's closer
  const lastParaBreak = textBefore.lastIndexOf("\n\n", sentenceEnd);
  if (lastParaBreak !== -1 && lastParaBreak + 2 > sentenceStart) {
    sentenceStart = lastParaBreak + 2;
  }

  const sentenceText = textBefore.slice(sentenceStart, sentenceEnd);
  return sentenceText.replace(DIRECTIVE_PATTERN, "").trim();
}

export interface ExtractResult {
  /** Content with all directive markers stripped */
  content: string;
  /** Extracted directives with resolved context */
  directives: CamlInlineDirective[];
}

/**
 * Extract inline directives from a prose content string.
 *
 * Returns the cleaned content (directives stripped) and an array of
 * extracted directive objects with resolved context.
 *
 * This is a pure function with zero dependencies.
 */
export function extractInlineDirectives(content: string): ExtractResult {
  const directives: CamlInlineDirective[] = [];

  // First pass: collect all directives with their positions
  let match: RegExpExecArray | null;
  const pattern = new RegExp(DIRECTIVE_PATTERN.source, "g");

  while ((match = pattern.exec(content)) !== null) {
    const agent = match[1];
    const scope = match[2] as "sentence" | "paragraph" | "block";
    const argsRaw = match[3];
    const offset = match.index;

    directives.push({
      agent,
      scope,
      args: parseArgs(argsRaw),
      context: resolveContext(content, offset, scope),
      offset,
    });
  }

  // Second pass: strip directive markers from content
  const cleaned = content
    .replace(pattern, "")
    // Clean up leftover whitespace artifacts: double spaces, trailing spaces
    .replace(/ {2,}/g, " ")
    .replace(/ +$/gm, "")
    // Remove blank lines that were only directives
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return { content: cleaned, directives };
}
