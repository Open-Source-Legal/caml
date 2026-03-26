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

test("heatmap renders with gradient colors and legend bar", async ({
  mount,
  page,
}) => {
  const block: CamlMap = {
    type: "map",
    mapType: "us",
    mode: "heatmap",
    lowColor: "#dbeafe",
    highColor: "#1e3a8a",
    legend: [],
    states: [
      { code: "CA", status: "1247", count: 1247 },
      { code: "NY", status: "892", count: 892 },
      { code: "TX", status: "100", count: 100 },
    ],
  };

  await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  // All heatmap tiles are visible
  await expect(page.getByTestId("map-tile-CA")).toBeVisible();
  await expect(page.getByTestId("map-tile-NY")).toBeVisible();
  await expect(page.getByTestId("map-tile-TX")).toBeVisible();

  // Heatmap legend (gradient bar with min/max labels)
  const legend = page.getByTestId("map-heatmap-legend");
  await expect(legend).toBeVisible();
  await expect(legend.getByText("100")).toBeVisible();
  await expect(legend.getByText("1,247")).toBeVisible();
});

test("map displays count on tile", async ({ mount, page }) => {
  const block: CamlMap = {
    type: "map",
    mapType: "us",
    legend: [{ label: "Active", color: "#0f766e" }],
    states: [{ code: "CA", status: "Active", count: 247 }],
  };

  await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  // Count should be displayed on the tile
  await expect(page.getByTestId("map-count-CA")).toBeVisible();
  await expect(page.getByTestId("map-count-CA")).toHaveText("247");
});

test("linked tile renders as clickable anchor", async ({ mount, page }) => {
  const block: CamlMap = {
    type: "map",
    mapType: "us",
    legend: [{ label: "Active", color: "#0f766e" }],
    states: [
      { code: "NY", status: "Active", count: 189, href: "/c/legal/new-york" },
    ],
  };

  await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  // Link should be present with correct href
  const link = page.getByTestId("map-link-NY");
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "/c/legal/new-york");
});
