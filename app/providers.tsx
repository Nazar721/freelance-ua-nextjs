"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();
  const isPopState = useRef(false);
  const isFirstRoute = useRef(true);
  const prevPathname = useRef<string | null>(null);
  /* last known scroll offset per route, used to restore position on back/forward
     (App Router's own restoration is defeated by Lenis in this setup) */
  const scrollPositions = useRef<Record<string, number>>({});

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

  /* App Router preserves the previous page's scroll offset on soft navigation
     between routes sharing this layout — so landing on a page that used to be
     scrolled down (e.g. the "Стати партнером" CTA at the bottom of the home
     page) dumps you at the end of the new page. Reset to top on every route
     change; back/forward restores the position saved for that route instead. */
  useEffect(() => {
    const onPop = () => {
      isPopState.current = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    /* App Router keeps the previous page's scroll offset while the new route
       mounts. Landing on /partners from a deep position (the "Стати партнером"
       CTA at the bottom of the home page) would otherwise dump the user at the
       end of the new page and fire every ScrollTrigger entrance animation during
       the swap — leaving the page pre-played & static. We force the scroll back
       to the top on every soft route change; back/forward restores the saved
       position for that route instead. */
    // Remember where the previous page left off (before it gets reset below),
    // so back/forward can restore it.
    if (prevPathname.current !== null) {
      scrollPositions.current[prevPathname.current] = window.scrollY;
    }
    prevPathname.current = pathname;

    const timer = setTimeout(() => {
      if (isFirstRoute.current) {
        isFirstRoute.current = false;
        return;
      }

      const hash = window.location.hash;
      if (hash.length > 1) {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -120 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }
      }

      if (isPopState.current) {
        isPopState.current = false;
        const saved = scrollPositions.current[pathname];
        if (typeof saved === "number") {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(saved, { immediate: true });
          } else {
            window.scrollTo(0, saved);
          }
        }
        return;
      }

      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

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