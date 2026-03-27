#!/usr/bin/env node
/**
 * Regenerate README hero screenshot from the Storybook Full Article story.
 *
 * Usage:
 *   node scripts/generate-readme-assets.js
 *
 * Prerequisites:
 *   - Storybook running on port 6006 (yarn workspace @os-legal/caml-react storybook)
 *   - Playwright installed in packages/caml-react
 */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "docs", "assets");
const HERO_PATH = path.join(ASSETS_DIR, "hero-preview.png");
const PW_DIR = path.join(ROOT, "packages", "caml-react");

async function main() {
  // Ensure assets directory exists
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  // Resolve Playwright (hoisted to root node_modules by yarn workspaces)
  const pw = require("playwright");
  const browser = await pw.chromium.launch();

  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });

    // Check if Storybook is running
    try {
      await page.goto("http://localhost:6006", { timeout: 5000 });
    } catch {
      console.error(
        "Error: Storybook is not running on port 6006.\n" +
          "Start it first: yarn workspace @os-legal/caml-react storybook"
      );
      process.exit(1);
    }

    // Navigate to full article (iframe only, no Storybook chrome)
    await page.goto(
      "http://localhost:6006/iframe.html?id=caml-full-article--default&viewMode=story"
    );
    await page.waitForTimeout(3000);

    // Screenshot the full showcase (source + render)
    await page.screenshot({ path: HERO_PATH, fullPage: true });
    console.log(`Hero screenshot saved to ${path.relative(ROOT, HERO_PATH)}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
