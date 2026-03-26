import React from "react";

import type { CamlFooter } from "@os-legal/caml";
import { isSafeHref, isExternalHref } from "./safeHref";
import { FooterSection, FooterNav, FooterLink, FooterNotice } from "./styles";

export interface CamlFooterRendererProps {
  footer: CamlFooter;
}

export const CamlFooterRenderer: React.FC<CamlFooterRendererProps> = ({
  footer,
}) => {
  return (
    <FooterSection>
      {footer.nav && footer.nav.length > 0 && (
        <FooterNav>
          {footer.nav.map((item, i) => {
            if (!isSafeHref(item.href)) return null;
            return (
              <FooterLink
                key={i}
                href={item.href}
                target={isExternalHref(item.href) ? "_blank" : undefined}
                rel={
                  isExternalHref(item.href) ? "noopener noreferrer" : undefined
                }
              >
                {item.label}
              </FooterLink>
            );
          })}
        </FooterNav>
      )}

      {footer.notice && <FooterNotice>{footer.notice}</FooterNotice>}
    </FooterSection>
  );
};
