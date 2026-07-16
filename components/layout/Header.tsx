"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useTranslation } from "@/lib/LanguageContext";

const navKeys = ["nav.about", "nav.services", "nav.cases", "nav.process", "nav.contacts"];
const navHrefs = ["#about", "#services", "#cases", "#process", "#contacts"];

export default function Header() {
  const { locale, setLocale, t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
  };

  const toggleLocale = () => {
    setLocale(locale === "uk" ? "en" : "uk");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? `bg-[#0A0A0F]/88 ${isMobile ? "" : "backdrop-blur-xl"} border-b border-[#2A2A38] shadow-[0_18px_60px_rgba(0,0,0,0.24)]`
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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
        <nav className="hidden lg:flex items-center gap-8">
          {navKeys.map((key, i) => (
            <button
              key={navHrefs[i]}
              onClick={() => handleNavClick(navHrefs[i])}
              className="group relative cursor-pointer text-[#8B8B9E] hover:text-[#F8F8FF] transition-colors duration-300 text-sm font-medium"
            >
              {t(key)}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#6366F1] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {/* Language switcher — premium animated pill */}
          <button
            onClick={toggleLocale}
            className="group relative flex items-center h-10 w-[76px] rounded-full border border-[#2A2A38] hover:border-[#6366F1]/60 transition-all duration-500 overflow-hidden bg-[#111118]/80 backdrop-blur-sm"
            aria-label={locale === "uk" ? "Switch to English" : "Переключити на українську"}
            style={{ perspective: 600 }}
          >
            {/* Glow background on hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.12),transparent_70%)]" />

            {/* Sliding active indicator */}
            <motion.span
              className="absolute top-1 bottom-1 w-[34px] rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 100%)",
                boxShadow: "0 0 20px rgba(99,102,241,0.2), inset 0 0 0 1px rgba(99,102,241,0.2)",
              }}
              animate={{ x: locale === "uk" ? 3 : 39 }}
              transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.8 }}
            />

            {/* UA label */}
            <motion.span
              className="relative z-10 w-[38px] text-center text-xs font-bold tracking-wide"
              animate={{
                color: locale === "uk" ? "#F8F8FF" : "#555568",
                rotateY: locale === "uk" ? 0 : -8,
                scale: locale === "uk" ? 1 : 0.9,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              UA
            </motion.span>

            {/* EN label */}
            <motion.span
              className="relative z-10 w-[38px] text-center text-xs font-bold tracking-wide"
              animate={{
                color: locale === "en" ? "#F8F8FF" : "#555568",
                rotateY: locale === "en" ? 0 : 8,
                scale: locale === "en" ? 1 : 0.9,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              EN
            </motion.span>

            {/* Subtle shine sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
          </button>
          <a
            href={siteConfig.partnerProgramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.36)]"
          >
            {t("header.partner")}
          </a>
          <a
            href={siteConfig.telegram.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.36)]"
          >
            {t("header.write")}
          </a>
        </div>

        {/* Mobile burger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="group relative flex items-center h-8 w-[60px] rounded-full border border-[#2A2A38] hover:border-[#6366F1]/60 transition-all duration-500 overflow-hidden bg-[#111118]/80 backdrop-blur-sm"
            aria-label={locale === "uk" ? "Switch to English" : "Переключити на українську"}
          >
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.12),transparent_70%)]" />
            <motion.span
              className="absolute top-0.5 bottom-0.5 w-[28px] rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(99,102,241,0.25) 0%, rgba(139,92,246,0.15) 100%)",
                boxShadow: "0 0 14px rgba(99,102,241,0.2), inset 0 0 0 1px rgba(99,102,241,0.2)",
              }}
              animate={{ x: locale === "uk" ? 2 : 30 }}
              transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.8 }}
            />
            <motion.span
              className="relative z-10 w-[30px] text-center text-[10px] font-bold tracking-wide"
              animate={{
                color: locale === "uk" ? "#F8F8FF" : "#555568",
                scale: locale === "uk" ? 1 : 0.9,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              UA
            </motion.span>
            <motion.span
              className="relative z-10 w-[30px] text-center text-[10px] font-bold tracking-wide"
              animate={{
                color: locale === "en" ? "#F8F8FF" : "#555568",
                scale: locale === "en" ? 1 : 0.9,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              EN
            </motion.span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />
          </button>
          <button
            className="text-[#F8F8FF] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#111118] border-t border-[#2A2A38]"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {navKeys.map((key, i) => (
                <motion.button
                  key={navHrefs[i]}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(navHrefs[i])}
                  className="cursor-pointer text-[#8B8B9E] hover:text-[#F8F8FF] transition-colors text-left text-base font-medium py-2"
                >
                  {t(key)}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navKeys.length * 0.05 }}
                href={siteConfig.partnerProgramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button mt-2 text-center bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-4 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.32)]"
              >
                {t("header.partner")}
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navKeys.length * 0.05 + 0.05 }}
                href={siteConfig.telegram.consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button text-center bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-4 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.32)]"
              >
                {t("header.write")}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
