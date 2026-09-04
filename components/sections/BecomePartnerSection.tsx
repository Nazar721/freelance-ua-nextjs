"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useTheme } from "@/lib/ThemeContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RATE_PER_CLIENT = 850;
const MAX_INCOME = 26800;
const SVG_W = 2400;
const SVG_H = 900;
const MAX_LINE_PROGRESS = 0.82;

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


interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  alpha: number;
}

export default function BecomePartnerSection() {
  const { theme } = useTheme();
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
  const animatedIncomeRef = useRef(0);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const chartGrowthRef = useRef<HTMLDivElement>(null);

  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaPanelRef = useRef<HTMLDivElement>(null);

  const [clients, setClients] = useState(25);
  const calcIncomeRef = useRef<HTMLDivElement>(null);
  const prevCalcIncome = useRef(clients * RATE_PER_CLIENT);

  const progressRef = useRef(0);
  const markerLabelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const growthPathRef = useRef<SVGPathElement>(null);

  const hasPlayedOnce = useRef(false);
  const hasSkippedBack = useRef(false);
  const hasCompletedOnce = useRef(false);
  const scrollDirection = useRef(1);
  const visualP = useRef(0);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const ghostPathRef = useRef<SVGPathElement>(null);
  const endDotRef = useRef<HTMLDivElement>(null);
  const glowFilterRef = useRef<SVGFilterElement>(null);

  const markerRevealed = useRef<boolean[]>([false, false, false]);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef(0);

  const setDrawProgress = useCallback(
    (pathEl: SVGPathElement | null, p: number, reverse = false) => {
      if (!pathEl) return;
      const len = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = String(len);
      pathEl.style.strokeDashoffset = reverse
        ? String(-len * p)
        : String(len * (1 - p));
    },
    []
  );

  useEffect(() => {
    // Mobile renders a static layout — no pin, no canvas particles, no per-frame JS
    if (isMobile || !trackRef.current) return;
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
    window.addEventListener("resize", resizeCanvas);

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
      const particleAlpha = isLight ? 0.25 : undefined;
      particlesRef.current.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -10) p.y = canvasEl.height + 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const a = isLight ? Math.min(p.alpha, 0.25) : p.alpha;
        ctx.fillStyle = isLight
          ? `rgba(99,102,241,${a})`
          : `rgba(74,222,128,${a})`;
        ctx.shadowBlur = isLight ? 3 : 6;
        ctx.shadowColor = isLight ? "#6366F1" : "#4ade80";
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    gsap.ticker.add(drawParticles);

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
          val: clients * RATE_PER_CLIENT,
          duration: 2.0,
          ease: "power2.out",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = fmt(Math.round(counterObj.val));
            }
          },
        },
        0.15
      );

    const renderProgress = (rawProgress: number) => {
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
      updateCounter(p);
      updateMarkers(p);

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
    });

    function updateSceneGrowth(p: number) {
      const pathEl = growthPathRef.current;
      if (!pathEl) return;

      const lineP = Math.min(p, MAX_LINE_PROGRESS);
      setDrawProgress(growthPathRef.current, lineP);

      const lenAtP = pathEl.getTotalLength() * Math.min(Math.max(lineP, 0), 1);
      const pt = pathEl.getPointAtLength(Math.min(lenAtP, pathEl.getTotalLength() - 0.01));

      const stageW = stage.clientWidth;
      const stageH = stage.clientHeight;
      const svgScreenW = stageW * 1.8;
      const svgScale = svgScreenW / SVG_W;
      const zoom = 1 + p * 0.25;
      const svgOffsetX = -stageW * 0.35;

      const ease = Math.min(1, p * 3);
      const targetX = stageW * (0.08 + ease * 0.07);
      const targetY = stageH * (0.82 - ease * 0.32);

      const chartX = (targetX - (svgOffsetX + pt.x * svgScale) * zoom) / zoom;
      const chartY = (targetY - pt.y * svgScale * zoom) / zoom;

      const transform = `translate(${chartX}px, ${chartY}px) scale(${zoom})`;
      chartGrowth.style.transform = transform;

      const bgZoom = 1 + p * 0.08;
      const bgX = (targetX - (svgOffsetX + pt.x * svgScale) * bgZoom) / bgZoom;
      const bgY = (targetY - pt.y * svgScale * bgZoom) / bgZoom;
      bgLayer.style.transform = `translate(${bgX * 0.12}px, ${bgY * 0.12}px) scale(${bgZoom})`;

      const finalP = Math.max(0, Math.min(1, (p - 0.88) / 0.12));
      chartGrowth.style.opacity = String(1 - finalP * 0.18);
      bgLayer.style.opacity = String(1 - finalP * 0.08);

      const metricX = chartX + (svgOffsetX + pt.x * svgScale) * zoom;
      const metricY = chartY + pt.y * svgScale * zoom;
      if (liveMetricRef.current) {
        const lmX = Math.max(170, Math.min(stageW - 170, metricX));
        const lmY = Math.max(170, Math.min(stageH - 140, metricY - 112));
        const metricVisibility = Math.min(1, p * 4);
        liveMetricRef.current.style.opacity = String(metricVisibility);
        liveMetricRef.current.style.transform = `translate(${lmX}px, ${lmY}px) translate(-50%, -50%) scale(${0.9 + metricVisibility * 0.1})`;
        liveMetricRef.current.style.filter = "blur(0px)";
        liveMetricRef.current.classList.toggle("bp-live-metric--revealed", p > 0.18);
        liveMetricRef.current.classList.toggle("bp-live-metric--moving", p <= 0.18);
        // Hide live metric earlier to avoid overlap with CTA
        if (p > 0.72) {
          liveMetricRef.current.style.opacity = String(Math.max(0, 1 - (p - 0.72) / 0.1));
        }
      }

      if (endDotRef.current) {
        const show = p > 0.95;
        const endPt = pathEl.getPointAtLength(pathEl.getTotalLength() * MAX_LINE_PROGRESS);
        const endX = chartX + (svgOffsetX + endPt.x * svgScale) * zoom;
        const endY = chartY + (stageH * 0.15 + endPt.y * svgScale) * zoom;
        endDotRef.current.style.transform = `translate(${endX - 10}px, ${endY - 10}px)`;
        const dotOpacity = show ? Math.min(1, (p - 0.95) / 0.03) : 0;
        endDotRef.current.style.opacity = String(dotOpacity);
        const pulseR = show ? 10 + Math.sin(Date.now() * 0.006) * 4 : 0;
        endDotRef.current.style.width = `${pulseR * 2}px`;
        endDotRef.current.style.height = `${pulseR * 2}px`;
      }

      if (glowFilterRef.current) {
        const blurEl = glowFilterRef.current.querySelector("feGaussianBlur");
        if (blurEl) {
          const targetStd = 6 + Math.max(0, (p - 0.9) / 0.1) * 8;
          blurEl.setAttribute("stdDeviation", String(targetStd));
        }
      }
    }

    function updateCounter(p: number) {
      // Animate live metric based on scroll progress
      const metricProgress = Math.min(1, p / 0.72);
      const metricAmount = Math.round(metricProgress * MAX_INCOME);
      const previousMetricAmount = animatedIncomeRef.current;
      animatedIncomeRef.current += (metricAmount - previousMetricAmount) * 0.14;
      if (liveMetricValueRef.current) {
        liveMetricValueRef.current.textContent = fmt(animatedIncomeRef.current);
      }
    }

    function updateMarkers(p: number) {
      const activePath = growthPathRef.current;
      if (!activePath) return;

      const svgScreenW = stage.clientWidth * 1.8;
      const svgScale = svgScreenW / SVG_W;

      const transform = chartGrowth.style.transform;
      const match = transform.match(/translate\(([-\d.]+)px,\s*([-\d.]+)px\)/);
      const layerX = match ? parseFloat(match[1]) : 0;
      const layerY = match ? parseFloat(match[2]) : 0;

      MARKERS.forEach((m, i) => {
        const on = p >= m.progress;
        const label = markerLabelRefs.current[i];
        if (label) {
          const len = activePath.getTotalLength();
          const pt = activePath.getPointAtLength(len * m.progress);

          const zoom = 1 + p * 0.25;
          const svgOffsetX = -stage.clientWidth * 0.1;
          const markerX = layerX + (svgOffsetX + pt.x * svgScale) * zoom;
          const markerY = layerY + pt.y * svgScale * zoom - 30;

          label.style.transform = `translate(${markerX}px, ${markerY}px)`;

          const targetOpacity = on ? 1 : 0;
          const current = parseFloat(label.style.opacity || "0");
          label.style.opacity = String(
            current + (targetOpacity - current) * 0.15
          );

          if (on && !markerRevealed.current[i]) {
            markerRevealed.current[i] = true;
            gsap.fromTo(
              label,
              { scale: 0.8, y: 8 },
              {
                scale: 1,
                y: 0,
                duration: 0.4,
                ease: "back.out(2)",
              }
            );
            const isLight = document.documentElement.dataset.theme === "light";
            const glowColor = isLight ? "0 0 16px rgba(99,102,241,0.5)" : "0 0 16px rgba(74,222,128,0.6)";
            label.style.boxShadow = `${glowColor}, 0 0 32px ${glowColor.replace("0 0 16px ", "")}`;
            gsap.to(label, {
              boxShadow: isLight
                ? "0 0 8px rgba(99,102,241,0.15)"
                : "0 0 8px rgba(74,222,128,0.2)",
              duration: 0.3,
              delay: 0.2,
              ease: "power2.out",
            });
          }
        }
      });
    }

    function onResize() {
      resizeCanvas();
      particlesRef.current.forEach((p) => {
        p.x = Math.random() * canvasEl.width;
        p.y = Math.random() * canvasEl.height;
      });
    }
    window.addEventListener("resize", onResize);

    return () => {
      hasPlayedOnce.current = false;
      hasSkippedBack.current = false;
      hasCompletedOnce.current = false;
      visualP.current = 0;
      animatedIncomeRef.current = 0;
      markerRevealed.current = [false, false, false];
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
      mainST.kill();
      ctaTl.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile, setDrawProgress]);

  useEffect(() => {
    const target = clients * RATE_PER_CLIENT;
    if (calcIncomeRef.current) {
      calcIncomeRef.current.classList.add("flash");
      setTimeout(() => {
        calcIncomeRef.current?.classList.remove("flash");
      }, 300);

      gsap.to(
        { val: prevCalcIncome.current },
        {
          val: target,
          duration: 0.5,
          ease: "power3.out",
          onUpdate: function () {
            if (calcIncomeRef.current) {
              calcIncomeRef.current.childNodes[0].textContent = fmt(
                Math.round(this.targets()[0].val)
              );
            }
          },
        }
      );
      prevCalcIncome.current = target;
    }

    // Animate main counter with count-up
    const currentVal = parseInt((counterRef.current?.textContent || "0").replace(/[^\d]/g, ""), 10) || 0;
    gsap.to(
      { val: currentVal },
      {
        val: target,
        duration: 1.0,
        ease: "power2.out",
        onUpdate: function () {
          if (counterRef.current) {
            counterRef.current.textContent = fmt(Math.round(this.targets()[0].val));
          }
        },
      }
    );

    animatedIncomeRef.current = target;
    if (liveMetricValueRef.current) {
      liveMetricValueRef.current.textContent = fmt(target);
    }
  }, [clients]);

  useEffect(() => {
    const el = ctaPanelRef.current;
    if (!el) return;
    function onMove(e: MouseEvent) {
      const rect = el!.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el!.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.01)`;
    }
    function onLeave() {
      el!.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Mobile: static, lightweight layout — no 300vh scroll-jack, no canvas
  // particles, no per-frame chart transform. Same content, theme-aware.
  if (isMobile) {
    return (
      <section
        className="relative overflow-hidden px-4 py-16"
        style={{ background: theme === "light" ? "#EDEDF1" : "#050506" }}
      >
        {/* Static decorative sparkline — pure SVG, no JS per frame */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-8 mx-auto w-[160%] max-w-none opacity-50"
        >
          <path
            d={GROWTH_PATH}
            fill="none"
            stroke={theme === "light" ? "rgba(99,102,241,0.2)" : "rgba(74,222,128,0.22)"}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="12 18"
          />
        </svg>

        <div className="relative mx-auto flex max-w-md flex-col items-center text-center">
          <div className="bp-text-secondary text-[10px] mb-1 tracking-wider uppercase font-medium">
            ДОХІД З РЕКОМЕНДАЦІЙ
          </div>
          <div
            className="bp-text-primary font-bold tabular-nums mb-5"
            style={{
              fontSize: "clamp(30px, 9vw, 44px)",
              fontVariantNumeric: "tabular-nums",
              textShadow: theme === "light"
                ? "0 0 30px rgba(99,102,241,0.15)"
                : "0 0 40px rgba(74,222,128,0.3)",
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

          <div className="bp-calc-block rounded-[14px] p-[14px_18px] mb-5 w-full">
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
            className="bp-cta-button inline-flex items-center justify-center gap-2.5 text-white font-semibold rounded-full text-sm w-full"
            style={{ padding: "13px 26px" }}
          >
            Стати партнером →
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

        {/* Growth chart layer */}
        <div
          ref={chartGrowthRef}
          style={{
            position: "absolute",
            inset: 0,
            willChange: "transform",
            zIndex: 1,
            opacity: 1,
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
              <filter id="glow-growth" ref={glowFilterRef} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
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
              stroke={theme === "light" ? "rgba(99,102,241,0.12)" : "rgba(74,222,128,0.1)"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="12 18"
            />
            <path
              ref={growthPathRef}
              d={GROWTH_PATH}
              fill="none"
              stroke="url(#grad-growth)"
              strokeWidth="4"
              filter="url(#glow-growth)"
              strokeLinecap="round"
            />
          </svg>
          <div
            ref={endDotRef}
            className="bp-end-dot"
            style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
          />
        </div>

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
            ДОХІД З ГРАФІКА
          </div>
          <div ref={liveMetricValueRef} className="bp-live-metric__value">{fmt(0)}</div>
          <div className="bp-live-metric__caption">Приведи клієнта — заробляй більше</div>
        </div>

        {/* Marker labels */}
        {MARKERS.map((m, i) => (
          <div
            key={`ml-${i}`}
            ref={(el) => {
              markerLabelRefs.current[i] = el;
            }}
            className={`bp-marker-pill absolute pointer-events-none ${theme === "light" ? "bp-marker-pill--light" : ""}`}
            style={{
              transform: "translateX(-50%) scale(0.8) translateY(8px)",
              opacity: 0,
              zIndex: 10,
              willChange: "transform, opacity",
            }}
          >
            <span className="bp-marker-pill__dot" />
            <span className="bp-marker-pill__text">{fmtPlus(m.amount)}</span>
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
                textShadow: theme === "light"
                  ? "0 0 30px rgba(99,102,241,0.15)"
                  : "0 0 40px rgba(74,222,128,0.3), 0 0 80px rgba(74,222,128,0.15)",
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
              className="pointer-events-auto bp-cta-button inline-flex items-center justify-center gap-2.5 text-white font-semibold rounded-full text-sm w-full"
              style={{ padding: "13px 26px" }}
            >
              Стати партнером →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
