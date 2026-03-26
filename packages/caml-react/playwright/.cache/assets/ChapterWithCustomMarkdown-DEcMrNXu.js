import { j as jsxRuntimeExports } from './jsx-runtime-CnAZtZDD.js';
import { CamlChapterRenderer } from './CamlChapter-B0Ruv8NG.js';
import { CamlTestWrapper } from './CamlTestWrapper-Ubhf7hJ-.js';
import './index-DcBwYBkJ.js';
import './CamlBlocks-BTq6fcxu.js';
import './safeHref-CpMkLtNn.js';
import './CamlMarkdown-KQT48G6J.js';
import './styles-ByboONQ0.js';
import './styled-components.browser.esm-DEl3sloC.js';

function ChapterWithCustomMarkdown({
  chapter
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CamlTestWrapper, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    CamlChapterRenderer,
    {
      chapter,
      renderMarkdown: (content) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-testid": "custom-md", children: content })
    }
  ) });
}

export { ChapterWithCustomMarkdown };
//# sourceMappingURL=ChapterWithCustomMarkdown-DEcMrNXu.js.map
