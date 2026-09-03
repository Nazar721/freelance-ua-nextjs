"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
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
  "videoCases.motionReels.result1",
  "videoCases.motionReels.result2",
  "videoCases.motionReels.result3",
  "videoCases.motionReels.result4",
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

export default function MotionReelsPage() {
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
                {t("videoCases.motionReels.category")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("videoCases.motionReels.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("videoCases.motionReels.subtitle")}
            </p>
          </FadeIn>

          {/* Hero Videos — 2 side by side */}
          <div
            className="featured-case-card border border-border p-4 md:p-6 overflow-hidden"
            style={
              {
                borderRadius: "16px",
                "--case-glow": "rgba(236, 72, 153, 0.12)",
                "--case-glow-strong": "rgba(236, 72, 153, 0.25)",
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
              <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                {/* Video 1 */}
                <div
                  className="relative rounded-xl overflow-hidden bg-background aspect-[9/16] max-h-[560px] cursor-pointer group/thumb"
                  onClick={() => openFullscreen("/media/cases/motion-reels/hero.mp4")}
                >
                  <video
                    src="/media/cases/motion-reels/hero.mp4"
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 group-hover/thumb:from-black/70 group-hover/thumb:via-black/20 group-hover/thumb:to-black/30 transition-all duration-300" />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-border">
                      ~40с
                    </span>
                    <span className="bg-[#EC4899]/80 backdrop-blur-md text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-[#EC4899]/30">
                      9:16
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 group-hover/thumb:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center border border-white/20 group-hover/thumb:scale-110 group-hover/thumb:border-white/40 transition-all duration-300 shadow-lg shadow-black/20">
                      <Play size={18} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Video 2 */}
                <div
                  className="relative rounded-xl overflow-hidden bg-background aspect-[9/16] max-h-[560px] cursor-pointer group/thumb"
                  onClick={() => openFullscreen("/media/cases/motion-reels/video2.mp4")}
                >
                  <video
                    src="/media/cases/motion-reels/video2.mp4"
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 group-hover/thumb:from-black/70 group-hover/thumb:via-black/20 group-hover/thumb:to-black/30 transition-all duration-300" />
                  <div className="absolute top-2 right-2 flex gap-1.5">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-border">
                      ~41с
                    </span>
                    <span className="bg-[#EC4899]/80 backdrop-blur-md text-white text-[9px] font-medium px-1.5 py-0.5 rounded-full border border-[#EC4899]/30">
                      9:16
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 group-hover/thumb:bg-white/20 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center border border-white/20 group-hover/thumb:scale-110 group-hover/thumb:border-white/40 transition-all duration-300 shadow-lg shadow-black/20">
                      <Play size={18} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
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
                <AlertTriangle size={20} className="text-[#EC4899] shrink-0" />
                {t("videoCases.motionReels.challengeTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("videoCases.motionReels.challenge")}
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
                {t("videoCases.motionReels.solutionTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("videoCases.motionReels.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(236, 72, 153, 0.15)" side="both" />
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

      {/* Reviews */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoCases.motionReels.reviewTitle")}
            </h2>
          </FadeIn>

          {/* Text review */}
          <FadeIn delay={0.2} y={30} blur={6}>
            <div className="featured-case-card overflow-hidden mt-6" style={{ borderRadius: "20px" }}>
              <div className="p-8 md:p-10 text-center">
                <Quote size={28} className="text-[#EC4899] mx-auto mb-4 opacity-50" />
                <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                  &ldquo;{t("videoCases.motionReels.reviewText")}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-border">
                  <ReviewAvatar name={t("videoCases.motionReels.reviewAuthor")} />
                  <p className="text-[#EC4899] font-semibold">{t("videoCases.motionReels.reviewAuthor")}</p>
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
            {t("videoCases.motionReels.teamMember")}
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
              className="magnetic-button inline-flex items-center gap-2 border border-border text-[#EC4899] hover:border-[#EC4899]/50 hover:bg-[#EC4899]/10 hover:text-[#F472B6] font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(236,72,153,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="motion-reels" section="video" />

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
