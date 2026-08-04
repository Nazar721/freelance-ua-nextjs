"use client";

import { useState, useEffect, useCallback } from "react";
import { Code2, Palette, Video, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/ui/FadeIn";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { useTranslation } from "@/lib/LanguageContext";
import { siteConfig } from "@/config/site";

const FLUENT_CDN = "https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets";

const emojiMap: Record<string, string> = {
  "💻": "1f4bb",
  "🎨": "1f3a8",
  "🎬": "1f3ac",
  "🤖": "1f916",
  "🌐": "1f310",
  "🛒": "1f6d2",
  "💼": "1f4bc",
  "🔗": "1f517",
  "⚡": "26a1",
  "📱": "1f4f1",
  "✨": "2728",
  "📺": "1f4fa",
  "🖼️": "1f5bc",
  "📊": "1f4ca",
  "🎞️": "1f39e",
  "🎥": "1f3a5",
  "📹": "1f4f9",
  "🦾": "1f9be",
};

function FluentEmoji({ emoji, className = "", size = 56 }: { emoji: string; className?: string; size?: number }) {
  const codepoint = emojiMap[emoji] || "2728";
  const src = `${FLUENT_CDN}/${codepoint}_3d.png`;

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={emoji}
        width={size}
        height={size}
        style={{ display: "block" }}
        draggable={false}
      />
    </span>
  );
}

interface ServiceCategory {
  key: string;
  icon: React.ReactNode;
  emoji: string;
  count: number;
  sliderKey: string;
  sliderBefore: string;
  sliderAfter: string;
  sliderAfterVideo?: string;
  items: number[];
}

const serviceCategories: ServiceCategory[] = [
  {
    key: "it",
    icon: <Code2 size={28} className="text-[#6366F1]" />,
    emoji: "💻",
    count: 7,
    sliderKey: "services.it.slider",
    sliderBefore: "/media/services/code-before.png",
    sliderAfter: "/media/services/website-after.png",
    items: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    key: "design",
    icon: <Palette size={28} className="text-[#6366F1]" />,
    emoji: "🎨",
    count: 5,
    sliderKey: "services.design.slider",
    sliderBefore: "/media/services/design-before.png",
    sliderAfter: "/media/services/design-after.png",
    items: [1, 2, 3, 4, 5],
  },
  {
    key: "video",
    icon: <Video size={28} className="text-[#6366F1]" />,
    emoji: "🎬",
    count: 6,
    sliderKey: "services.video.slider",
    sliderBefore: "/media/services/video-poster.png",
    sliderAfter: "/media/services/video-poster.png",
    sliderAfterVideo: "/media/cases/shermet.mp4",
    items: [1, 2, 3, 4, 5, 6],
  },
];

const modalEmojis: Record<string, string[]> = {
  it: ["🤖", "🌐", "🛒", "💼", "🔗", "⚡", "📱"],
  design: ["🎨", "✨", "📺", "🖼️", "📊"],
  video: ["🎬", "🎞️", "🎥", "📱", "📹", "🦾"],
};

