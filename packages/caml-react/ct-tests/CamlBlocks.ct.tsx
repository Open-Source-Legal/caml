import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

import type {
  CamlProse,
  CamlCards,
  CamlPills,
  CamlTabs,
  CamlTimeline,
  CamlCta,
  CamlCorpusStats,
} from "@os-legal/caml";
import { CamlBlockRenderer } from "../src/CamlBlocks";
import { CamlTestWrapper } from "./CamlTestWrapper";

test("prose renders markdown with bold text", async ({ mount }) => {
  const block: CamlProse = {
    type: "prose",
    content: "**bold text** and normal text",
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  await expect(component.getByText("bold text")).toBeVisible();
  const strong = component.locator("strong", { hasText: "bold text" });
  await expect(strong).toBeVisible();
});

test("prose renders pullquote", async ({ mount }) => {
  const block: CamlProse = {
    type: "prose",
    content: '>>> "Quote text here"',
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  // The pullquote text should be rendered (without >>> prefix and quotes)
  await expect(component.getByText("Quote text here")).toBeVisible();
  // It should be inside a blockquote element (Pullquote is a styled blockquote)
  const blockquote = component.locator("blockquote");
  await expect(blockquote).toBeVisible();
});

test("cards renders grid with items", async ({ mount }) => {
  const block: CamlCards = {
    type: "cards",
    columns: 2,
    items: [
      { label: "Card One", body: "First card body" },
      { label: "Card Two", meta: "v1.0" },
    ],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  await expect(component.getByText("Card One")).toBeVisible();
  await expect(component.getByText("Card Two")).toBeVisible();
  await expect(component.getByText("First card body")).toBeVisible();
  await expect(component.getByText("v1.0")).toBeVisible();
});

test("pills renders metrics with bigText, label, and status", async ({
  mount,
}) => {
  const block: CamlPills = {
    type: "pills",
    items: [
      {
        bigText: "42",
        label: "Documents",
        status: "Active",
        statusColor: "#22c55e",
      },
      { bigText: "7", label: "Contributors", detail: "across 3 teams" },
    ],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  await expect(component.getByText("42")).toBeVisible();
  await expect(component.getByText("Documents")).toBeVisible();
  await expect(component.getByText("Active")).toBeVisible();
  await expect(component.getByText("7")).toBeVisible();
  await expect(component.getByText("Contributors")).toBeVisible();
  await expect(component.getByText("across 3 teams")).toBeVisible();
});

test("tabs switch content on click", async ({ mount }) => {
  const block: CamlTabs = {
    type: "tabs",
    tabs: [
      {
        label: "Tab One",
        sections: [{ heading: "Section A", content: "Content of tab one" }],
        sources: [],
      },
      {
        label: "Tab Two",
        sections: [{ heading: "Section B", content: "Content of tab two" }],
        sources: [],
      },
    ],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  // Tab one is active by default
  await expect(component.getByText("Content of tab one")).toBeVisible();
  await expect(component.getByText("Content of tab two")).not.toBeVisible();

  // Click tab two
  await component.getByText("Tab Two").click();

  // Now tab two content should be visible
  await expect(component.getByText("Content of tab two")).toBeVisible();
  await expect(component.getByText("Content of tab one")).not.toBeVisible();
});

test("timeline renders legend, dates, and labels", async ({ mount }) => {
  const block: CamlTimeline = {
    type: "timeline",
    legend: [
      { label: "Filing", color: "#3b82f6" },
      { label: "Ruling", color: "#ef4444" },
    ],
    items: [
      { date: "Jan 2025", label: "Complaint filed", side: "filing" },
      { date: "Mar 2025", label: "Motion granted", side: "ruling" },
    ],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  await expect(component.getByText("Filing")).toBeVisible();
  await expect(component.getByText("Ruling")).toBeVisible();
  await expect(component.getByText("Jan 2025")).toBeVisible();
  await expect(component.getByText("Complaint filed")).toBeVisible();
  await expect(component.getByText("Mar 2025")).toBeVisible();
  await expect(component.getByText("Motion granted")).toBeVisible();
});

test("CTA renders safe links only, blocks unsafe hrefs", async ({ mount }) => {
  const block: CamlCta = {
    type: "cta",
    items: [
      { label: "Safe Link", href: "https://example.com", primary: true },
      { label: "Unsafe Link", href: "javascript:alert(1)" },
    ],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={block} />
    </CamlTestWrapper>
  );

  const safeLink = component.getByRole("link", { name: "Safe Link" });
  await expect(safeLink).toBeVisible();
  await expect(safeLink).toHaveAttribute("href", "https://example.com");

  // Unsafe link should not be rendered
  await expect(component.getByText("Unsafe Link")).not.toBeVisible();
});

test("corpus-stats displays stat values from stats prop", async ({
  mount,
}) => {
  const block: CamlCorpusStats = {
    type: "corpus-stats",
    items: [
      { key: "documents", label: "Documents" },
      { key: "annotations", label: "Annotations" },
    ],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer
        block={block}
        stats={{ documents: 150, annotations: 3200 }}
      />
    </CamlTestWrapper>
  );

  await expect(component.getByText("150")).toBeVisible();
  await expect(component.getByText("Documents")).toBeVisible();
  await expect(component.getByText("3200")).toBeVisible();
  await expect(component.getByText("Annotations")).toBeVisible();
});
