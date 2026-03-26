import React from "react";
import type { Preview } from "@storybook/react";
import { CamlThemeProvider } from "../src/CamlThemeProvider";

const preview: Preview = {
  decorators: [
    (Story) => (
      <CamlThemeProvider>
        <Story />
      </CamlThemeProvider>
    ),
  ],
};

export default preview;