export default function ServicesSection() {
  const { t } = useTranslation();
  const [activeModal, setActiveModal] = useState<number | null>(null);

  const closeModal = useCallback(() => setActiveModal(null), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (activeModal !== null) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [activeModal, closeModal]);

  const activeCategory = activeModal !== null ? serviceCategories[activeModal] : null;

  return (
    <section id="services" className="py-12 sm:py-20 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-8 sm:mb-16" y={20} blur={4}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8FF] mb-3 sm:mb-4 font-[family-name:var(--font-syne)]">
            {t("services.title")}
          </h2>
          <p className="text-[#8B8B9E] text-sm sm:text-lg max-w-2xl mx-auto">
            {t("services.desc")}
          </p>
        </FadeIn>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {serviceCategories.map((cat, i) => (
            <FadeIn key={cat.key} delay={0.1 + i * 0.08} y={24} blur={2}>
              <button
                onClick={() => setActiveModal(i)}
                className="service-card group text-left w-full p-5 sm:p-7 rounded-2xl border border-[#2A2A38]/60 bg-[#1A1A24]/50 cursor-pointer transition-all duration-700 hover:bg-[#1A1A24] hover:border-[#2A2A38] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)]"
              >
                {/* Watermark number */}
                <span className="absolute top-4 right-6 text-5xl sm:text-6xl font-black text-[#6366F1]/[0.12] font-[family-name:var(--font-syne)] select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#6366F1]/10 group-hover:bg-[#6366F1]/18 flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300">
                    {cat.icon}
                  </div>

                  <h3 className="text-[#F8F8FF] font-bold text-lg sm:text-xl mb-2 sm:mb-3 font-[family-name:var(--font-syne)]">
                    {t(`services.${cat.key}.category`)}
                  </h3>

                  <ul className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
                    {cat.items.slice(0, 3).map((n) => (
                      <li
                        key={n}
                        className="flex items-center gap-2 sm:gap-2.5 text-[#8B8B9E] text-xs sm:text-sm transition-colors duration-200"
                      >
                        <span className="w-1.5 h-1.5 bg-[#6366F1]/50 rounded-full shrink-0" />
                        {t(`services.${cat.key}.${n}`)}
                      </li>
                    ))}
                    {cat.count > 3 && (
                      <li className="text-[#6366F1]/60 text-xs sm:text-sm pl-3 sm:pl-4">
                        +{cat.count - 3} послуг
                      </li>
                    )}
                  </ul>

                  <span className="inline-flex items-center gap-2 text-[#6366F1] text-xs sm:text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    Дізнатись більше
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 sm:w-4 sm:h-4">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </button>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeModal !== null && activeCategory && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-50 bg-[#0A0A0F]/70 backdrop-blur-md"
              onClick={closeModal}
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="service-modal fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] max-w-6xl max-h-[88vh] overflow-y-auto rounded-3xl"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#8B8B9E] hover:text-[#F8F8FF] hover:bg-white/10 transition-all duration-500"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="p-8 pb-6">
                <div className="flex items-center gap-4 mb-2">
                  <FluentEmoji emoji={catEmoji(activeCategory.key)} size={48} className="fluent-header" />
                  <h3 className="text-2xl md:text-3xl font-bold text-[#F8F8FF] font-[family-name:var(--font-syne)]">
                    {t(`services.${activeCategory.key}.category`)}
                  </h3>
                </div>
              </div>

              {/* Emoji grid */}
              <div className="px-8 pb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {activeCategory.items.map((n, idx) => (
                    <motion.div
                      key={n}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.7,
                        delay: idx * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="emoji-card p-5 rounded-2xl text-center flex flex-col items-center"
                    >
                      <div className="emoji-3d mb-3">
                        <FluentEmoji
                          emoji={modalEmojis[activeCategory.key]?.[idx] || "✨"}
                          size={52}
                          className="fluent-emoji"
                        />
                      </div>
                      <span className="text-[#F8F8FF] text-[11px] md:text-xs font-medium leading-snug block">
                        {t(`services.${activeCategory.key}.${n}`)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Slider + CTA side by side */}
              <div className="px-8 pb-8">
                <div className="border-t border-white/5 pt-8">
                  <div className="flex flex-col md:flex-row gap-6 items-stretch">
                    {/* Slider */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#6366F1] text-sm font-medium uppercase tracking-wider mb-4 text-center md:text-left">
                        {t(activeCategory.sliderKey)}
                      </h4>
                      <BeforeAfterSlider
                        beforeSrc={activeCategory.sliderBefore}
                        afterSrc={activeCategory.sliderAfter}
                        afterVideo={activeCategory.sliderAfterVideo}
                        beforeAlt="Before"
                        afterAlt="After"
                      />
                      <p className="mt-4 text-[#8B8B9E] text-sm text-center md:text-left">
                        {t(`services.${activeCategory.key}.slider.desc`)}
                      </p>
                    </div>

                    {/* CTA block */}
                    <div className="md:w-72 lg:w-80 shrink-0 flex">
                      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-[#6366F1]/12 to-[#8B5CF6]/8 p-6 text-center flex flex-col justify-center w-full">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />
                        <h4 className="relative text-[#F8F8FF] font-bold text-base md:text-lg mb-2">
                          {t(`services.${activeCategory.key}.cta.title`)}
                        </h4>
                        <p className="relative text-[#8B8B9E] text-sm mb-5">
                          {t(`services.${activeCategory.key}.cta.desc`)}
                        </p>
                        <a
                          href={siteConfig.telegram.consultationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_36px_rgba(99,102,241,0.4)]"
                        >
                          {t("header.write")}
                          <ArrowRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function catEmoji(key: string): string {
  switch (key) {
    case "it": return "💻";
    case "design": return "🎨";
    case "video": return "🎬";
    default: return "✨";
  }
}
