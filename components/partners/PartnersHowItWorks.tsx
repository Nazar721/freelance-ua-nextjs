"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger, refreshAfterFonts } from "./scroll/gsapCore";
import { useTranslation } from "@/lib/LanguageContext";
import { ArrowRight, ArrowDown } from "lucide-react";

const STEP_COLORS = ["#f97316", "#6366f1", "#22c55e"];
const STEP_GRADIENTS = ["from-amber-500 to-orange-500", "from-indigo-500 to-blue-500", "from-green-500 to-emerald-500"];

const steps = [
  { num: "01", titleKey: "partners.how.step1.title", descKey: "partners.how.step1.desc" },
  { num: "02", titleKey: "partners.how.step2.title", descKey: "partners.how.step2.desc" },
  { num: "03", titleKey: "partners.how.step3.title", descKey: "partners.how.step3.desc" },
];

export function PartnersHowItWorks() {
  const { t } = useTranslation();
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scopeRef.current) return;
      const q = gsap.utils.selector(scopeRef);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        const items = q(".step-item, .connector, .connector-mobile");
        gsap.set(items, { opacity: 1, clearProps: "transform" });
      });

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = q<HTMLElement>(".step-item");
        const connectors = q<HTMLElement>(".connector-line");

        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.2,
              scrollTrigger: { trigger: card, start: "top 80%" },
            },
          );
        });

        connectors.forEach((line, i) => {
          const dashLength = 8;
          const totalLength = 120;
          gsap.set(line, { strokeDasharray: `${dashLength} ${dashLength}`, strokeDashoffset: totalLength });

          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: "power2.inOut",
            delay: i * 0.4 + 0.3,
            scrollTrigger: { trigger: line, start: "top 80%" },
          });
        });

        const arrows = q<HTMLElement>(".connector-arrow");
        arrows.forEach((arrow, i) => {
          gsap.fromTo(
            arrow,
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.4,
              ease: "back.out(2)",
              delay: i * 0.4 + 0.8,
              scrollTrigger: { trigger: arrow, start: "top 80%" },
            },
          );
        });
      });

      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = q<HTMLElement>(".step-item");
        const mobileLines = q<HTMLElement>(".connector-mobile-line");

        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: i * 0.15,
              scrollTrigger: { trigger: card, start: "top 85%" },
            },
          );
        });

        mobileLines.forEach((line, i) => {
          const totalLength = 80;
          gsap.set(line, { strokeDasharray: "6 4", strokeDashoffset: totalLength });

          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "power2.inOut",
            delay: i * 0.3 + 0.3,
            scrollTrigger: { trigger: line, start: "top 90%" },
          });
        });
      });

      refreshAfterFonts();
      return () => mm.revert();
    },
    { scope: scopeRef },
  );

  return (
    <section ref={scopeRef} className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-14 text-center text-3xl font-bold text-foreground sm:text-4xl">
          {t("partners.how.title")}
        </h2>

        {/* Desktop: horizontal layout */}
        <div className="hidden md:flex md:items-start md:justify-center md:gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex items-center">
              {/* Step card with glassmorphism */}
              <div className="step-item group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06]" style={{ width: 240 }}>
                {/* Top accent line */}
                <div
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-full opacity-40"
                  style={{ background: `linear-gradient(90deg, transparent, ${STEP_COLORS[i]}, transparent)` }}
                />

                {/* Glow background */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${STEP_COLORS[i]}30, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  {/* Number badge */}
                  <div
                    className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${STEP_GRADIENTS[i]} shadow-lg`}
                  >
                    <span className="font-mono text-xl font-bold text-white">{step.num}</span>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t(step.titleKey)}</h3>
                  <p className="max-w-[200px] text-sm leading-relaxed text-muted-foreground">{t(step.descKey)}</p>
                </div>
              </div>

              {/* Connector with dashed line + arrow */}
              {i < steps.length - 1 && (
                <div className="connector flex flex-col items-center pt-6" style={{ width: 120 }}>
                  <svg width="120" height="20" viewBox="0 0 120 20" className="overflow-visible">
                    {/* Dashed line */}
                    <line
                      className="connector-line"
                      x1="0"
                      y1="10"
                      x2="95"
                      y2="10"
                      stroke={STEP_COLORS[i]}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Arrow head */}
                    <polygon
                      className="connector-arrow"
                      points="90,4 104,10 90,16"
                      fill={STEP_COLORS[i]}
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical layout */}
        <div className="flex flex-col items-center gap-0 md:hidden">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col items-center">
              {/* Step card with glassmorphism */}
              <div className="step-item group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 text-center backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06]" style={{ width: 280 }}>
                {/* Top accent line */}
                <div
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-full opacity-40"
                  style={{ background: `linear-gradient(90deg, transparent, ${STEP_COLORS[i]}, transparent)` }}
                />

                <div className="relative">
                  <div
                    className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${STEP_GRADIENTS[i]} shadow-lg`}
                  >
                    <span className="font-mono text-lg font-bold text-white">{step.num}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t(step.titleKey)}</h3>
                  <p className="max-w-[240px] text-sm leading-relaxed text-muted-foreground">{t(step.descKey)}</p>
                </div>
              </div>

              {/* Vertical dashed line + arrow */}
              {i < steps.length - 1 && (
                <div className="connector-mobile flex flex-col items-center py-4">
                  <svg width="20" height="60" viewBox="0 0 20 60" className="overflow-visible">
                    <line
                      className="connector-mobile-line"
                      x1="10"
                      y1="0"
                      x2="10"
                      y2="42"
                      stroke={STEP_COLORS[i]}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <polygon
                      points="4,40 10,54 16,40"
                      fill={STEP_COLORS[i]}
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
