import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

import { CamlFooterRenderer } from "../src/CamlFooter";
import { CamlTestWrapper } from "./CamlTestWrapper";

test("renders nav links with correct href", async ({ mount }) => {
  const component = await mount(
    <CamlTestWrapper>
      <CamlFooterRenderer
        footer={{
          nav: [{ label: "About", href: "https://example.com" }],
        }}
      />
    </CamlTestWrapper>
  );

  const link = component.getByRole("link", { name: "About" });
  await expect(link).toBeVisible();
  await expect(link).toHaveAttribute("href", "https://example.com");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
});

test("blocks unsafe javascript: hrefs", async ({ mount }) => {
  const component = await mount(
    <CamlTestWrapper>
      <CamlFooterRenderer
        footer={{
          nav: [{ label: "Bad", href: "javascript:alert(1)" }],
        }}
      />
    </CamlTestWrapper>
  );

  // The unsafe link should not be rendered at all
  await expect(component.getByText("Bad")).not.toBeVisible();
});

test("renders notice text", async ({ mount }) => {
  const component = await mount(
    <CamlTestWrapper>
      <CamlFooterRenderer
        footer={{
          notice: "Copyright 2026",
        }}
      />
    </CamlTestWrapper>
  );

  await expect(component.getByText("Copyright 2026")).toBeVisible();
});
