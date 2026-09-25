"use client";

import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  MoveRight,
  Quote,
} from "lucide-react";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";
import { FadeIn } from "@/components/ui/FadeIn";
import GalleryImage from "@/components/ui/GalleryImage";
import { ImageModal } from "@/components/ui/ImageModal";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";

const artwork = "/media/cases/moto-school-window-branding/moto-school-artwork.webp";
const installed = "/media/cases/moto-school-window-branding/moto-school-installed.webp";

const results = [
  "designCases.motoSchoolWindowBranding.result1",
  "designCases.motoSchoolWindowBranding.result2",
  "designCases.motoSchoolWindowBranding.result3",
  "designCases.motoSchoolWindowBranding.result4",
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

type ShowcaseProps = {
  onOpen: () => void;
};

function InstalledResultSection({ onOpen }: ShowcaseProps) {
  const { t } = useTranslation();

  return (
    <section
      aria-labelledby="installed-result-title"
      className="featured-case-card relative border border-lime-500/25 rounded-2xl p-4 md:p-6 shadow-[0_0_60px_rgba(132,204,22,0.07)]"
    >
      <div className="flex items-center justify-between gap-4 mb-5">
        <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-lime-400">
          02 / {t("designCases.motoSchoolWindowBranding.installedStage")}
        </span>
        <span className="h-px flex-1 bg-gradient-to-r from-lime-500/50 to-transparent" />
      </div>
      <h2 id="installed-result-title" className="text-2xl font-bold text-foreground mb-3">
        {t("designCases.motoSchoolWindowBranding.installedTitle")}
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-6">
        {t("designCases.motoSchoolWindowBranding.installedIntro")}
      </p>
      <div className="overflow-hidden rounded-xl border border-border bg-background">
        <GalleryImage
          src={installed}
          alt={t("designCases.motoSchoolWindowBranding.installedImageTitle")}
          width={1280}
          height={960}
          onOpen={onOpen}
        />
      </div>
      <p className="text-foreground text-sm font-semibold mt-4">
        {t("designCases.motoSchoolWindowBranding.installedImageTitle")}
      </p>
      <p className="text-muted-foreground text-xs mt-1">
        {t("designCases.motoSchoolWindowBranding.installedImageCaption")}
      </p>
    </section>
  );
}

function ArtworkTransitionSection({
  onOpenArtwork,
  onOpenInstalled,
}: {
  onOpenArtwork: () => void;
  onOpenInstalled: () => void;
}) {
  const { t } = useTranslation();
  const details = [
    { key: "benefits", origin: "origin-left" },
    { key: "rider", origin: "origin-center" },
    { key: "cta", origin: "origin-right" },
  ];

  return (
    <section className="relative overflow-hidden py-16 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_35%,rgba(239,68,68,0.08),transparent_28%),radial-gradient(circle_at_72%_65%,rgba(132,204,22,0.08),transparent_30%)]" />
      <div className="relative max-w-7xl mx-auto">
        <FadeIn y={30} blur={8}>
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            {t("designCases.motoSchoolWindowBranding.transitionTitle")}
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            {t("designCases.motoSchoolWindowBranding.transitionIntro")}
          </p>
        </FadeIn>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="hidden lg:flex absolute left-1/2 top-12 z-10 -translate-x-1/2 items-center justify-center w-12 h-12 rounded-full border border-red-500/40 bg-background shadow-[0_0_30px_rgba(239,68,68,0.16)]">
            <MoveRight size={20} className="text-red-400" aria-hidden="true" />
          </div>

          <FadeIn delay={0.1} y={30} blur={4}>
            <section
              aria-labelledby="print-ready-title"
              className="featured-case-card border border-red-500/25 rounded-2xl p-4 md:p-6 shadow-[0_0_60px_rgba(239,68,68,0.06)]"
            >
              <div className="flex items-center justify-between gap-4 mb-5">
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-red-400">
                  01 / {t("designCases.motoSchoolWindowBranding.artworkStage")}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-red-500/50 to-transparent" />
              </div>
              <h2 id="print-ready-title" className="text-2xl font-bold text-foreground mb-3">
                {t("designCases.motoSchoolWindowBranding.finalsTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("designCases.motoSchoolWindowBranding.finalsIntro")}
              </p>
              <div className="relative overflow-hidden rounded-xl border border-border bg-black">
                <GalleryImage
                  src={artwork}
                  alt={t("designCases.motoSchoolWindowBranding.artworkTitle")}
                  width={2560}
                  height={1074}
                  onOpen={onOpenArtwork}
                />
              </div>
              <p className="text-foreground text-sm font-semibold mt-4">
                {t("designCases.motoSchoolWindowBranding.artworkTitle")}
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                {t("designCases.motoSchoolWindowBranding.artworkCaption")}
              </p>

              <div className="md:hidden mt-6 pt-5 border-t border-border">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-foreground mb-3">
                  {t("designCases.motoSchoolWindowBranding.detailsTitle")}
                </p>
                <div className="grid gap-3">
                  {details.map((detail) => (
                    <figure key={detail.key}>
                      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-black">
                        <Image
                          src={artwork}
                          alt={t(`designCases.motoSchoolWindowBranding.detail.${detail.key}`)}
                          fill
                          sizes="calc(100vw - 64px)"
                          className={`scale-[2.15] object-cover ${detail.origin}`}
                        />
                      </div>
                      <figcaption className="mt-2 text-xs text-muted-foreground">
                        {t(`designCases.motoSchoolWindowBranding.detail.${detail.key}`)}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>

          <FadeIn delay={0.2} y={30} blur={4}>
            <InstalledResultSection onOpen={onOpenInstalled} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ClientReviewSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <FadeIn y={30} blur={8}>
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            {t("designCases.motoSchoolWindowBranding.reviewTitle")}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={30} blur={6}>
          <div className="featured-case-card border border-border rounded-2xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <Quote size={32} className="text-red-400 mx-auto mb-6 opacity-80" />
              <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                &ldquo;{t("designCases.motoSchoolWindowBranding.reviewText")}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <ReviewAvatar name={t("designCases.motoSchoolWindowBranding.reviewAuthor")} />
                <p className="text-red-500 font-semibold">
                  {t("designCases.motoSchoolWindowBranding.reviewAuthor")}
                </p>
              </div>
            </div>
            <div className="border-t border-border p-4 md:p-8">
              <div className="relative overflow-hidden rounded-xl border border-border bg-background max-w-xl mx-auto">
                <Image
                  src="/media/cases/moto-school-window-branding/moto-school-review.webp"
                  alt={t("designCases.motoSchoolWindowBranding.reviewScreenshotAlt")}
                  width={746}
                  height={704}
                  sizes="(max-width: 768px) calc(100vw - 64px), 576px"
                  className="w-full h-auto"
                  draggable={false}
                />
              </div>
              <p className="text-muted-foreground text-xs text-center mt-4">
                {t("designCases.motoSchoolWindowBranding.reviewScreenshotCaption")}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function MotoSchoolWindowBrandingPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const artworkScale = useTransform(scrollYProgress, [0, 0.6], [0.94, 1]);
  const artworkY = useTransform(scrollYProgress, [0, 0.6], [50, 0]);
  const artworkOpacity = useTransform(scrollYProgress, [0, 0.3], [0.35, 1]);

  return (
    <article className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link
          href="/cases?tab=design"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          {t("designCases.motoSchoolWindowBranding.backToList")}
        </Link>
      </div>

      <section ref={heroRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {t("designCases.motoSchoolWindowBranding.category")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("designCases.motoSchoolWindowBranding.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("designCases.motoSchoolWindowBranding.subtitle")}
            </p>
          </FadeIn>

          <motion.div style={{ scale: artworkScale, y: artworkY, opacity: artworkOpacity }}>
            <div
              className="featured-case-card border border-border rounded-2xl relative overflow-hidden"
              style={
                {
                  "--case-glow": "rgba(239, 68, 68, 0.12)",
                  "--case-glow-strong": "rgba(132, 204, 22, 0.22)",
                } as CSSProperties
              }
            >
              <div className="p-3 md:p-6">
                <div className="relative rounded-xl overflow-hidden bg-black">
                  <Image
                    src={artwork}
                    alt={t("designCases.motoSchoolWindowBranding.title")}
                    width={2560}
                    height={1074}
                    sizes="(max-width: 1280px) calc(100vw - 32px), 1280px"
                    className="w-full h-auto"
                    priority
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              {t("designCases.motoSchoolWindowBranding.challenge")}
            </p>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-surface-elevated/40 border border-lime-500/25 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(132,204,22,0.1)] hover:border-lime-500/50"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-4">
              <Lightbulb size={20} className="text-lime-500 shrink-0" />
              {t("itCases.solution")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("designCases.motoSchoolWindowBranding.solution")}
            </p>
          </motion.div>
        </div>
      </section>

      <ArtworkTransitionSection
        onOpenArtwork={() => setModalImage(artwork)}
        onOpenInstalled={() => setModalImage(installed)}
      />

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {t("itCases.results")}
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 gap-4">
            {results.map((result, index) => (
              <FadeIn key={result} delay={0.1 + index * 0.08} y={20} blur={4}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-surface-elevated/50 border border-border">
                  <div className="w-7 h-7 rounded-full bg-lime-500/20 border border-lime-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} className="text-lime-500" />
                  </div>
                  <p className="text-foreground text-sm leading-relaxed">{t(result)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <ClientReviewSection />

      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs text-muted-foreground mb-1">{t("designCases.projectTeam")}</p>
          <p className="text-sm text-muted-foreground">{t("designCases.team.snizhanaDesigner")}</p>
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
              className="magnetic-button inline-flex items-center gap-2 border border-border text-purple-500 hover:border-purple-600/50 hover:bg-purple-600/10 hover:text-purple-400 font-semibold px-8 py-4 rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="moto-school-window-branding" section="design" />

      <ImageModal
        images={modalImage ? [modalImage] : []}
        currentIndex={0}
        isOpen={modalImage !== null}
        onClose={() => setModalImage(null)}
        onPrev={() => undefined}
        onNext={() => undefined}
        title={t("designCases.motoSchoolWindowBranding.title")}
      />
    </article>
  );
}
