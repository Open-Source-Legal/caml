import { j as jsxRuntimeExports } from './jsx-runtime-CnAZtZDD.js';
import { r as reactExports } from './index-DcBwYBkJ.js';
import { e as et } from './styled-components.browser.esm-DEl3sloC.js';

const defaultCamlTheme = {
  colors: {
    accent: "#0f766e",
    accentHover: "#0d6860",
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    textTertiary: "#475569",
    textMuted: "#94a3b8",
    surface: "white",
    surfaceLight: "#f1f5f9",
    surfaceHover: "#f8fafc",
    border: "#e2e8f0",
    heading: "#0f172a",
    proseText: "#334155",
    darkProse: "#cbd5e1"
  },
  typography: {
    fontFamilySans: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontFamilySerif: '"Georgia", "Times New Roman", serif'
  },
  accentAlpha: (opacity) => `rgba(15, 118, 110, ${opacity})`
};
function deepMerge(base, overrides) {
  if (!overrides) return base;
  return {
    colors: { ...base.colors, ...overrides.colors },
    typography: { ...base.typography, ...overrides.typography },
    accentAlpha: overrides.accentAlpha ?? base.accentAlpha
  };
}

const CamlThemeContext = reactExports.createContext(defaultCamlTheme);
const useCamlTheme = () => reactExports.useContext(CamlThemeContext);
function CamlThemeProvider({
  theme: overrides,
  children
}) {
  const merged = deepMerge(defaultCamlTheme, overrides);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CamlThemeContext.Provider, { value: merged, children: /* @__PURE__ */ jsxRuntimeExports.jsx(et, { theme: (outerTheme) => ({ ...outerTheme, caml: merged }), children }) });
}

function CamlTestWrapper({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CamlThemeProvider, { children });
}

export { CamlTestWrapper };
//# sourceMappingURL=CamlTestWrapper-Ubhf7hJ-.js.map
