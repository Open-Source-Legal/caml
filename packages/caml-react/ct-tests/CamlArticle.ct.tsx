import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

import type { CamlDocument } from "@os-legal/caml";
import { CamlArticle } from "../src/CamlArticle";
import { CamlTestWrapper } from "./CamlTestWrapper";
import { ArticleWithCustomMarkdown } from "./helpers/ArticleWithCustomMarkdown";
import { ArticleWithCustomEmbed } from "./helpers/ArticleWithCustomEmbed";

test("full article renders hero, chapters, and footer", async ({ mount }) => {
  const doc: CamlDocument = {
    frontmatter: {
      hero: {
        title: ["Welcome to {CAML}"],
        subtitle: "A markup language for legal content",
      },
      footer: {
        nav: [{ label: "Home", href: "https://example.com" }],
        notice: "Copyright 2026 OS Legal",
      },
    },
    chapters: [
      {
        id: "intro",
        title: "Introduction",
        blocks: [{ type: "prose", content: "This is the introduction." }],
      },
    ],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlArticle document={doc} />
    </CamlTestWrapper>
  );

  // Hero
  await expect(component.getByText("Welcome to")).toBeVisible();
  await expect(component.getByText("CAML")).toBeVisible();
  await expect(
    component.getByText("A markup language for legal content")
  ).toBeVisible();

  // Chapter -- use getByRole to avoid matching substring in prose
  await expect(
    component.getByRole("heading", { name: "Introduction" })
  ).toBeVisible();
  await expect(
    component.getByText("This is the introduction.")
  ).toBeVisible();

  // Footer
  await expect(component.getByText("Copyright 2026 OS Legal")).toBeVisible();
  await expect(component.getByRole("link", { name: "Home" })).toBeVisible();
});

test("renderMarkdown slot injection works for prose blocks", async ({
  mount,
}) => {
  const doc: CamlDocument = {
    frontmatter: {},
    chapters: [
      {
        id: "ch1",
        blocks: [{ type: "prose", content: "Slot test content" }],
      },
    ],
  };

  const component = await mount(
    <ArticleWithCustomMarkdown document={doc} />
  );

  const customEl = component.locator('[data-testid="custom-md"]');
  await expect(customEl).toBeVisible();
  await expect(customEl).toHaveText("Slot test content");
});

test("renderAnnotationEmbed slot works for annotation-embed blocks", async ({
  mount,
}) => {
  const doc: CamlDocument = {
    frontmatter: {},
    chapters: [
      {
        id: "ch1",
        blocks: [{ type: "annotation-embed", ref: "ann-123" }],
      },
    ],
  };

  const component = await mount(<ArticleWithCustomEmbed document={doc} />);

  const embedEl = component.locator('[data-testid="custom-embed"]');
  await expect(embedEl).toBeVisible();
  await expect(embedEl).toHaveText("Embedded: ann-123");
});

test("empty document renders without crash", async ({ mount, page }) => {
  const doc: CamlDocument = {
    frontmatter: {},
    chapters: [],
  };

  const component = await mount(
    <CamlTestWrapper>
      <CamlArticle document={doc} />
    </CamlTestWrapper>
  );

  // The component should mount without errors. The ArticleContainer is a styled
  // article element. With no children it may have zero height, so check the
  // page-level element exists in the DOM rather than checking visibility.
  const article = page.locator("article");
  await expect(article).toHaveCount(1);
});
