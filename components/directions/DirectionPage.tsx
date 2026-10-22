"use client";

import { Suspense, useRef, useState, useEffect, useLayoutEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  ArrowRight, Bot, Check, ChevronRight, Clapperboard, Code2, Film, Image, LayoutDashboard,
  Megaphone, MessageCircle, Monitor, Palette, PenTool,
  Presentation, Rocket, ScanFace, ShoppingBag, Smartphone, Sparkles,
  Users, WandSparkles, Workflow, ClipboardList, type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";
import { FadeIn, staggerDelay } from "@/components/ui/FadeIn";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import FeaturedCaseCard from "@/components/ui/FeaturedCaseCard";
import VideoCaseCard from "@/components/ui/VideoCaseCard";
import { featuredCardProps, videoCardProps } from "@/lib/case-cards";
import { useTranslation } from "@/lib/LanguageContext";
import { type Direction } from "@/lib/i18n-routes";
import { DIRECTIONS } from "@/lib/directions";
import { itCases } from "@/data/itCases";
import { designCases } from "@/data/designCases";
import { videoCases, type VideoCaseEntry } from "@/data/videoCases";
import type { CaseEntry } from "@/data/types";
import { siteConfig } from "@/config/site";

const PROCESS_STEPS = [1, 2, 3, 4] as const;
const PROCESS_ICONS: readonly LucideIcon[] = [MessageCircle, ClipboardList, Code2, Rocket];
const TASK_ICONS: Record<Direction, readonly LucideIcon[]> = {
  it: [Monitor, Users, Bot],
  design: [PenTool, Presentation, ScanFace],
  video: [Smartphone, WandSparkles, Megaphone],
};
const SERVICE_ICONS: Record<Direction, readonly LucideIcon[]> = {
  it: [Bot, Monitor, ShoppingBag, LayoutDashboard, Workflow, Code2, Smartphone],
  design: [Palette, PenTool, Film, Image, Presentation],
  video: [Clapperboard, WandSparkles, Megaphone, Smartphone, Film, Sparkles],
};
const STICKER_TONES: Record<Direction, string> = {
  it: "border-cyan-500/30 bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 shadow-[0_4px_20px_rgba(6,182,212,0.15)]",
  design: "border-violet-500/30 bg-violet-500/15 text-violet-600 dark:text-violet-300 shadow-[0_4px_20px_rgba(139,92,246,0.15)]",
  video: "border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)]",
};
const STICKER_ROTATIONS = ["-rotate-[7deg]", "rotate-[4deg]", "-rotate-[3deg]", "rotate-[6deg]"] as const;

/** Sticker — double-layer, slightly rotated, with a soft shadow. Feels like a real sticker on the surface. */
function DirectionSticker({ icon: Icon, direction, index = 0 }: {
  icon: LucideIcon;
  direction: Direction;
  index?: number;
}) {
  return (
    <span aria-hidden="true" className="relative inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center">
      {/* peel shadow */}
      <span className={`absolute inset-0 rounded-[14px] bg-background border border-border/50 shadow-[0_8px_24px_rgba(0,0,0,0.18)] ${STICKER_ROTATIONS[(index + 1) % STICKER_ROTATIONS.length]}`} />
      {/* color layer */}
      <span className={`absolute inset-[3px] rounded-[11px] border ${STICKER_TONES[direction]} ${STICKER_ROTATIONS[index % STICKER_ROTATIONS.length]}`} />
      {/* icon */}
      <span className={`relative inline-flex h-10 w-10 items-center justify-center ${STICKER_ROTATIONS[index % STICKER_ROTATIONS.length]}`}>
        <Icon size={22} strokeWidth={1.8} />
      </span>
    </span>
  );
}

/** Floating decorative stickers — purely visual, behind the content. */
function StickerBackdrop({ direction }: { direction: Direction }) {
  const tone = direction === "it" ? "text-cyan-500/10" : direction === "design" ? "text-violet-500/10" : "text-amber-500/10";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className={`absolute -top-6 -right-8 h-32 w-32 rounded-[20px] border border-current ${tone} rotate-12 hidden lg:block`} />
      <span className={`absolute -bottom-10 -left-10 h-40 w-40 rounded-[24px] border border-current ${tone} -rotate-6 hidden lg:block`} />
    </div>
  );
}

