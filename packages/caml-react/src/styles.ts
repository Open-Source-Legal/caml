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
  line-height: 1.7;
  font-size: 1.0625rem;
  overflow-x: hidden;
`;

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const HeroSection = styled.header`
  text-align: center;
  padding: 4rem 1.5rem 3rem;
  max-width: 800px;
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
  padding: 4rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;

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
      padding-left: calc((100% - 800px) / 2 + 1.5rem);
      padding-right: calc((100% - 800px) / 2 + 1.5rem);
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
      padding-left: calc((100% - 800px) / 2 + 1.5rem);
      padding-right: calc((100% - 800px) / 2 + 1.5rem);
    `}
`;

export const ChapterKicker = styled.p<{ $dark?: boolean }>`
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $dark, theme }) =>
    $dark ? theme.caml.colors.textMuted : theme.caml.colors.textSecondary};
  margin-bottom: 0.75rem;
  font-weight: 600;
`;

export const ChapterTitle = styled.h2<{ $dark?: boolean }>`
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: ${({ $dark, theme }) =>
    $dark ? theme.caml.colors.surfaceLight : theme.caml.colors.heading};
`;

// ---------------------------------------------------------------------------
// Prose
// ---------------------------------------------------------------------------

export const ProseContainer = styled.div<{ $dark?: boolean }>`
  margin-bottom: 1.5rem;

  p {
    margin-bottom: 1rem;
    color: ${({ $dark, theme }) =>
      $dark ? theme.caml.colors.darkProse : theme.caml.colors.proseText};
  }

  strong {
    font-weight: 600;
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
  border-left: 4px solid ${({ theme }) => theme.caml.colors.accent};
  padding: 1rem 1.5rem;
  margin: 2rem 0;
  font-family: ${({ theme }) => theme.caml.typography.fontFamilySerif};
  font-size: 1.1875rem;
  font-style: italic;
  color: ${({ theme }) => theme.caml.colors.textPrimary};
  background: ${({ theme }) => theme.caml.accentAlpha(0.04)};
  border-radius: 0 8px 8px 0;
`;

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

export const CardsGrid = styled.div<{ $columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns || 2}, 1fr);
  gap: 1rem;
  margin: 1.5rem 0;

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
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
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
  margin: 1.5rem 0;
`;

export const PillCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: ${({ theme }) => theme.caml.colors.surface};
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 10px;
  padding: 1rem 1.25rem;
  flex: 1 1 200px;
  min-width: 200px;
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
  margin: 2rem 0;
  border: 1px solid ${({ theme }) => theme.caml.colors.border};
  border-radius: 12px;
  overflow: hidden;
  background: ${({ theme }) => theme.caml.colors.surface};
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
  margin: 2rem 0;
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
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.caml.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

export const TimelineLabel = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.caml.colors.textPrimary};
  margin: 0.125rem 0 0;
`;

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

export const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin: 2rem 0;
`;

export const CtaButton = styled.a<{ $primary?: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;

  ${({ $primary }) =>
    $primary
      ? css`
          background: ${({ theme }) => theme.caml.colors.accent};
          color: ${({ theme }) => theme.caml.colors.surface};
          border: 2px solid ${({ theme }) => theme.caml.colors.accent};

          &:hover {
            background: ${({ theme }) => theme.caml.colors.accentHover};
            border-color: ${({ theme }) => theme.caml.colors.accentHover};
            transform: translateY(-1px);
            box-shadow: 0 4px 12px
              ${({ theme }) => theme.caml.accentAlpha(0.3)};
          }
        `
      : css`
          background: transparent;
          color: ${({ theme }) => theme.caml.colors.accent};
          border: 2px solid ${({ theme }) => theme.caml.colors.accent};

          &:hover {
            background: ${({ theme }) => theme.caml.accentAlpha(0.05)};
            transform: translateY(-1px);
          }
        `}
`;

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------

export const SignupBox = styled.div`
  text-align: center;
  padding: 2.5rem 1.5rem;
  margin: 2rem 0;
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
  padding: 3rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.caml.colors.border};
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
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
  margin: 1.5rem 0;
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
