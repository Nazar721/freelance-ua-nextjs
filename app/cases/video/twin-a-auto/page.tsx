"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Play, Quote, X } from "lucide-react";
import CaseChallengeSolution from "@/components/case/CaseChallengeSolution";
import CaseCTA from "@/components/case/CaseCTA";
import CaseDeveloper from "@/components/case/CaseDeveloper";
import CaseResults from "@/components/case/CaseResults";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";
import { FadeIn } from "@/components/ui/FadeIn";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";

const videoSrc = "/media/cases/twin-a-auto/hero.mp4";
const resultItems = [
  "videoCases.twinAAuto.result1",
  "videoCases.twinAAuto.result2",
  "videoCases.twinAAuto.result3",
  "videoCases.twinAAuto.result4",
];

function InstagramIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function TwinAAutoPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const openFullscreen = useCallback(() => setIsFullscreen(true), []);
  const closeFullscreen = useCallback(() => setIsFullscreen(false), []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const videoScale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);
  const videoY = useTransform(scrollYProgress, [0, 0.5], [120, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2], [0.3, 1]);
  const videoRotateX = useTransform(scrollYProgress, [0, 0.5], [12, 0]);

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

      <section ref={heroRef} className="py-8 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                {t("videoCases.twinAAuto.category")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-500 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                <InstagramIcon />
                Instagram Reels
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("videoCases.twinAAuto.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("videoCases.twinAAuto.subtitle")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border p-4 md:p-6 overflow-hidden"
            style={{
              borderRadius: "16px",
              "--case-glow": "rgba(6, 182, 212, 0.12)",
              "--case-glow-strong": "rgba(6, 182, 212, 0.25)",
            } as React.CSSProperties}
          >
            <motion.div
              style={{
                scale: videoScale,
                y: videoY,
                opacity: videoOpacity,
                rotateX: videoRotateX,
                perspective: 1200,
                transformOrigin: "center center",
              }}
            >
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={openFullscreen}
                  aria-label={t("videoCases.twinAAuto.title")}
                  className="relative rounded-xl overflow-hidden bg-background cursor-pointer group/thumb aspect-[9/16] max-h-[560px] text-left"
                >
                  <video
                    src={`${videoSrc}#t=0.2`}
                    poster="/media/cases/twin-a-auto/hero-poster.jpg"
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                    playsInline
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 group-hover/thumb:from-black/70 group-hover/thumb:via-black/20 group-hover/thumb:to-black/30 transition-all duration-300" />
                  <span className="absolute top-3 right-3 flex gap-1.5">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/10">
                      ~46с
                    </span>
                    <span className="bg-cyan-500/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-cyan-400/30">
                      9:16
                    </span>
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/10 group-hover/thumb:bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center border border-white/20 group-hover/thumb:scale-110 transition-all duration-300 shadow-lg shadow-black/20">
                      <Play size={26} className="text-white fill-white ml-1" />
                    </span>
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CaseChallengeSolution
        challengeTitle={t("videoCases.twinAAuto.challengeTitle")}
        challengeText={t("videoCases.twinAAuto.challenge")}
        solutionTitle={t("videoCases.twinAAuto.solutionTitle")}
        solutionText={t("videoCases.twinAAuto.solution")}
      />
      <CaseResults results={resultItems} />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoCases.twinAAuto.reviewTitle")}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card overflow-hidden" style={{ borderRadius: "20px" }}>
              <div className="p-8 md:p-10 text-center">
                <Quote size={28} className="text-cyan-500 mx-auto mb-4 opacity-50" />
                <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                  &ldquo;{t("videoCases.twinAAuto.reviewText")}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-border">
                  <ReviewAvatar name={t("videoCases.twinAAuto.reviewAuthor")} />
                  <p className="text-cyan-500 font-semibold">
                    {t("videoCases.twinAAuto.reviewAuthor")}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <CaseDeveloper labelKey="videoCases.projectTeam" nameKey="videoCases.twinAAuto.teamMember" />
      <CaseCTA />
      <RelatedProjectsSection currentSlug="twin-a-auto" section="video" />

      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            type="button"
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <video
            src={videoSrc}
            className="w-full h-full max-w-4xl max-h-[90vh] object-contain rounded-xl"
            controls
            autoPlay
            playsInline
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </article>
  );
}
