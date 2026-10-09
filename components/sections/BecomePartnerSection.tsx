"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useTheme } from "@/lib/ThemeContext";

const RATE_PER_CLIENT = 850;
const MAX_INCOME = 26800;
const SVG_W = 2400;
const SVG_H = 900;
const MAX_LINE_PROGRESS = 0.82;
/**
 * Placement of the chart <svg> inside the stage. Single source of truth for
 * the camera, marker, end-dot and income-plaque coordinates — must stay in
 * sync with the inline styles on the <svg> (width / left / top).
 */
const SVG_SCREEN_WIDTH_VW = 1.8; // width: 180vw
const SVG_LEFT_VW = -0.1; // left: -10vw
const SVG_TOP_PCT = 0.15; // top: 15%

const MARKERS = [
  { progress: 0.2, amount: 1200 },
  { progress: 0.5, amount: 3400 },
  { progress: 0.8, amount: 8600 },
];

function fmt(n: number) {
  return "\u20B4" + Math.round(n).toLocaleString("uk-UA");
}
function fmtPlus(n: number) {
  return "+" + Math.round(n).toLocaleString("uk-UA") + "\u20B4";
}

function generateCurvePath(
  points: number,
  trend: (t: number) => number,
  noiseAmp: number,
  seed: number,
  direction: "ltr" | "rtl" = "ltr"
): string {
  const pts: [number, number][] = [];
  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const x = direction === "rtl" ? SVG_W - t * SVG_W : t * SVG_W;
    const y = trend(t);
    const noise =
      Math.sin(t * 47.3 + seed) * noiseAmp * 0.6 +
      Math.sin(t * 23.7 + seed * 2.1) * noiseAmp * 0.3 +
      Math.sin(t * 91.1 + seed * 0.7) * noiseAmp * 0.1;
    pts.push([x, y + noise]);
  }
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx1 = prev[0] + (curr[0] - prev[0]) * 0.4;
    const cpx2 = prev[0] + (curr[0] - prev[0]) * 0.6;
    d += ` C ${cpx1} ${prev[1]}, ${cpx2} ${curr[1]}, ${curr[0]} ${curr[1]}`;
  }
  return d;
}

// Growth: ascending, bottom-left → top-right (ltr)
const GROWTH_PATH = generateCurvePath(
  60,
  (t) => SVG_H - 80 - t * (SVG_H - 160),
  28,
  42,
  "ltr"
);

// Green animated line sits above the dashed ghost path
const GROWTH_PATH_UPPER = generateCurvePath(
  60,
  (t) => SVG_H - 80 - t * (SVG_H - 160) - 18,
  28,
  42,
  "ltr"
);


interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
}

