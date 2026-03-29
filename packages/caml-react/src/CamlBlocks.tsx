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
  CamlMap,
  CamlCaseHistory,
  CamlImage,
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
  MapContainer,
  MapGrid,
  MapTile,
  MapTileCount,
  MapTileLink,
  MapTileEmpty,
  MapLegend,
  MapLegendItem as MapLegendItemStyled,
  MapTooltip,
  MapHeatmapLegend,
  MapHeatmapGradient,
  MapHeatmapLabel,
  CaseHistoryContainer,
  CaseHistoryHeader,
  CaseHistoryTitleRow,
  CaseHistoryTitle,
  CaseHistoryDocket,
  CaseHistoryStatusBadge,
  CaseHistoryTimeline,
  CaseHistoryEntry,
  CaseHistoryDot,
  CaseHistoryEntryCard,
  CaseHistoryEntryHeader,
  CaseHistoryCourtBadge,
  CaseHistoryOutcome,
  CaseHistoryMeta,
  CaseHistoryAction,
  CaseHistoryDetail,
  ImageBlockContainer,
  ImageBlockImg,
  ImageBlockCaption,
  ImageBlockPlaceholder,
} from "./styles";
import {
  US_STATES_GRID,
  GRID_COLS,
  GRID_ROWS,
  NEUTRAL_STATE_COLOR,
} from "./usStatesGrid";

interface BlockRendererProps {
  block: CamlBlock;
  dark?: boolean;
  stats?: CamlStats;
  renderMarkdown?: (content: string) => ReactNode;
  renderAnnotationEmbed?: (ref: string) => ReactNode;
  resolveImageSrc?: (src: string) => string | undefined;
}

export const CamlBlockRenderer: React.FC<BlockRendererProps> = ({
  block,
  dark,
  stats,
  renderMarkdown,
  renderAnnotationEmbed,
  resolveImageSrc,
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
    case "map":
      return <MapBlock block={block} />;
    case "case-history":
      return <CaseHistoryBlock block={block} />;
    case "image":
      return <ImageBlock block={block} resolveImageSrc={resolveImageSrc} />;
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

// ---------------------------------------------------------------------------
// Map (Tile Grid)
// ---------------------------------------------------------------------------

/**
 * Interpolate between two hex colors. `t` ranges from 0 (low) to 1 (high).
 */
function interpolateColor(low: string, high: string, t: number): string {
  const parse = (hex: string) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };
  const [r1, g1, b1] = parse(low);
  const [r2, g2, b2] = parse(high);
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const r = clamp(r1 + (r2 - r1) * t);
  const g = clamp(g1 + (g2 - g1) * t);
  const b = clamp(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

function MapBlock({ block }: { block: CamlMap }) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const isHeatmap = block.mode === "heatmap";

  // Build a map from status label -> color using the legend (categorical mode)
  const colorMap = new Map(
    block.legend.map((l) => [l.label.toLowerCase(), l.color])
  );

  // Build a map from state code -> state item for quick lookup
  const stateItemMap = new Map(
    block.states.map((s) => [s.code, s])
  );

  // For heatmap mode, compute min/max values
  let heatmapMin = 0;
  let heatmapMax = 0;
  if (isHeatmap) {
    const values = block.states
      .map((s) => s.count)
      .filter((v): v is number => v != null);
    if (values.length > 0) {
      heatmapMin = Math.min(...values);
      heatmapMax = Math.max(...values);
    }
  }

  const lowColor = block.lowColor || "#e0f2fe";
  const highColor = block.highColor || "#0c4a6e";

  /**
   * Resolve the fill color for a state tile.
   */
  function getStateColor(stateItem: { status: string; count?: number } | undefined): string {
    if (!stateItem) return NEUTRAL_STATE_COLOR;

    if (isHeatmap && stateItem.count != null) {
      const range = heatmapMax - heatmapMin;
      const t = range > 0 ? (stateItem.count - heatmapMin) / range : 0.5;
      return interpolateColor(lowColor, highColor, t);
    }

    return colorMap.get(stateItem.status.toLowerCase()) || NEUTRAL_STATE_COLOR;
  }

  // Build the grid: create a 2D lookup from "col,row" -> state entry
  const gridLookup = new Map(
    US_STATES_GRID.map((entry) => [`${entry.col},${entry.row}`, entry])
  );

  const cells: React.ReactNode[] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      const entry = gridLookup.get(`${col},${row}`);
      if (entry) {
        const stateItem = stateItemMap.get(entry.code);
        const fillColor = getStateColor(stateItem);
        const hasLink = stateItem?.href && isSafeHref(stateItem.href);

        const tileContent = (
          <>
            {entry.code}
            {stateItem?.count != null && (
              <MapTileCount data-testid={`map-count-${entry.code}`}>
                {stateItem.count.toLocaleString()}
              </MapTileCount>
            )}
          </>
        );

        const tooltipLines: string[] = [entry.name];
        if (isHeatmap && stateItem?.count != null) {
          tooltipLines.push(stateItem.count.toLocaleString());
        } else if (stateItem?.status) {
          tooltipLines.push(stateItem.status);
          if (stateItem.count != null) {
            tooltipLines.push(`Count: ${stateItem.count.toLocaleString()}`);
          }
        }
        if (hasLink) {
          tooltipLines.push("Click to view");
        }

        cells.push(
          <MapTile
            key={`${col}-${row}`}
            $color={fillColor}
            $clickable={!!hasLink}
            data-testid={`map-tile-${entry.code}`}
            onMouseEnter={() => setHoveredState(entry.code)}
            onMouseLeave={() => setHoveredState(null)}
          >
            {hasLink ? (
              <MapTileLink
                href={stateItem!.href}
                target={isExternalHref(stateItem!.href!) ? "_blank" : undefined}
                rel={isExternalHref(stateItem!.href!) ? "noopener noreferrer" : undefined}
                data-testid={`map-link-${entry.code}`}
              >
                {tileContent}
              </MapTileLink>
            ) : (
              tileContent
            )}
            {hoveredState === entry.code && (
              <MapTooltip>{tooltipLines.join(" \u2014 ")}</MapTooltip>
            )}
          </MapTile>
        );
      } else {
        cells.push(<MapTileEmpty key={`${col}-${row}`} />);
      }
    }
  }

  return (
    <MapContainer data-testid="map-container">
      <MapGrid $cols={GRID_COLS} $rows={GRID_ROWS}>
        {cells}
      </MapGrid>

      {isHeatmap && block.states.length > 0 && (
        <MapHeatmapLegend data-testid="map-heatmap-legend">
          <MapHeatmapLabel>{heatmapMin.toLocaleString()}</MapHeatmapLabel>
          <MapHeatmapGradient $low={lowColor} $high={highColor} />
          <MapHeatmapLabel>{heatmapMax.toLocaleString()}</MapHeatmapLabel>
        </MapHeatmapLegend>
      )}

      {block.legend.length > 0 && (
        <MapLegend data-testid="map-legend">
          {block.legend.map((item, i) => (
            <MapLegendItemStyled key={i} $color={item.color}>
              {item.label}
            </MapLegendItemStyled>
          ))}
        </MapLegend>
      )}
    </MapContainer>
  );
}

