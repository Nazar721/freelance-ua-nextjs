"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={theme === "dark" ? "Перемкнути на світлу тему" : "Перемкнути на темну тему"}
      className="theme-toggle relative flex-shrink-0 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-border/40 bg-card/70 backdrop-blur-md cursor-pointer transition-colors duration-300 hover:border-accent/40 shadow-sm"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center"
        >
          {theme === "dark" ? <Moon size={16} className="text-foreground" /> : <Sun size={16} className="text-foreground" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
