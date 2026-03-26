/**
 * CamlBlocks -- Renders individual CAML block types.
 *
 * Each block type has its own component. The CamlBlockRenderer dispatches
 * to the correct one based on block.type.
 */
import React, { useState } from "react";
import type { ReactNode } from "react";

import type {
  CamlBlock,
  CamlCards,
  CamlPills,
  CamlTabs,
  CamlTimeline,
  CamlCta,
  CamlSignup,
  CamlCorpusStats,
  CamlProse,
} from "@os-legal/caml";
import { isSafeHref, isExternalHref } from "./safeHref";
import { CamlMarkdown } from "./CamlMarkdown";
import type { CamlStats } from "./theme";
import {
  ProseContainer,
  Pullquote,
  CardsGrid,
  CardItem,
  CardHeader,
  CardLabel,
  CardMeta,
  CardBody,
  CardFooter,
  PillsRow,
  PillCard,
  PillBigText,
  PillInfo,
  PillLabel,
  PillDetail,
  PillStatus,
  TabsContainer,
  TabBar,
  TabButton,
  TabStatus,
  TabPanel,
  TabSectionHeading,
  TabSectionContent,
  TabSources,
  TabSourceChip,
  TimelineContainer,
  TimelineLegend,
  TimelineLegendItem,
  TimelineEntry,
  TimelineDot,
  TimelineDate,
  TimelineLabel,
  CtaRow,
  CtaButton,
  SignupBox,
  SignupTitle,
  SignupBody,
  SignupButton,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
} from "./styles";

interface BlockRendererProps {
  block: CamlBlock;
  dark?: boolean;
  stats?: CamlStats;
  renderMarkdown?: (content: string) => ReactNode;
  renderAnnotationEmbed?: (ref: string) => ReactNode;
}

