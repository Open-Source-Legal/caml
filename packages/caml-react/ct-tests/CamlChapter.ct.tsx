import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

import type { CamlChapter } from "@os-legal/caml";
import { CamlChapterRenderer } from "../src/CamlChapter";
import { CamlTestWrapper } from "./CamlTestWrapper";
import { ChapterWithCustomMarkdown } from "./helpers/ChapterWithCustomMarkdown";

test("renders kicker, title, and prose block", async ({ mount }) => {
  const chapter: CamlChapter = {
    id: "test-chapter",
    kicker: "Chapter Kicker",
    title: "Chapter Title",
    blocks: [{ type: "prose", content: "Chapter prose content here." }],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlChapterRenderer chapter={chapter} />
    </CamlTestWrapper>
  );

  await expect(component.getByText("Chapter Kicker")).toBeVisible();
  await expect(component.getByText("Chapter Title")).toBeVisible();
  await expect(
    component.getByText("Chapter prose content here.")
  ).toBeVisible();
});

test("dark theme applies dark background styling", async ({ mount, page }) => {
  const chapter: CamlChapter = {
    id: "dark-chapter",
    theme: "dark",
    title: "Dark Theme",
    blocks: [{ type: "prose", content: "Dark content" }],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlChapterRenderer chapter={chapter} />
    </CamlTestWrapper>
  );

  await expect(component.getByText("Dark Theme")).toBeVisible();

  // The section should have a dark background applied via the $theme="dark" prop
  // Use page.locator instead of component.locator to avoid scoping issues
  const bgColor = await page.locator("section").evaluate((el) => {
    return getComputedStyle(el).backgroundColor;
  });
  // The dark theme sets background to theme.caml.colors.heading which is #0f172a
  // rgb(15, 23, 42)
  expect(bgColor).toBe("rgb(15, 23, 42)");
});

test("threads custom renderMarkdown prop", async ({ mount }) => {
  const chapter: CamlChapter = {
    id: "custom-md-chapter",
    blocks: [{ type: "prose", content: "Custom rendered content" }],
  };

  const component = await mount(
    <ChapterWithCustomMarkdown chapter={chapter} />
  );

  const customEl = component.locator('[data-testid="custom-md"]');
  await expect(customEl).toBeVisible();
  await expect(customEl).toHaveText("Custom rendered content");
});
