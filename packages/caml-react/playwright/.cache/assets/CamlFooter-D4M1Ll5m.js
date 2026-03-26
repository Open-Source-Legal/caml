import { j as jsxRuntimeExports } from './jsx-runtime-CnAZtZDD.js';
import { i as isSafeHref, a as isExternalHref } from './safeHref-CpMkLtNn.js';
import { U as FooterSection, V as FooterNav, W as FooterLink, X as FooterNotice } from './styles-ByboONQ0.js';
import './index-DcBwYBkJ.js';
import './styled-components.browser.esm-DEl3sloC.js';

const CamlFooterRenderer = ({
  footer
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(FooterSection, { children: [
    footer.nav && footer.nav.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(FooterNav, { children: footer.nav.map((item, i) => {
      if (!isSafeHref(item.href)) return null;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        FooterLink,
        {
          href: item.href,
          target: isExternalHref(item.href) ? "_blank" : void 0,
          rel: isExternalHref(item.href) ? "noopener noreferrer" : void 0,
          children: item.label
        },
        i
      );
    }) }),
    footer.notice && /* @__PURE__ */ jsxRuntimeExports.jsx(FooterNotice, { children: footer.notice })
  ] });
};

export { CamlFooterRenderer };
//# sourceMappingURL=CamlFooter-D4M1Ll5m.js.map
