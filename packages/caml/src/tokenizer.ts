/**
 * CAML Tokenizer — Pass 1: Structure extraction.
 *
 * Splits a .caml source string into frontmatter + chapter tokens,
 * then tokenizes each chapter body into typed blocks by matching
 * ::: fenced directives.
 */

import type {
  CamlFrontmatter,
  CamlChapter,
  CamlDocument,
  CamlBlock,
} from "./types";
import { parseBlock } from "./blockParsers";

// ---------------------------------------------------------------------------
// YAML frontmatter (lightweight parser — no dependency on js-yaml)
// ---------------------------------------------------------------------------

/**
 * Minimal YAML-subset parser for CAML frontmatter.
 *
 * Supports:
 *  - Scalars (strings, numbers, booleans)
 *  - Lists (- item)
 *  - Nested objects (indented keys)
 *  - Multi-line scalars via > (folded) and | (literal)
 *  - Quoted strings
 *
 * This is intentionally limited — CAML frontmatter only uses a small subset
 * of YAML, so we avoid pulling in a full YAML parser.
 */
function parseYamlFrontmatter(yaml: string): CamlFrontmatter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};
  const lines = yaml.split("\n");

  // Stack tracks current nesting: [{obj, indent}]
  const stack: { obj: Record<string, unknown>; indent: number }[] = [
    { obj: result, indent: -1 },
  ];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trimEnd();

    // Skip blank lines and comments
    if (trimmed === "" || trimmed.startsWith("#")) {
      i++;
      continue;
    }

    const indent = line.search(/\S/);
    const content = trimmed.trimStart();

    // Pop stack to find parent at correct indent level
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }
    const parent = stack[stack.length - 1].obj;

    // Key-value pair
    const kvMatch = content.match(/^([a-zA-Z_][a-zA-Z0-9_-]*):\s*(.*)/);
    if (kvMatch) {
      const key = kvMatch[1];
      let value = kvMatch[2].trim();

      if (value === "" || value === ">") {
        // Could be a nested object, list, or multi-line scalar
        const isMultiLine = value === ">";

        // Peek ahead to determine type
        if (i + 1 < lines.length) {
          const nextLine = lines[i + 1];
          const nextIndent = nextLine.search(/\S/);
          const nextTrimmed = nextLine.trim();

          if (nextIndent > indent && nextTrimmed.startsWith("- ")) {
            // List
            const items: unknown[] = [];
            i++;
            while (i < lines.length) {
              const listLine = lines[i];
              const listIndent = listLine.search(/\S/);
              const listTrimmed = listLine.trim();
              if (listTrimmed === "" || listIndent <= indent) break;
              if (listTrimmed.startsWith("- ")) {
                items.push(parseYamlValue(listTrimmed.slice(2).trim()));
              }
              i++;
            }
            parent[key] = items;
            continue;
          } else if (nextIndent > indent && !isMultiLine) {
            // Nested object
            const nested: Record<string, unknown> = {};
            parent[key] = nested;
            stack.push({ obj: nested, indent });
            i++;
            continue;
          } else if (isMultiLine) {
            // Folded multi-line scalar (>)
            const parts: string[] = [];
            i++;
            while (i < lines.length) {
              const mlLine = lines[i];
              const mlTrimmed = mlLine.trim();
              const mlIndent = mlLine.search(/\S/);
              if (mlTrimmed === "" && parts.length > 0) {
                // Blank line in multi-line — peek if content continues
                if (
                  i + 1 < lines.length &&
                  lines[i + 1].search(/\S/) > indent
                ) {
                  parts.push("");
                  i++;
                  continue;
                }
                break;
              }
              if (mlIndent <= indent) break;
              parts.push(mlTrimmed);
              i++;
            }
            parent[key] = parts.join(" ");
            continue;
          }
        }

        // Empty value (no children follow)
        if (!isMultiLine) {
          parent[key] = "";
        }
      } else {
        parent[key] = parseYamlValue(value);
      }
    }

    i++;
  }

  return result as CamlFrontmatter;
}

function parseYamlValue(raw: string): string | number | boolean {
  // Remove surrounding quotes
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    return raw.slice(1, -1);
  }
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (/^\d+$/.test(raw)) return parseInt(raw, 10);
  if (/^\d+\.\d+$/.test(raw)) return parseFloat(raw);
  return raw;
}

// ---------------------------------------------------------------------------
// Fence parsing
// ---------------------------------------------------------------------------

interface FenceToken {
  type: string;
  attrs: Record<string, string>;
  body: string;
}

/**
 * Parse ::: fenced directives attributes like {#id, theme: dark, columns: 2}.
 */
function parseAttrs(raw: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  if (!raw) return attrs;

  // Remove surrounding braces
  const inner = raw.replace(/^\{/, "").replace(/\}$/, "").trim();
  if (!inner) return attrs;

  // Split on comma, then parse each part
  const parts = inner.split(",").map((p) => p.trim());
  for (const part of parts) {
    if (part.startsWith("#")) {
      attrs["id"] = part.slice(1);
    } else {
      const colonIdx = part.indexOf(":");
      if (colonIdx > 0) {
        const key = part.slice(0, colonIdx).trim();
        const val = part.slice(colonIdx + 1).trim();
        attrs[key] = val;
      }
    }
  }
  return attrs;
}

/**
 * Tokenize a body string into fence tokens at a given depth.
 * depth=3 matches :::, depth=4 matches ::::
 *
 * Returns an array of FenceTokens for fenced blocks, and prose strings
 * for everything between fences.
 */
