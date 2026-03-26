import { j as jsxRuntimeExports } from './jsx-runtime-CnAZtZDD.js';
import { CamlHeroRenderer } from './CamlHero-TLEPy8BG.js';
import { CamlChapterRenderer } from './CamlChapter-B0Ruv8NG.js';
import { CamlFooterRenderer } from './CamlFooter-D4M1Ll5m.js';
import { A as ArticleContainer } from './styles-ByboONQ0.js';
import './index-DcBwYBkJ.js';
import './CamlBlocks-BTq6fcxu.js';
import './safeHref-CpMkLtNn.js';
import './CamlMarkdown-KQT48G6J.js';
import './styled-components.browser.esm-DEl3sloC.js';

const CamlArticle = ({
  document: doc,
  stats,
  renderMarkdown,
  renderAnnotationEmbed
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ArticleContainer, { children: [
    doc.frontmatter.hero && /* @__PURE__ */ jsxRuntimeExports.jsx(CamlHeroRenderer, { hero: doc.frontmatter.hero }),
    doc.chapters.map((chapter) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      CamlChapterRenderer,
      {
        chapter,
        stats,
        renderMarkdown,
        renderAnnotationEmbed
      },
      chapter.id
    )),
    doc.frontmatter.footer && /* @__PURE__ */ jsxRuntimeExports.jsx(CamlFooterRenderer, { footer: doc.frontmatter.footer })
  ] });
};

export { CamlArticle };
//# sourceMappingURL=CamlArticle-BgsbKHKa.js.map
