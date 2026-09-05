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
  ExternalLink,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";

const resultItems = [
  "videoCases.maccoudiYoutube.result1",
  "videoCases.maccoudiYoutube.result2",
  "videoCases.maccoudiYoutube.result3",
  "videoCases.maccoudiYoutube.result4",
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

export default function MaccoudiYoutubePage() {
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
                {t("videoCases.maccoudiYoutube.category")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                <Play size={12} />
                YouTube
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("videoCases.maccoudiYoutube.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("videoCases.maccoudiYoutube.subtitle")}
            </p>
          </FadeIn>

          {/* Hero Video */}
          <div
            className="featured-case-card border border-border p-4 md:p-6 overflow-hidden"
            style={
              {
                borderRadius: "16px",
                "--case-glow": "rgba(34, 197, 94, 0.12)",
                "--case-glow-strong": "rgba(34, 197, 94, 0.25)",
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
              <div className="max-w-3xl mx-auto">
                <div
                  className="relative rounded-xl overflow-hidden bg-background aspect-video cursor-pointer group/thumb"
                  onClick={() => openFullscreen("/media/cases/maccoudi-youtube/video-1.mp4")}
                >
                  <video
                    src="/media/cases/maccoudi-youtube/video-1.mp4"
                    poster="/media/cases/maccoudi-youtube/poster-1.jpg"
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 group-hover/thumb:from-black/70 group-hover/thumb:via-black/20 group-hover/thumb:to-black/30 transition-all duration-300" />
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-border">
                      ~1хв
                    </span>
                    <span className="bg-green-500/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-green-500/30">
                      16:9
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 group-hover/thumb:bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center border border-white/20 group-hover/thumb:scale-110 group-hover/thumb:border-white/40 transition-all duration-300 shadow-lg shadow-black/20">
                      <Play size={26} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Second Video */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <div
              className="featured-case-card border border-border p-4 md:p-6 overflow-hidden"
              style={
                {
                  borderRadius: "16px",
                  "--case-glow": "rgba(34, 197, 94, 0.08)",
                  "--case-glow-strong": "rgba(34, 197, 94, 0.18)",
                } as React.CSSProperties
              }
            >
              <div className="max-w-3xl mx-auto">
                <div
                  className="relative rounded-xl overflow-hidden bg-background aspect-video cursor-pointer group/thumb"
                  onClick={() => openFullscreen("/media/cases/maccoudi-youtube/video-2.mp4")}
                >
                  <video
                    src="/media/cases/maccoudi-youtube/video-2.mp4"
                    poster="/media/cases/maccoudi-youtube/poster-2.jpg"
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 group-hover/thumb:from-black/70 group-hover/thumb:via-black/20 group-hover/thumb:to-black/30 transition-all duration-300" />
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-border">
                      ~52с
                    </span>
                    <span className="bg-green-500/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-green-500/30">
                      16:9
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 group-hover/thumb:bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center border border-white/20 group-hover/thumb:scale-110 group-hover/thumb:border-white/40 transition-all duration-300 shadow-lg shadow-black/20">
                      <Play size={26} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Client Profile */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <div className="featured-case-card overflow-hidden" style={{ borderRadius: "20px" }}>
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                  {t("videoCases.maccoudiYoutube.clientName")}
                </h2>
                <div className="mt-6 text-center">
                  <p className="text-green-500 font-semibold mb-2">
                    {t("videoCases.maccoudiYoutube.clientRole")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
                    {t("videoCases.maccoudiYoutube.clientDesc")}
                  </p>

                  {/* Channel Screenshots */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <a
                      href="https://www.youtube.com/@Maccoudii"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-xl overflow-hidden border border-border hover:border-red-500/40 transition-all duration-300"
                    >
                      <Image
                        src="/media/cases/maccoudi-youtube/youtube-channel.png"
                        alt="YouTube канал Маккоуді"
                        width={640}
                        height={360}
                        unoptimized
                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-red-500/90 backdrop-blur-md rounded-lg px-3 py-2 text-center border border-red-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-[11px] font-semibold tracking-wide flex items-center justify-center gap-2">
                            <ExternalLink size={14} />
                            {t("videoCases.maccoudiYoutube.clientYoutube")}
                          </span>
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://www.tiktok.com/@maccoudi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative rounded-xl overflow-hidden border border-border hover:border-foreground/30 transition-all duration-300"
                    >
                      <Image
                        src="/media/cases/maccoudi-youtube/tiktok-profile.png"
                        alt="TikTok профіль Маккоуді"
                        width={640}
                        height={360}
                        unoptimized
                        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="bg-foreground/80 backdrop-blur-md rounded-lg px-3 py-2 text-center border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-white text-[11px] font-semibold tracking-wide flex items-center justify-center gap-2">
                            <ExternalLink size={14} />
                            {t("videoCases.maccoudiYoutube.clientTiktok")}
                          </span>
                        </div>
                      </div>
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                      href="https://www.youtube.com/@Maccoudii"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:border-red-500/40 font-semibold px-5 py-3 rounded-xl transition-all duration-300"
                    >
                      <Play size={16} className="fill-red-500" />
                      {t("videoCases.maccoudiYoutube.clientYoutube")}
                      <ExternalLink size={14} />
                    </a>
                    <a
                      href="https://www.tiktok.com/@maccoudi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-foreground/5 border border-border text-foreground hover:bg-foreground/10 hover:border-foreground/30 font-semibold px-5 py-3 rounded-xl transition-all duration-300"
                    >
                      <span className="text-lg">♪</span>
                      {t("videoCases.maccoudiYoutube.clientTiktok")}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
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
                <AlertTriangle size={20} className="text-amber-500 shrink-0" />
                {t("videoCases.maccoudiYoutube.challengeTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("videoCases.maccoudiYoutube.challenge")}
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
                {t("videoCases.maccoudiYoutube.solutionTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("videoCases.maccoudiYoutube.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(34, 197, 94, 0.15)" side="both" />
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

      {/* Review */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoCases.maccoudiYoutube.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card overflow-hidden" style={{ borderRadius: "20px" }}>
              <div className="relative overflow-hidden flex justify-center bg-background p-4">
                <div className="relative rounded-xl overflow-hidden max-w-[360px]">
                  <Image
                    src="/media/cases/maccoudi-youtube/review-chat.png"
                    alt="Відгук Маккоуді в Telegram"
                    width={720}
                    height={400}
                    unoptimized
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="p-8 md:p-10 text-center">
                <Quote size={28} className="text-green-500 mx-auto mb-4 opacity-50" />
                <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                  &ldquo;{t("videoCases.maccoudiYoutube.reviewText")}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-border">
                  <ReviewAvatar name={t("videoCases.maccoudiYoutube.reviewAuthor")} />
                  <p className="text-green-500 font-semibold">
                    {t("videoCases.maccoudiYoutube.reviewAuthor")}
                  </p>
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
            {t("videoCases.maccoudiYoutube.teamMember")}
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
              className="magnetic-button inline-flex items-center gap-2 border border-border text-green-500 hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400 font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,197,94,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="maccoudi-youtube" section="video" />

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
