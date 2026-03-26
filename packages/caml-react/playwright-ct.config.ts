import { defineConfig, devices } from "@playwright/experimental-ct-react";

export default defineConfig({
  testDir: "./ct-tests",
  testMatch: "*.ct.tsx",
  use: {
    ...devices["Desktop Chrome"],
  },
  reporter: "list",
});