export const CamlBlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  dark,
  stats,
  renderMarkdown,
  renderAnnotationEmbed,
}) => {
  switch (block.type) {
    case "prose":
      return (
        <ProseBlock block={block} dark={dark} renderMarkdown={renderMarkdown} />
      );
    case "cards":
      return <CardsBlock block={block} />;
    case "pills":
      return <PillsBlock block={block} />;
    case "tabs":
      return <TabsBlock block={block} renderMarkdown={renderMarkdown} />;
    case "timeline":
      return <TimelineBlock block={block} />;
    case "cta":
      return <CtaBlock block={block} />;
    case "signup":
      return <SignupBlock block={block} />;
    case "corpus-stats":
      return <CorpusStatsBlock block={block} stats={stats} />;
    case "annotation-embed":
      return renderAnnotationEmbed ? (
        renderAnnotationEmbed(block.ref)
      ) : (
        <ProseContainer>
          <em>Annotation embed (coming soon)</em>
        </ProseContainer>
      );
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
// Prose
// ---------------------------------------------------------------------------

function ProseBlock({
  block,
  dark,
  renderMarkdown,
}: {
  block: CamlProse;
  dark?: boolean;
  renderMarkdown?: (content: string) => ReactNode;
}) {
  // Split content into pullquotes (>>>) and regular prose
  const segments = splitPullquotes(block.content);
  const renderMd = (content: string) =>
    renderMarkdown ? (
      renderMarkdown(content)
    ) : (
      <CamlMarkdown content={content} />
    );

  return (
    <ProseContainer $dark={dark}>
      {segments.map((seg, i) => {
        if (seg.type === "pullquote") {
          return <Pullquote key={i}>{seg.text}</Pullquote>;
        }
        return <React.Fragment key={i}>{renderMd(seg.text)}</React.Fragment>;
      })}
    </ProseContainer>
  );
}

interface TextSegment {
  type: "prose" | "pullquote";
  text: string;
}

function splitPullquotes(content: string): TextSegment[] {
  const lines = content.split("\n");
  const segments: TextSegment[] = [];
  let currentProse: string[] = [];
  let currentPullquote: string[] = [];

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
      // Strip >>> prefix and quotes
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

// ---------------------------------------------------------------------------
// Cards
// ---------------------------------------------------------------------------

function CardsBlock({ block }: { block: CamlCards }) {
  return (
    <CardsGrid $columns={block.columns}>
      {block.items.map((item, i) => (
        <CardItem key={i} $accent={item.accent}>
          <CardHeader>
            <CardLabel>{item.label}</CardLabel>
            {item.meta && <CardMeta>{item.meta}</CardMeta>}
          </CardHeader>
          {item.body && <CardBody>{item.body}</CardBody>}
          {item.footer && <CardFooter>{item.footer}</CardFooter>}
        </CardItem>
      ))}
    </CardsGrid>
  );
}

// ---------------------------------------------------------------------------
// Pills
// ---------------------------------------------------------------------------

function PillsBlock({ block }: { block: CamlPills }) {
  return (
    <PillsRow>
      {block.items.map((item, i) => (
        <PillCard key={i}>
          <PillBigText>{item.bigText}</PillBigText>
          <PillInfo>
            <PillLabel>{item.label}</PillLabel>
            {item.detail && <PillDetail>{item.detail}</PillDetail>}
            {item.status && (
              <PillStatus $color={item.statusColor}>{item.status}</PillStatus>
            )}
          </PillInfo>
        </PillCard>
      ))}
    </PillsRow>
  );
}

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

function TabsBlock({
  block,
  renderMarkdown,
}: {
  block: CamlTabs;
  renderMarkdown?: (content: string) => ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = block.tabs[activeIndex];

  if (!activeTab) return null;

  const renderMd = (content: string) =>
    renderMarkdown ? (
      renderMarkdown(content)
    ) : (
      <CamlMarkdown content={content} />
    );

  return (
    <TabsContainer>
      <TabBar>
        {block.tabs.map((tab, i) => (
          <TabButton
            key={i}
            $active={i === activeIndex}
            $color={tab.color}
            onClick={() => setActiveIndex(i)}
          >
            {tab.label}
            {tab.status && (
              <TabStatus $color={tab.color}>{tab.status}</TabStatus>
            )}
          </TabButton>
        ))}
      </TabBar>

      <TabPanel>
        {activeTab.sections.map((section, i) => (
          <React.Fragment key={i}>
            {section.heading && (
              <TabSectionHeading
                $highlight={section.highlight}
                $color={activeTab.color}
              >
                {section.heading}
              </TabSectionHeading>
            )}
            <TabSectionContent>{renderMd(section.content)}</TabSectionContent>
          </React.Fragment>
        ))}

        {activeTab.sources.length > 0 && (
          <TabSources>
            {activeTab.sources.map((source, i) => (
              <TabSourceChip key={i}>{source.name}</TabSourceChip>
            ))}
          </TabSources>
        )}
      </TabPanel>
    </TabsContainer>
  );
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

function TimelineBlock({ block }: { block: CamlTimeline }) {
  const colorMap = new Map(
    block.legend.map((l) => [l.label.toLowerCase(), l.color])
  );

  return (
    <>
      {block.legend.length > 0 && (
        <TimelineLegend>
          {block.legend.map((item, i) => (
            <TimelineLegendItem key={i} $color={item.color}>
              {item.label}
            </TimelineLegendItem>
          ))}
        </TimelineLegend>
      )}

      <TimelineContainer>
        {block.items.map((item, i) => (
          <TimelineEntry key={i}>
            <TimelineDot $color={colorMap.get(item.side) || "#94a3b8"} />
            <TimelineDate>{item.date}</TimelineDate>
            <TimelineLabel>{item.label}</TimelineLabel>
          </TimelineEntry>
        ))}
      </TimelineContainer>
    </>
  );
}

// ---------------------------------------------------------------------------
// CTA
// ---------------------------------------------------------------------------

function CtaBlock({ block }: { block: CamlCta }) {
  return (
    <CtaRow>
      {block.items.map((item, i) => {
        if (!isSafeHref(item.href)) return null;
        return (
          <CtaButton
            key={i}
            href={item.href}
            $primary={item.primary}
            target={isExternalHref(item.href) ? "_blank" : undefined}
            rel={isExternalHref(item.href) ? "noopener noreferrer" : undefined}
          >
            {item.label}
          </CtaButton>
        );
      })}
    </CtaRow>
  );
}

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------

function SignupBlock({ block }: { block: CamlSignup }) {
  return (
    <SignupBox>
      {block.title && <SignupTitle>{block.title}</SignupTitle>}
      {block.body && <SignupBody>{block.body}</SignupBody>}
      {block.button && <SignupButton disabled>{block.button}</SignupButton>}
    </SignupBox>
  );
}

// ---------------------------------------------------------------------------
// Corpus Stats
// ---------------------------------------------------------------------------

function CorpusStatsBlock({
  block,
  stats,
}: {
  block: CamlCorpusStats;
  stats?: CamlStats;
}) {
  return (
    <StatsGrid>
      {block.items.map((item, i) => (
        <StatCard key={i}>
          <StatValue>
            {stats?.[item.key as keyof CamlStats] ?? "\u2014"}
          </StatValue>
          <StatLabel>{item.label}</StatLabel>
        </StatCard>
      ))}
    </StatsGrid>
  );
}
