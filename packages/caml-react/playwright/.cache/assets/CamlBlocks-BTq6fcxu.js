import { j as jsxRuntimeExports } from './jsx-runtime-CnAZtZDD.js';
import { R as React, r as reactExports } from './index-DcBwYBkJ.js';
import { i as isSafeHref, a as isExternalHref } from './safeHref-CpMkLtNn.js';
import { CamlMarkdown } from './CamlMarkdown-KQT48G6J.js';
import { P as ProseContainer, c as Pullquote, d as CardsGrid, e as CardItem, f as CardHeader, g as CardLabel, h as CardMeta, i as CardBody, j as CardFooter, k as PillsRow, l as PillCard, m as PillBigText, n as PillInfo, o as PillLabel, p as PillDetail, q as PillStatus, T as TabsContainer, r as TabBar, s as TabButton, t as TabStatus, u as TabPanel, v as TabSectionHeading, w as TabSectionContent, x as TabSources, y as TabSourceChip, z as TimelineLegend, B as TimelineLegendItem, D as TimelineContainer, E as TimelineEntry, F as TimelineDot, G as TimelineDate, H as TimelineLabel, I as CtaRow, J as CtaButton, S as SignupBox, K as SignupTitle, L as SignupBody, M as SignupButton, N as StatsGrid, O as StatCard, Q as StatValue, R as StatLabel } from './styles-ByboONQ0.js';
import './styled-components.browser.esm-DEl3sloC.js';

const CamlBlockRenderer = ({
  block,
  dark,
  stats,
  renderMarkdown,
  renderAnnotationEmbed
}) => {
  switch (block.type) {
    case "prose":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ProseBlock, { block, dark, renderMarkdown });
    case "cards":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CardsBlock, { block });
    case "pills":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PillsBlock, { block });
    case "tabs":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TabsBlock, { block, renderMarkdown });
    case "timeline":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineBlock, { block });
    case "cta":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CtaBlock, { block });
    case "signup":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SignupBlock, { block });
    case "corpus-stats":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CorpusStatsBlock, { block, stats });
    case "annotation-embed":
      return renderAnnotationEmbed ? renderAnnotationEmbed(block.ref) : /* @__PURE__ */ jsxRuntimeExports.jsx(ProseContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: "Annotation embed (coming soon)" }) });
    default:
      return null;
  }
};
function ProseBlock({
  block,
  dark,
  renderMarkdown
}) {
  const segments = splitPullquotes(block.content);
  const renderMd = (content) => renderMarkdown ? renderMarkdown(content) : /* @__PURE__ */ jsxRuntimeExports.jsx(CamlMarkdown, { content });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProseContainer, { $dark: dark, children: segments.map((seg, i) => {
    if (seg.type === "pullquote") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Pullquote, { children: seg.text }, i);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(React.Fragment, { children: renderMd(seg.text) }, i);
  }) });
}
function splitPullquotes(content) {
  const lines = content.split("\n");
  const segments = [];
  let currentProse = [];
  let currentPullquote = [];
  const flushProse = () => {
    const text = currentProse.join("\n").trim();
    if (text) segments.push({ type: "prose", text });
    currentProse = [];
  };
  const flushPullquote = () => {
    const text = currentPullquote.join(" ").trim();
    if (text) segments.push({ type: "pullquote", text });
    currentPullquote = [];
  };
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith(">>>")) {
      if (currentProse.length > 0) flushProse();
      const pqText = trimmed.slice(3).trim().replace(/^"|"$/g, "");
      currentPullquote.push(pqText);
    } else {
      if (currentPullquote.length > 0) flushPullquote();
      currentProse.push(line);
    }
  }
  if (currentPullquote.length > 0) flushPullquote();
  if (currentProse.length > 0) flushProse();
  return segments;
}
function CardsBlock({ block }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CardsGrid, { $columns: block.columns, children: block.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(CardItem, { $accent: item.accent, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardLabel, { children: item.label }),
      item.meta && /* @__PURE__ */ jsxRuntimeExports.jsx(CardMeta, { children: item.meta })
    ] }),
    item.body && /* @__PURE__ */ jsxRuntimeExports.jsx(CardBody, { children: item.body }),
    item.footer && /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: item.footer })
  ] }, i)) });
}
function PillsBlock({ block }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PillsRow, { children: block.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(PillCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PillBigText, { children: item.bigText }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PillInfo, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PillLabel, { children: item.label }),
      item.detail && /* @__PURE__ */ jsxRuntimeExports.jsx(PillDetail, { children: item.detail }),
      item.status && /* @__PURE__ */ jsxRuntimeExports.jsx(PillStatus, { $color: item.statusColor, children: item.status })
    ] })
  ] }, i)) });
}
function TabsBlock({
  block,
  renderMarkdown
}) {
  const [activeIndex, setActiveIndex] = reactExports.useState(0);
  const activeTab = block.tabs[activeIndex];
  if (!activeTab) return null;
  const renderMd = (content) => renderMarkdown ? renderMarkdown(content) : /* @__PURE__ */ jsxRuntimeExports.jsx(CamlMarkdown, { content });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContainer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabBar, { children: block.tabs.map((tab, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      TabButton,
      {
        $active: i === activeIndex,
        $color: tab.color,
        onClick: () => setActiveIndex(i),
        children: [
          tab.label,
          tab.status && /* @__PURE__ */ jsxRuntimeExports.jsx(TabStatus, { $color: tab.color, children: tab.status })
        ]
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabPanel, { children: [
      activeTab.sections.map((section, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
        section.heading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabSectionHeading,
          {
            $highlight: section.highlight,
            $color: activeTab.color,
            children: section.heading
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabSectionContent, { children: renderMd(section.content) })
      ] }, i)),
      activeTab.sources.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TabSources, { children: activeTab.sources.map((source, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabSourceChip, { children: source.name }, i)) })
    ] })
  ] });
}
function TimelineBlock({ block }) {
  const colorMap = new Map(
    block.legend.map((l) => [l.label.toLowerCase(), l.color])
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    block.legend.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineLegend, { children: block.legend.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineLegendItem, { $color: item.color, children: item.label }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineContainer, { children: block.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineEntry, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineDot, { $color: colorMap.get(item.side) || "#94a3b8" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineDate, { children: item.date }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineLabel, { children: item.label })
    ] }, i)) })
  ] });
}
function CtaBlock({ block }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CtaRow, { children: block.items.map((item, i) => {
    if (!isSafeHref(item.href)) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CtaButton,
      {
        href: item.href,
        $primary: item.primary,
        target: isExternalHref(item.href) ? "_blank" : void 0,
        rel: isExternalHref(item.href) ? "noopener noreferrer" : void 0,
        children: item.label
      },
      i
    );
  }) });
}
function SignupBlock({ block }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SignupBox, { children: [
    block.title && /* @__PURE__ */ jsxRuntimeExports.jsx(SignupTitle, { children: block.title }),
    block.body && /* @__PURE__ */ jsxRuntimeExports.jsx(SignupBody, { children: block.body }),
    block.button && /* @__PURE__ */ jsxRuntimeExports.jsx(SignupButton, { disabled: true, children: block.button })
  ] });
}
function CorpusStatsBlock({
  block,
  stats
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StatsGrid, { children: block.items.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(StatCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatValue, { children: stats?.[item.key] ?? "—" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatLabel, { children: item.label })
  ] }, i)) });
}

export { CamlBlockRenderer };
//# sourceMappingURL=CamlBlocks-BTq6fcxu.js.map
