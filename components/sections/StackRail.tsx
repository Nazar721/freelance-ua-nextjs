"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
.stack-rail-svg {
  position: absolute;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}
.stack-rail-line {
  filter: drop-shadow(0 0 3px var(--case-accent-color));
}
/* Bright dash segment travelling along the path — "living track" effect */
.stack-rail-flow {
  stroke-dasharray: 16 30;
  opacity: 0.85;
  filter: drop-shadow(0 0 6px var(--case-accent-color));
  animation: stack-rail-flow 2.6s linear infinite;
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
  animation: stack-icon-glow var(--float-duration, 4s) ease-in-out infinite;
  animation-delay: var(--float-delay, 0s);
}
@keyframes stack-icon-glow {
  0%, 100% {
    box-shadow:
      0 10px 28px rgba(0, 0, 0, 0.45),
      0 2px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2),
      0 0 12px var(--case-accent-color, rgba(99, 102, 241, 0.15));
  }
  50% {
    box-shadow:
      0 10px 28px rgba(0, 0, 0, 0.45),
      0 2px 8px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.12),
      inset 0 -1px 0 rgba(0, 0, 0, 0.2),
      0 0 22px var(--case-accent-color, rgba(99, 102, 241, 0.35));
  }
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

/** Smooth rounded path through all points (Catmull-Rom → cubic Bézier). */
function catmullRomPath(pts: Pt[]): string {
  if (pts.length < 2) return "";
  const f = (n: number) => Math.round(n * 10) / 10;
  let d = `M ${f(pts[0].x)} ${f(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${f(c1x)} ${f(c1y)}, ${f(c2x)} ${f(c2y)}, ${f(p2.x)} ${f(p2.y)}`;
  }
  return d;
}

/**
 * Winding "track" that passes through every icon anchor point:
 * between consecutive icons the path swings to the opposite side,
 * producing rounded S-bends like a pipeline route.
 */
function buildRailPath(icons: StackIconEntry[], height: number): string {
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
  return catmullRomPath(pts);
}

