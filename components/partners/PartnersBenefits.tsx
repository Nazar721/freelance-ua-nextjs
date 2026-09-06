"use client";

import { useRef } from "react";
import { Percent, Shield, Clock, type LucideIcon } from "lucide-react";
import { gsap, useGSAP, refreshAfterFonts, whenScrollAtTop } from "./scroll/gsapCore";
import { useTranslation } from "@/lib/LanguageContext";

type Benefit = {
  icon: LucideIcon;
  titleKey: string;
  descKey: string;
  number: string;
  color: string;
  glow: string;
};

const benefits: Benefit[] = [
  {
    icon: Percent,
    titleKey: "partners.benefits.item1.title",
    descKey: "partners.benefits.item1.desc",
    number: "15%",
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.25)",
  },
  {
    icon: Shield,
    titleKey: "partners.benefits.item2.title",
    descKey: "partners.benefits.item2.desc",
    number: "0",
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.25)",
  },
  {
    icon: Clock,
    titleKey: "partners.benefits.item3.title",
    descKey: "partners.benefits.item3.desc",
    number: "24h",
    color: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.25)",
  },
];

export function PartnersBenefits() {
  const { t } = useTranslation();
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scopeRef.current) return;
      const q = gsap.utils.selector(scopeRef);
      const cards = q<HTMLElement>(".benefit-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { opacity: 1, clearProps: "transform" });
      });

      let gateCleanup: (() => void) | null = null;
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gateCleanup = whenScrollAtTop(scopeRef.current, () => {
          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                delay: i * 0.15,
                scrollTrigger: { trigger: card, start: "top 80%" },
              },
            );
          });
        });
      });

      refreshAfterFonts();
      return () => {
        gateCleanup?.();
        mm.revert();
      };
    },
    { scope: scopeRef },
  );

  return (
    <section ref={scopeRef} className="px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-14 text-center text-3xl font-bold text-foreground sm:text-4xl">
          {t("partners.benefits.title")}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.titleKey}
                className="benefit-card group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-xl transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.06]"
              >
                {/* Glow background */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${b.glow}, transparent 70%)`,
                  }}
                />

                {/* Top accent line */}
                <div
                  aria-hidden
                  className="absolute left-0 top-0 h-[2px] w-full opacity-40"
                  style={{ background: `linear-gradient(90deg, transparent, ${b.color}, transparent)` }}
                />

                <div className="relative">
                  {/* Large number */}
                  <div className="mb-6">
                    <span
                      className="font-mono text-6xl font-bold tracking-tight sm:text-7xl"
                      style={{
                        background: `linear-gradient(135deg, ${b.color}, ${b.color}99)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {b.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${b.color}15`, border: `1px solid ${b.color}30` }}
                  >
                    <Icon size={22} style={{ color: b.color }} />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t(b.titleKey)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(b.descKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
