/**
 * CAML Inline Directives — extraction and scope resolution.
 *
 * Extracts {{@agent scope [key=value ...]}} markers from prose content.
 * Pure function, zero dependencies.
 *
 * All stripping of directive markers uses a manual string scanner
 * (not regex) to avoid ReDoS on untrusted input.
 */

import type { CamlInlineDirective } from "./types";

/**
 * Pattern for inline directives: {{@agent scope [key=value ...]}}
 *
 * Only used in the controlled exec() loop where each successful match
 * advances the position. Never used in .replace() on untrusted input.
 */
const DIRECTIVE_PATTERN =
  /\{\{@([a-zA-Z][a-zA-Z0-9_-]*) +(sentence|paragraph|block)([^}]*)\}\}/g;

// ---------------------------------------------------------------------------
// Manual directive stripping (no regex on untrusted data)
// ---------------------------------------------------------------------------

/**
 * Find all valid `{{@agent scope ...}}` marker spans in a string.
 * Uses indexOf to find `{{@` candidates, then validates that an agent
 * name (letter followed by word chars) immediately follows.
 * Returns an array of [start, end] pairs.
 */
function findDirectiveSpans(text: string): Array<[number, number]> {
  const spans: Array<[number, number]> = [];
  let searchFrom = 0;

  while (searchFrom < text.length) {
    const open = text.indexOf("{{@", searchFrom);
    if (open === -1) break;

    // Validate: must have an agent name starting with a letter after {{@
    const afterAt = open + 3;
    if (afterAt >= text.length) break;
    const firstChar = text.charCodeAt(afterAt);
    const isLetter =
      (firstChar >= 65 && firstChar <= 90) ||
      (firstChar >= 97 && firstChar <= 122);
    if (!isLetter) {
      searchFrom = afterAt;
      continue;
    }

    const close = text.indexOf("}}", afterAt);
    if (close === -1) break;

    spans.push([open, close + 2]);
    searchFrom = close + 2;
  }

  return spans;
}

/**
 * Strip all `{{@...}}` markers from text using manual scanning.
 * This avoids running any regex on the input string.
 */
function stripDirectives(text: string): string {
  const spans = findDirectiveSpans(text);
  if (spans.length === 0) return text;

  const parts: string[] = [];
  let pos = 0;
  for (const [start, end] of spans) {
    parts.push(text.slice(pos, start));
    pos = end;
  }
  parts.push(text.slice(pos));

  return parts.join("");
}

// ---------------------------------------------------------------------------
// Argument parsing (manual scanner, no regex)
// ---------------------------------------------------------------------------

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

    // Read key: starts with letter or underscore, continues with alnum/hyphen/underscore
    const keyStart = i;
    const c = str.charCodeAt(i);
    const isAlpha =
      (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 95; // A-Z, a-z, _
    if (!isAlpha) {
      i++;
      continue;
    }
    i++;
    while (i < str.length) {
      const cc = str.charCodeAt(i);
      const isKeyCh =
        (cc >= 65 && cc <= 90) ||
        (cc >= 97 && cc <= 122) ||
        (cc >= 48 && cc <= 57) ||
        cc === 95 ||
        cc === 45; // A-Z, a-z, 0-9, _, -
      if (!isKeyCh) break;
      i++;
    }
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

// ---------------------------------------------------------------------------
// Scope resolution
// ---------------------------------------------------------------------------

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
    return stripDirectives(content).trim();
  }

  if (scope === "paragraph") {
    const before = content.lastIndexOf("\n\n", offset);
    const after = content.indexOf("\n\n", offset);
    const start = before === -1 ? 0 : before + 2;
    const end = after === -1 ? content.length : after;
    return stripDirectives(content.slice(start, end)).trim();
  }

  // scope === "sentence"
  // The directive annotates the sentence immediately preceding it.
  const textBefore = content.slice(0, offset).trimEnd();

  // Find all sentence-ending positions (., !, ?)
  const endings: number[] = [];
  for (let i = 0; i < textBefore.length; i++) {
    if (
      textBefore[i] === "." ||
      textBefore[i] === "!" ||
      textBefore[i] === "?"
    ) {
      endings.push(i);
    }
  }

  if (endings.length === 0) {
    return stripDirectives(textBefore).trim();
  }

  const sentenceEnd = endings[endings.length - 1] + 1;

  let sentenceStart = 0;
  if (endings.length >= 2) {
    const prevEnd = endings[endings.length - 2] + 1;
    sentenceStart = prevEnd;
    while (sentenceStart < sentenceEnd) {
      const sc = textBefore.charCodeAt(sentenceStart);
      // Skip space (32), tab (9), newline (10), carriage return (13)
      if (sc === 32 || sc === 9 || sc === 10 || sc === 13) {
        sentenceStart++;
      } else {
        break;
      }
    }
  }

  const lastParaBreak = textBefore.lastIndexOf("\n\n", sentenceEnd);
  if (lastParaBreak !== -1 && lastParaBreak + 2 > sentenceStart) {
    sentenceStart = lastParaBreak + 2;
  }

  const sentenceText = textBefore.slice(sentenceStart, sentenceEnd);
  return stripDirectives(sentenceText).trim();
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

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

  // First pass: collect all directives with their positions using regex exec.
  // This is the only place the regex runs — each successful match advances
  // lastIndex so there is no backtracking across the full string.
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

  // Second pass: strip directive markers using manual scanner (no regex)
  let cleaned = stripDirectives(content);

  // Clean up whitespace artifacts left by removed markers
  // Use indexOf-based cleaning instead of regex
  cleaned = collapseSpaces(cleaned).trim();

  return { content: cleaned, directives };
}

/**
 * Collapse runs of 2+ spaces to single space, trim trailing spaces on lines,
 * and collapse 3+ consecutive newlines to double newline.
 * Uses manual scanning instead of regex.
 */
function collapseSpaces(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let consecutiveEmpty = 0;

  for (const line of lines) {
    // Collapse runs of spaces within the line
    let collapsed = "";
    let prevSpace = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === " ") {
        if (!prevSpace) {
          collapsed += " ";
        }
        prevSpace = true;
      } else {
        collapsed += line[i];
        prevSpace = false;
      }
    }
    // Trim trailing spaces
    let end = collapsed.length;
    while (end > 0 && collapsed[end - 1] === " ") end--;
    collapsed = collapsed.slice(0, end);

    // Collapse blank lines (allow max 1 consecutive blank line)
    if (collapsed === "") {
      consecutiveEmpty++;
      if (consecutiveEmpty <= 1) {
        result.push("");
      }
    } else {
      consecutiveEmpty = 0;
      result.push(collapsed);
    }
  }

  return result.join("\n");
}
