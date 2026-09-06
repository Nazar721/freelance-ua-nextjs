"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Percent, ChevronDown } from "lucide-react";
import { gsap, useGSAP, refreshAfterFonts } from "./scroll/gsapCore";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/LanguageContext";

/* ── SVG geometry constants ──────────────────────────────────────────── */
const SVG_W = 500;
const SVG_H = 420;

const NODES = [
  { cx: 70, cy: 340, r: 18, colorVar: "var(--graph-node1)", label: "Ти рекомендуєш", labelDy: 32 },
  { cx: 250, cy: 190, r: 26, colorVar: "var(--graph-node2)", label: "Ми виконуємо", labelDy: 40 },
  { cx: 430, cy: 60, r: 34, colorVar: "var(--graph-node3)", label: "10-15% від проєкту", labelDy: 52 },
] as const;

const LINE_1_2 = `M${NODES[0].cx},${NODES[0].cy} L${NODES[1].cx},${NODES[1].cy}`;
const LINE_2_3 = `M${NODES[1].cx},${NODES[1].cy} L${NODES[2].cx},${NODES[2].cy}`;

function splitWords(text: string, lineIndex: number) {
  return text.split(" ").map((word, i) => (
    <span key={`${lineIndex}-${i}`} className="hero-word inline-block will-change-transform">
      {word}
      {"\u00A0"}
    </span>
  ));
}

