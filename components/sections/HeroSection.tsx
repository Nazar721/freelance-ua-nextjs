"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import CountUp from "@/components/ui/CountUp";
import { useTranslation } from "@/lib/LanguageContext";

const heroWords = ["hero.word1", "hero.word2"];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const wordReveal = {
  hidden: { opacity: 0, y: 40, rotateX: -40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const wordRevealMobile = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 3,
  duration: 4 + Math.random() * 6,
  delay: Math.random() * 4,
}));

export default function HeroSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.innerWidth <= 768);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-20 pb-4"
    >
      {/* Parallax background layers */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yBg, scale: scaleBg }}
      >
        <div className="hero-ambient absolute inset-0 opacity-80" />
        <div className="luxury-grid absolute inset-0 opacity-70" />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-linear-to-t from-[#0A0A0F] to-transparent z-[1]" />

      {/* Floating particles — disabled on mobile for performance */}
      {!shouldReduceMotion && !isMobile && (
        <div className="absolute inset-0 pointer-events-none z-[1]">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-[#6366F1]"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.5, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 text-center"
        style={{ y: yContent, opacity: opacityBg }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={`inline-flex items-center gap-2 bg-[#1A1A24]/80 border border-[#2A2A38]/80 rounded-full px-4 py-2 mb-5 sm:mb-5 text-xs sm:text-sm text-[#8B8B9E] shadow-[0_0_60px_rgba(99,102,241,0.1)] ${isMobile ? "" : "backdrop-blur-xl"} float`}>
            <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-[#6366F1]/15">
              <Zap size={10} className="text-[#6366F1]" />
            </span>
            {t("hero.badge")}
          </div>
        </motion.div>

        {/* Main headline with staggered word reveal */}
        <motion.h1
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="text-[32px] sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-3 sm:mb-4 font-[family-name:var(--font-syne)]"
          style={isMobile ? undefined : { perspective: 800 }}
        >
          <span className="flex flex-wrap sm:flex-wrap justify-center gap-x-[0.3em] whitespace-nowrap sm:whitespace-normal" style={isMobile ? undefined : { transformStyle: "preserve-3d" }}>
            {heroWords.map((key) => (
              <motion.span
                key={key}
                variants={isMobile ? wordRevealMobile : wordReveal}
                className="text-[#F8F8FF] inline-block"
              >
                {t(key)}
              </motion.span>
            ))}
          </span>
          <motion.span
            initial={{ opacity: 0, y: isMobile ? 16 : 30, scale: isMobile ? 1 : 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: isMobile ? 0.4 : 1, delay: isMobile ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="gradient-text-motion bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent block -mt-1 sm:-mt-2"
          >
            {t("hero.partner")}
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[16px] sm:text-lg md:text-xl text-[#8B8B9E] max-w-xl sm:max-w-2xl mx-auto mb-4 sm:mb-8 leading-relaxed px-1"
        >
          {t("hero.desc")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-2"
        >
          <motion.a
            href={siteConfig.telegram.consultationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-button inline-flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_48px_rgba(99,102,241,0.46)] text-sm sm:text-base"
            whileHover={isMobile ? undefined : { scale: 1.05 }}
            whileTap={isMobile ? undefined : { scale: 0.97 }}
          >
            {t("hero.cta.start")}
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </motion.a>
          <motion.a
            href={siteConfig.telegram.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`magnetic-button inline-flex items-center justify-center gap-2 bg-[#111118]/50 border border-[#2A2A38] hover:border-[#6366F1] text-[#F8F8FF] font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_34px_rgba(99,102,241,0.16)] text-sm sm:text-base ${isMobile ? "" : "backdrop-blur-md"}`}
            whileHover={isMobile ? undefined : { scale: 1.05 }}
            whileTap={isMobile ? undefined : { scale: 0.97 }}
          >
            {t("hero.cta.portfolio")}
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mt-5 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-3 sm:mt-12 max-w-lg mx-auto px-2"
        >
          {[
            { value: 100, suffix: "+", label: t("hero.stat.projects") },
            { value: 100, suffix: "%", label: t("hero.stat.clients") },
            { value: 3, suffix: "", label: t("hero.stat.years") },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.2 + i * 0.1 },
                },
              }}
              className={`glass-stat rounded-lg px-2 py-2.5 sm:rounded-2xl sm:px-5 sm:py-4`}
            >
              <div className="text-xl sm:text-2xl font-bold text-[#6366F1] sm:text-3xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-0.5 sm:mt-1 text-[10px] sm:text-[11px] leading-tight text-[#8B8B9E] sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
