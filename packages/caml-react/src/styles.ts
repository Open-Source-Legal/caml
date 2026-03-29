/**
 * Styled components for the CAML article renderer.
 *
 * All design tokens are read from the styled-components theme at
 * `theme.caml.*`, which is provided by `<CamlThemeProvider>`.
 */
import styled, { css } from "styled-components";

import type { CamlTheme } from "./theme";

declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme {
    caml: CamlTheme;
  }
}

// ---------------------------------------------------------------------------
// Article shell
// ---------------------------------------------------------------------------

export const ArticleContainer = styled.article`
  width: 100%;
  min-height: 100vh;
  color: ${({ theme }) => theme.caml.colors.textPrimary};
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySans};
  line-height: 1.8;
  font-size: 1.0625rem;
  overflow-x: hidden;
`;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HeroSection = styled.header`
  text-align: center;
  padding: 4rem 1.5rem 2.5rem;
  max-width: 720px;
  margin: 0 auto;
`;

export const HeroKicker = styled.p`
  font-size: 0.8125rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.caml.colors.textSecondary};
  margin-bottom: 1.5rem;
  font-weight: 500;
`;

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.caml.colors.heading};
`;

export const HeroAccent = styled.span`
  color: ${({ theme }) => theme.caml.colors.accent};
`;

export const HeroSubtitle = styled.p`
  font-size: 1.1875rem;
  color: ${({ theme }) => theme.caml.colors.textTertiary};
  max-width: 640px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

export const HeroStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

export const HeroStat = styled.span`
  display: inline-flex;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.8125rem;
  font-weight: 500;
  background: ${({ theme }) => theme.caml.colors.surfaceLight};
  color: ${({ theme }) => theme.caml.colors.textTertiary};
`;

// ---------------------------------------------------------------------------
// Chapter
// ---------------------------------------------------------------------------

export const ChapterSection = styled.section<{
  $theme?: "light" | "dark";
  $gradient?: boolean;
  $centered?: boolean;
}>`
  padding: 3rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${({ $centered }) =>
    $centered &&
    css`
      text-align: center;
    `}

  ${({ $theme }) =>
    $theme === "dark" &&
    css`
      background: ${({ theme }) => theme.caml.colors.heading};
      color: ${({ theme }) => theme.caml.colors.border};
      max-width: 100%;
      padding: 3rem calc((100% - 720px) / 2 + 2rem);
    `}

  ${({ $gradient }) =>
    $gradient &&
    css`
      background: linear-gradient(
        135deg,
        ${({ theme }) => theme.caml.colors.heading} 0%,
        ${({ theme }) => theme.caml.colors.textPrimary} 100%
      );
      color: ${({ theme }) => theme.caml.colors.border};
      max-width: 100%;
      padding: 3rem calc((100% - 720px) / 2 + 2rem);
    `}
`;

export const ChapterHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChapterKicker = styled.p<{ $dark?: boolean }>`
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $dark, theme }) =>
    $dark ? theme.caml.colors.textMuted : theme.caml.colors.textSecondary};
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const ChapterTitle = styled.h2<{ $dark?: boolean }>`
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
  font-size: clamp(1.625rem, 4vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.5rem;
  color: ${({ $dark, theme }) =>
    $dark ? theme.caml.colors.surfaceLight : theme.caml.colors.heading};
`;

// ---------------------------------------------------------------------------
// Prose
// ---------------------------------------------------------------------------

export const ProseContainer = styled.div<{ $dark?: boolean }>`
  max-width: 720px;
  margin: 0 auto;
  font-size: 1.0625rem;
  line-height: 1.8;

  p {
    margin-bottom: 1.125rem;
    color: ${({ $dark, theme }) =>
      $dark ? theme.caml.colors.darkProse : theme.caml.colors.proseText};
  }

  strong {
    font-weight: 600;
    color: ${({ $dark, theme }) =>
      $dark ? theme.caml.colors.surfaceLight : theme.caml.colors.heading};
  }

  a {
    color: ${({ theme }) => theme.caml.colors.accent};
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  code {
    background: ${({ $dark, theme }) =>
      $dark ? theme.caml.colors.textPrimary : theme.caml.colors.surfaceLight};
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
    font-size: 0.9em;
  }
`;

export const Pullquote = styled.blockquote`
  border-left: 6px solid ${({ theme }) => theme.caml.colors.accent};
  padding: 1.5rem 2rem;
  margin: 2rem 0;
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
  font-size: 1.25rem;
  font-style: italic;
  line-height: 1.7;
  color: ${({ theme }) => theme.caml.colors.heading};
  background: ${({ theme }) => theme.caml.accentAlpha(0.05)};
  border-radius: 0 8px 8px 0;
`;

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

export const CardsGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 2}, 1fr);
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const CardItem = styled.div<{ $accent?: string }>`
  background: ${({ theme }) => theme.caml.colors.surface};
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 10px;
  padding: 1.25rem;
  border-left: 4px solid
    ${({ $accent, theme }) => $accent || theme.caml.colors.border};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
    transform: translateY(-1px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const CardLabel = styled.h3`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.caml.colors.heading};
  margin: 0;
`;

export const CardMeta = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.caml.colors.textSecondary};
  font-family: "SF Mono", Monaco, monospace;
  white-space: nowrap;
`;

export const CardBody = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.caml.colors.textTertiary};
  margin: 0.5rem 0;
  line-height: 1.5;
`;

export const CardFooter = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.caml.colors.textMuted};
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.caml.colors.surfaceLight};
`;

// ---------------------------------------------------------------------------
// Pills
// ---------------------------------------------------------------------------

export const PillsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const PillCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.caml.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 10px;
  padding: 1rem 1.25rem;
  flex: 1 1 200px;
  min-width: 200px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const PillBigText = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.caml.colors.heading};
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
  line-height: 1;
`;

