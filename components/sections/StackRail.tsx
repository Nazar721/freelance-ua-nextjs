"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { itCases } from "@/data/itCases";
import { designCases } from "@/data/designCases";
import { videoCases } from "@/data/videoCases";
import { useTranslation } from "@/lib/LanguageContext";
import {
  getStackIcons,
  STACK_LINE,
  type StackCaseType,
  type StackIconEntry,
} from "@/data/stackIcons";

const RAIL_WIDTH = 132;
const RAIL_CENTER = RAIL_WIDTH / 2;
/** Horizontal swing of the winding path between icons, px */
const PATH_SWING = 30;
/**
 * Maximum vertical span of a single rail SVG segment, px.
 * The rail can span a whole long case (tens of thousands of px); keeping every
 * SVG — and, more importantly, its mask and filters — inside a small box is
 * what keeps WebKit from rasterising a giant layer on each scroll frame.
 */
const SEGMENT_HEIGHT = 1000;
/** Viewport slack (px) used to keep segments/icons near the edge active. */
const ACTIVE_MARGIN = 240;

const STACK_RAIL_CSS = `
.stack-rail {
  position: absolute;
  top: 0;
  width: ${RAIL_WIDTH}px;
  z-index: 5;
  pointer-events: none;
  opacity: 0;
  transition: opacity 600ms var(--ease-out);
}
.stack-rail.is-visible { opacity: 1; }

/* ── Winding connecting path, drawn along the scroll between the icons ── */
/* One small SVG per ~${SEGMENT_HEIGHT}px slice of the rail — only the slices
   intersecting the viewport are ever displayed. */
.stack-rail-seg {
  position: absolute;
  left: 0;
  overflow: visible;
  pointer-events: none;
}
/* Glow comes from wide translucent "halo" strokes layered behind the line —
   a drop-shadow filter on an animated path forced a filtered surface to be
   re-rasterised on every frame in WebKit and Chromium. */
.stack-rail-halo {
  stroke-opacity: 0.22;
}
/* Bright dash segment travelling along the path — "living track" effect.
   Shared by the flow stroke and its halo so they move in lockstep. */
.stack-rail-flow {
  stroke-dasharray: 16 30;
  opacity: 0.85;
  animation: stack-rail-flow 2.6s linear infinite;
}
.stack-rail-flow-halo {
  stroke-opacity: 0.3;
}
@keyframes stack-rail-flow {
  to { stroke-dashoffset: -46; }
}

/* Static node where each icon is anchored to the path */
.stack-line-node {
  opacity: 0;
  transition: opacity 350ms var(--ease-out);
  filter: drop-shadow(0 0 4px var(--case-accent-color));
}
.stack-line-node.is-reached { opacity: 1; }

/* ── Icons: layers = position → reveal(scroll-synced) → parallax → float → chip ── */
.stack-icon {
  position: absolute;
  left: 50%;
  width: 0;
  height: 0;
}
.stack-icon-reveal {
  display: block;
  opacity: 0;
  transform: translateY(32px) scale(0.5) rotateX(45deg) rotateY(-20deg);
  transition:
    opacity 500ms var(--ease-out),
    transform 700ms var(--ease-spring);
}
.stack-icon-reveal.is-reached {
  opacity: 1;
  transform: translateY(0) scale(1) rotateX(0deg) rotateY(0deg);
}
.stack-icon-parallax {
  display: block;
  will-change: transform;
  perspective: 120px;
}
.stack-icon-float {
  display: block;
  transform-style: preserve-3d;
  animation: stack-icon-float var(--float-duration, 4s) ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}
@keyframes stack-icon-float {
  0% {
    transform: translateY(-18px) translateX(4px)
      rotateX(22deg) rotateY(-16deg) rotateZ(2deg) scale(1.08);
  }
  25% {
    transform: translateY(-6px) translateX(-2px)
      rotateX(-8deg) rotateY(12deg) rotateZ(-1deg) scale(1.03);
  }
  50% {
    transform: translateY(18px) translateX(-4px)
      rotateX(-22deg) rotateY(16deg) rotateZ(-2deg) scale(0.96);
  }
  75% {
    transform: translateY(6px) translateX(2px)
      rotateX(8deg) rotateY(-12deg) rotateZ(1deg) scale(1.02);
  }
  100% {
    transform: translateY(-18px) translateX(4px)
      rotateX(22deg) rotateY(-16deg) rotateZ(2deg) scale(1.08);
  }
}
/* Soft shadow cast under the chip — pulses in sync with the float,
   selling the "suspended in air" depth effect */
.stack-icon-shadow {
  position: absolute;
  top: 24px;
  left: 0;
  width: 42px;
  height: 10px;
  margin-left: -21px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, transparent 70%);
  filter: blur(4px);
  pointer-events: none;
  animation: stack-icon-shadow var(--float-duration, 4s) ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}
@keyframes stack-icon-shadow {
  0%, 100% { transform: scale(0.6) translateY(2px); opacity: 0.18; }
  25% { transform: scale(0.9) translateY(-1px); opacity: 0.35; }
  50% { transform: scale(1.15) translateY(4px); opacity: 0.55; }
  75% { transform: scale(0.85) translateY(0px); opacity: 0.3; }
}
.stack-icon-chip {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: -24px 0 0 -24px;
  border-radius: 14px;
  background: linear-gradient(
    135deg,
    rgba(17, 17, 24, 0.65) 0%,
    rgba(30, 30, 45, 0.45) 50%,
    rgba(17, 17, 24, 0.65) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow:
    0 10px 28px rgba(0, 0, 0, 0.45),
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  cursor: default;
  transform-style: preserve-3d;
  transition:
    transform 0.3s var(--ease-spring),
    filter 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
/* Pulsing accent glow lives on a pseudo-element and animates transform /
   opacity only. Animating box-shadow repainted every chip on each frame —
   with a dozen chips on screen that alone cost whole frames in WebKit. */
.stack-icon-chip::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  box-shadow:
    0 0 12px var(--case-accent-color, rgba(99, 102, 241, 0.15)),
    0 0 24px var(--case-accent-color, rgba(99, 102, 241, 0.3));
  opacity: 0.5;
  pointer-events: none;
  animation: stack-icon-glow var(--float-duration, 4s) ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}
@keyframes stack-icon-glow {
  0%, 100% { transform: scale(0.94); opacity: 0.4; }
  50% { transform: scale(1.06); opacity: 0.95; }
}
.stack-icon-chip:hover {
  transform: scale(1.2) translateY(-6px) rotateY(8deg);
  filter: brightness(1.35) drop-shadow(0 0 10px var(--case-accent-color));
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow:
    0 14px 36px rgba(0, 0, 0, 0.5),
    0 0 30px var(--case-glow, rgba(99, 102, 241, 0.3)),
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    inset 0 -1px 0 rgba(0, 0, 0, 0.25);
}
.stack-icon-chip img {
  width: 26px;
  height: 26px;
  object-fit: contain;
  pointer-events: none;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
  transition: filter 0.3s ease;
}
.stack-icon-chip:hover img {
  filter: drop-shadow(0 0 6px var(--case-accent-color));
}
/* Glass reflection highlight */
.stack-icon-chip::before {
  content: "";
  position: absolute;
  top: 1px;
  left: 3px;
  right: 3px;
  height: 40%;
  border-radius: 12px 12px 50% 50%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.03) 60%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
}
html[data-theme="light"] .stack-icon-chip {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.85) 0%,
    rgba(244, 244, 245, 0.65) 50%,
    rgba(255, 255, 255, 0.85) 100%
  );
  border-color: rgba(228, 228, 231, 0.6);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), 0 0 8px rgba(99, 102, 241, 0.12);
}
html[data-theme="light"] .stack-icon-chip::before {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.12) 0%,
    rgba(255, 255, 255, 0.03) 60%,
    transparent 100%
  );
}

/* Tooltip with the tool name */
.stack-icon-tip {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  opacity: 0;
  padding: 4px 10px;
  border-radius: 8px;
  background: rgba(10, 10, 15, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #f8f8ff;
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.01em;
  white-space: nowrap;
  pointer-events: none;
  transition:
    opacity 200ms var(--ease-out),
    transform 200ms var(--ease-out);
}
.stack-icon-chip:hover .stack-icon-tip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
  transition-delay: 150ms;
}

/* Off-screen icons stop animating — no compositor work for what nobody sees.
   The class is toggled on the reveal wrapper (ancestor of float/chip, sibling
   of the shadow). Icons that are still hidden (not reached by the line yet)
   are paused for the same reason. */
.stack-icon-reveal.is-offscreen .stack-icon-float,
.stack-icon-reveal.is-offscreen .stack-icon-shadow,
.stack-icon-reveal.is-offscreen .stack-icon-chip,
.stack-icon-reveal.is-offscreen .stack-icon-chip::after,
.stack-icon-reveal:not(.is-reached) .stack-icon-float,
.stack-icon-reveal:not(.is-reached) .stack-icon-shadow,
.stack-icon-reveal:not(.is-reached) .stack-icon-chip,
.stack-icon-reveal:not(.is-reached) .stack-icon-chip::after {
  animation-play-state: paused;
}

@media (max-width: 1279.98px) {
  .stack-rail { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .stack-icon-reveal,
  .stack-line-node,
  .stack-rail { transition: none; }
  .stack-icon-float { animation: none; transform: none; }
  .stack-icon-shadow { animation: none; opacity: 0.3; }
  .stack-rail-flow { animation: none; opacity: 0.4; }
  .stack-icon-parallax { transform: none !important; }
  .stack-icon-chip { animation: none; }
  .stack-icon-reveal.is-offscreen .stack-icon-float,
  .stack-icon-reveal.is-offscreen .stack-icon-shadow,
  .stack-icon-reveal.is-offscreen .stack-icon-chip,
  .stack-icon-reveal:not(.is-reached) .stack-icon-float,
  .stack-icon-reveal:not(.is-reached) .stack-icon-shadow,
  .stack-icon-reveal:not(.is-reached) .stack-icon-chip,
  .stack-icon-chip::after { animation: none; }
}
`;

