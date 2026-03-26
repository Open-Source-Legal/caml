import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

import { CamlMarkdown } from "../src/CamlMarkdown";
import { CamlTestWrapper } from "./CamlTestWrapper";

test("renders GFM markdown with bold and list", async ({ mount }) => {
  const component = await mount(
    <CamlTestWrapper>
      <CamlMarkdown content={"**bold text**\n\n- list item one\n- list item two"} />
    </CamlTestWrapper>
  );

  // Bold text should be in a <strong> tag
  const strong = component.locator("strong", { hasText: "bold text" });
  await expect(strong).toBeVisible();

  // List items should be visible
  await expect(component.getByText("list item one")).toBeVisible();
  await expect(component.getByText("list item two")).toBeVisible();

  // Should be in a list
  const listItems = component.locator("li");
  expect(await listItems.count()).toBe(2);
});

test("sanitizes unsafe HTML (script tags removed)", async ({ mount }) => {
  const component = await mount(
    <CamlTestWrapper>
      <CamlMarkdown content={"<script>alert(1)</script>\n\nSafe content here"} />
    </CamlTestWrapper>
  );

  // Safe content should still be visible
  await expect(component.getByText("Safe content here")).toBeVisible();

  // Script tag should NOT be in the DOM
  const scripts = component.locator("script");
  expect(await scripts.count()).toBe(0);
});
