import { j as jsxRuntimeExports } from './jsx-runtime-CnAZtZDD.js';
import { CamlBlockRenderer } from './CamlBlocks-BTq6fcxu.js';
import { C as ChapterSection, a as ChapterKicker, b as ChapterTitle } from './styles-ByboONQ0.js';
import './index-DcBwYBkJ.js';
import './safeHref-CpMkLtNn.js';
import './CamlMarkdown-KQT48G6J.js';
import './styled-components.browser.esm-DEl3sloC.js';

const CamlChapterRenderer = ({
  chapter,
  stats,
  renderMarkdown,
  renderAnnotationEmbed
}) => {
  const isDark = chapter.theme === "dark" || chapter.gradient;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ChapterSection,
    {
      id: chapter.id,
      $theme: chapter.theme,
      $gradient: chapter.gradient,
      $centered: chapter.centered,
      children: [
        chapter.kicker && /* @__PURE__ */ jsxRuntimeExports.jsx(ChapterKicker, { $dark: isDark, children: chapter.kicker }),
        chapter.title && /* @__PURE__ */ jsxRuntimeExports.jsx(ChapterTitle, { $dark: isDark, children: chapter.title }),
        chapter.blocks.map((block, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CamlBlockRenderer,
          {
            block,
            dark: isDark,
            stats,
            renderMarkdown,
            renderAnnotationEmbed
          },
          index
        ))
      ]
    }
  );
};

export { CamlChapterRenderer };
//# sourceMappingURL=CamlChapter-B0Ruv8NG.js.map
