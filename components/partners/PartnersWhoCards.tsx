"use client";

import { useRef } from "react";
import {
  Code2,
  Palette,
  Video,
  Send,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { gsap, useGSAP, refreshAfterFonts, whenScrollAtTop } from "./scroll/gsapCore";
import { useTranslation } from "@/lib/LanguageContext";

const whoCards: { icon: LucideIcon; titleKey: string; descKey: string; accent: string }[] = [
  { icon: Code2, titleKey: "partners.who.card1.title", descKey: "partners.who.card1.desc", accent: "#818cf8" },
  { icon: Send, titleKey: "partners.who.card2.title", descKey: "partners.who.card2.desc", accent: "#a78bfa" },
  { icon: Code2, titleKey: "partners.who.card3.title", descKey: "partners.who.card3.desc", accent: "#6366f1" },
  { icon: Palette, titleKey: "partners.who.card4.title", descKey: "partners.who.card4.desc", accent: "#c084fc" },
  { icon: Video, titleKey: "partners.who.card5.title", descKey: "partners.who.card5.desc", accent: "#818cf8" },
  { icon: ArrowUpRight, titleKey: "partners.who.card6.title", descKey: "partners.who.card6.desc", accent: "#a78bfa" },
];

/* Entry choreography per grid column: left flies in from the left, center from below, right from the right. */
const COLUMN_ENTRY = [
  { from: { x: -60, rotateY: -15 }, to: { x: 0, rotateY: 0 } },
  { from: { y: 50, rotateX: 10 }, to: { y: 0, rotateX: 0 } },
  { from: { x: 60, rotateY: 15 }, to: { x: 0, rotateY: 0 } },
];

export function PartnersWhoCards() {
  const { t } = useTranslation();
  const scopeRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!scopeRef.current) return;
      const q = gsap.utils.selector(scopeRef);
      const cards = q(".who-card");
      if (!cards.length) return;

      const mm = gsap.matchMedia();

      /* Reduced motion: everything visible, no transforms */
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(cards, { opacity: 1, clearProps: "transform" });
      });

      let gateCleanup: (() => void) | null = null;
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /* The page can be mounted mid-scroll on soft navigation (e.g. clicking
           "Стати партнером" near the bottom of the home page). Building these
           "top 80%" entrances at that wrong position makes every card appear
           instantly — so wait until the scroll is reset to the top first. */
        gateCleanup = whenScrollAtTop(scopeRef.current, () => {
          /* Two row triggers — each row enters when its first card hits 80% of the viewport */
          [0, 3].forEach((offset) => {
            const rowCards = cards.slice(offset, offset + 3);
            const triggerEl = rowCards[0];
            if (!triggerEl) return;

            rowCards.forEach((el, colIndex) => {
              const entry = COLUMN_ENTRY[colIndex % 3];
              gsap.fromTo(
                el,
                { opacity: 0, ...entry.from },
                {
                  opacity: 1,
                  ...entry.to,
                  duration: 0.7,
                  ease: "power2.out",
                  delay: colIndex * 0.12,
                  scrollTrigger: { trigger: triggerEl, start: "top 80%" },
                },
              );
            });
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
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl">
          {t("partners.who.title")}
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
          Якщо хтось з твоїх знайомих потребує цього — рекомендуй нас
        </p>

        {/* perspective on the grid gives the card influx real depth */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: "1000px" }}>
          {whoCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.titleKey}
                className="who-card group relative h-full overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 will-change-transform hover:-translate-y-1.5"
                style={{ transformStyle: "preserve-3d" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${card.accent}66`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${card.accent}26`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(400px circle at 50% 50%, ${card.accent}15, transparent 60%)`,
                  }}
                />
                <div className="relative">
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${card.accent}15`, border: `1px solid ${card.accent}30` }}
                  >
                    <Icon size={20} style={{ color: card.accent }} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t(card.titleKey)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(card.descKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
