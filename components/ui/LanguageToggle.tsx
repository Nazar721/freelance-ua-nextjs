"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/LanguageContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useTranslation();
  const isEn = locale === "en";

  const toggleLocale = () => {
    setLocale(isEn ? "uk" : "en");
  };

  return (
    <button
      onClick={toggleLocale}
      className="relative flex-shrink-0 cursor-pointer flex items-center gap-1.5 sm:gap-2"
      style={{ WebkitTapHighlightColor: "transparent" }}
      aria-label={isEn ? "Переключити на українську" : "Switch to English"}
    >
      {/* Toggle track */}
      <div
        className="relative rounded-full overflow-hidden w-[44px] h-[24px] sm:w-[52px] sm:h-[28px]"
        style={{
          background: "linear-gradient(180deg, #141622, #1e2130)",
          boxShadow:
            "inset 0 1px 4px rgba(0,0,0,0.9), inset 0 -1px 2px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.5)",
          border: "1px solid #2c3042",
        }}
      >
        {/* Slot groove */}
        <div
          className="absolute rounded-full left-1 right-1 top-1/2 h-[2px] -translate-y-1/2"
          style={{ background: "#06070a", boxShadow: "inset 0 1px 2px rgba(0,0,0,0.9)" }}
        />

        {/* Slot fill */}
        <motion.div
          className="absolute rounded-full left-1 top-1/2 h-[2px] -translate-y-1/2"
          animate={{
            width: isEn ? 40 : 0,
            backgroundColor: isEn ? "#00bfff" : "#FFD700",
            boxShadow: isEn
              ? "0 0 6px 1px rgba(0,191,255,0.4)"
              : "0 0 6px 1px rgba(255,215,0,0.4)",
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Claw arm */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-[3px] rounded-full z-20"
          style={{
            background: "linear-gradient(180deg, #5e647c, #333747)",
            boxShadow: "inset 0 0.5px 1px rgba(255,255,255,0.2)",
          }}
          animate={{
            left: isEn ? -6 : 26,
            width: 28,
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div
            className="absolute top-[0.5px] left-[4px] right-[2px] h-[1.5px]"
            style={{
              background: "repeating-linear-gradient(90deg, #222533, #222533 1px, transparent 1px, transparent 2px)",
              opacity: 0.5,
            }}
          />
        </motion.div>

        {/* Joint circle */}
        <motion.div
          className="absolute rounded-full z-30 w-[8px] h-[8px] -translate-y-1/2"
          style={{
            background: "linear-gradient(135deg, #4d536b, #262938)",
            border: "1px solid #151720",
            boxShadow: "0 1px 3px rgba(0,0,0,0.7)",
          }}
          animate={{
            left: isEn ? -10 : 22,
            top: "50%",
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="absolute inset-[2px] rounded-full bg-[#1a1c26]" />
        </motion.div>

        {/* Pincer top */}
        <motion.div
          className="absolute z-10"
          style={{
            width: 8,
            height: 5,
            borderLeft: "1.5px solid #717893",
            borderTop: "1.5px solid #717893",
            borderTopLeftRadius: 5,
            transformOrigin: "100% 100%",
          }}
          animate={{
            left: isEn ? -18 : 14,
            top: "50%",
            translateY: -9,
            rotate: isEn ? 40 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Pincer bottom */}
        <motion.div
          className="absolute z-10"
          style={{
            width: 8,
            height: 5,
            borderLeft: "1.5px solid #717893",
            borderBottom: "1.5px solid #717893",
            borderBottomLeftRadius: 5,
            transformOrigin: "100% 0%",
          }}
          animate={{
            left: isEn ? -18 : 14,
            bottom: "50%",
            translateY: 9,
            rotate: isEn ? -40 : 0,
          }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* Core circle */}
        <motion.div
          className="absolute rounded-full z-40 w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] top-1/2 -translate-y-1/2 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #2b2f42, #181a25)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.15)",
          }}
          animate={{ left: isEn ? 26 : 2 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        >
          {/* Spinning gear ring */}
          <motion.div
            className="absolute rounded-full w-[12px] h-[12px] sm:w-[14px] sm:h-[14px]"
            style={{
              border: `1px dashed ${isEn ? "#00bfff" : "#4b516b"}`,
              boxSizing: "border-box",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner colored dot */}
          <motion.div
            className="absolute rounded-full w-[6px] h-[6px] sm:w-[8px] sm:h-[8px]"
            style={{ border: "1px solid #1a1c28" }}
            animate={{
              backgroundColor: isEn ? "#00bfff" : "#FFD700",
              boxShadow: isEn
                ? "0 0 6px 1px rgba(0,191,255,0.5), inset 0 0.5px 2px rgba(255,255,255,0.8)"
                : "0 0 6px 1px rgba(255,215,0,0.5), inset 0 0.5px 2px rgba(255,255,255,0.8)",
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      {/* UA / EN labels */}
      <div className="flex items-center gap-0.5 text-[10px] sm:text-[11px]">
        <motion.span
          className="font-bold"
          animate={{ color: !isEn ? "#FFD700" : "#555568" }}
          transition={{ duration: 0.3 }}
        >
          UA
        </motion.span>
        <span className="text-[#2A2A38]">/</span>
        <motion.span
          className="font-bold"
          animate={{ color: isEn ? "#00bfff" : "#555568" }}
          transition={{ duration: 0.3 }}
        >
          EN
        </motion.span>
      </div>
    </button>
  );
}
