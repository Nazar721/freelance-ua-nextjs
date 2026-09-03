"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, AlertTriangle, Lightbulb, Quote } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";

import { useTranslation } from "@/lib/LanguageContext";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";
import ReviewAvatar from "@/components/ui/ReviewAvatar";

const sliderPairs = [
  {
    before: "/media/cases/photo-retouch/photo-retouch-1-before.webp",
    after: "/media/cases/photo-retouch/photo-retouch-1-after.webp",
    titleKey: "designCases.photoRetouch.slider1Title",
    captionKey: "designCases.photoRetouch.slider1Caption",
  },
  {
    before: "/media/cases/photo-retouch/photo-retouch-2-before.webp",
    after: "/media/cases/photo-retouch/photo-retouch-2-after.webp",
    titleKey: "designCases.photoRetouch.slider2Title",
    captionKey: "designCases.photoRetouch.slider2Caption",
  },
  {
    before: "/media/cases/photo-retouch/photo-retouch-3-before.webp",
    after: "/media/cases/photo-retouch/photo-retouch-3-after.webp",
    titleKey: "designCases.photoRetouch.slider3Title",
    captionKey: "designCases.photoRetouch.slider3Caption",
  },
  {
    before: "/media/cases/photo-retouch/photo-retouch-4-before.webp",
    after: "/media/cases/photo-retouch/photo-retouch-4-after.webp",
    titleKey: "designCases.photoRetouch.slider4Title",
    captionKey: "designCases.photoRetouch.slider4Caption",
  },
  {
    before: "/media/cases/photo-retouch/photo-retouch-5-before.webp",
    after: "/media/cases/photo-retouch/photo-retouch-5-after.webp",
    titleKey: "designCases.photoRetouch.slider5Title",
    captionKey: "designCases.photoRetouch.slider5Caption",
  },
];

const heroImages = [
  "/media/cases/photo-retouch/photo-retouch-1-after.webp",
  "/media/cases/photo-retouch/photo-retouch-3-after.webp",
  "/media/cases/photo-retouch/photo-retouch-4-after.webp",
];

const approachItems = [
  "designCases.photoRetouch.approach1",
  "designCases.photoRetouch.approach2",
  "designCases.photoRetouch.approach3",
  "designCases.photoRetouch.approach4",
];

const results = [
  "designCases.photoRetouch.result1",
  "designCases.photoRetouch.result2",
  "designCases.photoRetouch.result3",
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

export default function PhotoRetouchPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const mockupScale = useTransform(scrollYProgress, [0, 0.6], [0.6, 1.08]);
  const mockupY = useTransform(scrollYProgress, [0, 0.6], [180, 0]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.3], [0.15, 1]);
  const mockupRotateX = useTransform(scrollYProgress, [0, 0.6], [14, 0]);

  return (
    <article className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/cases?tab=design&type=photo-retouch"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          {t("designCases.photoRetouch.backToList")}
        </Link>
      </div>

      <section ref={heroRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {t("designCases.photoRetouch.category")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("designCases.photoRetouch.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("designCases.photoRetouch.subtitle")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border rounded-2xl relative"
            style={
              {
                "--case-glow": "rgba(34, 211, 238, 0.10)",
                "--case-glow-strong": "rgba(34, 211, 238, 0.26)",
              } as React.CSSProperties
            }
          >
            {/* Mobile: vertical stack */}
            <motion.div
              className="md:hidden px-4 py-8 space-y-4"
              style={{
                scale: mockupScale,
                y: mockupY,
                opacity: mockupOpacity,
                rotateX: mockupRotateX,
                perspective: 1200,
              }}
            >
              {heroImages.map((src, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                  className="relative overflow-hidden rounded-xl max-w-[360px] mx-auto"
                  style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
                >
                  <Image
                    src={src}
                    alt={t("designCases.photoRetouch.title")}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-cover"
                    draggable={false}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Desktop: 3-column gallery */}
            <motion.div
              className="hidden md:block px-10 py-12"
              style={{
                scale: mockupScale,
                y: mockupY,
                opacity: mockupOpacity,
                rotateX: mockupRotateX,
                perspective: 1200,
              }}
            >
              <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto">
                {heroImages.map((src, i) => (
                  <motion.div
                    key={src}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-xl bg-black"
                    style={{ boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.4)" }}
                  >
                    <Image
                      src={src}
                      alt={t("designCases.photoRetouch.title")}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover"
                      draggable={false}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
                {t("designCases.photoRetouch.challenge")}
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
                {t("itCases.solution")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("designCases.photoRetouch.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              {t("designCases.photoRetouch.approachTitle")}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
              {t("designCases.photoRetouch.approachIntro")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approachItems.map((item, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08} y={20} blur={4}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-elevated/50 border border-border">
                  <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-green-500" />
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{t(item)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              {t("designCases.photoRetouch.finalsTitle")}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {t("designCases.photoRetouch.finalsIntro")}
            </p>
          </FadeIn>

          <div className="flex flex-col gap-10">
            {sliderPairs.map((pair, i) => (
              <FadeIn key={pair.before} delay={0.1 + i * 0.08} y={30} blur={4}>
                <div className="max-w-2xl mx-auto">
                  <p className="text-foreground text-sm font-semibold mb-3 text-center">
                    {t(pair.titleKey)}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4 text-center">
                    {t(pair.captionKey)}
                  </p>
                  <BeforeAfterSlider
                    beforeSrc={pair.before}
                    afterSrc={pair.after}
                    beforeAlt={t(pair.titleKey)}
                    afterAlt={t(pair.titleKey)}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(34, 211, 238, 0.10)" side="both" />
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
              {t("designCases.photoRetouch.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card border border-border rounded-2xl p-8 md:p-12 text-center" style={{ borderRadius: "20px" }}>
              <Quote size={32} className="text-green-500 mx-auto mb-6 opacity-50" />
              <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                &ldquo;{t("designCases.photoRetouch.reviewText")}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <ReviewAvatar name={t("designCases.photoRetouch.reviewAuthor")} />
                <p className="text-green-500 font-semibold">{t("designCases.photoRetouch.reviewAuthor")}</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground/60 mb-1">
            {t("designCases.projectTeam")}
          </p>
          <p className="text-sm text-muted-foreground">
            {t("designCases.team.snizhanaDesigner")}
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
              className="magnetic-button inline-flex items-center gap-2 border border-border text-purple-500 hover:border-purple-600/50 hover:bg-purple-600/10 hover:text-purple-400 font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="photo-retouch" section="design" />
    </article>
  );
}
