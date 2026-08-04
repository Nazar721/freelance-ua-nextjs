"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/LanguageContext";
import LanguageToggle from "@/components/ui/LanguageToggle";

const navKeys = ["nav.about", "nav.services", "nav.process", "nav.cases", "nav.testimonials", "nav.contacts"];
const navHrefs = ["#about", "#services", "#process", "#cases", "#testimonials", "#contacts"];
const sectionIds = ["about", "services", "process", "cases", "testimonials", "contacts"];

export default function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
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
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  const isActive = (href: string) => activeSection === href.slice(1);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "px-4 md:px-6 pt-3" : "px-4 md:px-6 pt-4"
      }`}
    >
      <div className={`mx-auto max-w-7xl py-3 px-5 flex items-center justify-between rounded-2xl transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/85 backdrop-blur-xl border border-[#2A2A38] shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
          : "bg-[#111118]/60 backdrop-blur-md border border-white/5"
      }`}>
        <div className="flex items-center gap-3">
          <Image
            src="/media/logo.jpg"
            alt="Freelance UA"
            width={40}
            height={40}
            className="rounded-lg"
            priority
          />
          <span className="font-bold text-[#F8F8FF] text-sm md:text-base leading-tight">
            Freelance UA<br />
            <span className="text-[#6366F1]">Digital Agency</span>
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-8">
          {navKeys.map((key, i) => {
            const active = isActive(navHrefs[i]);
            return (
              <button
                key={navHrefs[i]}
                onClick={() => handleNavClick(navHrefs[i])}
                className={`group relative cursor-pointer transition-colors duration-300 text-sm font-medium ${
                  active ? "text-[#F8F8FF]" : "text-[#8B8B9E] hover:text-[#F8F8FF]"
                }`}
              >
                {t(key)}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#6366F1] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            );
          })}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <div className="mr-2">
            <LanguageToggle />
          </div>
          <a
            href={siteConfig.telegram.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.36)]"
          >
            {t("header.write")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.47c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.948l-2.937-.918c-.638-.198-.65-.638.136-.943l11.47-4.42c.532-.194.998.13.633.582z"/>
            </svg>
          </a>
        </div>

        {/* Mobile burger */}
        <div className="xl:hidden flex items-center gap-2">
          <LanguageToggle />
          <button
            className="text-[#F8F8FF] p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
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
            className="xl:hidden mt-2 mx-1 bg-[#1A1A24]/95 backdrop-blur-xl border border-[#2A2A38]/80 rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.5)] overflow-hidden"
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
                        ? "text-[#F8F8FF] bg-[#6366F1]/15"
                        : "text-[#8B8B9E] hover:text-[#F8F8FF] hover:bg-white/5"
                    }`}
                  >
                    {t(key)}
                  </motion.button>
                );
              })}
              <div className="mt-2 px-1">
                <motion.a
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navKeys.length * 0.04 }}
                  href={siteConfig.telegram.consultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic-button flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-[0_0_24px_rgba(99,102,241,0.32)] text-sm"
                >
                  {t("header.write")}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.47c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.26 14.948l-2.937-.918c-.638-.198-.65-.638.136-.943l11.47-4.42c.532-.194.998.13.633.582z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
