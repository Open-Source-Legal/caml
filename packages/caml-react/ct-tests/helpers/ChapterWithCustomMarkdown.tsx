import React from "react";
import type { CamlChapter } from "@os-legal/caml";
import { CamlChapterRenderer } from "../../src/CamlChapter";
import { CamlTestWrapper } from "../CamlTestWrapper";

export function ChapterWithCustomMarkdown({
  chapter,
}: {
  chapter: CamlChapter;
}) {
  return (
    <CamlTestWrapper>
      <CamlChapterRenderer
        chapter={chapter}
        renderMarkdown={(content: string) => (
          <div data-testid="custom-md">{content}</div>
        )}
      />
    </CamlTestWrapper>
  );
}
