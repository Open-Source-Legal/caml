import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

import type { CamlMap } from "@os-legal/caml";
import { CamlBlockRenderer } from "../src/CamlBlocks";
import { CamlTestWrapper } from "./CamlTestWrapper";

test("map renders tile grid with state tiles", async ({ mount, page }) => {
  const block: CamlMap = {
    type: "map",
    mapType: "us",
    legend: [
      { label: "Active", color: "#0f766e" },
      { label: "Pending", color: "#f59e0b" },
    ],
    states: [
      { code: "CA", status: "Active" },
      { code: "NY", status: "Active" },
      { code: "TX", status: "Pending" },
    ],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  // State tiles are visible (use page locator for data-testid)
  await expect(page.getByTestId("map-tile-CA")).toBeVisible();
  await expect(page.getByTestId("map-tile-NY")).toBeVisible();
  await expect(page.getByTestId("map-tile-TX")).toBeVisible();

  // Legend entries are rendered
  await expect(component.getByText("Active")).toBeVisible();
  await expect(component.getByText("Pending")).toBeVisible();
});

test("map shows tooltip on hover", async ({ mount, page }) => {
  const block: CamlMap = {
    type: "map",
    mapType: "us",
    legend: [{ label: "Active", color: "#0f766e" }],
    states: [{ code: "CA", status: "Active" }],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  // Hover over California
  const caTile = component.getByTestId("map-tile-CA");
  await caTile.hover();

  // Tooltip with state name and status should appear
  await expect(component.getByText("California")).toBeVisible();
});

test("map renders unassigned states as neutral tiles", async ({ mount }) => {
  const block: CamlMap = {
    type: "map",
    mapType: "us",
    legend: [{ label: "Active", color: "#0f766e" }],
    states: [{ code: "CA", status: "Active" }],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  // FL has no status assigned, should still be a visible tile
  const flTile = component.getByTestId("map-tile-FL");
  await expect(flTile).toBeVisible();
});