interface CaseMeta {
  href: string;
  caseType: StackCaseType;
  glowColor: string;
}

const CASE_INDEX: CaseMeta[] = [
  ...itCases.map((c) => ({
    href: c.href,
    caseType: "it" as const,
    glowColor: c.glowColor,
  })),
  ...designCases.map((c) => ({
    href: c.href,
    caseType:
      c.category === "photo-retouch"
        ? ("design-photo" as const)
        : ("design-ux" as const),
    glowColor: c.glowColor,
  })),
  ...videoCases.map((c) => ({
    href: c.href,
    caseType:
      c.subCategory === "ai"
        ? ("video-ai" as const)
        : c.subCategory === "motion"
          ? ("video-motion" as const)
          : ("video-reels" as const),
    glowColor: c.glowColor,
  })),
];

function parseRgb(rgba: string): [number, number, number] {
  const m = rgba.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
  if (!m) return [99, 102, 241];
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

interface Pt {
  x: number;
  y: number;
}

interface Cubic {
  p0: Pt;
  c1: Pt;
  c2: Pt;
  p1: Pt;
}

/** One slice of the rail path, rendered as its own small SVG. */
interface RailSegment {
  top: number;
  height: number;
  d: string;
  /** Path length before this segment (same numeric method as `len`). */
  startLen: number;
  len: number;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

/** Cubic pieces of the winding path (Catmull-Rom → cubic Bézier). */
function buildRailCubics(icons: StackIconEntry[], height: number): Cubic[] {
  const pts: Pt[] = [{ x: RAIL_CENTER, y: -30 }];
  icons.forEach((icon, i) => {
    const y = icon.linePosition * height;
    if (i > 0) {
      const prevY = icons[i - 1].linePosition * height;
      const dir = i % 2 === 0 ? 1 : -1;
      pts.push({ x: RAIL_CENTER + dir * PATH_SWING, y: (prevY + y) / 2 });
    }
    pts.push({ x: RAIL_CENTER + icon.offsetX, y });
  });
  pts.push({ x: RAIL_CENTER, y: height + 30 });

  const cubics: Cubic[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    cubics.push({
      p0: p1,
      c1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
      c2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
      p1: p2,
    });
  }
  return cubics;
}

function cubicsToPath(cubics: Cubic[]): string {
  if (!cubics.length) return "";
  let d = `M ${round1(cubics[0].p0.x)} ${round1(cubics[0].p0.y)}`;
  for (const c of cubics) {
    d +=
      ` C ${round1(c.c1.x)} ${round1(c.c1.y)},` +
      ` ${round1(c.c2.x)} ${round1(c.c2.y)},` +
      ` ${round1(c.p1.x)} ${round1(c.p1.y)}`;
  }
  return d;
}

/** Largest y-span (px) allowed for a single cubic piece before it is split. */
const MAX_CUBIC_SPAN = 500;

/** de Casteljau split — the two halves trace exactly the same curve. */
function splitCubic(c: Cubic, t: number): [Cubic, Cubic] {
  const lerp = (a: Pt, b: Pt): Pt => ({
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
  });
  const p01 = lerp(c.p0, c.c1);
  const p12 = lerp(c.c1, c.c2);
  const p23 = lerp(c.c2, c.p1);
  const p012 = lerp(p01, p12);
  const p123 = lerp(p12, p23);
  const mid = lerp(p012, p123);
  return [
    { p0: c.p0, c1: p01, c2: p012, p1: mid },
    { p0: mid, c1: p123, c2: p23, p1: c.p1 },
  ];
}

/**
 * Long icon gaps make a single Bézier span thousands of pixels, which would
 * blow the segment budget. Split those pieces so every segment stays small.
 */
function subdivideCubics(cubics: Cubic[]): Cubic[] {
  const out: Cubic[] = [];
  const queue = [...cubics];
  while (queue.length) {
    const c = queue.shift()!;
    if (Math.abs(c.p1.y - c.p0.y) > MAX_CUBIC_SPAN) {
      const [a, b] = splitCubic(c, 0.5);
      queue.unshift(a, b);
    } else {
      out.push(c);
    }
  }
  return out;
}

/** Arc-length of one cubic by chord sampling — stable across calls. */
function cubicLength(c: Cubic, samples = 16): number {
  let len = 0;
  let px = c.p0.x;
  let py = c.p0.y;
  for (let i = 1; i <= samples; i++) {
    const t = i / samples;
    const mt = 1 - t;
    const x =
      mt * mt * mt * c.p0.x +
      3 * mt * mt * t * c.c1.x +
      3 * mt * t * t * c.c2.x +
      t * t * t * c.p1.x;
    const y =
      mt * mt * mt * c.p0.y +
      3 * mt * mt * t * c.c1.y +
      3 * mt * t * t * c.c2.y +
      t * t * t * c.p1.y;
    len += Math.hypot(x - px, y - py);
    px = x;
    py = y;
  }
  return len;
}

/**
 * Splits the path into contiguous slices of at most ~SEGMENT_HEIGHT px.
 * Boundaries always fall on a Bézier joint, so neighbouring slices meet
 * exactly and the rail still reads as one continuous line.
 */
function buildRailSegments(
  icons: StackIconEntry[],
  height: number
): RailSegment[] {
  const cubics = subdivideCubics(buildRailCubics(icons, height));
  if (!cubics.length) return [];

  const groups: Cubic[][] = [];
  let group: Cubic[] = [];
  let top = 0;
  for (const c of cubics) {
    if (!group.length) {
      group = [c];
      top = c.p0.y;
      continue;
    }
    if (c.p1.y - top >= SEGMENT_HEIGHT) {
      groups.push(group);
      group = [c];
      top = c.p0.y;
    } else {
      group.push(c);
    }
  }
  if (group.length) groups.push(group);

  const segments: RailSegment[] = [];
  let startLen = 0;
  for (const g of groups) {
    const len = g.reduce((sum, c) => sum + cubicLength(c), 0);
    const segTop = g[0].p0.y;
    const segBottom = g[g.length - 1].p1.y;
    segments.push({
      top: segTop,
      height: Math.max(1, segBottom - segTop),
      d: cubicsToPath(g),
      startLen,
      len,
    });
    startLen += len;
  }
  return segments;
}

function nodeSegmentIndex(segments: RailSegment[], y: number): number {
  for (let i = 0; i < segments.length; i++) {
    const s = segments[i];
    if (y >= s.top && y <= s.top + s.height) return i;
  }
  return segments.length - 1;
}

interface RevealEntry {
  revealEl: HTMLElement | null;
  nodeEl: SVGCircleElement | null;
  pos: number;
  reached: boolean;
}

type SegmentState = "init" | "drawing" | "done";
type SegmentPart = "svg" | "group" | "mask";

interface SegmentRefs {
  svg: SVGSVGElement | null;
  /** The masked group — its single mask covers every stroke of the slice. */
  group: SVGGElement | null;
  mask: SVGPathElement | null;
  state: SegmentState;
  offset: string;
}

function Rail({
  side,
  gap,
  height,
  accentRgb,
  accentColor,
  glowColor,
  revealed,
  icons,
  segments,
  registerParallax,
  registerReveal,
  registerNode,
  registerSegment,
}: {
  side: "left" | "right";
  gap: number;
  height: number;
  accentRgb: [number, number, number];
  accentColor: string;
  glowColor: string;
  revealed: boolean;
  icons: StackIconEntry[];
  segments: RailSegment[];
  registerParallax: (el: HTMLElement | null, icon: StackIconEntry) => void;
  registerReveal: (key: string, pos: number, el: HTMLElement | null) => void;
  registerNode: (key: string, el: SVGCircleElement | null) => void;
  registerSegment: (
    side: string,
    index: number,
    part: SegmentPart,
    el: Element | null
  ) => void;
}) {
  const accent = accentRgb.join(", ");
  const nodeFill = `rgba(${accent}, 0.75)`;
  const placement =
    side === "left"
      ? { right: `calc(100% + ${gap}px)` }
      : { left: `calc(100% + ${gap}px)` };

  const railStyle = {
    ...placement,
    height,
    "--case-accent-color": accentColor,
    "--case-glow": glowColor,
  } as unknown as React.CSSProperties;

  return (
    <div
      className={`stack-rail ${revealed ? "is-visible" : ""}`}
      style={railStyle}
      aria-hidden="true"
    >
      {segments.map((seg, i) => {
        const gradId = `stack-line-grad-${side}-${i}`;
        const flowGradId = `stack-line-grad-flow-${side}-${i}`;
        const maskId = `stack-draw-mask-${side}-${i}`;
        const dashArray = STACK_LINE.style === "dotted" ? "0.1 9" : "5 9";
        const nodes = icons
          .map((icon, idx) => ({ icon, idx }))
          .filter(({ icon }) =>
            nodeSegmentIndex(segments, icon.linePosition * height) === i
          );
        return (
          <svg
            key={`seg-${side}-${i}`}
            className="stack-rail-seg"
            width={RAIL_WIDTH}
            height={seg.height}
            viewBox={`0 ${seg.top} ${RAIL_WIDTH} ${seg.height}`}
            style={{ top: seg.top, display: "none" }}
            ref={(el) => registerSegment(side, i, "svg", el)}
          >
            <defs>
              {/* One gradient per rail (user space) so the fade stays
                  continuous across segment boundaries. */}
              <linearGradient
                id={gradId}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={height}
              >
                <stop offset="0%" stopColor={`rgba(${accent}, 0)`} />
                <stop
                  offset="6%"
                  stopColor={`rgba(${accent}, ${STACK_LINE.opacity})`}
                />
                <stop
                  offset="94%"
                  stopColor={`rgba(${accent}, ${STACK_LINE.opacity})`}
                />
                <stop offset="100%" stopColor={`rgba(${accent}, 0)`} />
              </linearGradient>
              <linearGradient
                id={flowGradId}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={height}
              >
                <stop offset="0%" stopColor={`rgba(${accent}, 0)`} />
                <stop offset="6%" stopColor={`rgba(${accent}, 0.95)`} />
                <stop offset="94%" stopColor={`rgba(${accent}, 0.95)`} />
                <stop offset="100%" stopColor={`rgba(${accent}, 0)`} />
              </linearGradient>
              <mask id={maskId}>
                <path
                  ref={(el) => registerSegment(side, i, "mask", el)}
                  d={seg.d}
                  pathLength={1}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={7}
                  strokeLinecap="round"
                  strokeDasharray="1"
                  style={{ strokeDashoffset: 1 }}
                />
              </mask>
            </defs>
            {/* One mask for the whole slice: halo + line + travelling dash */}
            <g ref={(el) => registerSegment(side, i, "group", el)} mask={`url(#${maskId})`}>
              <path
                className="stack-rail-halo"
                d={seg.d}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={STACK_LINE.width * 3}
                strokeLinecap="round"
                strokeDasharray={dashArray}
              />
              <path
                className="stack-rail-line"
                d={seg.d}
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth={STACK_LINE.width}
                strokeLinecap="round"
                strokeDasharray={dashArray}
              />
              <path
                className="stack-rail-flow stack-rail-flow-halo"
                d={seg.d}
                fill="none"
                stroke={`url(#${flowGradId})`}
                strokeWidth={STACK_LINE.width * 3.5}
                strokeLinecap="round"
              />
              <path
                className="stack-rail-flow"
                d={seg.d}
                fill="none"
                stroke={`url(#${flowGradId})`}
                strokeWidth={STACK_LINE.width}
                strokeLinecap="round"
              />
            </g>
            {nodes.map(({ icon, idx }, ni) => (
              <circle
                key={`node-${side}-${i}-${ni}`}
                ref={(el) => registerNode(`${side}:${idx}`, el)}
                className="stack-line-node"
                cx={RAIL_CENTER + icon.offsetX}
                cy={icon.linePosition * height}
                r={4}
                fill={nodeFill}
              />
            ))}
          </svg>
        );
      })}

      {icons.map((icon, i) => {
        const top = icon.linePosition * height;
        const key = `${side}:${i}`;
        return (
          <span
            key={`${side}-${icon.name}`}
            className="stack-icon"
            style={{ top, marginLeft: icon.offsetX }}
          >
            <span
              className="stack-icon-reveal"
              style={
                {
                  "--float-delay": `-${icon.floatDelay}s`,
                  "--float-duration": `${icon.floatDuration}s`,
                } as React.CSSProperties
              }
              ref={(el) => registerReveal(key, icon.linePosition, el)}
            >
              <span className="stack-icon-shadow" />
              <span
                className="stack-icon-parallax"
                ref={(el) => registerParallax(el, icon)}
              >
                <span className="stack-icon-float">
                  <span className="stack-icon-chip">
                    <img
                      src={icon.svgPath}
                      alt={icon.name}
                      width={26}
                      height={26}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                    <span className="stack-icon-tip">{icon.name}</span>
                  </span>
                </span>
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export default function StackRail() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const caseMeta = useMemo(() => {
    if (!pathname) return null;
    return CASE_INDEX.find(
      (c) => pathname === c.href || pathname.startsWith(`${c.href}/`)
    );
  }, [pathname]);

  // Desktop-only conditional render — no SVGs/listeners on mobile
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setEnabled(mq.matches);
      setReducedMotion(rm.matches);
    };
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  if (!enabled || !caseMeta) return null;

  // Key by case so all inner state (anchor, reveal) resets on navigation
  return (
    <StackRailInner
      key={caseMeta.href}
      caseMeta={caseMeta}
      reducedMotion={reducedMotion}
    />
  );
}

function StackRailInner({
  caseMeta,
  reducedMotion,
}: {
  caseMeta: CaseMeta;
  reducedMotion: boolean;
}) {
  const { t } = useTranslation();
  const [revealed, setRevealed] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [railHeight, setRailHeight] = useState(0);
  const [railGap, setRailGap] = useState(0);
  const parallaxItems = useRef<Map<HTMLElement, StackIconEntry>>(new Map());
  const segmentRefs = useRef<Map<string, SegmentRefs>>(new Map());
  const revealItems = useRef<Map<string, RevealEntry>>(new Map());
  const endSectionRef = useRef<HTMLElement | null>(null);

  const iconsBySide = useMemo<{ left: StackIconEntry[]; right: StackIconEntry[] }>(() => {
    const all = getStackIcons(caseMeta.caseType, railHeight || undefined);
    return {
      left: all.filter((i) => i.side === "left"),
      right: all.filter((i) => i.side === "right"),
    };
  }, [caseMeta, railHeight]);

  // Immutable path geometry, rebuilt only when the rail is measured again.
  const segmentsBySide = useMemo(
    () => ({
      left: buildRailSegments(iconsBySide.left, railHeight),
      right: buildRailSegments(iconsBySide.right, railHeight),
    }),
    [iconsBySide, railHeight]
  );

  const segmentMeta = useMemo(() => {
    const map = new Map<
      string,
      {
        top: number;
        height: number;
        startLen: number;
        len: number;
        totalLen: number;
        maskId: string;
      }
    >;
    (["left", "right"] as const).forEach((side) => {
      const segs = segmentsBySide[side];
      const totalLen = segs.reduce((sum, seg) => sum + seg.len, 0);
      segs.forEach((seg, i) => {
        map.set(`${side}:${i}`, {
          top: seg.top,
          height: seg.height,
          startLen: seg.startLen,
          len: seg.len,
          totalLen,
          maskId: `stack-draw-mask-${side}-${i}`,
        });
      });
    });
    return map;
  }, [segmentsBySide]);

  const registerParallax = (
    el: HTMLElement | null,
    icon: StackIconEntry
  ): (() => void) | undefined => {
    if (!el) return undefined;
    parallaxItems.current.set(el, icon);
    return () => {
      parallaxItems.current.delete(el);
    };
  };

  const registerSegment = (
    side: string,
    index: number,
    part: SegmentPart,
    el: Element | null
  ) => {
    const key = `${side}:${index}`;
    if (part === "svg" && !el) {
      segmentRefs.current.delete(key);
      return;
    }
    const entry = segmentRefs.current.get(key) ?? {
      svg: null,
      group: null,
      mask: null,
      state: "init" as SegmentState,
      offset: "",
    };
    if (part === "svg") entry.svg = el as SVGSVGElement | null;
    else if (part === "group") entry.group = el as SVGGElement | null;
    else if (part === "mask") entry.mask = el as SVGPathElement | null;
    segmentRefs.current.set(key, entry);
  };

  const registerReveal = (
    key: string,
    pos: number,
    el: HTMLElement | null
  ): (() => void) | undefined => {
    if (!el) return undefined;
    const entry = revealItems.current.get(key) ?? {
      revealEl: null,
      nodeEl: null,
      pos,
      reached: false,
    };
    entry.revealEl = el;
    entry.pos = pos;
    revealItems.current.set(key, entry);
    return () => {
      const e = revealItems.current.get(key);
      if (e) e.revealEl = null;
    };
  };

  const registerNode = (
    key: string,
    el: SVGCircleElement | null
  ): (() => void) | undefined => {
    if (!el) return undefined;
    const entry = revealItems.current.get(key) ?? {
      revealEl: null,
      nodeEl: null,
      pos: 0,
      reached: false,
    };
    entry.nodeEl = el;
    revealItems.current.set(key, entry);
    return () => {
      const e = revealItems.current.get(key);
      if (e) e.nodeEl = null;
    };
  };

  // Section targeting:
  //   IT → Технічна реалізація (single section)
  //   Design/Video → section before Results (Challenge/Solution) … section after Results (CTA)
  //   Fallback → media-heaviest section.
  // Rails attach to the centered content container inside the section.
  useEffect(() => {
    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;

    const measureAndSet = (container: HTMLElement) => {
      const section = container.closest("section");
      const sectionWidth = section
        ? section.clientWidth
        : container.clientWidth;
      const margin = Math.max(
        0,
        (sectionWidth - container.clientWidth) / 2
      );
      if (margin < RAIL_WIDTH + 24) return; // not enough side room — skip
      const gap = Math.min(64, Math.max(20, Math.floor((margin - RAIL_WIDTH) / 2)));
      container.style.position = container.style.position || "relative";
      setRailGap(gap);
      setRailHeight(container.offsetHeight);
      setAnchor(container);
    };

    const findSectionByH2 = (key: string): HTMLElement | null => {
      const wanted = t(key).trim().toLowerCase();
      if (!wanted) return null;
      for (const h2 of document.querySelectorAll<HTMLElement>("section h2")) {
        if ((h2.textContent || "").trim().toLowerCase() === wanted) {
          return h2.closest("section");
        }
      }
      return null;
    };

    const find = (attempt: number) => {
      if (cancelled) return;

      // 1. IT cases — target "Технічна реалізація"
      let section = findSectionByH2("itCases.technicals");

      if (!section) {
        // 2. Design / Video — use Results as anchor, span from section before it to CTA after it
        const resultsSection = findSectionByH2("itCases.results");

        if (resultsSection) {
          const allSections = Array.from(document.querySelectorAll<HTMLElement>("section"));
          const resultsIdx = allSections.indexOf(resultsSection);

          // Start: section before Results (Challenge/Solution or Finals)
          let startSection: HTMLElement | null = null;
          if (resultsIdx > 0) {
            startSection = allSections[resultsIdx - 1];
          }

          // End: look for CTA section ("Готові розпочати?") after Results, or fallback to 2 sections after
          let endSection: HTMLElement | null = null;
          for (let i = resultsIdx + 1; i < allSections.length; i++) {
            const s = allSections[i];
            const h2s = s.querySelectorAll("h2");
            for (const h2 of h2s) {
              const txt = (h2.textContent || "").trim().toLowerCase();
              if (txt.includes("розпочати") || txt.includes("готові")) {
                endSection = s;
                break;
              }
            }
            if (!endSection) {
              const links = s.querySelectorAll("a[href*='telegram']");
              if (links.length > 0) {
                endSection = s;
              }
            }
            if (endSection) break;
          }

          // Fallback: 2 sections after Results
          if (!endSection && resultsIdx + 2 < allSections.length) {
            endSection = allSections[resultsIdx + 2];
          }

          if (startSection && endSection && startSection !== endSection) {
            const startH2 = startSection.querySelector("h2");
            const startContainer =
              (startH2?.closest(".mx-auto") as HTMLElement | null) ?? startSection;

            // End at the inner content container of CTA, not the section edge
            const endH2 = endSection.querySelector("h2");
            const endContainer =
              (endH2?.closest(".mx-auto") as HTMLElement | null) ?? endSection;

            // Calculate total height from start container top to end container bottom
            const startRect = startContainer.getBoundingClientRect();
            const endRect = endContainer.getBoundingClientRect();
            const totalHeight = endRect.bottom - startRect.top;

            if (totalHeight > 0) {
              const sectionWidth = startSection.clientWidth;
              const margin = Math.max(
                0,
                (sectionWidth - startContainer.clientWidth) / 2
              );
              if (margin >= RAIL_WIDTH + 24) {
                const gap = Math.min(64, Math.max(20, Math.floor((margin - RAIL_WIDTH) / 2)));
                startContainer.style.position = startContainer.style.position || "relative";
                endSectionRef.current = endContainer;
                setRailGap(gap);
                setRailHeight(totalHeight);
                setAnchor(startContainer);
                return;
              }
            }
          }
        }

        // 3. Fallback — Results section alone
        if (!section) section = resultsSection;
      }

      if (!section) {
        // 4. Heuristic fallback — section with most media
        let best: HTMLElement | null = null;
        let bestCount = 0;
        for (const s of document.querySelectorAll("section")) {
          const n = s.querySelectorAll("img, video").length;
          if (n > bestCount) {
            bestCount = n;
            best = s as HTMLElement;
          }
        }
        section = best;
      }
      if (!section) {
        if (attempt < 5) retryTimer = setTimeout(() => find(attempt + 1), 350);
        return;
      }

      const h2 = section.querySelector("h2");
      const container =
        (h2?.closest(".mx-auto") as HTMLElement | null) ?? section;
      measureAndSet(container);
    };

    const rafId = requestAnimationFrame(() => find(0));
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (retryTimer) clearTimeout(retryTimer);
      endSectionRef.current = null;
    };
  }, [t]);

  // Track anchor height + fade the rail in once it enters the viewport.
  // Measurements are deferred to the next frame: reading layout straight
  // inside a ResizeObserver callback triggers "ResizeObserver loop completed
  // with undelivered notifications" in WebKit whenever it schedules a new
  // notification in the same turn.
  useEffect(() => {
    if (!anchor) return;
    let frame = 0;
    const measure = () => {
      const end = endSectionRef.current;
      let next = 0;
      if (end) {
        const startRect = anchor.getBoundingClientRect();
        const endRect = end.getBoundingClientRect();
        next = endRect.bottom - startRect.top;
      } else {
        next = anchor.offsetHeight;
      }
      // Only write when the size really changed — endless same-value updates
      // are what keep the observer loop alive.
      if (next > 0) setRailHeight((prev) => (prev === next ? prev : next));
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(schedule);
    ro.observe(anchor);
    if (endSectionRef.current) ro.observe(endSectionRef.current);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: "10% 0px" }
    );
    io.observe(anchor);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [anchor]);

  // Scroll choreography: draw the winding path between the segments (mask
  // dash-offset), pop each icon as the path reaches it, parallax icons.
  // Layout effect so the first painted frame already matches the viewport.
  useLayoutEffect(() => {
    if (!revealed || !anchor) return;

    const apply = () => {
      const vh = window.innerHeight;
      const rect = anchor.getBoundingClientRect();
      const railBottom = rect.top + railHeight;
      const railOffscreen =
        railBottom < -ACTIVE_MARGIN || rect.top > vh + ACTIVE_MARGIN;

      const progress = reducedMotion
        ? 1
        : Math.min(
            1,
            Math.max(
              0,
              (vh * 0.6 - rect.top) / railHeight
            )
          );

      for (const [key, meta] of segmentMeta) {
        const refs = segmentRefs.current.get(key);
        if (!refs || !refs.svg) continue;

        const segTop = rect.top + meta.top;
        const active =
          !railOffscreen &&
          segTop < vh + ACTIVE_MARGIN &&
          segTop + meta.height > -ACTIVE_MARGIN;
        const drawn = progress * meta.totalLen;
        const show = active && drawn >= meta.startLen;

        const display = show ? "" : "none";
        if (refs.svg.style.display !== display) refs.svg.style.display = display;
        if (!show) continue;

        const local =
          meta.len > 0 ? Math.min(1, Math.max(0, (drawn - meta.startLen) / meta.len)) : 1;

        if (local >= 1) {
          if (refs.state !== "done") {
            refs.state = "done";
            refs.group?.removeAttribute("mask");
          }
        } else {
          if (refs.state !== "drawing") {
            refs.state = "drawing";
            refs.group?.setAttribute("mask", `url(#${meta.maskId})`);
          }
          const offset = (1 - local).toFixed(3);
          if (refs.offset !== offset && refs.mask) {
            refs.offset = offset;
            refs.mask.style.strokeDashoffset = offset;
          }
        }
      }

      for (const item of revealItems.current.values()) {
        if (progress >= item.pos - 0.01) {
          if (!item.reached) {
            item.reached = true;
            item.revealEl?.classList.add("is-reached");
            item.nodeEl?.classList.add("is-reached");
          }
        } else if (item.reached) {
          item.reached = false;
          item.revealEl?.classList.remove("is-reached");
          item.nodeEl?.classList.remove("is-reached");
        }
      }

      for (const [el, icon] of parallaxItems.current) {
        const iconCenterY = rect.top + icon.linePosition * railHeight;
        const near =
          iconCenterY > -ACTIVE_MARGIN && iconCenterY < vh + ACTIVE_MARGIN;
        const host = (el.closest(".stack-icon-reveal") ?? el) as HTMLElement;
        const offscreen = host.classList.contains("is-offscreen");
        if (near && offscreen) host.classList.remove("is-offscreen");
        else if (!near && !offscreen) host.classList.add("is-offscreen");

        if (!near || reducedMotion) continue;
        const dist = vh / 2 - iconCenterY;
        const shift = Math.max(
          -22,
          Math.min(22, dist * icon.parallaxSpeed * 0.06)
        );
        const transform = `translateY(${shift.toFixed(1)}px)`;
        if (el.style.transform !== transform) el.style.transform = transform;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        apply();
      });
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [revealed, anchor, reducedMotion, railHeight, segmentMeta]);

  if (!anchor || !railHeight || !railGap) {
    return null;
  }

  const accentRgb = parseRgb(caseMeta.glowColor);
  const accentColor = `rgb(${accentRgb.join(", ")})`;

  const rails = (
    <>
      <style dangerouslySetInnerHTML={{ __html: STACK_RAIL_CSS }} />
      <Rail
        side="left"
        gap={railGap}
        height={railHeight}
        accentRgb={accentRgb}
        accentColor={accentColor}
        glowColor={caseMeta.glowColor}
        revealed={revealed}
        icons={iconsBySide.left}
        segments={segmentsBySide.left}
        registerParallax={registerParallax}
        registerReveal={registerReveal}
        registerNode={registerNode}
        registerSegment={registerSegment}
      />
      <Rail
        side="right"
        gap={railGap}
        height={railHeight}
        accentRgb={accentRgb}
        accentColor={accentColor}
        glowColor={caseMeta.glowColor}
        revealed={revealed}
        icons={iconsBySide.right}
        segments={segmentsBySide.right}
        registerParallax={registerParallax}
        registerReveal={registerReveal}
        registerNode={registerNode}
        registerSegment={registerSegment}
      />
    </>
  );

  return createPortal(rails, anchor);
}
