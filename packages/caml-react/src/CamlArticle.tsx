/**
 * CamlArticle -- Top-level renderer for a parsed CAML document.
 *
 * Takes a CamlDocument (JSON IR from the parser) and renders the full
 * scrollytelling article: hero, chapters with blocks, and footer.
 */
import React from "react";
import type { ReactNode } from "react";

import type { CamlDocument, CamlBlock } from "@os-legal/caml";
import type { CamlStats } from "./theme";
import { CamlHeroRenderer } from "./CamlHero";
import { CamlChapterRenderer } from "./CamlChapter";
import { CamlFooterRenderer } from "./CamlFooter";
import { ArticleContainer } from "./styles";

export type CustomBlockRenderer = (block: CamlBlock) => ReactNode;

export interface CamlArticleProps {
  document: CamlDocument;
  stats?: CamlStats;
  renderMarkdown?: (content: string) => ReactNode;
  renderAnnotationEmbed?: (ref: string) => ReactNode;
  customBlocks?: Record<string, CustomBlockRenderer>;
}

export const CamlArticle: React.FC<CamlArticleProps> = ({
  document: doc,
  stats,
  renderMarkdown,
  renderAnnotationEmbed,
  customBlocks,
}) => {
  // Merge renderAnnotationEmbed into customBlocks for backward compat
  const mergedBlocks: Record<string, CustomBlockRenderer> = {
    ...(renderAnnotationEmbed
      ? { "annotation-embed": (b) => renderAnnotationEmbed((b as { ref: string }).ref) }
      : {}),
    ...customBlocks,
  };

  const hasCustomBlocks = Object.keys(mergedBlocks).length > 0;

  return (
    <ArticleContainer>
      {doc.frontmatter.hero && <CamlHeroRenderer hero={doc.frontmatter.hero} />}

      {doc.chapters.map((chapter) => (
        <CamlChapterRenderer
          key={chapter.id}
          chapter={chapter}
          stats={stats}
          renderMarkdown={renderMarkdown}
          renderAnnotationEmbed={renderAnnotationEmbed}
          customBlocks={hasCustomBlocks ? mergedBlocks : undefined}
        />
      ))}

      {doc.frontmatter.footer && (
        <CamlFooterRenderer footer={doc.frontmatter.footer} />
      )}
    </ArticleContainer>
  );
};