/* ── Main component ─────────────────────────────────────────────────── */
export function PartnersHero() {
  const { t } = useTranslation();
  const scopeRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const phrases = [
    t("partners.hero.phrase.1"),
    t("partners.hero.phrase.2"),
    t("partners.hero.phrase.3"),
    t("partners.hero.phrase.4"),
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(id);
  }, [phrases.length]);

  useGSAP(
    () => {
      if (!scopeRef.current || !svgRef.current) return;
      const q = gsap.utils.selector(scopeRef);
      const words = q(".hero-word");
      const items = q(".hero-fade-item");
      const scrollCue = q(".hero-scroll-cue");
      const graphWrapper = q(".network-graph-wrapper");

      // Query SVG elements directly from the SVG ref (more reliable than scoped selector)
      const svgEl = svgRef.current;
      const line1El = svgEl.querySelector<SVGPathElement>(".network-line-1-2");
      const line2El = svgEl.querySelector<SVGPathElement>(".network-line-2-3");
      const node1 = svgEl.querySelector<SVGCircleElement>(".network-node-circle-1");
      const node2 = svgEl.querySelector<SVGCircleElement>(".network-node-circle-2");
      const node3 = svgEl.querySelector<SVGCircleElement>(".network-node-circle-3");
      const labels = svgEl.querySelectorAll<SVGTextElement>(".network-label");
      const flowDot = svgEl.querySelector<SVGCircleElement>(".network-flow-dot");
      const glow3 = svgEl.querySelector<SVGCircleElement>(".network-glow-3");

      const allSvgHidden = [line1El, line2El, node1, node2, node3, ...labels, flowDot, glow3].filter(Boolean);

      // Pulse dots
      const pulseDot1 = svgEl.querySelector<SVGCircleElement>(".network-pulse-dot-1");
      const pulseDot2 = svgEl.querySelector<SVGCircleElement>(".network-pulse-dot-2");

      const mm = gsap.matchMedia();

      /* ── System "reduce motion": show everything immediately ─────── */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([...words, ...items, ...scrollCue], { opacity: 1, y: 0, clearProps: "transform" });
        gsap.set(scrollCue, { display: "none" });
        if (line1El) gsap.set(line1El, { strokeDashoffset: 0, opacity: 1 });
        if (line2El) gsap.set(line2El, { strokeDashoffset: 0, opacity: 1 });
        [node1, node2, node3].forEach((n) => n && gsap.set(n, { opacity: 1, scale: 1, clearProps: "transform" }));
        labels.forEach((l) => gsap.set(l, { opacity: 1 }));
        if (flowDot) gsap.set(flowDot, { opacity: 0 });
        if (glow3) gsap.set(glow3, { opacity: 0.25 });
        return () => gsap.set(scrollCue, { clearProps: "display" });
      });

      /* ── Normal: entrance + loops + scroll ───────────────────────── */
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Ensure all SVG elements start hidden via inline style (overrides SVG attribute)
        allSvgHidden.forEach((el) => gsap.set(el, { opacity: 0 }));

        /* Title words */
        gsap.fromTo(
          words,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out", delay: 3.0 },
        );

        /* Subtitle + button + stats */
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 3.2 },
        );

        /* ── NETWORK GRAPH ENTRANCE ───────────────────────────────── */
        if (line1El && line2El) {
          const len1 = line1El.getTotalLength();
          const len2 = line2El.getTotalLength();

          // Hide lines via dashoffset
          gsap.set(line1El, { strokeDasharray: len1, strokeDashoffset: len1, opacity: 1 });
          gsap.set(line2El, { strokeDasharray: len2, strokeDashoffset: len2, opacity: 1 });

          // Pulse dots
          const pulseDot1 = svgEl.querySelector<SVGCircleElement>(".network-pulse-dot-1");
          const pulseDot2 = svgEl.querySelector<SVGCircleElement>(".network-pulse-dot-2");

          const tl = gsap.timeline({ delay: 3.2 });

          // ── Step 1: Node 1 appears ──
          if (node1) {
            gsap.set(node1, { opacity: 0, scale: 0, transformOrigin: `${NODES[0].cx}px ${NODES[0].cy}px` });
            tl.to(node1, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, 0);
          }
          if (labels[0]) {
            gsap.set(labels[0], { opacity: 0, y: 8 });
            tl.to(labels[0], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.2);
          }

          // ── Step 2: Pulse travels along line 1→2, then node 2 appears ──
          if (pulseDot1) {
            const start1 = line1El.getPointAtLength(0);
            const end1 = line1El.getPointAtLength(len1);
            gsap.set(pulseDot1, { attr: { cx: start1.x, cy: start1.y }, opacity: 0 });

            // Pulse dot travels
            tl.to(pulseDot1, { opacity: 1, duration: 0.15 }, 0.7);
            tl.to(pulseDot1, {
              attr: { cx: end1.x, cy: end1.y },
              duration: 0.7,
              ease: "power2.inOut",
            }, 0.7);
            // Line draws with the pulse
            tl.to(line1El, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 0.7);
            // Pulse fades out
            tl.to(pulseDot1, { opacity: 0, duration: 0.2 }, 1.35);
          } else {
            tl.to(line1El, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, 0.7);
          }

          // Node 2 appears after pulse arrives
          if (node2) {
            gsap.set(node2, { opacity: 0, scale: 0, transformOrigin: `${NODES[1].cx}px ${NODES[1].cy}px` });
            tl.to(node2, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, 1.4);
          }
          if (labels[1]) {
            gsap.set(labels[1], { opacity: 0, y: 8 });
            tl.to(labels[1], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 1.6);
          }

          // ── Step 3: Pulse travels along line 2→3, then node 3 appears ──
          if (pulseDot2) {
            const start2 = line2El.getPointAtLength(0);
            const end2 = line2El.getPointAtLength(len2);
            gsap.set(pulseDot2, { attr: { cx: start2.x, cy: start2.y }, opacity: 0 });

            tl.to(pulseDot2, { opacity: 1, duration: 0.15 }, 2.1);
            tl.to(pulseDot2, {
              attr: { cx: end2.x, cy: end2.y },
              duration: 0.7,
              ease: "power2.inOut",
            }, 2.1);
            tl.to(line2El, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, 2.1);
            tl.to(pulseDot2, { opacity: 0, duration: 0.2 }, 2.75);
          } else {
            tl.to(line2El, { strokeDashoffset: 0, duration: 0.6, ease: "power2.out" }, 2.1);
          }

          // Node 3 appears with bounce + glow
          if (node3) {
            gsap.set(node3, { opacity: 0, scale: 0, transformOrigin: `${NODES[2].cx}px ${NODES[2].cy}px` });
            tl.to(node3, {
              opacity: 1,
              scale: 1.15,
              duration: 0.55,
              ease: "back.out(2)",
              onComplete: () => {
                gsap.to(node3, { scale: 1, duration: 0.25, ease: "power2.out" });
              },
            }, 2.8);
          }
          if (labels[2]) {
            gsap.set(labels[2], { opacity: 0, y: 8 });
            tl.to(labels[2], { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 3.0);
          }

          // Glow flash on node 3
          if (glow3) {
            gsap.set(glow3, { opacity: 0, transformOrigin: `${NODES[2].cx}px ${NODES[2].cy}px` });
            tl.to(glow3, {
              opacity: 0.5,
              duration: 0.4,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(glow3, { opacity: 0.2, duration: 0.4, ease: "power2.inOut" });
              },
            }, 2.8);
          }

          // Flow dot (continuous after entrance)
          if (flowDot) {
            tl.to(flowDot, { opacity: 0.9, duration: 0.5, ease: "power2.out" }, 3.5);

            if (window.innerWidth >= 640) {
              const startPt = line2El.getPointAtLength(0);
              const endPt = line2El.getPointAtLength(len2);
              gsap.set(flowDot, { attr: { cx: startPt.x, cy: startPt.y } });
              gsap.to(flowDot, {
                attr: { cx: endPt.x, cy: endPt.y },
                duration: 2.5,
                repeat: -1,
                ease: "none",
                delay: 4.0,
              });
            }
          }

          // Node 3 glow pulse loop
          if (glow3) {
            gsap.to(glow3, {
              opacity: 0.4,
              scale: 1.08,
              duration: 2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              delay: 3.8,
              transformOrigin: `${NODES[2].cx}px ${NODES[2].cy}px`,
            });
          }
        }

        /* ── SCROLL-DRIVEN PARALLAX ─────────────────────────────── */
        gsap.fromTo(
          graphWrapper,
          { scale: 1, y: 0, opacity: 1 },
          {
            scale: 1.15,
            y: 60,
            opacity: 0.3,
            ease: "none",
            scrollTrigger: {
              trigger: scopeRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          },
        );

        /* Scroll cue */
        const cueTweens = gsap.fromTo(
          scrollCue,
          { y: 0 },
          { y: 10, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" },
        );
        const hideCue = () => {
          gsap.to(scrollCue, { opacity: 0, duration: 0.4, overwrite: "auto" });
          cueTweens.kill();
        };
        window.addEventListener("scroll", hideCue, { once: true, passive: true });
        return () => window.removeEventListener("scroll", hideCue);
      });

      refreshAfterFonts();
      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const titleLines = t("partners.hero.title").split("\n");

  return (
    <section
      ref={scopeRef}
      className="relative flex items-center overflow-hidden px-4 pb-24 pt-4 sm:pt-8 md:min-h-[92vh]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-8">
        {/* ── Left column: text content (55%) ─────────────────────── */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left" style={{ flex: "0 0 55%" }}>
          <span className="hero-fade-item mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Percent size={14} />
            {t("header.partner")}
          </span>

          <h1 className="mb-6 whitespace-pre-line text-[30px] font-bold leading-[1.15] text-foreground sm:text-5xl lg:text-6xl">
            {titleLines.map((line, idx) => (
              <span key={idx} className="block">
                {splitWords(line, idx)}
              </span>
            ))}
          </h1>

          <p className="hero-fade-item mx-auto mb-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl lg:mx-0">
            {t("partners.hero.desc")}
          </p>

          {/* Rotating tagline — cycles every 4s, layout-stable fixed height */}
          <div
            className="hero-fade-item mx-auto mb-10 flex h-7 items-center lg:mx-0"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="text-sm font-medium text-primary sm:text-base"
              >
                {phrases[phraseIdx]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="hero-fade-item">
            <Link
              href={siteConfig.telegram.consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 text-base font-semibold text-primary-foreground transition-all duration-500 hover:bg-primary/90 hover:shadow-[0_0_60px_rgba(99,102,241,0.5)]"
            >
              {t("partners.cta.button")}
              <ArrowRight
                size={18}
                className="transition-transform duration-300"
              />
            </Link>
          </div>

          {/* Stats row */}
          <div className="hero-fade-item mt-14 flex items-center justify-center gap-8 text-center sm:gap-12">
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">15%</div>
              <div className="mt-1 text-xs text-muted-foreground">від суми</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">0</div>
              <div className="mt-1 text-xs text-muted-foreground">ризиків</div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="text-2xl font-bold text-foreground sm:text-3xl">2хв</div>
              <div className="mt-1 text-xs text-muted-foreground">на підключення</div>
            </div>
          </div>
        </div>

        {/* ── Right column: network graph (45%) ───────────────────── */}
        <div
          className="network-graph-wrapper relative flex w-full items-center justify-center lg:w-auto"
          style={{ flex: "0 0 45%" }}
        >
          <div className="relative h-[320px] w-full max-w-[480px] sm:h-[400px] lg:h-[480px]">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full text-foreground"
              aria-hidden="true"
            >
              <defs>
                <filter id="node3-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="line-grad-2-3" x1={NODES[1].cx} y1={NODES[1].cy} x2={NODES[2].cx} y2={NODES[2].cy} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--graph-line2)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--graph-node3)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="line-grad-1-2" x1={NODES[0].cx} y1={NODES[0].cy} x2={NODES[1].cx} y2={NODES[1].cy} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="var(--graph-line1)" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="var(--graph-line2)" stopOpacity="0.7" />
                </linearGradient>
                <radialGradient id="node3-pulse" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--graph-node2)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--graph-node2)" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Lines */}
              <path d={LINE_1_2} stroke="url(#line-grad-1-2)" strokeWidth="2" strokeLinecap="round" className="network-line-1-2" />
              <path d={LINE_2_3} stroke="url(#line-grad-2-3)" strokeWidth="3.5" strokeLinecap="round" className="network-line-2-3" />

              {/* Flow dot */}
              <circle r="5" fill="var(--graph-pulse)" className="network-flow-dot" />

              {/* Pulse dots for line drawing animation */}
              <circle r="4" fill="var(--graph-line2)" opacity="0" className="network-pulse-dot-1" />
              <circle r="5" fill="var(--graph-node3)" opacity="0" className="network-pulse-dot-2" />

              {/* Node 3 glow */}
              <circle cx={NODES[2].cx} cy={NODES[2].cy} r={NODES[2].r + 20} fill="url(#node3-pulse)" className="network-glow-3" />

              {/* Nodes + labels */}
              {NODES.map((node, i) => (
                <g
                  key={i}
                  className="network-node-group"
                  style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r}
                    fill={node.colorVar}
                    className={`network-node-circle-${i + 1}`}
                    filter={i === 2 ? "url(#node3-glow)" : undefined}
                  />
                  <text
                    x={node.cx}
                    y={node.cy + node.labelDy}
                    textAnchor="middle"
                    fill="currentColor"
                    fontSize={i === 2 ? "13" : "12"}
                    fontWeight={i === 2 ? "600" : "500"}
                    className="network-label"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>

            {/* HTML tooltips — all positioned ABOVE the node */}
            {NODES.map((node, i) => {
              const tooltipY = `${(node.cy / SVG_H) * 100 - 22}%`;
              return (
                <div
                  key={i}
                  className={`network-tooltip pointer-events-none absolute hidden lg:block ${
                    hoveredNode === i ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    left: `${(node.cx / SVG_W) * 100}%`,
                    top: tooltipY,
                    transform: `translateX(-50%) ${hoveredNode === i ? "translateY(0)" : "translateY(6px)"}`,
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                  }}
                >
                  <div className="relative rounded-xl border border-white/10 bg-[#1a1a2e]/95 px-4 py-2.5 text-center text-xs font-medium text-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-sm whitespace-nowrap">
                    {t(`hero.scene.node${i + 1}.desc`)}
                    <div className="absolute left-1/2 -bottom-1.5 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/10 bg-[#1a1a2e]/95" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-cue absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-muted-foreground">
        <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
