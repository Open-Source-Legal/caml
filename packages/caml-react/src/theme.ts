// ---------------------------------------------------------------------------
// CamlTheme — token interface for theming CAML articles
// ---------------------------------------------------------------------------

export interface CamlTheme {
  colors: {
    accent: string;
    accentHover: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textMuted: string;
    surface: string;
    surfaceLight: string;
    surfaceHover: string;
    border: string;
    heading: string;
    proseText: string;
    darkProse: string;
  };
  typography: {
    fontFamilySans: string;
    fontFamilySerif: string;
  };
  accentAlpha: (opacity: number) => string;
}

// ---------------------------------------------------------------------------
// CamlStats — shared stats shape for corpus-stats blocks
// ---------------------------------------------------------------------------

export interface CamlStats {
  annotations?: number;
  documents?: number;
  contributors?: number;
  threads?: number;
}

// ---------------------------------------------------------------------------
// Default theme — matches OS Legal design system values
// ---------------------------------------------------------------------------

export const defaultCamlTheme: CamlTheme = {
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
    darkProse: "#cbd5e1",
  },
  typography: {
    fontFamilySans: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    fontFamilySerif: '"Georgia", "Times New Roman", serif',
  },
  accentAlpha: (opacity: number) => `rgba(15, 118, 110, ${opacity})`,
};

// ---------------------------------------------------------------------------
// Internal utilities
// ---------------------------------------------------------------------------

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (...args: any[]) => any
    ? T[P]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
};

export function deepMerge(
  base: CamlTheme,
  overrides?: DeepPartial<CamlTheme>
): CamlTheme {
  if (!overrides) return base;
  return {
    colors: { ...base.colors, ...overrides.colors },
    typography: { ...base.typography, ...overrides.typography },
    accentAlpha: overrides.accentAlpha ?? base.accentAlpha,
  };
}
