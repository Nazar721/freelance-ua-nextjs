"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
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
      <DirectionProcess />
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
    <section className="py-10 sm:py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn y={20}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center font-[family-name:var(--font-syne)]">
            {t("direction.tasksTitle")}
          </h2>
        </FadeIn>
        <ul className="space-y-3">
          {items.map((n, i) => (
            <FadeIn
              as="li"
              key={n}
              delay={0.05 * i}
              y={16}
              blur={2}
              className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated/40 border border-border"
            >
              <span className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={13} className="text-accent" />
              </span>
              <span className="text-foreground text-sm sm:text-base">{t(`direction.tasks.${direction}.${n}`)}</span>
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
    <section className="py-10 sm:py-14 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <FadeIn y={20}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center font-[family-name:var(--font-syne)]">
            {t("services.title")}
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {items.map((n, i) => (
            <FadeIn key={n} delay={0.04 * i} y={14} blur={2}>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-surface-elevated/40 h-full">
                <span className="sc-dot w-1.5 h-1.5 bg-accent/60 rounded-full shrink-0" />
                <span className="text-foreground text-sm sm:text-base">{t(`services.${direction}.${n}`)}</span>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Before/after material moved from the old ServicesModal */}
        <FadeIn y={24} blur={4}>
          <div className="border-t border-border/60 pt-8">
            <h3 className="text-accent text-sm font-medium uppercase tracking-wider mb-4 text-center">
              {t(`services.${direction}.slider`)}
            </h3>
            <BeforeAfterSlider
              beforeSrc={cfg.sliderBefore}
              afterSrc={cfg.sliderAfter}
              afterVideo={cfg.sliderAfterVideo}
              aspectClassName={cfg.sliderAspect}
              beforeAlt={t(`services.${direction}.slider`)}
              afterAlt={t(`services.${direction}.slider`)}
            />
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
    <section className="py-10 sm:py-14 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn y={20}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center font-[family-name:var(--font-syne)]">
            {t("direction.includesTitle")}
          </h2>
        </FadeIn>
        <ul className="space-y-3">
          {items.map((n, i) => (
            <FadeIn
              as="li"
              key={n}
              delay={0.05 * i}
              y={16}
              blur={2}
              className="flex items-start gap-3 p-4 rounded-xl bg-surface-elevated/40 border border-border"
            >
              <span className="w-6 h-6 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={13} className="text-green-500" />
              </span>
              <span className="text-foreground text-sm sm:text-base">{t(`direction.includes.${direction}.${n}`)}</span>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DirectionProcess() {
  const { t } = useTranslation();

  return (
    <section className="py-10 sm:py-14 px-4 bg-surface">
      <div className="max-w-4xl mx-auto">
        <FadeIn y={20}>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center font-[family-name:var(--font-syne)]">
            {t("process.title")}
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS_STEPS.map((n, i) => (
            <FadeIn key={n} delay={0.05 * i} y={16} blur={2}>
              <div className="p-5 rounded-xl border border-border/60 bg-background/40 h-full">
                <div className="text-accent font-bold text-sm mb-2">{t(`process.${n}.title`)}</div>
                <p className="text-muted-foreground text-sm">{t(`process.${n}.desc`)}</p>
              </div>
            </FadeIn>
          ))}
        </div>
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
