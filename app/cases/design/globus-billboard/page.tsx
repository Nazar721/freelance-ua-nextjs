"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, AlertTriangle, Lightbulb, Quote } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ImageModal } from "@/components/ui/ImageModal";
import GalleryImage from "@/components/ui/GalleryImage";
import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useState } from "react";

const galleryItems = [
  { src: "/media/cases/globus-billboard/globus-arch-horizontal.webp", w: 16383, h: 2731, titleKey: "designCases.globusBillboard.item1.title", captionKey: "designCases.globusBillboard.item1.caption" },
  { src: "/media/cases/globus-billboard/globus-arch-square.webp", w: 7087, h: 3544, titleKey: "designCases.globusBillboard.item2.title", captionKey: "designCases.globusBillboard.item2.caption" },
  { src: "/media/cases/globus-billboard/globus-arch-wide.webp", w: 16383, h: 5703, titleKey: "designCases.globusBillboard.item3.title", captionKey: "designCases.globusBillboard.item3.caption" },
  { src: "/media/cases/globus-billboard/globus-arch-banner.webp", w: 16383, h: 2048, titleKey: "designCases.globusBillboard.item4.title", captionKey: "designCases.globusBillboard.item4.caption" },
];

const allImages = galleryItems.map((item) => item.src);

const results = [
  "designCases.globusBillboard.result1",
  "designCases.globusBillboard.result2",
  "designCases.globusBillboard.result3",
  "designCases.globusBillboard.result4",
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

export default function GlobusBillboardPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState<{ images: string[]; index: number }>({ images: [], index: 0 });

  const openModal = (images: string[], index: number) => setModalState({ images, index });
  const closeModal = () => setModalState({ images: [], index: 0 });
  const goToPrev = () => setModalState((s) => ({ ...s, index: s.index > 0 ? s.index - 1 : s.images.length - 1 }));
  const goToNext = () => setModalState((s) => ({ ...s, index: s.index < s.images.length - 1 ? s.index + 1 : 0 }));

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });

  const mockupScale = useTransform(scrollYProgress, [0, 0.6], [0.92, 1.0]);
  const mockupY = useTransform(scrollYProgress, [0, 0.6], [60, 0]);
  const mockupOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);

  return (
    <article className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/cases?tab=design"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          {t("designCases.globusBillboard.backToList")}
        </Link>
      </div>

      <section ref={heroRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {t("designCases.globusBillboard.category")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("designCases.globusBillboard.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("designCases.globusBillboard.subtitle")}
            </p>
          </FadeIn>

          <motion.div
            style={{
              scale: mockupScale,
              y: mockupY,
              opacity: mockupOpacity,
            }}
          >
            <div
              className="featured-case-card border border-border rounded-2xl relative"
              style={
                {
                  "--case-glow": "rgba(59, 130, 246, 0.12)",
                  "--case-glow-strong": "rgba(37, 99, 235, 0.28)",
                } as React.CSSProperties
              }
            >
              <div className="p-4 md:p-6">
                <div className="relative rounded-xl overflow-hidden bg-background">
                  <Image
                    src="/media/cases/globus-billboard/globus-arch-horizontal.webp"
                    alt={t("designCases.globusBillboard.title")}
                    width={16383}
                    height={2731}
                    className="w-full h-auto"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
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
                {t("designCases.globusBillboard.challenge")}
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
                {t("designCases.globusBillboard.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              {t("designCases.globusBillboard.finalsTitle")}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {t("designCases.globusBillboard.finalsIntro")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 gap-6">
            {galleryItems.map((item, i) => (
              <FadeIn key={item.src} delay={0.1 + i * 0.1} y={30} blur={4}>
                <div className="featured-case-card border border-border rounded-2xl p-4" style={{ borderRadius: "16px" }}>
                  <div className="relative overflow-hidden rounded-xl border border-border bg-background">
                    <GalleryImage
                      src={item.src}
                      alt={t(item.titleKey)}
                      width={item.w}
                      height={item.h}
                      className="w-full h-auto"
                      onOpen={() => openModal(allImages, i)}
                    />
                  </div>
                  <p className="text-foreground text-sm font-semibold mt-3">{t(item.titleKey)}</p>
                  <p className="text-muted-foreground text-xs mt-1">{t(item.captionKey)}</p>
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
          <div className="max-w-3xl mx-auto">
            <FadeIn y={30} blur={8}>
              <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
                {t("designCases.globusBillboard.reviewTitle")}
              </h2>
            </FadeIn>

            <FadeIn delay={0.1} y={30} blur={6}>
              <div className="featured-case-card border border-border rounded-2xl overflow-hidden" style={{ borderRadius: "20px" }}>
                <div className="p-8 md:p-12 text-center">
                  <Quote size={32} className="text-blue-500 mx-auto mb-6 opacity-50" />
                  <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                    &ldquo;{t("designCases.globusBillboard.reviewText")}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <ReviewAvatar name={t("designCases.globusBillboard.reviewAuthor")} />
                    <p className="text-blue-500 font-semibold">{t("designCases.globusBillboard.reviewAuthor")}</p>
                  </div>
                </div>
                <div className="border-t border-border">
                  <Image
                    src="/media/cases/globus-billboard/globus-review.webp"
                    alt={t("designCases.globusBillboard.reviewScreenshotAlt")}
                    width={670}
                    height={498}
                    className="w-full h-auto"
                    draggable={false}
                  />
                  <p className="text-muted-foreground text-xs text-center py-3 px-4">
                    {t("designCases.globusBillboard.reviewScreenshotCaption")}
                  </p>
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
                className="magnetic-button inline-flex items-center gap-2 border border-border text-purple-500 hover:border-purple-600/50 hover:bg-purple-600/10 hover:text-purple-400 font-semibold px-8 py-4 rounded-full transition-all duration-500-0.5 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
              >
                {t("itCases.nextStepCta")}
                <ArrowRight size={18} />
              </a>
            </FadeIn>
          </div>
        </section>

      <RelatedProjectsSection currentSlug="globus-billboard" section="design" />

      <ImageModal
        images={modalState.images}
        currentIndex={modalState.index}
        isOpen={modalState.images.length > 0}
        onClose={closeModal}
        onPrev={goToPrev}
        onNext={goToNext}
        title={t("designCases.globusBillboard.title")}
      />
    </article>
  );
}
