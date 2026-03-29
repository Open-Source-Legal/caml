import React from "react";

import type { CamlHero } from "@os-legal/caml";
import {
  HeroSection,
  HeroKicker,
  HeroTitle,
  HeroAccent,
  HeroSubtitle,
  HeroStats,
  HeroStat,
} from "./styles";

export interface CamlHeroRendererProps {
  hero: CamlHero;
}

/**
 * Render a title line, wrapping {text} in accent spans.
 */
function renderTitleLine(line: string, index: number): React.ReactNode {
  const parts = line.split(/(\{[^{}]+\})/);
  return (
    <React.Fragment key={index}>
      {index > 0 && <br />}
      {parts.map((part, i) => {
        if (part.startsWith("{") && part.endsWith("}")) {
          return <HeroAccent key={i}>{part.slice(1, -1)}</HeroAccent>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </React.Fragment>
  );
}

export const CamlHeroRenderer: React.FC<CamlHeroRendererProps> = ({ hero }) => {
  return (
    <HeroSection>
      {hero.kicker && <HeroKicker>{hero.kicker}</HeroKicker>}

      {hero.title && (
        <HeroTitle>
          {(Array.isArray(hero.title) ? hero.title : [hero.title]).map(
            (line, i) => renderTitleLine(String(line), i)
          )}
        </HeroTitle>
      )}

      {hero.subtitle && <HeroSubtitle>{hero.subtitle}</HeroSubtitle>}

      {hero.stats && Array.isArray(hero.stats) && hero.stats.length > 0 && (
        <HeroStats>
          {hero.stats.map((stat, i) => (
            <HeroStat key={i}>{stat}</HeroStat>
          ))}
        </HeroStats>
      )}
    </HeroSection>
  );
};
