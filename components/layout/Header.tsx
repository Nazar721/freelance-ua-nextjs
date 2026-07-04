"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";

const navItems = [
  { label: "Про нас", href: "#about" },
  { label: "Послуги", href: "#services" },
  { label: "Кейси", href: "#cases" },
  { label: "Як працюємо", href: "#process" },
  { label: "Контакти", href: "#contacts" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 320); // wait for mobile menu close animation (300ms)
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/88 backdrop-blur-xl border-b border-[#2A2A38] shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
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
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
            className="group relative cursor-pointer text-[#8B8B9E] hover:text-[#F8F8FF] transition-colors duration-300 text-sm font-medium"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#6366F1] transition-all duration-300 group-hover:w-full" />
          </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={siteConfig.partnerProgramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.36)]"
          >
            Партнерка
          </a>
          <a
            href={siteConfig.telegram.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button flex items-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold px-4 py-2 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.36)]"
          >
            Написати в Telegram
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden text-[#F8F8FF] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className="cursor-pointer text-[#8B8B9E] hover:text-[#F8F8FF] transition-colors text-left text-base font-medium py-2"
                >
                  {item.label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                href={siteConfig.partnerProgramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button mt-2 text-center bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-4 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.32)]"
              >
                Партнерка
              </motion.a>
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.05 }}
                href={siteConfig.telegram.consultationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button text-center bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-4 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.32)]"
              >
                Написати в Telegram
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
