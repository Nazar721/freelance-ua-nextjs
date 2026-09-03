"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Quote,
  Check,
  AlertTriangle,
  Lightbulb,
  Play,
  X,
} from "lucide-react";

import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";

const resultItems = [
  "videoCases.cuprusLife.result1",
  "videoCases.cuprusLife.result2",
  "videoCases.cuprusLife.result3",
  "videoCases.cuprusLife.result4",
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function CuprusLifePage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const [fullscreenVideo, setFullscreenVideo] = useState<string | null>(null);

  const openFullscreen = useCallback((src: string) => {
    setFullscreenVideo(src);
  }, []);

  const closeFullscreen = useCallback(() => {
    setFullscreenVideo(null);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const mockupScale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const mockupY = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  const mockupRotateX = useTransform(scrollYProgress, [0, 0.5], [12, 0]);

  return (
    <article className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/cases?tab=video"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          {t("videoCases.backToList")}
        </Link>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="py-8 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                {t("videoCases.cuprusLife.category")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EAB308] bg-[#EAB308]/10 px-3 py-1 rounded-full border border-[#EAB308]/20">
                <Play size={12} />
                Reels
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("videoCases.cuprusLife.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("videoCases.cuprusLife.subtitle")}
            </p>
          </FadeIn>

          {/* Video Mockup — 3 reels stacked vertically */}
          <div
            className="featured-case-card border border-border p-4 md:p-6 overflow-hidden"
            style={
              {
                borderRadius: "16px",
                "--case-glow": "rgba(234, 179, 8, 0.12)",
                "--case-glow-strong": "rgba(234, 179, 8, 0.25)",
              } as React.CSSProperties
            }
          >
            <motion.div
              style={{
                scale: mockupScale,
                y: mockupY,
                opacity: mockupOpacity,
                rotateX: mockupRotateX,
                perspective: 1200,
                transformOrigin: "center center",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {[
                  { src: "/media/cases/cuprus-life/reel-1.mp4", preview: "/media/cases/cuprus-life/preview-1.jpg", duration: "~33с", title: "Reels 1" },
                  { src: "/media/cases/cuprus-life/reel-2.mp4", preview: "/media/cases/cuprus-life/preview-2.jpg", duration: "~39с", title: "Reels 2" },
                  { src: "/media/cases/cuprus-life/reel-3.mp4", preview: "/media/cases/cuprus-life/preview-3.jpg", duration: "~45с", title: "Reels 3" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <div
                      className="relative rounded-xl overflow-hidden bg-background cursor-pointer group/thumb"
                      onClick={() => openFullscreen(item.src)}
                    >
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        style={{ aspectRatio: "9/16", maxHeight: "560px" }}
                        muted
                        preload="metadata"
                        poster={item.preview}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 group-hover/thumb:from-black/70 group-hover/thumb:via-black/20 group-hover/thumb:to-black/30 transition-all duration-300" />
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-border">
                          {item.duration}
                        </span>
                        <span className="bg-[#EAB308]/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-[#EAB308]/30">
                          9:16
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/10 group-hover/thumb:bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center border border-white/20 group-hover/thumb:scale-110 group-hover/thumb:border-white/40 transition-all duration-300 shadow-lg shadow-black/20">
                          <Play size={26} className="text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-muted-foreground text-sm">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brief */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-surface-elevated/40 border border-red-500/25 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)] hover:border-red-500/50"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-4">
                <AlertTriangle size={20} className="text-red-500 shrink-0" />
                {t("videoCases.cuprusLife.challengeTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("videoCases.cuprusLife.challenge")}
              </p>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-surface-elevated/40 border border-green-500/25 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] hover:border-green-500/50"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-4">
                <Lightbulb size={20} className="text-green-500 shrink-0" />
                {t("videoCases.cuprusLife.solutionTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("videoCases.cuprusLife.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(234, 179, 8, 0.15)" side="both" />
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("itCases.results")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resultItems.map((r, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08} y={20} blur={4}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-elevated/50 border border-border">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{t(r)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof — Screenshot Review */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoCases.cuprusLife.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card overflow-hidden max-w-lg mx-auto" style={{ borderRadius: "20px" }}>
              <div className="p-4">
                <Image
                  src="/media/cases/cuprus-life/screenshot.webp"
                  alt="Відгук Cuprus Life"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
              <div className="px-6 pb-6 md:px-8 md:pb-8 text-center">
                <Quote size={24} className="text-primary mx-auto mb-3 opacity-50" />
                <p className="text-foreground text-base md:text-lg italic leading-relaxed mb-4">
                  &ldquo;Дуже задоволені результатом! Відео вийшли саме такими, як ми собі уявляли. Дякуємо за швидкість та якість роботи!&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-border">
                  <ReviewAvatar name="Alina" />
                  <p className="text-primary font-semibold text-sm">{t("videoCases.cuprusLife.reviewAuthor")}</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground/60 mb-1">
            {t("videoCases.projectTeam")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("videoCases.cuprusLife.teamMember")}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("itCases.nextStep")}
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              {t("itCases.nextStepDesc")}
            </p>
            <a
              href="https://t.me/freelance_ua"
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button inline-flex items-center gap-2 border border-border text-primary hover:border-[#6366F1]/50 hover:bg-primary/10 hover:text-indigo-400 font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="cuprus-life" section="video" />

      {/* Fullscreen Video Modal */}
      {fullscreenVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <video
            src={fullscreenVideo}
            className="w-full h-full max-w-4xl max-h-[90vh] object-contain rounded-xl"
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </article>
  );
}
