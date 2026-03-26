const SAFE_URL_PATTERN = /^(https?:\/\/|\/|#)/i;
function isSafeHref(href) {
  if (!href) return false;
  return SAFE_URL_PATTERN.test(href.trim());
}
function isExternalHref(href) {
  return href.startsWith("http");
}

export { isExternalHref as a, isSafeHref as i };
//# sourceMappingURL=safeHref-CpMkLtNn.js.map