// ---------------------------------------------------------------------------
// Image
// ---------------------------------------------------------------------------

function ImageBlock({
  block,
  resolveImageSrc,
}: {
  block: CamlImage;
  resolveImageSrc?: (src: string) => string | undefined;
}) {
  // Resolution logic:
  // 1. If src matches https?:// — use directly
  // 2. Otherwise, call resolveImageSrc — if it returns a URL, use it
  // 3. Fallback to placeholder
  let resolvedSrc: string | undefined;
  if (/^https?:\/\//.test(block.src)) {
    resolvedSrc = block.src;
  } else if (resolveImageSrc) {
    resolvedSrc = resolveImageSrc(block.src);
  }

  return (
    <ImageBlockContainer data-testid="image-block">
      {resolvedSrc ? (
        <ImageBlockImg
          src={resolvedSrc}
          alt={block.alt || ""}
          $size={block.size}
          $shape={block.shape}
          data-testid="image-block-img"
        />
      ) : (
        <ImageBlockPlaceholder $size={block.size} data-testid="image-block-placeholder">
          Image not available
        </ImageBlockPlaceholder>
      )}
      {block.caption && (
        <ImageBlockCaption data-testid="image-block-caption">
          {block.caption}
        </ImageBlockCaption>
      )}
    </ImageBlockContainer>
  );
}

// ---------------------------------------------------------------------------
// Case History
// ---------------------------------------------------------------------------

const GREEN_OUTCOMES = ["granted", "affirmed", "sustained", "approved"];
const RED_OUTCOMES = ["denied", "reversed", "overruled", "rejected"];
const AMBER_OUTCOMES = ["remanded", "partial", "pending", "modified"];

function getOutcomeColor(outcome: string): string {
  const lower = outcome.toLowerCase();
  if (GREEN_OUTCOMES.some((w) => lower.includes(w))) return "#16a34a";
  if (RED_OUTCOMES.some((w) => lower.includes(w))) return "#dc2626";
  if (AMBER_OUTCOMES.some((w) => lower.includes(w))) return "#f59e0b";
  return "#64748b";
}

function CaseHistoryBlock({ block }: { block: CamlCaseHistory }) {
  const statusColor = block.status ? getOutcomeColor(block.status) : undefined;

  return (
    <CaseHistoryContainer data-testid="case-history-container">
      <CaseHistoryHeader>
        <CaseHistoryTitleRow>
          <div>
            <CaseHistoryTitle data-testid="case-history-title">
              {block.title}
            </CaseHistoryTitle>
            {block.docket && (
              <CaseHistoryDocket data-testid="case-history-docket">
                {block.docket}
              </CaseHistoryDocket>
            )}
          </div>
          {block.status && (
            <CaseHistoryStatusBadge
              $color={statusColor}
              data-testid="case-history-status"
            >
              {block.status}
            </CaseHistoryStatusBadge>
          )}
        </CaseHistoryTitleRow>
      </CaseHistoryHeader>

      <CaseHistoryTimeline data-testid="case-history-timeline">
        {block.entries.map((entry, i) => {
          const outcomeColor = getOutcomeColor(entry.outcome);
          return (
            <CaseHistoryEntry key={i} data-testid={`case-history-entry-${i}`}>
              <CaseHistoryDot $color={outcomeColor} />
              <CaseHistoryEntryCard>
                <CaseHistoryEntryHeader>
                  <CaseHistoryCourtBadge $level={entry.courtLevel}>
                    {entry.courtLevel}
                  </CaseHistoryCourtBadge>
                  <CaseHistoryOutcome $color={outcomeColor}>
                    {entry.outcome}
                  </CaseHistoryOutcome>
                </CaseHistoryEntryHeader>
                <CaseHistoryMeta>
                  <span>{entry.courtName}</span>
                  <span>{entry.date}</span>
                </CaseHistoryMeta>
                <CaseHistoryAction>{entry.action}</CaseHistoryAction>
                {entry.detail && (
                  <CaseHistoryDetail>{entry.detail}</CaseHistoryDetail>
                )}
              </CaseHistoryEntryCard>
            </CaseHistoryEntry>
          );
        })}
      </CaseHistoryTimeline>
    </CaseHistoryContainer>
  );
}