export default function BecomePartnerSection() {
  const { theme } = useTheme();
  const reducedMotion = usePrefersReducedMotion();
  // Start desktop on both server and first client render (hydration-safe);
  // the real value applies right after mount.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const counterLabelRef = useRef<HTMLDivElement>(null);
  const liveMetricRef = useRef<HTMLDivElement>(null);
  const liveMetricValueRef = useRef<HTMLDivElement>(null);
  const liveMetricSweepRef = useRef<HTMLSpanElement>(null);
  /** Income shown by the chart plaque — driven by scroll progress only. */
  const animatedIncomeRef = useRef(0);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const chartGrowthRef = useRef<HTMLDivElement>(null);

  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaPanelRef = useRef<HTMLDivElement>(null);

  const [clients, setClients] = useState(25);
  const calcIncomeRef = useRef<HTMLDivElement>(null);
  const clientsRef = useRef(clients);

  const progressRef = useRef(0);
  const markerWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const markerPillRefs = useRef<(HTMLDivElement | null)[]>([]);

  const growthPathRef = useRef<SVGPathElement>(null);
  const growthGlowNearRef = useRef<SVGPathElement>(null);
  const growthGlowFarRef = useRef<SVGPathElement>(null);
  /** Static path geometry — measured once, reused on every scroll update. */
  const growthLenRef = useRef<number | null>(null);
  const growthEndPtRef = useRef<{ x: number; y: number } | null>(null);
  const markerPtsRef = useRef<{ x: number; y: number }[] | null>(null);
  /** Current camera (stage coords) shared by line, markers and plaque. */
  const cameraRef = useRef({
    tx: 0,
    ty: 0,
    zoom: 1,
    ox: 0,
    oy: 0,
    scale: 1,
    svgLeft: 0,
    svgTop: 0,
  });

  const hasPlayedOnce = useRef(false);
  const hasSkippedBack = useRef(false);
  const hasCompletedOnce = useRef(false);
  const scrollDirection = useRef(1);
  const visualP = useRef(0);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const ghostPathRef = useRef<SVGPathElement>(null);
  const endDotRef = useRef<HTMLDivElement>(null);

  /** The plaque's blur is cleared once — never re-written on scroll frames. */
  const metricBlurClearedRef = useRef(false);
  const markerRevealed = useRef<boolean[]>([false, false, false]);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef(0);

  const setDrawProgress = useCallback((p: number, reverse = false) => {
    const offset = String(reverse ? -p : 1 - p);
    for (const el of [
      growthGlowFarRef.current,
      growthGlowNearRef.current,
      growthPathRef.current,
    ]) {
      if (el && el.style.strokeDashoffset !== offset) {
        el.style.strokeDashoffset = offset;
      }
    }
  }, []);

  useEffect(() => {
    const element = trackRef.current;
    // Read the actual viewport before starting any desktop work during hydration.
    if (!element || window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let started = false;
    let dispose: (() => void) | undefined;
    const start = async () => {
      if (started) return;
      started = true;
      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        if (cancelled || window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)").matches) return;
        gsap.registerPlugin(ScrollTrigger);
        const initialiseScene = () => {
          const track = trackRef.current;
          const stage = stageRef.current!;
          const canvasEl = canvasRef.current!;
          const bgLayer = bgLayerRef.current!;
          const chartGrowth = chartGrowthRef.current!;

          const ctx = canvasEl.getContext("2d")!;

          function resizeCanvas() {
            canvasEl.width = stage.clientWidth;
            canvasEl.height = stage.clientHeight;
          }
          resizeCanvas();

          const count = 80;
          particlesRef.current = Array.from({ length: count }, () => ({
            x: Math.random() * canvasEl.width,
            y: Math.random() * canvasEl.height,
            r: Math.random() * 1.8 + 0.4,
            speed: Math.random() * 0.3 + 0.05,
            alpha: Math.random() * 0.5 + 0.2,
          }));

          function drawParticles() {
            ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
            const isLight = document.documentElement.dataset.theme === "light";
            particlesRef.current.forEach((p) => {
              p.y -= p.speed;
              if (p.y < -10) p.y = canvasEl.height + 10;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
              const a = isLight ? Math.min(p.alpha, 0.25) : p.alpha;
              ctx.fillStyle = `rgba(74,222,128,${a})`;
              ctx.shadowBlur = isLight ? 3 : 6;
              ctx.shadowColor = "#4ade80";
              ctx.fill();
              ctx.shadowBlur = 0;
            });
          }

          let visible = false;
          const syncParticles = () => {
            gsap.ticker.remove(drawParticles);
            if (visible && !document.hidden) gsap.ticker.add(drawParticles);
          };
          const visibilityObserver = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
            syncParticles();
          });
          visibilityObserver.observe(stage);
          document.addEventListener("visibilitychange", syncParticles);

          gsap.set(badgeRef.current, { opacity: 0, y: 28 });
          gsap.set(titleRef.current, { opacity: 0, y: 40, rotateX: 18 });
          gsap.set(subtitleRef.current, { opacity: 0, y: 32 });
          gsap.set(ctaPanelRef.current, { opacity: 0, y: 30, scale: 0.95 });
          gsap.set(liveMetricRef.current, { opacity: 0, y: 0, scale: 0.9, filter: "blur(10px)" });

          gsap.fromTo(scrollHintRef.current,
            { opacity: 0, y: -16, scale: 0.9, filter: "blur(6px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, delay: 0.5, ease: "power3.out" }
          );

          const counterObj = { val: 0 };
          const ctaTl = gsap.timeline({ paused: true });
          ctaTl
            .to(
              badgeRef.current,
              { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
              0
            )
            .to(
              titleRef.current,
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.35,
                ease: "back.out(1.5)",
              },
              0.05
            )
            .to(
              subtitleRef.current,
              { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
              0.1
            )
            .to(
              ctaPanelRef.current,
              { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.4)" },
              0.15
            )
            .fromTo(
              counterRef.current,
              { opacity: 0, y: 20, filter: "blur(12px)", scale: 0.92 },
              { opacity: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.7, ease: "power3.out" },
              0.1
            )
            .to(
              counterObj,
              {
                // 0 → 1 fraction of the *current* calculator value, so moving
                // the slider and scrubbing the scene never fight each other.
                val: 1,
                duration: 2.0,
                ease: "power2.out",
                onUpdate: () => {
                  if (counterRef.current) {
                    counterRef.current.textContent = fmt(
                      counterObj.val * clientsRef.current * RATE_PER_CLIENT
                    );
                  }
                },
              },
              0.15
            );

          // `snap` = re-sync from a fresh measurement (scene start, refresh,
          // resize): values land exactly on the current progress instead of
          // easing in from zero.
          const renderProgress = (rawProgress: number, snap = false) => {
            let p = Math.min(Math.max(rawProgress, 0), 1);

            // Once animation completes, freeze at final state
            if (hasCompletedOnce.current) {
              p = 1;
            }

            // Mark as completed when reaching the end
            if (p >= 0.95 && !hasCompletedOnce.current) {
              hasCompletedOnce.current = true;
            }

            visualP.current = p;
            updateSceneGrowth(p);
            updateCounter(p, snap);
            updateMarkers(p, snap);

            if (ghostPathRef.current) {
              const ghostOpacity = Math.min(1, p * 5);
              ghostPathRef.current.style.opacity = String(ghostOpacity);
            }

            if (scrollHintRef.current) {
              const hintOpacity = Math.max(0, 1 - p * 6);
              scrollHintRef.current.style.opacity = String(hintOpacity);
              scrollHintRef.current.style.pointerEvents = hintOpacity < 0.05 ? "none" : "auto";
            }

            const ctaP = Math.max(0, Math.min(1, (p - 0.75) / 0.15));
            ctaTl.progress(ctaP);
          };

          const mainST = ScrollTrigger.create({
            trigger: track,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            pin: stage,
            anticipatePin: 1,
            onUpdate: (self) => {
              progressRef.current = self.progress;
              scrollDirection.current = self.direction;
              renderProgress(self.progress);
            },
            // Layout can change after the trigger was created (images loading,
            // window resize, restored scroll position) — re-sync the scene so it
            // never drifts away from the real scroll progress.
            onRefresh: (self) => {
              progressRef.current = self.progress;
              scrollDirection.current = self.direction;
              renderProgress(self.progress, true);
            },
          });

          // The markup renders the chart hidden; apply the current progress
          // immediately so the line is never shown fully drawn and a restored
          // scroll position lands on the right frame.
          progressRef.current = mainST.progress;
          renderProgress(mainST.progress, true);

          function ensureGeometry() {
            const pathEl = growthPathRef.current;
            if (!pathEl) return null;
            if (growthLenRef.current === null) {
              const len = pathEl.getTotalLength();
              growthLenRef.current = len;
              growthEndPtRef.current = pathEl.getPointAtLength(
                len * MAX_LINE_PROGRESS
              );
              markerPtsRef.current = MARKERS.map((m) =>
                pathEl.getPointAtLength(len * m.progress)
              );
            }
            return pathEl;
          }

          /** SVG user unit → stage pixel, via the shared camera state. */
          function svgToStage(x: number, y: number) {
            const c = cameraRef.current;
            const lx = c.svgLeft + x * c.scale;
            const ly = c.svgTop + y * c.scale;
            return {
              x: c.tx + c.ox + c.zoom * (lx - c.ox),
              y: c.ty + c.oy + c.zoom * (ly - c.oy),
            };
          }

          function updateSceneGrowth(p: number) {
            const pathEl = ensureGeometry();
            const totalLen = growthLenRef.current;
            if (!pathEl || totalLen === null) return;

            // Reads first, style writes after — one layout pass per frame.
            const stageW = stage.clientWidth;
            const stageH = stage.clientHeight;
            const vw = window.innerWidth;

            const lineP = Math.min(p, MAX_LINE_PROGRESS);
            setDrawProgress(lineP);

            const lenAtP = totalLen * Math.min(Math.max(lineP, 0), 1);
            const pt = pathEl.getPointAtLength(
              Math.min(lenAtP, Math.max(totalLen - 0.01, 0))
            );

            const scale = (vw * SVG_SCREEN_WIDTH_VW) / SVG_W;
            const svgLeft = SVG_LEFT_VW * vw;
            const svgTop = stageH * SVG_TOP_PCT;
            const localX = svgLeft + pt.x * scale;
            const localY = svgTop + pt.y * scale;

            const zoom = 1 + p * 0.25;
            const ease = Math.min(1, p * 3);
            const targetX = stageW * (0.08 + ease * 0.07);
            const targetY = stageH * (0.82 - ease * 0.32);
            const ox = stageW / 2;
            const oy = stageH / 2;

            const tx = targetX - ox - zoom * (localX - ox);
            const ty = targetY - oy - zoom * (localY - oy);
            cameraRef.current = { tx, ty, zoom, ox, oy, scale, svgLeft, svgTop };

            chartGrowth.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`;

            const bgZoom = 1 + p * 0.08;
            const bgTx = 0.12 * (targetX - ox - bgZoom * (localX - ox));
            const bgTy = 0.12 * (targetY - oy - bgZoom * (localY - oy));
            bgLayer.style.transform = `translate(${bgTx}px, ${bgTy}px) scale(${bgZoom})`;

            const finalP = Math.max(0, Math.min(1, (p - 0.88) / 0.12));
            chartGrowth.style.opacity = String(1 - finalP * 0.18);
            bgLayer.style.opacity = String(1 - finalP * 0.08);

            const metric = svgToStage(pt.x, pt.y);
            if (liveMetricRef.current) {
              const lmX = Math.max(170, Math.min(stageW - 170, metric.x));
              const lmY = Math.max(170, Math.min(stageH - 140, metric.y - 180));
              const metricVisibility = Math.min(1, p * 4);
              liveMetricRef.current.style.opacity = String(
                p > 0.72 ? Math.max(0, 1 - (p - 0.72) / 0.1) : metricVisibility
              );
              liveMetricRef.current.style.transform = `translate(${lmX}px, ${lmY}px) translate(-50%, -50%) scale(${0.9 + metricVisibility * 0.1})`;
              if (!metricBlurClearedRef.current) {
                liveMetricRef.current.style.filter = "blur(0px)";
                metricBlurClearedRef.current = true;
              }
              liveMetricRef.current.classList.toggle("bp-live-metric--revealed", p > 0.18);
              liveMetricRef.current.classList.toggle("bp-live-metric--moving", p <= 0.18);
            }

            if (endDotRef.current) {
              const show = p > 0.95;
              const endPt = growthEndPtRef.current;
              if (endPt) {
                const e = svgToStage(endPt.x, endPt.y);
                endDotRef.current.style.transform = `translate(${e.x}px, ${e.y}px) translate(-50%, -50%)`;
              }
              const dotOpacity = show ? Math.min(1, (p - 0.95) / 0.03) : 0;
              endDotRef.current.style.opacity = String(dotOpacity);
              const pulseR = show ? 10 + Math.sin(Date.now() * 0.006) * 4 : 0;
              const size = `${pulseR * 2}px`;
              endDotRef.current.style.width = size;
              endDotRef.current.style.height = size;
            }
          }

          function updateCounter(p: number, snap = false) {
            // Chart plaque income — starts at zero and follows scroll only.
            const metricProgress = Math.min(1, p / 0.72);
            const metricAmount = Math.round(metricProgress * MAX_INCOME);
            const previousMetricAmount = animatedIncomeRef.current;
            animatedIncomeRef.current = snap
              ? metricAmount
              : previousMetricAmount + (metricAmount - previousMetricAmount) * 0.14;
            if (liveMetricValueRef.current) {
              liveMetricValueRef.current.textContent = fmt(animatedIncomeRef.current);
            }
          }

          function updateMarkers(p: number, snap = false) {
            const pts = markerPtsRef.current;
            if (!pts) return;

            MARKERS.forEach((m, i) => {
              const label = markerWrapRefs.current[i];
              if (!label) return;

              const pt = pts[i];
              const s = svgToStage(pt.x, pt.y);
              label.style.transform = `translate(${s.x}px, ${s.y - 12}px)`;

              const on = p >= m.progress;
              const targetOpacity = on ? 1 : 0;
              const current = parseFloat(label.style.opacity || "0");
              label.style.opacity = String(
                snap
                  ? targetOpacity
                  : current + (targetOpacity - current) * 0.15
              );

              if (on !== markerRevealed.current[i]) {
                markerRevealed.current[i] = on;
                markerPillRefs.current[i]?.classList.toggle("bp-marker-pill--in", on);
              }
            });
          }

          function onResize() {
            resizeCanvas();
            particlesRef.current.forEach((p) => {
              p.x = Math.random() * canvasEl.width;
              p.y = Math.random() * canvasEl.height;
            });
            // Stage size feeds the camera maths — re-apply the current progress
            // so the line, markers and plaque stay aligned after a resize.
            renderProgress(progressRef.current);
          }
          window.addEventListener("resize", onResize);

          return () => {
            hasPlayedOnce.current = false;
            hasSkippedBack.current = false;
            hasCompletedOnce.current = false;
            visualP.current = 0;
            animatedIncomeRef.current = 0;
            markerRevealed.current = [false, false, false];
            markerPillRefs.current.forEach((pill) =>
              pill?.classList.remove("bp-marker-pill--in")
            );
            // Back to the markup state: chart layer hidden, line undrawn —
            // re-entering the scene always starts from the prepared state.
            setDrawProgress(0);
            if (chartGrowthRef.current) chartGrowthRef.current.style.opacity = "0";
            if (endDotRef.current) endDotRef.current.style.opacity = "0";
            markerWrapRefs.current.forEach((wrap) => {
              if (wrap) {
                wrap.style.opacity = "0";
                wrap.style.transform = "translate(0px, 0px)";
              }
            });
            if (liveMetricRef.current) {
              liveMetricRef.current.classList.remove("bp-live-metric--revealed", "bp-live-metric--moving");
              liveMetricRef.current.style.opacity = "0";
              liveMetricRef.current.style.filter = "blur(10px)";
            }
            if (liveMetricSweepRef.current) {
              liveMetricSweepRef.current.classList.remove("bp-live-metric__sweep--run");
            }
            if (ghostPathRef.current) {
              ghostPathRef.current.style.opacity = "0";
            }
            if (scrollHintRef.current) {
              scrollHintRef.current.style.opacity = "0";
            }
            cancelAnimationFrame(animIdRef.current);
            gsap.ticker.remove(drawParticles);
            visibilityObserver.disconnect();
            document.removeEventListener("visibilitychange", syncParticles);
            metricBlurClearedRef.current = false;
            growthLenRef.current = null;
            growthEndPtRef.current = null;
            markerPtsRef.current = null;
            mainST.kill();
            ctaTl.kill();
            window.removeEventListener("resize", onResize);
          };
        };
        dispose = initialiseScene();
      } catch { /* Keep the static markup usable if the optional animation cannot load. */ }
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { observer.disconnect(); void start(); }
    }, { rootMargin: "800px" });
    observer.observe(element);
    return () => { cancelled = true; observer.disconnect(); dispose?.(); };
  }, [isMobile, reducedMotion, setDrawProgress]);

  // Calculator only: the CTA counter follows the slider. The chart plaque has
  // its own state (animatedIncomeRef) driven purely by scroll progress, so it
  // always starts at zero instead of inheriting the calculator total.
  useEffect(() => {
    const target = clients * RATE_PER_CLIENT;
    clientsRef.current = clients;
    if (counterRef.current) counterRef.current.textContent = fmt(target);
  }, [clients]);

  // Mobile: static, lightweight layout — no 300vh scroll-jack, no canvas
  // particles, no per-frame chart transform. Same content, theme-aware.
  if (isMobile || reducedMotion) {
    return (
      <section
        className="relative overflow-hidden px-4 py-16"
        style={{ background: theme === "light" ? "#EDEDF1" : "#050506" }}
      >
        {/* Green wavy chart background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <svg
            viewBox="0 0 800 400"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="green-area-m" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.01" />
                <stop offset="100%" stopColor="#4ade80" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="green-line-m" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#4ade80" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#86efac" stopOpacity="1" />
              </linearGradient>
              <filter id="gm">
                <feGaussianBlur stdDeviation="3" result="b"/>
                <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            {/* Faint grid */}
            {[80, 160, 240, 320].map((y) => (
              <line key={y} x1="0" y1={y} x2="800" y2={y}
                stroke={theme === "light" ? "rgba(34,197,94,0.05)" : "rgba(74,222,128,0.05)"}
                strokeWidth="1" />
            ))}
            {/* Wavy area fill */}
            <path
              d="M 0 350
                 C 40 340, 60 310, 100 300
                 C 140 290, 160 320, 200 310
                 C 240 300, 260 260, 300 240
                 C 340 220, 360 260, 400 250
                 C 440 240, 460 200, 500 180
                 C 540 160, 560 200, 600 185
                 C 640 170, 660 140, 700 120
                 C 740 100, 770 80, 800 60
                 L 800 400 L 0 400 Z"
              fill="url(#green-area-m)"
            />
            {/* Wavy main line */}
            <path
              d="M 0 350
                 C 40 340, 60 310, 100 300
                 C 140 290, 160 320, 200 310
                 C 240 300, 260 260, 300 240
                 C 340 220, 360 260, 400 250
                 C 440 240, 460 200, 500 180
                 C 540 160, 560 200, 600 185
                 C 640 170, 660 140, 700 120
                 C 740 100, 770 80, 800 60"
              fill="none"
              stroke="url(#green-line-m)"
              strokeWidth="3.5"
              strokeLinecap="round"
              filter="url(#gm)"
            />
            {/* End dot */}
            <circle cx="800" cy="60" r="5" fill="#4ade80" opacity="0.9" />
          </svg>
        </div>

        {/* Floating +profit pills — outside overflow container */}
        <div
          className="pointer-events-none absolute"
          style={{ top: "18%", right: "6%", zIndex: 2 }}
        >
          <div
            style={{
              background: "rgba(74,222,128,0.12)",
              border: "1px solid rgba(74,222,128,0.25)",
              borderRadius: "9999px",
              padding: "5px 12px",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <span
              style={{
                color: "#4ade80",
                fontSize: "12px",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              +{fmt(clients * RATE_PER_CLIENT * 0.15).replace('₴', '')} ₴
            </span>
          </div>
        </div>

        <div
          className="pointer-events-none absolute"
          style={{ top: "25%", left: "4%", zIndex: 2 }}
        >
          <div
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.18)",
              borderRadius: "9999px",
              padding: "4px 10px",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <span
              style={{
                color: "#4ade80",
                fontSize: "11px",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              +{fmt(clients * RATE_PER_CLIENT * 0.08).replace('₴', '')} ₴
            </span>
          </div>
        </div>

        <div
          className="relative mx-auto flex max-w-md flex-col items-center text-center rounded-[20px] px-5 py-8"
          style={{
            background: theme === "light"
              ? "rgba(237, 237, 241, 0.5)"
              : "rgba(5, 5, 6, 0.45)",
            backdropFilter: "blur(12px) saturate(1.2)",
            WebkitBackdropFilter: "blur(12px) saturate(1.2)",
            boxShadow: theme === "light"
              ? "inset 0 1px 0 rgba(255,255,255,0.45), 0 8px 32px rgba(0,0,0,0.05)"
              : "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.25)",
            border: theme === "light"
              ? "1px solid rgba(255,255,255,0.4)"
              : "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="bp-text-secondary text-[10px] mb-1 tracking-wider uppercase font-medium">
            ДОХІД З РЕКОМЕНДАЦІЙ
          </div>
          <div
            className="bp-text-primary font-bold tabular-nums mb-5"
            style={{
              fontSize: "clamp(30px, 9vw, 44px)",
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 0 40px rgba(74,222,128,0.3)",
            }}
          >
            {fmt(clients * RATE_PER_CLIENT)}
          </div>

          <div className={`w-8 h-px mx-auto mb-4 ${theme === "light" ? "bg-gradient-to-r from-transparent via-black/15 to-transparent" : "bg-gradient-to-r from-transparent via-white/20 to-transparent"}`} />

          <div className="text-[#8b7bf0] text-[11px] tracking-[0.14em] mb-2" style={{ padding: "2px 4px" }}>
            % ПАРТНЕРКА
          </div>

          <h2 className="bp-text-primary text-[1.65rem] font-semibold mb-1.5 leading-[1.15]">
            Заробляй з нами
          </h2>
          <p className="bp-text-muted text-sm mb-5">
            Рекомендуй — отримуй % з кожного клієнта
          </p>

          <div
            className="w-full mb-5 rounded-[14px] p-[14px_18px]"
            style={{
              background: theme === "light"
                ? "rgba(255,255,255,0.4)"
                : "rgba(255,255,255,0.03)",
              border: theme === "light"
                ? "1px solid rgba(255,255,255,0.5)"
                : "1px solid rgba(255,255,255,0.05)",
              boxShadow: theme === "light"
                ? "inset 0 1px 2px rgba(0,0,0,0.03)"
                : "inset 0 1px 2px rgba(0,0,0,0.15)",
            }}
          >
            <div className="flex justify-between items-baseline mb-2">
              <span className="bp-text-secondary text-xs">Клієнтів на місяць</span>
              <span className="text-[#c9befc] text-xs font-semibold">{clients}</span>
            </div>
            <input
              type="range"
              min={1}
              max={25}
              value={clients}
              onChange={(e) => setClients(Number(e.target.value))}
              className="bp-slider w-full"
              aria-label="Клієнтів на місяць"
            />
            <div className="bp-text-primary bp-income-flash text-xl font-semibold mt-2" style={{ fontVariantNumeric: "tabular-nums" }}>
              {fmt(clients * RATE_PER_CLIENT)}
              <span className="bp-text-muted text-[11px] font-normal block mt-0.5">
                орієнтовний дохід / міс
              </span>
            </div>
          </div>

          <Link
            href="/partners"
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-full text-[15px] font-semibold text-white"
            style={{
              padding: "15px 26px",
              background: theme === "light"
                ? "linear-gradient(135deg, #6366F1, #7C5CF6)"
                : "linear-gradient(135deg, #6366F1, #8B5CF6)",
              boxShadow: theme === "light"
                ? "0 8px 24px rgba(99,102,241,0.25)"
                : "0 8px 32px rgba(99,102,241,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            Стати партнером
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div ref={trackRef} style={{ height: "300vh", position: "relative" }}>
      <div
        ref={stageRef}
        className="bp-stage relative w-full"
        style={{ background: theme === "light" ? "#EDEDF1" : "#050506", overflow: "hidden" }}
      >
        {/* Background layer: grid + particles */}
        <div
          ref={bgLayerRef}
          style={{
            position: "absolute",
            inset: "-15%",
            willChange: "transform",
            zIndex: 0,
          }}
        >
          <div
            className="bp-grid"
            style={{ position: "absolute", inset: 0 }}
          />
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0 }}
          />
        </div>

        {/* Growth chart layer — hidden until the scene is measured and synced
            with the current scroll progress, so the line is never painted
            fully drawn before the scene starts. */}
        <div
          ref={chartGrowthRef}
          style={{
            position: "absolute",
            inset: 0,
            willChange: "transform",
            zIndex: 1,
            opacity: 0,
          }}
        >
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={{
              width: "180vw",
              height: "auto",
              position: "absolute",
              left: "-10vw",
              top: "15%",
            }}
          >
            <defs>
              <linearGradient id="grad-growth" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#4ade80" stopOpacity="1" />
                <stop offset="100%" stopColor="#86efac" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              ref={ghostPathRef}
              d={GROWTH_PATH}
              fill="none"
              stroke="rgba(74,222,128,0.1)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="12 18"
              style={{ opacity: 0 }}
            />
            {/* Glow as layered translucent strokes — an SVG blur filter over a
                180vw path made every scroll frame in WebKit very expensive. */}
            <path
              ref={growthGlowFarRef}
              d={GROWTH_PATH_UPPER}
              fill="none"
              stroke="url(#grad-growth)"
              strokeOpacity="0.12"
              strokeWidth="22"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: 1 }}
            />
            <path
              ref={growthGlowNearRef}
              d={GROWTH_PATH_UPPER}
              fill="none"
              stroke="url(#grad-growth)"
              strokeOpacity="0.3"
              strokeWidth="9"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: 1 }}
            />
            <path
              ref={growthPathRef}
              d={GROWTH_PATH_UPPER}
              fill="none"
              stroke="url(#grad-growth)"
              strokeWidth="4"
              strokeLinecap="round"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: 1 }}
            />
          </svg>
        </div>

        {/* End dot lives on the stage (like the markers) so one camera
            transform drives the line, labels and plaque. */}
        <div
          ref={endDotRef}
          className="bp-end-dot"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            opacity: 0,
            pointerEvents: "none",
            zIndex: 12,
          }}
        />

        {/* Live chart metric */}
        <div
          ref={liveMetricRef}
          className={`bp-live-metric absolute pointer-events-none ${theme === "light" ? "bp-live-metric--light" : ""}`}
          style={{
            left: "50%",
            top: "50%",
            opacity: 0,
            transform: "translate(-50%, -50%) scale(0.9)",
            filter: "blur(10px)",
            zIndex: 35,
          }}
        >
          <span ref={liveMetricSweepRef} className="bp-live-metric__sweep" aria-hidden="true" />
          <div className="bp-live-metric__eyebrow">
            <span className="bp-live-metric__pulse" />
            ДОХІД З РЕКОМЕНДАЦІЙ
          </div>
          <div ref={liveMetricValueRef} className="bp-live-metric__value">{fmt(0)}</div>
          <div className="bp-live-metric__caption">Приведи клієнта — заробляй більше</div>
        </div>

        {/* Marker labels: the wrapper carries the JS-driven position, the pill
            keeps the reveal animation — the two never fight over transform. */}
        {MARKERS.map((m, i) => (
          <div
            key={`ml-${i}`}
            ref={(el) => {
              markerWrapRefs.current[i] = el;
            }}
            className="pointer-events-none absolute"
            style={{
              transform: "translate(0px, 0px)",
              opacity: 0,
              zIndex: 10,
              willChange: "transform, opacity",
            }}
          >
            <div
              ref={(el) => {
                markerPillRefs.current[i] = el;
              }}
              className={`bp-marker-pill ${theme === "light" ? "bp-marker-pill--light" : ""}`}
            >
              <span className="bp-marker-pill__dot" />
              <span className="bp-marker-pill__text">{fmtPlus(m.amount)}</span>
            </div>
          </div>
        ))}
        {/* Scroll hint indicator — liquid glass pill at top */}
        <div
          ref={scrollHintRef}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <div className={`bp-scroll-liquid ${theme === "light" ? "bp-scroll-liquid--light" : ""}`}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="bp-scroll-liquid__icon">
              <path d="M8 3v10M5 10l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="bp-scroll-liquid__text">Гортайте вниз</span>
          </div>
        </div>

        {/* Final CTA — liquid glass panel */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          style={{ zIndex: 30 }}
        >
          <div
            ref={ctaPanelRef}
            className="bp-liquid-glass pointer-events-auto max-w-[380px] w-full p-7 sm:p-9"
          >
            <div
              ref={counterLabelRef}
              className="bp-text-secondary text-[10px] sm:text-xs mb-1 tracking-wider uppercase font-medium"
            >
              ДОХІД З РЕКОМЕНДАЦІЙ
            </div>
            <div
              ref={counterRef}
              className="bp-text-primary font-bold tabular-nums bp-counter-text mb-5"
              style={{
                fontVariantNumeric: "tabular-nums",
                fontSize: "clamp(30px, 5vw, 44px)",
                  textShadow: "0 0 40px rgba(74,222,128,0.3), 0 0 80px rgba(74,222,128,0.15)",
              }}
            >
              {fmt(clients * RATE_PER_CLIENT)}
            </div>

            <div className={`w-8 h-px mx-auto mb-4 ${theme === "light" ? "bg-gradient-to-r from-transparent via-black/15 to-transparent" : "bg-gradient-to-r from-transparent via-white/20 to-transparent"}`} />

            <div
              ref={badgeRef}
              className="relative text-[#8b7bf0] text-[11px] tracking-[0.14em] mb-2 overflow-hidden"
              style={{ padding: "2px 4px" }}
            >
              % ПАРТНЕРКА
              <span className="bp-badge-shimmer" />
            </div>

            <h2
              ref={titleRef}
              className="bp-text-primary text-[1.65rem] sm:text-3xl font-semibold mb-1.5 leading-[1.15]"
              style={{ transformStyle: "preserve-3d" }}
            >
              Заробляй з нами
            </h2>

            <p
              ref={subtitleRef}
              className="bp-text-muted text-sm mb-5"
            >
              Рекомендуй — отримуй % з кожного клієнта
            </p>

            <div className="pointer-events-auto bp-calc-block rounded-[14px] p-[14px_18px] mb-5 w-full">
              <div className="flex justify-between items-baseline mb-2">
                <span className="bp-text-secondary text-xs">
                  Клієнтів на місяць
                </span>
                <span className="text-[#c9befc] text-xs font-semibold">
                  {clients}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={clients}
                onChange={(e) => setClients(Number(e.target.value))}
                className="bp-slider w-full"
                aria-label="Клієнтів на місяць"
              />
              <div
                ref={calcIncomeRef}
                className="bp-text-primary bp-income-flash text-xl font-semibold mt-2"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {fmt(clients * RATE_PER_CLIENT)}
                <span className="bp-text-muted text-[11px] font-normal block mt-0.5">
                  орієнтовний дохід / міс
                </span>
              </div>
            </div>

            <Link
              href="/partners"
              className="pointer-events-auto bp-partner-cta inline-flex items-center justify-center gap-2.5 text-white font-semibold rounded-full text-sm w-full"
              style={{ padding: "13px 26px" }}
            >
              <span className="bp-cta-coin bp-cta-coin--1" aria-hidden="true">+₴</span>
              <span className="bp-cta-coin bp-cta-coin--2" aria-hidden="true">+₴</span>
              <span className="bp-cta-coin bp-cta-coin--3" aria-hidden="true">+₴</span>
              Стати партнером →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