export const PillInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
`;

export const PillLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.caml.colors.heading};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PillDetail = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.caml.colors.textSecondary};
`;

export const PillStatus = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.6875rem;
  font-weight: 600;
  color: ${({ $color, theme }) => $color || theme.caml.colors.textSecondary};

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $color, theme }) =>
      $color || theme.caml.colors.textSecondary};
  }
`;

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

export const TabsContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.caml.colors.surface};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const TabBar = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.caml.colors.border};
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabButton = styled.button<{ $active?: boolean; $color?: string }>`
  padding: 0.75rem 1.25rem;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.caml.colors.surface : theme.caml.colors.surfaceHover};
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ $active, $color, theme }) =>
    $active
      ? $color || theme.caml.colors.accent
      : theme.caml.colors.textSecondary};
  cursor: pointer;
  white-space: nowrap;
  border-bottom: 2px solid
    ${({ $active, $color, theme }) =>
      $active ? $color || theme.caml.colors.accent : "transparent"};
  transition: all 0.15s;

  &:hover {
    background: ${({ theme }) => theme.caml.colors.surface};
    color: ${({ $color, theme }) => $color || theme.caml.colors.accent};
  }
`;

export const TabStatus = styled.span<{ $color?: string }>`
  display: inline-block;
  font-size: 0.6875rem;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  margin-left: 0.5rem;
  background: ${({ $color, theme }) =>
    $color ? `${$color}15` : theme.caml.colors.surfaceLight};
  color: ${({ $color, theme }) => $color || theme.caml.colors.textSecondary};
  font-weight: 500;
`;

export const TabPanel = styled.div`
  padding: 1.5rem;
`;

export const TabSectionHeading = styled.h4<{
  $highlight?: boolean;
  $color?: string;
}>`
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  margin-top: 1.25rem;
  color: ${({ $highlight, $color, theme }) =>
    $highlight
      ? $color || theme.caml.colors.accent
      : theme.caml.colors.textTertiary};

  ${({ $highlight, $color }) =>
    $highlight &&
    css`
      background: ${({ theme }) =>
        $color ? `${$color}08` : theme.caml.accentAlpha(0.04)};
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border-left: 3px solid
        ${({ theme }) => $color || theme.caml.colors.accent};
      margin-left: -1rem;
      margin-right: -1rem;
    `}

  &:first-child {
    margin-top: 0;
  }
`;

export const TabSectionContent = styled.div`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.caml.colors.proseText};
  line-height: 1.65;
  margin-bottom: 0.75rem;
`;

export const TabSources = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.caml.colors.surfaceLight};
`;

export const TabSourceChip = styled.span`
  display: inline-flex;
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  font-size: 0.6875rem;
  font-weight: 500;
  background: ${({ theme }) => theme.caml.colors.surfaceLight};
  color: ${({ theme }) => theme.caml.colors.textTertiary};
  white-space: nowrap;
`;

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

export const TimelineContainer = styled.div`
  position: relative;
  padding-left: 2rem;

  &::before {
    content: "";
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.caml.colors.border};
  }
`;

export const TimelineLegend = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-left: 0;
  position: relative;
`;

export const TimelineLegendItem = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.caml.colors.textSecondary};

  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }
`;

export const TimelineEntry = styled.div`
  position: relative;
  padding-bottom: 1.25rem;
  padding-left: 0.75rem;
`;

