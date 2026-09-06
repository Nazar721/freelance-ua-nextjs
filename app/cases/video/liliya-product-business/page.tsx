"use client";

import { useRef } from "react";
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
  ExternalLink,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";

const resultItems = [
  "videoCases.liliyaProductBusiness.result1",
  "videoCases.liliyaProductBusiness.result2",
  "videoCases.liliyaProductBusiness.result3",
  "videoCases.liliyaProductBusiness.result4",
];

const screenshots = [
  { src: "/media/cases/liliya-product-business/screen-1.jpg", alt: "Ліля — крупний план" },
  { src: "/media/cases/liliya-product-business/screen-2.jpg", alt: "Ліля — крупний план (варіант)" },
  { src: "/media/cases/liliya-product-business/screen-3.jpg", alt: "Ліля за столом з MacBook" },
  { src: "/media/cases/liliya-product-business/screen-4.jpg", alt: "Ліля — субтитри" },
  { src: "/media/cases/liliya-product-business/screen-5.jpg", alt: "Ліля — B-roll кадр" },
  { src: "/media/cases/liliya-product-business/screen-6.jpg", alt: "Ліля — рожевий диван" },
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

export default function LiliyaProductBusinessPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

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
                {t("videoCases.liliyaProductBusiness.category")}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">
                <Play size={12} />
                YouTube
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("videoCases.liliyaProductBusiness.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("videoCases.liliyaProductBusiness.subtitle")}
            </p>
          </FadeIn>

          {/* Hero — Telegram Link */}
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
              <div className="max-w-3xl mx-auto">
                <div className="relative rounded-xl overflow-hidden bg-background aspect-video cursor-pointer group/thumb">
                  <Image
                    src="/media/cases/liliya-product-business/screen-3.jpg"
                    alt="Товарний бізнес — урок"
                    width={1280}
                    height={720}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 group-hover/thumb:from-black/70 group-hover/thumb:via-black/20 group-hover/thumb:to-black/30 transition-all duration-300" />
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-border">
                      ~20хв
                    </span>
                    <span className="bg-pink-500/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-pink-500/30">
                      16:9
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/10 group-hover/thumb:bg-white/20 backdrop-blur-sm rounded-full w-14 h-14 flex items-center justify-center border border-white/20 group-hover/thumb:scale-110 group-hover/thumb:border-white/40 transition-all duration-300 shadow-lg shadow-black/20">
                      <Play size={26} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                  <a
                    href="https://t.me/FreelanceUADigitalAgency/161/429"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 left-3 right-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="bg-pink-500/90 backdrop-blur-md rounded-lg px-3 py-2 text-center border border-pink-500/30 hover:bg-pink-500 transition-colors duration-300">
                      <span className="text-white text-[11px] md:text-xs font-semibold tracking-wide flex items-center justify-center gap-2">
                        <ExternalLink size={14} />
                        Дивитись в Telegram
                      </span>
                    </div>
                  </a>
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
                <AlertTriangle size={20} className="text-red-500 shrink-0" />
                {t("videoCases.liliyaProductBusiness.challengeTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("videoCases.liliyaProductBusiness.challenge")}
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
                {t("videoCases.liliyaProductBusiness.solutionTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("videoCases.liliyaProductBusiness.solution")}
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

      {/* Screenshots Gallery */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Кадри з відео
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {screenshots.map((s, i) => (
              <FadeIn key={i} delay={0.05 + i * 0.06} y={20} blur={4}>
                <div className="relative rounded-xl overflow-hidden bg-background border border-border group/screenshot cursor-pointer">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={640}
                    height={360}
                    unoptimized
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover/screenshot:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/screenshot:bg-black/20 transition-all duration-300" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Review */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("videoCases.liliyaProductBusiness.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card overflow-hidden" style={{ borderRadius: "20px" }}>
              <div className="p-8 md:p-10 text-center">
                <Quote size={28} className="text-pink-500 mx-auto mb-4 opacity-50" />
                <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                  &ldquo;{t("videoCases.liliyaProductBusiness.reviewText")}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-3 pt-4 border-t border-border">
                  <ReviewAvatar name={t("videoCases.liliyaProductBusiness.reviewAuthor")} />
                  <p className="text-pink-500 font-semibold">{t("videoCases.liliyaProductBusiness.reviewAuthor")}</p>
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
            {t("videoCases.liliyaProductBusiness.teamMember")}
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
              className="magnetic-button inline-flex items-center gap-2 border border-border text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 hover:text-pink-400 font-semibold px-8 py-4 rounded-full transition-all duration-500-0.5 hover:shadow-[0_0_40px_rgba(236,72,153,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="liliya-product-business" section="video" />
    </article>
  );
}