function tokenizeFences(
  body: string,
  depth: number = 3
): Array<FenceToken | string> {
  const fencePattern = new RegExp(`^:{${depth}}\\s*(.*)$`);
  const closePattern = new RegExp(`^:{${depth}}\\s*$`);

  const lines = body.split("\n");
  const tokens: Array<FenceToken | string> = [];
  let proseLines: string[] = [];
  let currentFence: { type: string; attrs: Record<string, string> } | null =
    null;
  let fenceBody: string[] = [];

  const flushProse = () => {
    const text = proseLines.join("\n").trim();
    if (text) tokens.push(text);
    proseLines = [];
  };

  for (const line of lines) {
    if (currentFence) {
      // Check for closing fence
      if (closePattern.test(line.trim())) {
        tokens.push({
          type: currentFence.type,
          attrs: currentFence.attrs,
          body: fenceBody.join("\n"),
        });
        currentFence = null;
        fenceBody = [];
      } else {
        fenceBody.push(line);
      }
    } else {
      const match = line.trim().match(fencePattern);
      if (match) {
        flushProse();
        const headerRaw = match[1].trim();

        // Parse "type {attrs}" or just "type"
        const braceIdx = headerRaw.indexOf("{");
        let typeName: string;
        let attrsStr: string;
        if (braceIdx >= 0) {
          typeName = headerRaw.slice(0, braceIdx).trim();
          attrsStr = headerRaw.slice(braceIdx);
        } else {
          typeName = headerRaw;
          attrsStr = "";
        }

        if (!typeName) {
          // Bare ::: with no type — closing a higher-level fence, skip
          continue;
        }

        currentFence = { type: typeName, attrs: parseAttrs(attrsStr) };
        fenceBody = [];
      } else {
        proseLines.push(line);
      }
    }
  }

  // Flush unclosed fence as prose to prevent silent data loss
  if (currentFence) {
    const recoveredText = fenceBody.join("\n").trim();
    if (recoveredText) tokens.push(recoveredText);
  }

  // Flush remaining prose
  flushProse();

  return tokens;
}

// ---------------------------------------------------------------------------
// Chapter parsing
// ---------------------------------------------------------------------------

function parseChapter(token: FenceToken, index: number): CamlChapter {
  const { attrs, body } = token;

  const chapter: CamlChapter = {
    id: attrs.id || `chapter-${index}`,
    theme: (attrs.theme as "light" | "dark") || undefined,
    gradient: attrs.gradient === "true" || undefined,
    centered: attrs.centered === "true" || undefined,
    blocks: [],
  };

  // Tokenize chapter body into blocks
  const innerTokens = tokenizeFences(body, 3);

  for (const innerToken of innerTokens) {
    if (typeof innerToken === "string") {
      // Prose — extract kicker and title
      const proseResult = extractChapterMeta(innerToken, chapter);
      if (proseResult.trim()) {
        chapter.blocks.push({ type: "prose", content: proseResult });
      }
    } else {
      const block = parseBlock(
        innerToken.type,
        innerToken.attrs,
        innerToken.body
      );
      if (block) {
        chapter.blocks.push(block);
      }
    }
  }

  return chapter;
}

/**
 * Extract >! kicker and ## title from prose, setting them on the chapter.
 * Returns the remaining prose text.
 */
function extractChapterMeta(prose: string, chapter: CamlChapter): string {
  const lines = prose.split("\n");
  const remaining: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith(">!")) {
      chapter.kicker = trimmed.slice(2).trim();
    } else if (trimmed.startsWith("## ") && !chapter.title) {
      chapter.title = trimmed.slice(3).trim();
    } else {
      remaining.push(line);
    }
  }

  return remaining.join("\n");
}

// ---------------------------------------------------------------------------
// Main parse function
// ---------------------------------------------------------------------------

/**
 * Parse a CAML source string into a CamlDocument.
 *
 * This is a pure function with no side effects — suitable for use in
 * both the renderer and editor preview.
 */
export function parseCaml(source: string): CamlDocument {
  // Pass 1a: Split frontmatter from body
  let frontmatter: CamlFrontmatter = {};
  let body = source;

  const fmMatch = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (fmMatch) {
    frontmatter = parseYamlFrontmatter(fmMatch[1]);
    body = fmMatch[2];
  }

  // Pass 1b: Tokenize body into chapters
  const topTokens = tokenizeFences(body, 3);
  const chapters: CamlChapter[] = [];
  let chapterIndex = 0;

  for (const token of topTokens) {
    if (typeof token === "string") {
      // Top-level prose outside of chapters — wrap in an implicit chapter
      const trimmed = token.trim();
      if (trimmed) {
        const implicitChapter: CamlChapter = {
          id: `intro-${chapterIndex}`,
          blocks: [{ type: "prose", content: trimmed }],
        };
        chapters.push(implicitChapter);
        chapterIndex++;
      }
    } else if (token.type === "chapter") {
      chapters.push(parseChapter(token, chapterIndex));
      chapterIndex++;
    } else {
      // Top-level non-chapter block — wrap in implicit chapter
      const block = parseBlock(token.type, token.attrs, token.body);
      if (block) {
        const implicitChapter: CamlChapter = {
          id: `block-${chapterIndex}`,
          blocks: [block],
        };
        chapters.push(implicitChapter);
        chapterIndex++;
      }
    }
  }

  return { frontmatter, chapters };
}
