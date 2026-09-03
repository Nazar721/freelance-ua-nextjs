"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LanguageProvider } from "@/lib/LanguageContext";
import { type Locale } from "@/lib/i18n";
import { ThemeProvider, type Theme } from "@/lib/ThemeContext";
import { siteConfig } from "@/config/site";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Providers({
  children,
  initialLocale,
  initialTheme,
}: {
  children: ReactNode;
  initialLocale?: Locale;
  initialTheme?: Theme;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [hideTelegramBtn, setHideTelegramBtn] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    lenisRef.current = new Lenis({
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      lerp: 0.1,
    });

    if (typeof window !== "undefined") {
      (window as unknown as Record<string, unknown>).__lenis = lenisRef.current;
    }

    lenisRef.current.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      if (typeof window !== "undefined") {
        delete (window as unknown as Record<string, unknown>).__lenis;
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideTelegramBtn(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    const servicesEl = document.getElementById("services");
    if (servicesEl) observer.observe(servicesEl);

    return () => observer.disconnect();
  }, []);

  return (
    <ThemeProvider initialTheme={initialTheme}>
      <LanguageProvider initialLocale={initialLocale}>
      {children}
      <a
        href={siteConfig.telegram.consultationUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#6366F1] text-white font-semibold px-5 py-3 rounded-full shadow-lg transition-all duration-500 hover:bg-[#4F46E5]"
        style={{
          opacity: hideTelegramBtn ? 0 : 1,
          pointerEvents: hideTelegramBtn ? "none" : "auto",
          transform: hideTelegramBtn ? "translateY(20px) scale(0.9)" : "translateY(0) scale(1)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.47c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.948l-2.937-.918c-.638-.198-.65-.638.136-.943l11.47-4.42c.532-.194.998.13.633.582z"/>
        </svg>
        Написати в Telegram
      </a>
    </LanguageProvider>
    </ThemeProvider>
  );
}