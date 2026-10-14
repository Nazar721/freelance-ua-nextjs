"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  ArrowRight, Bot, Check, Clapperboard, Code2, Film, Image, LayoutDashboard,
  Megaphone, MessageCircle, Monitor, Palette, PenTool,
  Presentation, Rocket, ScanFace, ShoppingBag, Smartphone, Sparkles,
  Users, WandSparkles, Workflow, ClipboardList, type LucideIcon,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
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
    <article className="min-h-screen">
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
  const items = [1, 2, 3] as const;

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
          {items.map((n, i) => (
            <FadeIn
              as="li"
              key={n}
              delay={0.05 * i}
              y={16}
              blur={2}
              className="group flex items-center gap-4 p-4 sm:p-5 rounded-[16px] bg-surface-elevated/60 backdrop-blur-sm border border-border/70 shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-[1px] transition-all duration-300"
            >
              <DirectionSticker icon={TASK_ICONS[direction][i]} direction={direction} index={i} />
              <span className="text-foreground text-sm sm:text-[15px] leading-snug font-medium">{t(`direction.tasks.${direction}.${n}`)}</span>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DirectionServices({ direction }: { direction: Direction }) {
  const { t } = useTranslation();
  const cfg = DIRECTIONS[direction];
  const items = Array.from({ length: cfg.serviceCount }, (_, i) => i + 1);

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
          {items.map((n, i) => (
            <FadeIn
              as="li"
              key={n}
              delay={0.04 * i}
              y={14}
              className="group relative flex items-center gap-4 p-4 sm:p-5 rounded-[16px] border border-border/60 bg-surface-elevated/70 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] hover:rotate-[0.3deg] transition-all duration-300 h-full"
            >
              <DirectionSticker icon={SERVICE_ICONS[direction][i % SERVICE_ICONS[direction].length]} direction={direction} index={i} />
              <span className="text-foreground text-sm sm:text-[15px] font-medium leading-snug">{t(`services.${direction}.${n}`)}</span>
            </FadeIn>
          ))}
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
  const items = [1, 2, 3] as const;

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
          {items.map((n, i) => (
            <FadeIn
              as="li"
              key={n}
              delay={0.05 * i}
              y={16}
              blur={2}
              className="group flex items-start gap-4 p-4 sm:p-5 rounded-[16px] bg-surface-elevated/60 backdrop-blur-sm border border-border/70 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] hover:-translate-y-[1px] transition-all duration-300"
            >
              <span className="relative inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center mt-0.5">
                <span className={`absolute inset-0 rounded-[12px] bg-green-500/12 border border-green-500/25 ${STICKER_ROTATIONS[i % STICKER_ROTATIONS.length]}`} />
                <Check size={18} className="relative text-green-600 dark:text-green-400" strokeWidth={2.2} />
              </span>
              <span className="text-foreground text-sm sm:text-[15px] leading-snug font-medium pt-1.5">{t(`direction.includes.${direction}.${n}`)}</span>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DirectionProcess({ direction }: { direction: Direction }) {
  const { t } = useTranslation();

  return (
    <section data-direction-section="process" className="relative py-10 sm:py-14 px-4 bg-surface overflow-hidden">
      <StickerBackdrop direction={direction} />
      <div className="relative max-w-5xl mx-auto">
        <FadeIn y={20}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center font-[family-name:var(--font-syne)]">
            {t("process.title")}
          </h2>
          <p className="text-muted-foreground text-sm text-center mb-8">Прозорий процес — 4 кроки від ідеї до релізу</p>
        </FadeIn>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {PROCESS_STEPS.map((n, i) => (
            <FadeIn as="li" key={n} delay={0.05 * i} y={16} className="relative h-full">
              <div className="group relative flex gap-4 sm:block p-5 sm:p-6 rounded-[16px] border border-border/60 bg-background/80 backdrop-blur-sm shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:rotate-[0.4deg] transition-all duration-300 h-full">
                {/* peel corner */}
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
              {i < PROCESS_STEPS.length - 1 && (
                <span aria-hidden="true" className="pointer-events-none absolute -right-3 top-10 z-10 hidden h-6 w-6 items-center justify-center rounded-full bg-accent/10 border border-accent/20 text-accent lg:flex">
                  <ArrowRight size={14} strokeWidth={2} />
                </span>
              )}
            </FadeIn>
          ))}
        </ol>
        <FadeIn y={16} delay={0.2}>
          <p className="text-center text-muted-foreground text-sm mt-8 max-w-xl mx-auto">
            {t("pricing.desc")}
          </p>
        </FadeIn>
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
            <FadeIn key={c.slug} delay={0.04 + i * 0.05} y={32} blur={4}>
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
