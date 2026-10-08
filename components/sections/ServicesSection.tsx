"use client";

import { useState, useCallback } from "react";
import { Code2, Palette, Video } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import dynamic from "next/dynamic";
import { useTranslation } from "@/lib/LanguageContext";

const ServicesModal = dynamic(() => import("./ServicesModal"), { ssr: false });

export interface ServiceCategory {
  key: string;
  icon: React.ReactNode;
  emoji: string;
  count: number;
  sliderKey: string;
  sliderBefore: string;
  sliderAfter: string;
  sliderAfterVideo?: string;
  sliderAspect?: string;
  items: number[];
}

const serviceCategories: ServiceCategory[] = [
  {
    key: "it",
    icon: <Code2 size={28} className="text-accent" />,
    emoji: "💻",
    count: 7,
    sliderKey: "services.it.slider",
    sliderBefore: "/media/services/code-before.webp",
    sliderAfter: "/media/services/website-after.webp",
    items: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    key: "design",
    icon: <Palette size={28} className="text-accent" />,
    emoji: "🎨",
    count: 5,
    sliderKey: "services.design.slider",
    sliderBefore: "/media/services/design-before.webp",
    sliderAfter: "/media/services/design-after.webp",
    items: [1, 2, 3, 4, 5],
  },
  {
    key: "video",
    icon: <Video size={28} className="text-accent" />,
    emoji: "🎬",
    count: 6,
    sliderKey: "services.video.slider",
    sliderBefore: "/media/services/video-poster.webp?v=2",
    sliderAfter: "/media/services/video-poster.webp?v=2",
    sliderAfterVideo: "/media/cases/nikita-sheremet-crypto/process-3.mp4",
    sliderAspect: "aspect-video",
    items: [1, 2, 3, 4, 5, 6],
  },
];

export default function ServicesSection() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const closeModal = useCallback(() => setActiveModal(null), []);

  const activeCategory = activeModal !== null ? serviceCategories[activeModal] : null;

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
            <FadeIn key={cat.key} delay={0.1 + i * 0.08} y={24} blur={2}>
              <button
                onClick={() => setActiveModal(i)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width) * 100;
                  const y = ((e.clientY - rect.top) / rect.height) * 100;
                  e.currentTarget.style.setProperty("--glow-x", `${x}%`);
                  e.currentTarget.style.setProperty("--glow-y", `${y}%`);
                }}
                className="service-card group relative text-left w-full p-5 sm:p-7 rounded-2xl border border-border/60 bg-surface-elevated/50 cursor-pointer"
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
                        +{cat.count - 3} послуг
                      </li>
                    )}
                  </ul>

                  <span className="sc-cta inline-flex items-center gap-2 whitespace-nowrap text-accent text-xs sm:text-sm font-medium">
                    Дізнатись більше
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="sc-arrow sm:w-4 sm:h-4">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeCategory && <ServicesModal category={activeCategory} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}
