import React from "react";
import type { CamlDocument } from "@os-legal/caml";
import { CamlArticle } from "../../src/CamlArticle";
import { CamlTestWrapper } from "../CamlTestWrapper";

export function ArticleWithCustomEmbed({
  document,
}: {
  document: CamlDocument;
}) {
  return (
    <CamlTestWrapper>
      <CamlArticle
        document={document}
        renderAnnotationEmbed={(ref: string) => (
          <div data-testid="custom-embed">Embedded: {ref}</div>
        )}
      />
    </CamlTestWrapper>
  );
}
