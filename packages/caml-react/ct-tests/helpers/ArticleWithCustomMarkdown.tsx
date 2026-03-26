import React from "react";
import type { CamlDocument } from "@os-legal/caml";
import { CamlArticle } from "../../src/CamlArticle";
import { CamlTestWrapper } from "../CamlTestWrapper";

export function ArticleWithCustomMarkdown({
  document,
}: {
  document: CamlDocument;
}) {
  return (
    <CamlTestWrapper>
      <CamlArticle
        document={document}
        renderMarkdown={(content: string) => (
          <div data-testid="custom-md">{content}</div>
        )}
      />
    </CamlTestWrapper>
  );
}
