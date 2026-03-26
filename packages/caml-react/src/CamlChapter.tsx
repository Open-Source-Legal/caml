import React from "react";
import type { ReactNode } from "react";

import type { CamlChapter, CamlBlock } from "@os-legal/caml";
import type { CamlStats } from "./theme";
import { CamlBlockRenderer } from "./CamlBlocks";
import { ChapterSection, ChapterKicker, ChapterTitle } from "./styles";

export interface CamlChapterRendererProps {
  chapter: CamlChapter;
  stats?: CamlStats;
  renderMarkdown?: (content: string) => ReactNode;
  renderAnnotationEmbed?: (ref: string) => ReactNode;
}

export const CamlChapterRenderer: React.FC<CamlChapterRendererProps> = ({
  chapter,
  stats,
  renderMarkdown,
  renderAnnotationEmbed,
}) => {
  const isDark = chapter.theme === "dark" || chapter.gradient;

  return (
    <ChapterSection
      id={chapter.id}
      $theme={chapter.theme}
      $gradient={chapter.gradient}
      $centered={chapter.centered}
    >
      {chapter.kicker && (
        <ChapterKicker $dark={isDark}>{chapter.kicker}</ChapterKicker>
      )}

      {chapter.title && (
        <ChapterTitle $dark={isDark}>{chapter.title}</ChapterTitle>
      )}

      {chapter.blocks.map((block: CamlBlock, index: number) => (
        <CamlBlockRenderer
          key={index}
          block={block}
          dark={isDark}
          stats={stats}
          renderMarkdown={renderMarkdown}
          renderAnnotationEmbed={renderAnnotationEmbed}
        />
      ))}
    </ChapterSection>
  );
};
