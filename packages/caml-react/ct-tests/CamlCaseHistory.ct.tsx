import { test, expect } from "@playwright/experimental-ct-react";
import React from "react";

import type { CamlCaseHistory } from "@os-legal/caml";
import { CamlBlockRenderer } from "../src/CamlBlocks";
import { CamlTestWrapper } from "./CamlTestWrapper";

const sampleBlock: CamlCaseHistory = {
  type: "case-history",
  title: "Smith v. Jones Corp.",
  docket: "No. 22-1234",
  status: "Cert Denied",
  entries: [
    {
      courtLevel: "District Court",
      courtName: "S.D.N.Y.",
      date: "2022-03-15",
      action: "Motion to Dismiss",
      outcome: "Denied",
      detail:
        "Judge Martinez ruled that plaintiff adequately stated a claim under Section 10(b).",
    },
    {
      courtLevel: "Court of Appeals",
      courtName: "2nd Circuit",
      date: "2023-06-20",
      action: "Appeal",
      outcome: "Affirmed",
      detail: "Panel (2-1) affirmed district court.",
    },
    {
      courtLevel: "Supreme Court",
      courtName: "SCOTUS",
      date: "2024-01-08",
      action: "Certiorari",
      outcome: "Denied",
    },
  ],
};

test("case history renders title and docket", async ({ mount, page }) => {
  await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={sampleBlock} />
    </CamlTestWrapper>
  );

  await expect(page.getByTestId("case-history-title")).toHaveText(
    "Smith v. Jones Corp."
  );
  await expect(page.getByTestId("case-history-docket")).toHaveText(
    "No. 22-1234"
  );
});

test("case history renders status badge", async ({ mount, page }) => {
  await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={sampleBlock} />
    </CamlTestWrapper>
  );

  await expect(page.getByTestId("case-history-status")).toHaveText(
    "Cert Denied"
  );
});

test("case history renders all entries with court levels and outcomes", async ({
  mount,
  page,
}) => {
  await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={sampleBlock} />
    </CamlTestWrapper>
  );

  // All three entries rendered
  await expect(page.getByTestId("case-history-entry-0")).toBeVisible();
  await expect(page.getByTestId("case-history-entry-1")).toBeVisible();
  await expect(page.getByTestId("case-history-entry-2")).toBeVisible();

  // Court levels visible (use exact match to avoid matching detail text)
  await expect(page.getByText("District Court", { exact: true })).toBeVisible();
  await expect(page.getByText("Court of Appeals", { exact: true })).toBeVisible();
  await expect(page.getByText("Supreme Court", { exact: true })).toBeVisible();
});

test("case history renders detail text when present", async ({
  mount,
  page,
}) => {
  await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={sampleBlock} />
    </CamlTestWrapper>
  );

  // Detail text for first entry
  await expect(page.getByText("Judge Martinez")).toBeVisible();

  // Detail text for second entry
  await expect(page.getByText("Panel (2-1)")).toBeVisible();
});

test("case history omits detail when not present", async ({
  mount,
  page,
}) => {
  const minimalBlock: CamlCaseHistory = {
    type: "case-history",
    title: "Test Case",
    entries: [
      {
        courtLevel: "Trial Court",
        courtName: "County Court",
        date: "2023-01-01",
        action: "Verdict",
        outcome: "Guilty",
      },
    ],
  };

  await mount(
    <CamlTestWrapper>
      <CamlBlockRenderer block={minimalBlock} />
    </CamlTestWrapper>
  );

  await expect(page.getByTestId("case-history-entry-0")).toBeVisible();
  // No status badge when not provided
  await expect(page.getByTestId("case-history-status")).toHaveCount(0);
  // No docket when not provided
  await expect(page.getByTestId("case-history-docket")).toHaveCount(0);
});
