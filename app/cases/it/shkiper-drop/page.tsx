"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, Quote, Check, AlertTriangle, Lightbulb } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";


import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";
import ReviewAvatar from "@/components/ui/ReviewAvatar";

const components = [
  {
    titleKey: "itCases.shkiperDrop.component1Title",
    descKey: "itCases.shkiperDrop.component1Desc",
    sliderBefore: "/media/cases/shkiper-drop-hero.webp",
    sliderAfter: "/media/cases/shkiper-drop-hero.webp",
    link: "https://shkiper-drop.vercel.app",
    linkLabelKey: "itCases.shkiperDrop.viewSiteLabel",
  },
  {
    titleKey: "itCases.shkiperDrop.component2Title",
    descKey: "itCases.shkiperDrop.component2Desc",
    sliderBefore: "/media/cases/shkiper-drop-catalog.webp",
    sliderAfter: "/media/cases/shkiper-drop-catalog.webp",
  },
  {
    titleKey: "itCases.shkiperDrop.component3Title",
    descKey: "itCases.shkiperDrop.component3Desc",
    sliderBefore: "/media/cases/shkiper-drop-advantages.webp",
    sliderAfter: "/media/cases/shkiper-drop-advantages.webp",
  },
  {
    titleKey: "itCases.shkiperDrop.component4Title",
    descKey: "itCases.shkiperDrop.component4Desc",
    sliderBefore: "/media/cases/shkiper-drop-reviews.webp",
    sliderAfter: "/media/cases/shkiper-drop-reviews.webp",
  },
  {
    titleKey: "itCases.shkiperDrop.component5Title",
    descKey: "itCases.shkiperDrop.component5Desc",
    sliderBefore: "/media/cases/shkiper-drop-delivery.webp",
    sliderAfter: "/media/cases/shkiper-drop-cta.webp",
  },
];

const results = [
  "itCases.shkiperDrop.result1",
  "itCases.shkiperDrop.result2",
  "itCases.shkiperDrop.result3",
  "itCases.shkiperDrop.result4",
  "itCases.shkiperDrop.result5",
  "itCases.shkiperDrop.result6",
  "itCases.shkiperDrop.result7",
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

export default function ShkiperDropPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const mockupScale = useTransform(scrollYProgress, [0, 0.6], [0.7, 1.05]);
  const mockupY = useTransform(scrollYProgress, [0, 0.6], [120, 0]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.25], [0.3, 1]);
  const mockupRotateX = useTransform(scrollYProgress, [0, 0.6], [8, 0]);

  return (
    <article className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/cases/it"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          {t("itCases.backToList")}
        </Link>
      </div>

      <section ref={heroRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {t("itCases.shkiperDrop.category")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("itCases.shkiperDrop.title")}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
              {t("itCases.shkiperDrop.description")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border rounded-2xl relative"
            style={
                {
                  "--case-glow": "rgba(234, 179, 8, 0.15)",
                  "--case-glow-strong": "rgba(234, 179, 8, 0.3)",
                } as React.CSSProperties
            }
          >
            <motion.div
              className="w-full max-w-4xl mx-auto py-8"
              style={{
                scale: mockupScale,
                y: mockupY,
                opacity: mockupOpacity,
                rotateX: mockupRotateX,
                perspective: 1200,
              }}
            >
              <Image
                src="/media/cases/shkiper-drop-mocap.webp"
                alt={t("itCases.shkiperDrop.title")}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                draggable={false}
                priority
              />
            </motion.div>
          </div>

          <div className="flex mt-8">
            <a
              href="https://shkiper-drop.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#EAB308] hover:text-[#FACC15] transition-colors duration-300"
            >
              {t("itCases.shkiperDrop.viewSiteLabel")}
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

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
                {t("itCases.challenge")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("itCases.shkiperDrop.challenge")}
              </p>
            </motion.div>

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-surface-elevated/40 border border-[#EAB308]/25 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,179,8,0.1)] hover:border-[#EAB308]/50"
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-4">
                <Lightbulb size={20} className="text-[#EAB308] shrink-0" />
                {t("itCases.solution")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("itCases.shkiperDrop.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(234, 179, 8, 0.15)" side="both" />
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              {t("itCases.technicals")}
            </h2>
          </FadeIn>

          <div className="space-y-8">
            {components.map((comp, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08} y={30} blur={4}>
                <div className={`featured-case-card p-6 md:p-8 ${"link" in comp && comp.link ? "pb-10 md:pb-12" : ""}`} style={{ borderRadius: "16px" }}>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {t(comp.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(comp.descKey)}
                  </p>

                  {"sliderBefore" in comp && comp.sliderBefore && (
                    <div className="mt-6">
                      <Image
                        src={comp.sliderBefore}
                        alt={t(comp.titleKey)}
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain rounded-xl"
                        draggable={false}
                      />
                    </div>
                  )}

                  {"link" in comp && comp.link && "linkLabelKey" in comp && comp.linkLabelKey && (
                    <a
                      href={comp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#EAB308] hover:text-[#FACC15] transition-colors duration-300"
                    >
                      {t(comp.linkLabelKey)}
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("itCases.results")}
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 gap-4">
            {results.map((r, i) => (
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

      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("itCases.shkiperDrop.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card border border-border rounded-2xl p-8 relative" style={{ borderRadius: "20px" }}>
              <Quote size={32} className="text-[#EAB308]/40 mb-4" />
              <p className="text-foreground text-base leading-relaxed mb-6 whitespace-pre-line">
                {t("itCases.shkiperDrop.reviewText")}
              </p>
              <div className="flex items-center gap-3">
                <ReviewAvatar name={t("itCases.shkiperDrop.reviewAuthor")} size={32} />
                <p className="text-muted-foreground text-sm font-medium">
                  {t("itCases.shkiperDrop.reviewAuthor")}
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground/60 mb-1">
            {t("itCases.projectTeam")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("itCases.team.nazarDeveloper")}
          </p>
        </div>
      </section>

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
              className="magnetic-button inline-flex items-center gap-2 border border-border text-[#EAB308] hover:border-[#EAB308]/50 hover:bg-[#EAB308]/10 hover:text-[#FACC15] font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(234,179,8,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="shkiper-drop" />
    </article>
  );
}
