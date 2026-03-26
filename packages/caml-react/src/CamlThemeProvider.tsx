import React, { createContext, useContext, type ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import {
  type CamlTheme,
  type DeepPartial,
  defaultCamlTheme,
  deepMerge,
} from "./theme";

const CamlThemeContext = createContext<CamlTheme>(defaultCamlTheme);

export const useCamlTheme = () => useContext(CamlThemeContext);

export function CamlThemeProvider({
  theme: overrides,
  children,
}: {
  theme?: DeepPartial<CamlTheme>;
  children: ReactNode;
}) {
  const merged = deepMerge(defaultCamlTheme, overrides);
  return (
    <CamlThemeContext.Provider value={merged}>
      <ThemeProvider theme={(outerTheme) => ({ ...outerTheme, caml: merged })}>
        {children}
      </ThemeProvider>
    </CamlThemeContext.Provider>
  );
}
