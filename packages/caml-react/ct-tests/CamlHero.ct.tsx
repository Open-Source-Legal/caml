import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

import { CamlHeroRenderer } from "../src/CamlHero";
import { CamlTestWrapper } from "./CamlTestWrapper";

test("renders title with accent marks", async ({ mount }) => {
  const component = await mount(
    <CamlTestWrapper>
      <CamlHeroRenderer hero={{ title: ["Hello {world}"] }} />
    </CamlTestWrapper>
  );

  await expect(component.getByText("Hello")).toBeVisible();
  await expect(component.getByText("world")).toBeVisible();

  // The accent text should be inside a span (HeroAccent is a styled span)
  const accentSpan = component.locator("span", { hasText: "world" });
  await expect(accentSpan).toBeVisible();
});

test("renders kicker, subtitle, and stats", async ({ mount }) => {
  const component = await mount(
    <CamlTestWrapper>
      <CamlHeroRenderer
        hero={{
          kicker: "Breaking News",
          title: ["Main Title"],
          subtitle: "A subtitle for the hero",
          stats: ["100 documents", "50 annotations"],
        }}
      />
    </CamlTestWrapper>
  );

  await expect(component.getByText("Breaking News")).toBeVisible();
  await expect(component.getByText("Main Title")).toBeVisible();
  await expect(component.getByText("A subtitle for the hero")).toBeVisible();
  await expect(component.getByText("100 documents")).toBeVisible();
  await expect(component.getByText("50 annotations")).toBeVisible();
});

test("handles missing optional fields", async ({ mount }) => {
  const component = await mount(
    <CamlTestWrapper>
      <CamlHeroRenderer hero={{ title: ["Only Title"] }} />
    </CamlTestWrapper>
  );

  // Title should be visible as an h1
  await expect(
    component.getByRole("heading", { name: "Only Title" })
  ).toBeVisible();

  // No error thrown — component rendered successfully with only required field
});