/**
 * Shared body of a direction page (/services/{d} and /en/services/{d}).
 * Language comes from the URL tree; all strings go through the dictionary.
 * The `#cases` anchor sits on the cases section so `#cases` deep links and
 * the redirect from the old category URLs land on the catalogue.
 */
export default function DirectionPage({ direction }: { direction: Direction }) {
  return (
    <article className="direction-page min-h-screen">
      <DirectionHero direction={direction} />
      <DirectionTasks direction={direction} />
      <DirectionServices direction={direction} />
      <DirectionIncludes direction={direction} />
      <DirectionProcess direction={direction} />
      <DirectionShowcase direction={direction} />
      <DirectionCases direction={direction} />
      <DirectionCta direction={direction} />
    </article>
  );
}

function DirectionHero({ direction }: { direction: Direction }) {
  const { t } = useTranslation();

  return (
    <section className="pt-28 sm:pt-32 pb-10 sm:pb-14 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn y={24} blur={6}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-5 font-[family-name:var(--font-syne)]">
            {t(`services.${direction}.category`)}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg mb-8">
            {t(`${direction === "it" ? "itCases" : direction === "design" ? "designCases" : "videoCases"}.desc`)}
          </p>
          <a
            href="#cases"
            className="inline-flex items-center gap-2 border border-[#6366F1] text-[#6366F1] hover:bg-[#6366F1] hover:text-white font-semibold px-7 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          >
            {t("direction.viewWork")}
            <ArrowRight size={17} />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function DirectionTasks({ direction }: { direction: Direction }) {
  const { t } = useTranslation();
  const shouldReduceMotion = usePrefersReducedMotion();
  const items = [1, 2, 3] as const;
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section data-direction-section="tasks" className="relative py-10 sm:py-14 px-4 overflow-hidden">
      <StickerBackdrop direction={direction} />
      <div className="relative max-w-3xl mx-auto">
        <FadeIn y={20}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center font-[family-name:var(--font-syne)]">
            {t("direction.tasksTitle")}
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-6">Оберіть свій кейс — ми закриємо задачу під ключ</p>
        </FadeIn>
        <ul className="space-y-3">
          {items.map((n, i) => {
            const delay = i * 0.12;
            if (shouldReduceMotion) {
              return (
                <li key={n} className="list-none">
                  <div className="group flex items-center gap-4 p-4 sm:p-5 rounded-[16px] bg-surface-elevated/60 backdrop-blur-sm border border-border/70 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-[1px]">
                    <DirectionSticker icon={TASK_ICONS[direction][i]} direction={direction} index={i} />
                    <span className="text-foreground text-sm sm:text-[15px] leading-snug font-medium">{t(`direction.tasks.${direction}.${n}`)}</span>
                  </div>
                </li>
              );
            }
            return (
              <motion.li
                key={n}
                className="list-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay, ease: EASE }}
              >
                <div className="group flex items-center gap-4 p-4 sm:p-5 rounded-[16px] bg-surface-elevated/60 backdrop-blur-sm border border-border/70 shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-[1px]">
                  <DirectionSticker icon={TASK_ICONS[direction][i]} direction={direction} index={i} />
                  <span className="text-foreground text-sm sm:text-[15px] leading-snug font-medium">{t(`direction.tasks.${direction}.${n}`)}</span>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function DirectionServices({ direction }: { direction: Direction }) {
  const { t } = useTranslation();
  const shouldReduceMotion = usePrefersReducedMotion();
  const cfg = DIRECTIONS[direction];
  const items = Array.from({ length: cfg.serviceCount }, (_, i) => i + 1);
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section data-direction-section="services" className="relative py-10 sm:py-14 px-4 bg-surface overflow-hidden">
      <StickerBackdrop direction={direction} />
      <div className="relative max-w-4xl mx-auto">
        <FadeIn y={20}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center font-[family-name:var(--font-syne)]">
            {t("services.title")}
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-8">Що саме робимо — вибирайте формат, решту беремо на себе</p>
        </FadeIn>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {items.map((n, i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const orderDelay = row * 2 * 0.12 + col * 0.12;
            if (shouldReduceMotion) {
              return (
                <li key={n} className="list-none h-full">
                  <div className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-border/60 bg-surface-elevated/70 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] hover:rotate-[0.3deg] h-full">
                    <DirectionSticker icon={SERVICE_ICONS[direction][i % SERVICE_ICONS[direction].length]} direction={direction} index={i} />
                    <span className="text-foreground text-sm sm:text-[15px] font-medium leading-snug">{t(`services.${direction}.${n}`)}</span>
                  </div>
                </li>
              );
            }
            return (
              <motion.li
                key={n}
                className="list-none h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: orderDelay, ease: EASE }}
              >
                <div className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-border/60 bg-surface-elevated/70 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] hover:rotate-[0.3deg] h-full">
                  <DirectionSticker icon={SERVICE_ICONS[direction][i % SERVICE_ICONS[direction].length]} direction={direction} index={i} />
                  <span className="text-foreground text-sm sm:text-[15px] font-medium leading-snug">{t(`services.${direction}.${n}`)}</span>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function DirectionShowcase({ direction }: { direction: Direction }) {
  const { t } = useTranslation();
  const cfg = DIRECTIONS[direction];

  return (
    <section data-direction-section="showcase" className="relative py-10 sm:py-14 px-4 overflow-hidden">
      <StickerBackdrop direction={direction} />
      <div className="relative max-w-4xl mx-auto">
        <FadeIn y={20} className="text-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase text-accent">
            <Sparkles size={12} />
            {t(`services.${direction}.slider`)}
          </span>
        </FadeIn>
        <FadeIn y={24} blur={4}>
          <div className="relative rounded-[20px] border border-border/60 bg-surface-elevated/60 backdrop-blur-sm p-3 sm:p-4 shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
            {/* sticker peel corners */}
            <span aria-hidden="true" className="absolute -right-2 -top-2 h-6 w-6 rounded-bl-[10px] bg-background border-l border-b border-border/60 shadow-sm rotate-3 hidden sm:block" />
            <span aria-hidden="true" className="absolute -left-2 -bottom-2 h-5 w-5 rounded-tr-[8px] bg-background border-r border-t border-border/60 shadow-sm -rotate-3 hidden sm:block" />
            <div className="overflow-hidden rounded-[14px] border border-border/40">
              <BeforeAfterSlider
                beforeSrc={cfg.sliderBefore}
                afterSrc={cfg.sliderAfter}
                afterVideo={cfg.sliderAfterVideo}
                aspectClassName={cfg.sliderAspect}
                mediaFit={direction === "video" ? "contain" : "cover"}
                mediaBackground={direction === "video" ? "#09090b" : undefined}
                beforeAlt={t(`services.${direction}.slider`)}
                afterAlt={t(`services.${direction}.slider`)}
              />
            </div>
            <p className="mt-4 text-muted-foreground text-sm text-center">
              {t(`services.${direction}.slider.desc`)}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function DirectionIncludes({ direction }: { direction: Direction }) {
  const { t } = useTranslation();
  const shouldReduceMotion = usePrefersReducedMotion();
  const items = [1, 2, 3] as const;
  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <section data-direction-section="includes" className="relative py-10 sm:py-14 px-4 overflow-hidden">
      <StickerBackdrop direction={direction} />
      <div className="relative max-w-3xl mx-auto">
        <FadeIn y={20}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center font-[family-name:var(--font-syne)]">
            {t("direction.includesTitle")}
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-6">Все включено — від ідеї до готового результату</p>
        </FadeIn>
        <ul className="space-y-3">
          {items.map((n, i) => {
            const delay = i * 0.12;
            if (shouldReduceMotion) {
              return (
                <li key={n} className="list-none">
                  <div className="group flex items-start gap-4 p-4 sm:p-5 rounded-[16px] bg-surface-elevated/60 backdrop-blur-sm border border-border/70 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] hover:-translate-y-[1px]">
                    <span className="relative inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center mt-0.5">
                      <span className={`absolute inset-0 rounded-[12px] bg-green-500/12 border border-green-500/25 ${STICKER_ROTATIONS[i % STICKER_ROTATIONS.length]}`} />
                      <Check size={18} className="relative text-green-600 dark:text-green-400" strokeWidth={2.2} />
                    </span>
                    <span className="text-foreground text-sm sm:text-[15px] leading-snug font-medium pt-1.5">{t(`direction.includes.${direction}.${n}`)}</span>
                  </div>
                </li>
              );
            }
            return (
              <motion.li
                key={n}
                className="list-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay, ease: EASE }}
              >
                <div className="group flex items-start gap-4 p-4 sm:p-5 rounded-[16px] bg-surface-elevated/60 backdrop-blur-sm border border-border/70 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] hover:-translate-y-[1px]">
                  <span className="relative inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center mt-0.5">
                    <span className={`absolute inset-0 rounded-[12px] bg-green-500/12 border border-green-500/25 ${STICKER_ROTATIONS[i % STICKER_ROTATIONS.length]}`} />
                    <Check size={18} className="relative text-green-600 dark:text-green-400" strokeWidth={2.2} />
                  </span>
                  <span className="text-foreground text-sm sm:text-[15px] leading-snug font-medium pt-1.5">{t(`direction.includes.${direction}.${n}`)}</span>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function DirectionProcess({ direction }: { direction: Direction }) {
  const { t } = useTranslation();
  const shouldReduceMotion = usePrefersReducedMotion();
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setBreakpoint("mobile");
      else if (w < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  const isMobile = breakpoint === "mobile";
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<Array<HTMLLIElement | null>>([]);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [paths, setPaths] = useState<string[]>(["", "", ""]);

  const showAll = shouldReduceMotion;
  const isCardVisibleDesktop = (index: number) => {
    if (showAll) return true;
    if (focusedIndex === index) return true;
    return isInView;
  };
  const isLineVisibleDesktop = (lineIndex: number) => {
    if (showAll) return true;
    if (!isInView) return false;
    if (focusedIndex !== null && focusedIndex > lineIndex) return true;
    return isInView;
  };

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const updatePaths = () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLLIElement[];
      if (cards.length !== 4) return;
      const gridLeft = 0;
      const gridTop = 0;
      const newPaths: string[] = [];
      for (let i = 0; i < 3; i++) {
        const a = cards[i];
        const b = cards[i + 1];
        const aLeft = a.offsetLeft;
        const aTop = a.offsetTop;
        const aW = a.offsetWidth;
        const aH = a.offsetHeight;
        const bLeft = b.offsetLeft;
        const bTop = b.offsetTop;
        const bW = b.offsetWidth;
        const bH = b.offsetHeight;
        const ax = aLeft + aW / 2 - gridLeft;
        const ay = aTop + aH / 2 - gridTop;
        const bx = bLeft + bW / 2 - gridLeft;
        const by = bTop + bH / 2 - gridTop;
        const sameRow = Math.abs(ay - by) < 24;
        const sameCol = Math.abs(ax - bx) < 24;
        let d = "";
        if (sameRow) {
          const y = (ay + by) / 2;
          const x1 = aLeft + aW - gridLeft + 4;
          const x2 = bLeft - gridLeft - 4;
          if (x2 > x1 + 2) d = `M ${x1} ${y} L ${x2} ${y}`;
          else d = `M ${x1} ${y} L ${x1 + 12} ${y}`;
        } else if (sameCol) {
          const x = (ax + bx) / 2;
          const y1 = aTop + aH - gridTop + 4;
          const y2 = bTop - gridTop - 4;
          if (y2 > y1 + 2) d = `M ${x} ${y1} L ${x} ${y2}`;
          else d = `M ${x} ${y1} L ${x} ${y1 + 12}`;
        } else {
          const x1 = aLeft + aW / 2 - gridLeft;
          const y1 = aTop + aH - gridTop + 4;
          const x2 = bLeft + bW / 2 - gridLeft;
          const y2 = bTop - gridTop - 4;
          const midY = (y1 + y2) / 2;
          if (y2 > y1 + 8 && Math.abs(x1 - x2) > 8) {
            d = `M ${x1} ${y1} L ${x1} ${midY} L ${x2} ${midY} L ${x2} ${y2}`;
          } else if (y2 > y1) {
            d = `M ${x1} ${y1} L ${x2} ${y2}`;
          } else {
            d = `M ${x1} ${y1} L ${x1 + 12} ${y1}`;
          }
        }
        newPaths.push(d);
      }
      setPaths(newPaths);
    };

    updatePaths();
    const ro = new ResizeObserver(updatePaths);
    ro.observe(grid);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", updatePaths);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePaths);
    };
  }, [showAll, isInView, isMobile]);

  const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const cardDelays = [0, 0.55, 1.1, 1.65];
  const lineDelays = [0.3, 0.85, 1.4];

  return (
    <section
      ref={sectionRef as unknown as React.RefObject<HTMLDivElement>}
      data-direction-section="process"
      className="relative py-10 sm:py-14 px-4 bg-surface overflow-hidden"
    >
      <StickerBackdrop direction={direction} />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={showAll ? false : { opacity: 0, y: 16 }}
          animate={showAll || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: showAll ? 0 : 0.5, ease: EASE }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 font-[family-name:var(--font-syne)]">
            {t("process.title")}
          </h2>
          <p className="text-muted-foreground text-sm text-center">Прозорий процес — 4 кроки від ідеї до релізу</p>
        </motion.div>

        <div className="relative">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          >
            {/* faint guides */}
            {paths.map((d, i) => (
              <path
                key={`guide-${i}`}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                className="text-border/30"
                strokeDasharray="4 6"
                opacity={showAll ? 0.5 : 0.35}
              />
            ))}
            {/* active segments — prominent line */}
            {paths.map((d, i) => {
              const isHovered = hoveredIndex === i;
              if (showAll) {
                return (
                  <path
                    key={`active-${i}`}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.6}
                    className="text-accent"
                    strokeLinecap="round"
                  />
                );
              }
              if (isMobile) {
                return (
                  <motion.path
                    key={`active-${i}`}
                    d={d}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.6}
                    className="text-accent"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: lineDelays[i], ease: EASE }}
                  />
                );
              }
              return (
                <motion.path
                  key={`active-${i}`}
                  d={d}
                  fill="none"
                  stroke={isHovered ? "white" : "currentColor"}
                  strokeWidth={isHovered ? 3 : 2.6}
                  className={isHovered ? "text-white" : "text-accent"}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={
                    isLineVisibleDesktop(i)
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: lineDelays[i],
                    ease: EASE,
                  }}
                  style={{ filter: isHovered ? "drop-shadow(0 0 8px rgba(255,255,255,0.8))" : "none" }}
                />
              );
            })}
            {/* light accent running on hover */}
            {paths.map((d, i) => {
              const isHovered = hoveredIndex === i;
              if (!isHovered || showAll || isMobile) return null;
              return (
                <motion.path
                  key={`accent-${i}`}
                  d={d}
                  fill="none"
                  stroke="white"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeOpacity={0.9}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: [0, 1], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              );
            })}

          </svg>

          {/* Interactive arrows centered in gaps — bold chevron like reference */}
          {paths.map((d, i) => {
            if (!d) return null;
            const tokens = d.trim().split(/[ML ]+/).filter(Boolean);
            const x1 = parseFloat(tokens[0]);
            const y1 = parseFloat(tokens[1]);
            const x2 = parseFloat(tokens[tokens.length - 2]);
            const y2 = parseFloat(tokens[tokens.length - 1]);
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            const isVertical = Math.abs(x1 - x2) < 1;
            const isHovered = hoveredIndex === i;
            if (showAll) {
              return (
                <div
                  key={`arrow-box-${i}`}
                  aria-hidden="true"
                  className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center pointer-events-none"
                  style={{ left: midX, top: midY, zIndex: 3 }}
                >
                  <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center">
                    <ChevronRight size={16} strokeWidth={3} className="text-accent" style={{ transform: `rotate(${isVertical ? 90 : 0}deg)` }} />
                  </div>
                </div>
              );
            }
            if (isMobile) {
              return (
                <motion.div
                  key={`arrow-box-${i}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center"
                  style={{ left: midX, top: midY, zIndex: 3 }}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: lineDelays[i] + 0.25, ease: EASE }}
                >
                  <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/40 flex items-center justify-center">
                    <motion.div
                      animate={isVertical ? { y: [-1, 1, -1] } : { x: [-1, 1, -1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
                    >
                      <ChevronRight size={16} strokeWidth={3} className="text-accent" style={{ transform: `rotate(${isVertical ? 90 : 0}deg)` }} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            }
            return (
              <motion.div
                key={`arrow-box-${i}`}
                aria-hidden="true"
                className="pointer-events-none absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center"
                style={{ left: midX, top: midY, zIndex: 3 }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isLineVisibleDesktop(i) ? { opacity: 1, scale: isHovered ? 1.2 : 1 } : { opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.35, delay: lineDelays[i] + 0.25, ease: EASE }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border shadow-[0_2px_10px_rgba(99,102,241,0.3)] transition-all duration-300 ${
                    isHovered
                      ? "bg-accent border-accent shadow-[0_4px_16px_rgba(99,102,241,0.5)]"
                      : "bg-accent/15 border-accent/40"
                  }`}
                >
                  <motion.div
                    animate={
                      isVertical
                        ? { y: isHovered ? [0, 2, 0] : [-1, 1, -1] }
                        : { x: isHovered ? [0, 3, 0] : [-1, 1, -1] }
                    }
                    transition={{
                      duration: isHovered ? 0.6 : 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  >
                    <ChevronRight
                      size={16}
                      strokeWidth={3}
                      className={isHovered ? "text-white" : "text-accent"}
                      style={{ transform: `rotate(${isVertical ? 90 : 0}deg)` }}
                    />
                  </motion.div>
                </div>
                <motion.div
                  className="absolute inset-0 rounded-full border border-accent/20 pointer-events-none"
                  animate={{ scale: isHovered ? [1, 1.4, 1] : [1, 1.2, 1], opacity: isHovered ? [0.6, 0, 0.6] : [0.3, 0, 0.3] }}
                  transition={{ duration: isHovered ? 0.8 : 1.8, repeat: Infinity, ease: "easeOut", delay: i * 0.2 }}
                />
              </motion.div>
            );
          })}

          <ol
            ref={gridRef}
            data-mobile={isMobile ? "true" : "false"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative"
            style={{ zIndex: 2 }}
          >
            {PROCESS_STEPS.map((n, i) => {
              if (showAll) {
                return (
                  <li
                    key={n}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="relative h-full list-none"
                  >
                    <div className="group relative flex gap-4 sm:block p-5 sm:p-6 rounded-[16px] border border-border/60 bg-background/80 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:rotate-[0.4deg] h-full">
                      <span aria-hidden="true" className="absolute -right-1 -top-1 h-5 w-5 rounded-bl-[8px] bg-background border-l border-b border-border/60 shadow-sm hidden sm:block" />
                      <div className="relative h-[56px] w-[56px] shrink-0 sm:mb-5">
                        <DirectionSticker icon={PROCESS_ICONS[i]} direction={direction} index={i} />
                        <span aria-hidden="true" className="absolute -right-2 -top-1 rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] leading-none font-black tabular-nums text-foreground shadow-sm">
                          {String(n).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-foreground font-bold text-[15px] mb-1.5">{t(`process.${n}.title`)}</h3>
                        <p className="text-muted-foreground text-[13px] leading-relaxed">{t(`process.${n}.desc`)}</p>
                      </div>
                    </div>
                  </li>
                );
              }
              if (isMobile) {
                return (
                  <motion.li
                    key={n}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    className="relative h-full list-none"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: cardDelays[i], ease: EASE }}
                    onFocus={() => setFocusedIndex(i)}
                    onBlur={() => setFocusedIndex((prev) => (prev === i ? null : prev))}
                  >
                    <div className="group relative flex gap-4 sm:block p-5 sm:p-6 rounded-[16px] border border-border/60 bg-background/80 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.06)] h-full">
                      <span aria-hidden="true" className="absolute -right-1 -top-1 h-5 w-5 rounded-bl-[8px] bg-background border-l border-b border-border/60 shadow-sm hidden sm:block" />
                      <div className="relative h-[56px] w-[56px] shrink-0 sm:mb-5">
                        <DirectionSticker icon={PROCESS_ICONS[i]} direction={direction} index={i} />
                        <span aria-hidden="true" className="absolute -right-2 -top-1 rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] leading-none font-black tabular-nums text-foreground shadow-sm">
                          {String(n).padStart(2, "0")}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-foreground font-bold text-[15px] mb-1.5">{t(`process.${n}.title`)}</h3>
                        <p className="text-muted-foreground text-[13px] leading-relaxed">{t(`process.${n}.desc`)}</p>
                      </div>
                    </div>
                  </motion.li>
                );
              }
              const visible = isCardVisibleDesktop(i);
              const isNextHighlighted = hoveredIndex === i - 1;
              return (
                <motion.li
                  key={n}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="relative h-full list-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: cardDelays[i], ease: EASE }}
                  onFocus={() => setFocusedIndex(i)}
                  onBlur={() => setFocusedIndex((prev) => (prev === i ? null : prev))}
                  onHoverStart={() => setHoveredIndex(i)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <div
                    className={`group relative flex gap-4 sm:block p-5 sm:p-6 rounded-[16px] border bg-background/80 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.06)] h-full transition-[box-shadow,transform,border-color] duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:rotate-[0.4deg] ${
                      isNextHighlighted
                        ? "border-accent/50 shadow-[0_8px_24px_rgba(99,102,241,0.15)]"
                        : "border-border/60"
                    }`}
                  >
                    <span aria-hidden="true" className="absolute -right-1 -top-1 h-5 w-5 rounded-bl-[8px] bg-background border-l border-b border-border/60 shadow-sm hidden sm:block" />
                    <div className="relative h-[56px] w-[56px] shrink-0 sm:mb-5">
                      <DirectionSticker icon={PROCESS_ICONS[i]} direction={direction} index={i} />
                      <span
                        aria-hidden="true"
                        className="absolute -right-2 -top-1 rounded-full border border-border bg-background px-1.5 py-0.5 text-[10px] leading-none font-black tabular-nums text-foreground shadow-sm"
                      >
                        {String(n).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-foreground font-bold text-[15px] mb-1.5">{t(`process.${n}.title`)}</h3>
                      <p className="text-muted-foreground text-[13px] leading-relaxed">{t(`process.${n}.desc`)}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.p
          className="text-center text-muted-foreground text-sm mt-8 max-w-xl mx-auto"
          initial={showAll ? false : { opacity: 0, y: 12 }}
          animate={showAll || isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: showAll ? 0 : 0.45, delay: showAll ? 0 : 1.95, ease: EASE }}
        >
          {t("pricing.desc")}
        </motion.p>
      </div>
    </section>
  );
}

function DirectionCasesInner({ direction }: { direction: Direction }) {
  const { t } = useTranslation();
  const cfg = DIRECTIONS[direction];
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const typeParam = searchParams.get("type");
  const activeType = cfg.subcategories.some((s) => s.value === typeParam) ? typeParam : "all";

  const allCases =
    direction === "it" ? itCases : direction === "design" ? designCases : videoCases;

  const filtered =
    activeType === "all"
      ? allCases
      : allCases.filter((c) => {
          const field = cfg.subcategoryField as keyof typeof c;
          return c[field] === activeType;
        });

  const setFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("type");
    else params.set("type", value);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <section id="cases" className="py-14 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn y={24}>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-10 text-center font-[family-name:var(--font-syne)]">
            {t("direction.casesTitle")}
          </h2>
        </FadeIn>

        <FadeIn delay={0.05} y={16} blur={2} className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center items-center gap-1 p-1.5 rounded-full border border-border bg-secondary/50">
            {[{ value: "all", labelKey: "cases.subtab.all" }, ...cfg.subcategories].map((sub) => (
              <button
                key={sub.value}
                onClick={() => setFilter(sub.value)}
                className={`cursor-pointer px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                  activeType === sub.value
                    ? "bg-foreground text-background shadow-[0_0_18px_rgba(248,248,255,0.18)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(sub.labelKey)}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {filtered.map((c, i) => (
            <FadeIn key={c.slug} delay={staggerDelay(i)} y={16}>
              {direction === "video" ? (
                <VideoCaseCard {...videoCardProps(c as VideoCaseEntry)} preload={i < 2} />
              ) : (
                <FeaturedCaseCard {...featuredCardProps(c as CaseEntry)} preload={i < 2} />
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DirectionCases({ direction }: { direction: Direction }) {
  return (
    <Suspense fallback={null}>
      <DirectionCasesInner direction={direction} />
    </Suspense>
  );
}

function DirectionCta({ direction }: { direction: Direction }) {
  const { t } = useTranslation();

  return (
    <section className="py-14 sm:py-20 px-4">
      <div className="max-w-xl mx-auto text-center">
        <FadeIn y={24}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 font-[family-name:var(--font-syne)]">
            {t(`services.${direction}.cta.title`)}
          </h2>
          <p className="text-muted-foreground mb-8">
            {t(`services.${direction}.cta.desc`)}
          </p>
          <a
            href={siteConfig.telegram.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            <MessageCircle size={18} />
            {t("header.write")}
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