export const TimelineDot = styled.span<{ $color?: string }>`
  position: absolute;
  left: -2rem;
  top: 0.4rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $color, theme }) => $color || theme.caml.colors.textMuted};
  border: 2px solid ${({ theme }) => theme.caml.colors.surface};
  box-shadow: 0 0 0 2px
    ${({ $color, theme }) =>
      $color ? `${$color}30` : theme.caml.colors.border};
`;

export const TimelineDate = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: inherit;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

export const TimelineLabel = styled.p`
  font-size: 1rem;
  color: inherit;
  margin: 0.25rem 0 0;
  line-height: 1.5;
`;

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

export const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const CtaButton = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
  letter-spacing: 0.01em;

  ${({ $primary }) =>
    $primary
      ? css`
          background: ${({ theme }) => theme.caml.colors.accent};
          color: ${({ theme }) => theme.caml.colors.surface};
          border: 2px solid ${({ theme }) => theme.caml.colors.accent};
          box-shadow: 0 2px 8px ${({ theme }) => theme.caml.accentAlpha(0.2)};

          &:hover {
            background: ${({ theme }) => theme.caml.colors.accentHover};
            border-color: ${({ theme }) => theme.caml.colors.accentHover};
            transform: translateY(-2px);
            box-shadow: 0 6px 16px
              ${({ theme }) => theme.caml.accentAlpha(0.35)};
          }
        `
      : css`
          background: transparent;
          color: ${({ theme }) => theme.caml.colors.accent};
          border: 2px solid ${({ theme }) => theme.caml.colors.accent};

          &:hover {
            background: ${({ theme }) => theme.caml.accentAlpha(0.05)};
            transform: translateY(-1px);
            box-shadow: 0 2px 8px ${({ theme }) => theme.caml.accentAlpha(0.1)};
          }
        `}
`;

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------

export const SignupBox = styled.div`
  text-align: center;
  padding: 2.5rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.caml.colors.surfaceHover};
`;

export const SignupTitle = styled.h3`
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.caml.colors.heading};
  margin-bottom: 0.75rem;
`;

export const SignupBody = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.caml.colors.textTertiary};
  max-width: 480px;
  margin: 0 auto 1.5rem;
`;

export const SignupButton = styled.button`
  padding: 0.625rem 1.5rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.caml.colors.accent};
  color: ${({ theme }) => theme.caml.colors.surface};
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.caml.colors.accentHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const FooterSection = styled.footer`
  padding: 3rem 1.5rem 2.5rem;
  border-top: 2px solid ${({ theme }) => theme.caml.colors.border};
  background: ${({ theme }) => theme.caml.colors.surfaceHover};
  text-align: center;
  max-width: 100%;
`;

export const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

export const FooterLink = styled.a`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.caml.colors.accent};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const FooterNotice = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.caml.colors.textMuted};
`;

// ---------------------------------------------------------------------------
// Corpus Stats
// ---------------------------------------------------------------------------

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

export const StatCard = styled.div`
  text-align: center;
  padding: 1rem;
  background: ${({ theme }) => theme.caml.colors.surfaceHover};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
`;

export const StatValue = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.caml.colors.accent};
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.caml.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
`;

// ---------------------------------------------------------------------------
// Map (Tile Grid)
// ---------------------------------------------------------------------------

export const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 12px;
  padding: 1.5rem;
  background: ${({ theme }) => theme.caml.colors.surface};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const MapGrid = styled.div<{ $cols: number; $rows: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $cols }) => $cols}, 1fr);
  grid-template-rows: repeat(${({ $rows }) => $rows}, 1fr);
  gap: 2px;
  max-width: 600px;
  margin: 0 auto;
  width: 100%;
`;

export const MapTile = styled.div<{ $color?: string; $clickable?: boolean }>`
  aspect-ratio: 1;
  border-radius: 3px;
  background: ${({ $color }) => $color || "transparent"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.5625rem;
  font-weight: 600;
  color: white;
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};
  position: relative;
  transition: transform 0.15s, box-shadow 0.15s;
  user-select: none;
  gap: 0;
  line-height: 1;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
`;

export const MapTileEmpty = styled.div`
  aspect-ratio: 1;
`;

export const MapLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

export const MapLegendItem = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.caml.colors.textSecondary};

  &::before {
    content: "";
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: ${({ $color }) => $color};
  }
`;

export const MapTileCount = styled.span`
  font-size: 0.4375rem;
  font-weight: 500;
  opacity: 0.85;
  line-height: 1;
  margin-top: 1px;
`;

