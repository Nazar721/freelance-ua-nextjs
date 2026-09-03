"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/LanguageContext";

const LiquidPill = () => (
  <motion.span
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: "spring", stiffness: 400, damping: 28 }}
    className="absolute inset-0 rounded-full overflow-hidden"
    style={{
      background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
      boxShadow:
        "0 0 20px rgba(99,102,241,0.4), inset 0 1px 1px rgba(255,255,255,0.35), inset 0 -2px 6px rgba(49,32,120,0.55)",
    }}
  >
    <span
      className="absolute inset-x-1 top-0.5 h-1/2 rounded-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.38), rgba(255,255,255,0.06) 60%, transparent)",
        filter: "blur(1px)",
      }}
    />
    <span
      className="lang-pill-ring absolute inset-0.5 rounded-full border border-white/20"
      style={{
        maskImage:
          "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.15) 55%, transparent)",
        WebkitMaskImage:
          "linear-gradient(180deg, rgba(0,0,0,0.9), rgba(0,0,0,0.15) 55%, transparent)",
      }}
    />
  </motion.span>
);

export default function LanguageToggle() {
  const { locale, setLocale } = useTranslation();
  const isEn = locale === "en";

  const segmentClass = (active: boolean) =>
    `relative min-w-[44px] sm:min-w-[52px] px-2 py-1 sm:py-1.5 text-center text-[11px] sm:text-xs rounded-full cursor-pointer transition-colors duration-300 ${
      active ? "font-bold text-primary-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div
      className="relative flex-shrink-0 flex items-center gap-0.5 rounded-full px-1 py-1 border border-border bg-card/70 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_4px_16px_rgba(0,0,0,0.35)]"
      style={{ WebkitTapHighlightColor: "transparent" }}
      role="group"
      aria-label={isEn ? "Переключити на українську" : "Switch to English"}
    >
      <button
        onClick={() => setLocale("uk")}
        aria-pressed={!isEn}
        className={segmentClass(!isEn)}
      >
        {!isEn && <LiquidPill />}
        <span className="relative z-10">UA</span>
      </button>

      <button
        onClick={() => setLocale("en")}
        aria-pressed={isEn}
        className={segmentClass(isEn)}
      >
        {isEn && <LiquidPill />}
        <span className="relative z-10">EN</span>
      </button>
    </div>
  );
}
