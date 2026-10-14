"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { alignAnchorWhileSettling, scrollToId } from "@/lib/scroll-to-hash";

const navKeys = ["nav.about", "nav.services", "nav.process", "nav.cases", "nav.testimonials", "nav.contacts"];
const navHrefs = ["#about", "#services", "#process", "#cases", "#testimonials", "#contacts"];
const sectionIds = ["about", "services", "process", "cases", "testimonials", "contacts"];
/* Every nav item maps 1:1 to a real DOM id on the home page (`#<id>`):
   about → WhyUsSection, services → ServicesSection, process → HowWeWorkSection,
   cases → ItCasesSection, testimonials → TestimonialsSection,
   contacts → the <footer id="contacts"> that Footer renders on every page. */

// Maps a subpage route to the homepage nav section it belongs to.
// Returns null when a route has no matching section, so nothing gets highlighted
// instead of falsely highlighting the first one.
function routeToSection(pathname: string): string | null {
  const p = pathname === "/en" || pathname.startsWith("/en/") ? pathname.slice(3) || "/" : pathname;
  if (p === "/cases" || p.startsWith("/cases/")) return "cases";
  if (p === "/services" || p.startsWith("/services/")) return "services";
  return null;
}

export default function Header() {
  const { t, locale } = useTranslation();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollSection, setScrollSection] = useState("about");
  /* cancels the "section stays below the fixed header while the page settles"
     loop started by a nav click on the home page */
  const cancelNavSettle = useRef<(() => void) | null>(null);

  useEffect(() => () => cancelNavSettle.current?.(), []);

  // Language prefix for internal links: "" for Ukrainian, "/en" for English.
  const lp = locale === "en" ? "/en" : "";
  const isHomePage = pathname === "/" || pathname === "/en";

  // On the homepage the active section follows scroll position;
  // on subpages it is derived from the route.
  const activeSection = isHomePage ? scrollSection : routeToSection(pathname);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Intersection Observer for active section tracking (homepage only)
  useEffect(() => {
    if (!isHomePage) return;

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setScrollSection(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [isHomePage]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    // On the homepage: scroll straight to the section, keeping it below the
    // fixed header (the same offset rule the #hash handler uses).
    if (isHomePage) {
      const id = href.slice(1);
      if (!document.getElementById(id)) return;
      cancelNavSettle.current?.();
      scrollToId(id, { smooth: true });
      cancelNavSettle.current = alignAnchorWhileSettling(id, { immediateStart: false });
      return;
    }
    // On a subpage: navigate to the localized home and land directly on the
    // section (the Providers hash handler reads the #hash for us).
    router.push(`${lp}/#${href.slice(1)}`);
  };

  const isActive = (href: string) => activeSection === href.slice(1);

  return (
    <header
      className="fixed top-3 left-3 right-3 z-50 md:top-4 md:left-4 md:right-4"
    >
      <div className={`glass-header mx-auto max-w-[1400px] gap-6 py-3 px-5 flex items-center justify-between rounded-full transition-all duration-300 ${
        scrolled ? "glass-header-scrolled" : ""
      }`}>
        <Link href={lp || "/"} className="flex items-center gap-3">
          <Image
            src="/media/logo.jpg"
            alt="Freelance UA"
            width={32}
            height={32}
            className="rounded-lg shrink-0"
            priority
          />
          <span className="font-bold text-foreground text-sm md:text-base leading-tight">
            <span className="block whitespace-nowrap">Freelance UA</span>
            <span className="block whitespace-nowrap text-accent">Digital Agency</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-8 lg:gap-6">
          {navKeys.map((key, i) => {
            const active = isActive(navHrefs[i]);
            return (
              <button
                key={navHrefs[i]}
                onClick={() => handleNavClick(navHrefs[i])}
                className={`group relative cursor-pointer transition-colors duration-200 text-sm font-medium whitespace-nowrap ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(key)}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-200 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            );
          })}
          <Link
            href={`${lp}/partners`}
            className={`group relative transition-colors duration-200 text-sm font-medium whitespace-nowrap ${
              pathname === `${lp}/partners` ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("header.partner")}
            <span
              className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-200 ${
                pathname === `${lp}/partners` ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
        </nav>

        <div className="hidden xl:flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle />
          <div className="w-px h-6 bg-border mx-1" />
          <a
            href={siteConfig.telegram.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button flex items-center gap-2 bg-accent hover:bg-accent-hover text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200 hover:shadow-[0_0_30px_rgba(99,102,241,0.36)] whitespace-nowrap"
          >
            {t("header.write")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.47c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.948l-2.937-.918c-.638-.198-.65-.638.136-.943l11.47-4.42c.532-.194.998.13.633.582z"/>
            </svg>
          </a>
        </div>

        {/* Mobile burger */}
        <div className="xl:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-foreground p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden mt-2 mx-1 bg-surface-elevated/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="p-3">
              {navKeys.map((key, i) => {
                const active = isActive(navHrefs[i]);
                return (
                  <motion.button
                    key={navHrefs[i]}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                    onClick={() => handleNavClick(navHrefs[i])}
                    className={`cursor-pointer w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? "text-foreground bg-accent/15"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                    }`}
                  >
                    {t(key)}
                  </motion.button>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navKeys.length * 0.04, duration: 0.25 }}
              >
                <Link
                  href={`${lp}/partners`}
                  onClick={() => setMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    pathname === `${lp}/partners`
                      ? "text-foreground bg-accent/15"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                >
                  {t("header.partner")}
                </Link>
              </motion.div>
              <div className="mt-2 px-1">
                <motion.a
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navKeys.length * 0.04 }}
                  href={siteConfig.telegram.consultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-button flex items-center justify-center gap-2 bg-accent text-primary-foreground font-semibold px-4 py-2.5 rounded-xl text-sm active:opacity-80"
                >
                  {t("header.write")}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.47c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.948l-2.937-.918c-.638-.198-.65-.638.136-.943l11.47-4.42c.532-.194.998.13.633.582z"/>
                  </svg>
                </motion.a>
              </div>

              {/* Language switch — lives in the burger menu on mobile to keep the bar uncluttered */}
              <div
                className="mt-3 pt-3 border-t border-border/60 flex justify-center"
                onClick={() => setMenuOpen(false)}
              >
                <LanguageToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