interface RevealEntry {
  revealEl: HTMLElement | null;
  nodeEl: SVGCircleElement | null;
  pos: number;
  reached: boolean;
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
  registerParallax,
  registerDrawPath,
  registerReveal,
  registerNode,
}: {
  side: "left" | "right";
  gap: number;
  height: number;
  accentRgb: [number, number, number];
  accentColor: string;
  glowColor: string;
  revealed: boolean;
  icons: StackIconEntry[];
  registerParallax: (el: HTMLElement | null, icon: StackIconEntry) => void;
  registerDrawPath: (side: string, el: SVGPathElement | null) => void;
  registerReveal: (key: string, pos: number, el: HTMLElement | null) => void;
  registerNode: (key: string, el: SVGCircleElement | null) => void;
}) {
  const accent = accentRgb.join(", ");
  const nodeFill = `rgba(${accent}, 0.75)`;
  const path = useMemo(() => buildRailPath(icons, height), [icons, height]);
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
      <svg
        className="stack-rail-svg"
        width={RAIL_WIDTH}
        height={height}
        viewBox={`0 0 ${RAIL_WIDTH} ${height}`}
      >
        <defs>
          <linearGradient id={`stack-line-grad-${side}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${accent}, 0)`} />
            <stop offset="6%" stopColor={`rgba(${accent}, ${STACK_LINE.opacity})`} />
            <stop offset="94%" stopColor={`rgba(${accent}, ${STACK_LINE.opacity})`} />
            <stop offset="100%" stopColor={`rgba(${accent}, 0)`} />
          </linearGradient>
          <linearGradient id={`stack-line-grad-flow-${side}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${accent}, 0)`} />
            <stop offset="6%" stopColor={`rgba(${accent}, 0.95)`} />
            <stop offset="94%" stopColor={`rgba(${accent}, 0.95)`} />
            <stop offset="100%" stopColor={`rgba(${accent}, 0)`} />
          </linearGradient>
          <mask id={`stack-draw-mask-${side}`}>
            <path
              ref={(el) => registerDrawPath(side, el)}
              d={path}
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
        <path
          className="stack-rail-line"
          d={path}
          fill="none"
          stroke={`url(#stack-line-grad-${side})`}
          strokeWidth={STACK_LINE.width}
          strokeLinecap="round"
          strokeDasharray={STACK_LINE.style === "dotted" ? "0.1 9" : "5 9"}
          mask={`url(#stack-draw-mask-${side})`}
        />
        <path
          className="stack-rail-flow"
          d={path}
          fill="none"
          stroke={`url(#stack-line-grad-flow-${side})`}
          strokeWidth={STACK_LINE.width}
          strokeLinecap="round"
          mask={`url(#stack-draw-mask-${side})`}
        />
        {icons.map((icon, i) => (
          <circle
            key={`node-${side}-${i}`}
            ref={(el) => registerNode(`${side}:${i}`, el)}
            className="stack-line-node"
            cx={RAIL_CENTER + icon.offsetX}
            cy={icon.linePosition * height}
            r={4}
            fill={nodeFill}
          />
        ))}
      </svg>

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
                      alt=""
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
  const drawPaths = useRef<Map<string, SVGPathElement>>(new Map());
  const revealItems = useRef<Map<string, RevealEntry>>(new Map());
  const endSectionRef = useRef<HTMLElement | null>(null);

  const iconsBySide = useMemo<{ left: StackIconEntry[]; right: StackIconEntry[] }>(() => {
    const all = getStackIcons(caseMeta.caseType, railHeight || undefined);
    return {
      left: all.filter((i) => i.side === "left"),
      right: all.filter((i) => i.side === "right"),
    };
  }, [caseMeta, railHeight]);

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

  const registerDrawPath = (side: string, el: SVGPathElement | null) => {
    if (el) drawPaths.current.set(side, el);
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
              if ((h2.textContent || "").trim().toLowerCase().includes("розпочати")) {
                endSection = s;
                break;
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
    };
  }, [t]);

  // Track anchor height + fade the rail in once it enters the viewport
  useEffect(() => {
    if (!anchor) return;
    const measure = () => {
      const end = endSectionRef.current;
      if (end) {
        const startRect = anchor.getBoundingClientRect();
        const endRect = end.getBoundingClientRect();
        const totalHeight = endRect.bottom - startRect.top;
        if (totalHeight > 0) setRailHeight(totalHeight);
      } else {
        setRailHeight(anchor.offsetHeight);
      }
    };
    const ro = new ResizeObserver(measure);
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
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, [anchor]);

  // Scroll choreography: draw the winding path between the icons (mask
  // dash-offset), pop each icon as the path reaches it, parallax icons.
  useEffect(() => {
    if (!revealed || !anchor) return;

    const apply = () => {
      const rect = anchor.getBoundingClientRect();
      const railBottom = rect.top + railHeight;
      if (railBottom < -200 || rect.top > window.innerHeight + 200) return;

      const progress = reducedMotion
        ? 1
        : Math.min(
            1,
            Math.max(
              0,
              (window.innerHeight * 0.6 - rect.top) / railHeight
            )
          );

      const offset = (1 - progress).toFixed(3);
      for (const p of drawPaths.current.values()) {
        p.style.strokeDashoffset = offset;
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

      if (reducedMotion) return;

      const mid = window.innerHeight / 2;
      for (const [el, icon] of parallaxItems.current) {
        const iconCenterY = rect.top + icon.linePosition * railHeight;
        const dist = mid - iconCenterY;
        const shift = Math.max(
          -22,
          Math.min(22, dist * icon.parallaxSpeed * 0.06)
        );
        el.style.transform = `translateY(${shift.toFixed(1)}px)`;
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
  }, [revealed, anchor, reducedMotion, railHeight]);

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
        registerParallax={registerParallax}
        registerDrawPath={registerDrawPath}
        registerReveal={registerReveal}
        registerNode={registerNode}
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
        registerParallax={registerParallax}
        registerDrawPath={registerDrawPath}
        registerReveal={registerReveal}
        registerNode={registerNode}
      />
    </>
  );

  return createPortal(rails, anchor);
}
