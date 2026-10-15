"use client";

import Link from "next/link";
import { Code2, Palette, Video } from "lucide-react";
import { FadeIn, staggerDelay } from "@/components/ui/FadeIn";
import { useTranslation } from "@/lib/LanguageContext";
import { pathPrefix, type Direction } from "@/lib/i18n-routes";

interface ServiceCategory {
  key: Direction;
  icon: React.ReactNode;
  count: number;
  items: number[];
}

const serviceCategories: ServiceCategory[] = [
  {
    key: "it",
    icon: <Code2 size={28} className="text-accent" />,
    count: 7,
    items: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    key: "design",
    icon: <Palette size={28} className="text-accent" />,
    count: 5,
    items: [1, 2, 3, 4, 5],
  },
  {
    key: "video",
    icon: <Video size={28} className="text-accent" />,
    count: 6,
    items: [1, 2, 3, 4, 5, 6],
  },
];

/**
 * Three service cards on the home page. Each card is a real link to the start
 * of its direction page (`/services/{d}`); the old modal is gone — its useful
 * material (service lists, before/after, CTA) now lives on the direction pages.
 */
export default function ServicesSection() {
  const { t, locale } = useTranslation();
  const lp = pathPrefix(locale);

  return (
    <section id="services" className="py-12 sm:py-20 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-8 sm:mb-16" y={20} blur={4}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 font-[family-name:var(--font-syne)]">
            {t("services.title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-lg max-w-2xl mx-auto">
            {t("services.desc")}
          </p>
        </FadeIn>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {serviceCategories.map((cat, i) => (
            <FadeIn key={cat.key} delay={staggerDelay(i)} y={24} blur={2}>
              <Link
                href={`${lp}/services/${cat.key}`}
                className="service-card group relative block text-left w-full p-5 sm:p-7 rounded-2xl border border-border/60 bg-surface-elevated/50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty("--glow-x", `${x}%`);
                  e.currentTarget.style.setProperty("--glow-y", `${y}%`);
                }}
              >
                {/* Watermark number */}
                <span className="sc-number absolute top-4 right-6 text-5xl sm:text-6xl font-black font-[family-name:var(--font-syne)] select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10">
                  <div className="sc-icon w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4 sm:mb-5">
                    {cat.icon}
                  </div>

                  <h3 className="text-foreground font-bold text-lg sm:text-xl mb-2 sm:mb-3 font-[family-name:var(--font-syne)]">
                    {t(`services.${cat.key}.category`)}
                  </h3>

                  <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                    {cat.items.slice(0, 3).map((n) => (
                      <li
                        key={n}
                        className="flex items-center gap-2 sm:gap-2.5 text-muted-foreground text-xs sm:text-sm"
                      >
                        <span className="sc-dot w-1.5 h-1.5 bg-accent/50 rounded-full shrink-0" />
                        {t(`services.${cat.key}.${n}`)}
                      </li>
                    ))}
                    {cat.count > 3 && (
                      <li className="text-accent/60 text-xs sm:text-sm pl-3 sm:pl-4">
                        +{cat.count - 3} {t("services.moreN")}
                      </li>
                    )}
                  </ul>

                  <span className="sc-cta inline-flex items-center gap-2 whitespace-nowrap text-accent text-xs sm:text-sm font-medium">
                    {t("services.more")}
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sc-arrow sm:w-4 sm:h-4">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
