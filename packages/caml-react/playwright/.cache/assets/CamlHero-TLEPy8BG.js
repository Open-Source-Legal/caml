import { j as jsxRuntimeExports } from './jsx-runtime-CnAZtZDD.js';
import { R as React } from './index-DcBwYBkJ.js';
import { Y as HeroAccent, Z as HeroSection, _ as HeroKicker, $ as HeroTitle, a0 as HeroSubtitle, a1 as HeroStats, a2 as HeroStat } from './styles-ByboONQ0.js';
import './styled-components.browser.esm-DEl3sloC.js';

function renderTitleLine(line, index) {
  const parts = line.split(/(\{[^}]+\})/);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
    index > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    parts.map((part, i) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HeroAccent, { children: part.slice(1, -1) }, i);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(React.Fragment, { children: part }, i);
    })
  ] }, index);
}
const CamlHeroRenderer = ({ hero }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(HeroSection, { children: [
    hero.kicker && /* @__PURE__ */ jsxRuntimeExports.jsx(HeroKicker, { children: hero.kicker }),
    hero.title && /* @__PURE__ */ jsxRuntimeExports.jsx(HeroTitle, { children: (Array.isArray(hero.title) ? hero.title : [hero.title]).map(
      (line, i) => renderTitleLine(String(line), i)
    ) }),
    hero.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSubtitle, { children: hero.subtitle }),
    hero.stats && Array.isArray(hero.stats) && hero.stats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStats, { children: hero.stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HeroStat, { children: stat }, i)) })
  ] });
};

export { CamlHeroRenderer };
//# sourceMappingURL=CamlHero-TLEPy8BG.js.map