export const MapTileLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: inherit;
  text-decoration: none;
  gap: 0;
  line-height: 1;
`;

export const MapTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.caml.colors.heading};
  color: ${({ theme }) => theme.caml.colors.surface};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.6875rem;
  font-weight: 500;
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${({ theme }) => theme.caml.colors.heading};
  }
`;

export const MapHeatmapLegend = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
`;

export const MapHeatmapGradient = styled.div<{
  $low: string;
  $high: string;
}>`
  width: 120px;
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(to right, ${({ $low }) => $low}, ${({ $high }) => $high});
`;

export const MapHeatmapLabel = styled.span`
  font-size: 0.6875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.caml.colors.textSecondary};
  font-variant-numeric: tabular-nums;
`;

// ---------------------------------------------------------------------------
// Case History
// ---------------------------------------------------------------------------

export const CaseHistoryContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.caml.colors.surface};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

export const CaseHistoryHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.caml.colors.border};
  background: ${({ theme }) => theme.caml.colors.surfaceHover};
`;

export const CaseHistoryTitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const CaseHistoryTitle = styled.h3`
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.caml.colors.heading};
  margin: 0;
`;

export const CaseHistoryDocket = styled.span`
  font-size: 0.8125rem;
  font-family: "SF Mono", Monaco, monospace;
  color: ${({ theme }) => theme.caml.colors.textSecondary};
  margin-top: 0.25rem;
`;

export const CaseHistoryStatusBadge = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $color }) => ($color ? `${$color}15` : "rgba(100,116,139,0.1)")};
  color: ${({ $color, theme }) => $color || theme.caml.colors.textSecondary};
  white-space: nowrap;
`;

export const CaseHistoryTimeline = styled.div`
  position: relative;
  padding: 1.5rem;
  padding-left: 3rem;

  &::before {
    content: "";
    position: absolute;
    left: 1.75rem;
    top: 1.5rem;
    bottom: 1.5rem;
    width: 2px;
    background: ${({ theme }) => theme.caml.colors.border};
  }
`;

export const CaseHistoryEntry = styled.div`
  position: relative;
  padding-bottom: 1.5rem;

  &:last-child {
    padding-bottom: 0;
  }
`;

export const CaseHistoryDot = styled.span<{ $color?: string }>`
  position: absolute;
  left: -1.75rem;
  top: 0.25rem;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${({ $color, theme }) => $color || theme.caml.colors.textMuted};
  border: 2px solid ${({ theme }) => theme.caml.colors.surface};
  box-shadow: 0 0 0 2px
    ${({ $color, theme }) =>
      $color ? `${$color}30` : theme.caml.colors.border};
`;

export const CaseHistoryEntryCard = styled.div`
  background: ${({ theme }) => theme.caml.colors.surfaceHover};
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 8px;
  padding: 1rem 1.25rem;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const CaseHistoryEntryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.375rem;
`;

export const CaseHistoryCourtBadge = styled.span<{ $level?: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ theme }) => theme.caml.colors.accent};

  &::before {
    content: "";
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: ${({ theme }) => theme.caml.colors.accent};
  }
`;

export const CaseHistoryOutcome = styled.span<{ $color?: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.6875rem;
  font-weight: 600;
  background: ${({ $color }) => ($color ? `${$color}15` : "rgba(100,116,139,0.1)")};
  color: ${({ $color, theme }) => $color || theme.caml.colors.textSecondary};
`;

export const CaseHistoryMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.caml.colors.textSecondary};
  margin-bottom: 0.25rem;
`;

export const CaseHistoryAction = styled.span`
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.caml.colors.heading};
`;

export const CaseHistoryDetail = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.caml.colors.textTertiary};
  line-height: 1.5;
  margin: 0.5rem 0 0;
`;

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------

const imageSizeMap = {
  sm: "48px",
  md: "80px",
  lg: "120px",
  xl: "200px",
};

const imageBorderRadiusMap = {
  square: "0",
  rounded: "12px",
  avatar: "50%",
};

export const ImageBlockContainer = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin: 2rem 0;
  padding: 0;
`;

export const ImageBlockImg = styled.img<{
  $size?: "sm" | "md" | "lg" | "xl";
  $shape?: "square" | "rounded" | "avatar";
}>`
  width: ${({ $size }) => imageSizeMap[$size ?? "md"]};
  height: ${({ $size }) => imageSizeMap[$size ?? "md"]};
  border-radius: ${({ $shape }) => imageBorderRadiusMap[$shape ?? "rounded"]};
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

export const ImageBlockCaption = styled.figcaption`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.caml.colors.textSecondary};
  text-align: center;
`;
