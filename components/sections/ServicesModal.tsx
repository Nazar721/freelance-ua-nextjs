"use client";

import { useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { useTranslation } from "@/lib/LanguageContext";
import { siteConfig } from "@/config/site";
import type { ServiceCategory } from "./ServicesSection";

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

const modalEmojis: Record<string, string[]> = {
  it: ["🤖", "🌐", "🛒", "💼", "🔗", "⚡", "📱"],
  design: ["🎨", "✨", "📺", "🖼️", "📊"],
  video: ["🎬", "🎞️", "🎥", "📱", "📹", "🦾"],
};

export default function ServicesModal({ category, onClose }: { category: ServiceCategory; onClose: () => void }) {
  const { t } = useTranslation();
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, []);

  return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={t(`services.${category.key}.category`)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-md"
            onClick={onClose}
          >
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="service-modal relative w-[92vw] max-w-6xl overflow-y-auto rounded-3xl"
              style={{ maxHeight: 'calc(var(--vh, 1vh) * 88)', overscrollBehavior: 'contain' }}
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label={t("testimonials.close")}
                className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/10 transition-all duration-500 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="p-8 pb-6">
                <div className="flex items-center gap-4 mb-2">
                  <FluentEmoji emoji={catEmoji(category.key)} size={48} className="fluent-header" />
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground font-[family-name:var(--font-syne)]">
                    {t(`services.${category.key}.category`)}
                  </h3>
                </div>
              </div>

              {/* Emoji grid */}
              <div className="px-8 pb-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {category.items.map((n, idx) => (
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
                          emoji={modalEmojis[category.key]?.[idx] || "✨"}
                          size={52}
                          className="fluent-emoji"
                        />
                      </div>
                      <span className="text-foreground text-[11px] md:text-xs font-medium leading-snug block">
                        {t(`services.${category.key}.${n}`)}
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
                      <h4 className="text-accent text-sm font-medium uppercase tracking-wider mb-4 text-center md:text-left">
                        {t(category.sliderKey)}
                      </h4>
                      <BeforeAfterSlider
                        beforeSrc={category.sliderBefore}
                        afterSrc={category.sliderAfter}
                        afterVideo={category.sliderAfterVideo}
                        aspectClassName={category.sliderAspect}
                        beforeAlt="Before"
                        afterAlt="After"
                      />
                      <p className="mt-4 text-muted-foreground text-sm text-center md:text-left">
                        {t(`services.${category.key}.slider.desc`)}
                      </p>
                    </div>

                    {/* CTA block */}
                    <div className="md:w-72 lg:w-80 shrink-0 flex">
                      <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br from-accent/12 to-accent/8 p-6 text-center flex flex-col justify-center w-full">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_60%)] pointer-events-none" />
                        <h4 className="relative text-foreground font-bold text-base md:text-lg mb-2">
                          {t(`services.${category.key}.cta.title`)}
                        </h4>
                        <p className="relative text-muted-foreground text-sm mb-5">
                          {t(`services.${category.key}.cta.desc`)}
                        </p>
                        <a
                          href={siteConfig.telegram.consultationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-primary-foreground font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_36px_rgba(99,102,241,0.4)]"
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
          </motion.div>
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
