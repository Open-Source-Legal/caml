import React from "react";
import { CamlThemeProvider } from "../src/CamlThemeProvider";

export function CamlTestWrapper({ children }: { children: React.ReactNode }) {
  return <CamlThemeProvider>{children}</CamlThemeProvider>;
}
