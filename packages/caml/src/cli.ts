#!/usr/bin/env node
/**
 * CLI entry point for the CAML-to-Markdown compiler.
 *
 * Usage:
 *   caml-to-md <input.caml>                  # Print to stdout
 *   caml-to-md <input.caml> --output out.md  # Write to file
 *   cat input.caml | caml-to-md --stdin      # Read from stdin
 */

import { readFileSync, writeFileSync } from "fs";
import { camlToMarkdown } from "./toMarkdown";

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log("Usage: caml-to-md <input.caml> [--output <output.md>]");
  console.log("       cat input.caml | caml-to-md --stdin");
  console.log("");
  console.log("Options:");
  console.log("  --stdin            Read CAML source from stdin");
  console.log("  --output <file>    Write output to file instead of stdout");
  console.log("  --help, -h         Show this help message");
  process.exit(0);
}

let source: string;
if (args.includes("--stdin")) {
  source = readFileSync("/dev/stdin", "utf-8");
} else {
  const inputFile = args.find((a) => !a.startsWith("--"));
  if (!inputFile) {
    console.error("Error: No input file specified.");
    process.exit(1);
  }
  source = readFileSync(inputFile, "utf-8");
}

const output = camlToMarkdown(source);

const outputIdx = args.indexOf("--output");
if (outputIdx >= 0 && args[outputIdx + 1]) {
  writeFileSync(args[outputIdx + 1], output);
  console.error(`Written to ${args[outputIdx + 1]}`);
} else {
  console.log(output);
}
