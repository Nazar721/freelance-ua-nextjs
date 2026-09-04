"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, Quote, Check, AlertTriangle, Lightbulb, Play, Pause } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";

import { ImageModal } from "@/components/ui/ImageModal";
import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";
import ReviewAvatar from "@/components/ui/ReviewAvatar";

const components = [
  {
    titleKey: "itCases.asandraSoul.component1Title",
    descKey: "itCases.asandraSoul.component1Desc",
    images: ["/media/cases/asandra1.webp"],
    link: "https://t.me/asandrasoul_bot",
    linkLabelKey: "itCases.asandraSoul.viewSiteLabel",
  },
  {
    titleKey: "itCases.asandraSoul.component2Title",
    descKey: "itCases.asandraSoul.component2Desc",
    images: ["/media/cases/asandra2.jpeg"],
  },
  {
    titleKey: "itCases.asandraSoul.component3Title",
    descKey: "itCases.asandraSoul.component3Desc",
    images: ["/media/cases/asandra3.jpeg"],
  },
  {
    titleKey: "itCases.asandraSoul.component4Title",
    descKey: "itCases.asandraSoul.component4Desc",
    images: ["/media/cases/asandra5-13.webp"],
  },
  {
    titleKey: "itCases.asandraSoul.component5Title",
    descKey: "itCases.asandraSoul.component5Desc",
    images: [
      "/media/cases/asandra5-1.webp",
      "/media/cases/asandra5-2.webp",
      "/media/cases/asandra5-3.webp",
      "/media/cases/asandra5-4.webp",
      "/media/cases/asandra5-5.webp",
      "/media/cases/asandra5-6.webp",
      "/media/cases/asandra5-7.webp",
      "/media/cases/asandra5-8.webp",
      "/media/cases/asandra5-9.webp",
      "/media/cases/asandra5-10.webp",
      "/media/cases/asandra5-11.webp",
      "/media/cases/asandra5-12.webp",
      "/media/cases/asandra5-13.webp",
    ],
  },
];

const results = [
  "itCases.asandraSoul.result1",
  "itCases.asandraSoul.result2",
  "itCases.asandraSoul.result3",
  "itCases.asandraSoul.result4",
  "itCases.asandraSoul.result5",
  "itCases.asandraSoul.result6",
  "itCases.asandraSoul.result7",
  "itCases.asandraSoul.result8",
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

export default function AsandraSoulPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalState, setModalState] = useState<{ isOpen: boolean; images: string[]; currentIndex: number; title: string }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
  });

  const openModal = (images: string[], index: number, title: string) => {
    setModalState({ isOpen: true, images, currentIndex: index, title });
  };

  const closeModal = () => setModalState((prev) => ({ ...prev, isOpen: false }));

  const goToPrev = () => setModalState((prev) => ({ ...prev, currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length }));
  const goToNext = () => setModalState((prev) => ({ ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }));

  const toggleVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

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
              {t("itCases.asandraSoul.category")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("itCases.asandraSoul.title")}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
              {t("itCases.asandraSoul.description")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border rounded-2xl relative"
            style={
              {
                "--case-glow": "rgba(200, 150, 80, 0.15)",
                "--case-glow-strong": "rgba(200, 150, 80, 0.3)",
                overflow: "hidden !important",
              } as React.CSSProperties
            }
          >
            <div className="overflow-hidden rounded-2xl">
              <motion.div
                className="w-full max-w-3xl mx-auto"
                style={{
                  scale: mockupScale,
                  y: mockupY,
                  opacity: mockupOpacity,
                  rotateX: mockupRotateX,
                  perspective: 1200,
                }}
              >
                <Image
                  src="/media/cases/asandraapp-mocap.webp"
                  alt={t("itCases.asandraSoul.title")}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                  draggable={false}
                  priority
                />
              </motion.div>
            </div>
          </div>

          <div className="flex mt-8">
            <a
              href="https://t.me/asandrasoul_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#A855F7] hover:text-[#C084FC] transition-colors duration-300"
            >
              {t("itCases.asandraSoul.viewSiteLabel")}
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
                {t("itCases.asandraSoul.challenge")}
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
                {t("itCases.asandraSoul.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(200, 150, 80, 0.15)" side="both" />
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

                  {"images" in comp && comp.images && (
                    <div className="grid gap-4 mt-6 grid-cols-1">
                      {comp.images.map((src, j) => (
                        <motion.div
                          key={j}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 + j * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => openModal(comp.images!, j, t(comp.titleKey))}
                          className="relative overflow-hidden rounded-xl border border-border bg-background cursor-pointer"
                        >
                          <Image
                            src={src}
                            alt={`${t(comp.titleKey)} — ${j === 0 ? "desktop" : "mobile"}`}
                            width={j === 0 ? 1200 : 400}
                            height={j === 0 ? 800 : 800}
                            className="w-full h-auto object-cover"
                            draggable={false}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {"link" in comp && comp.link && "linkLabelKey" in comp && comp.linkLabelKey && (
                    <a
                      href={comp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#A855F7] hover:text-[#C084FC] transition-colors duration-300"
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
              {t("itCases.asandraSoul.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card border border-border rounded-2xl p-8 relative" style={{ borderRadius: "20px" }}>
              <div className="flex items-center gap-6">
                <button
                  onClick={toggleVideo}
                  className="w-16 h-16 rounded-full bg-[#A855F7]/20 border border-[#A855F7]/40 flex items-center justify-center hover:bg-[#A855F7]/30 transition-all duration-300 cursor-pointer shrink-0"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause size={24} className="text-[#A855F7]" fill="#A855F7" />
                  ) : (
                    <Play size={24} className="text-[#A855F7] ml-1" fill="#A855F7" />
                  )}
                </button>

                <div className="flex-1">
                  <audio
                    ref={videoRef as React.RefObject<HTMLAudioElement>}
                    src="/media/testimonials/asandra.m4a"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <ReviewAvatar name={t("itCases.asandraSoul.reviewAuthor")} size={28} />
                    <p className="text-foreground font-medium">{t("itCases.asandraSoul.reviewAuthor")}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">Голосовий відгук</p>
                </div>
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
            {t("itCases.team.bohdanDeveloper")}
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

      <RelatedProjectsSection currentSlug="asandra-soul" />

      <ImageModal
        images={modalState.images}
        currentIndex={modalState.currentIndex}
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onPrev={goToPrev}
        onNext={goToNext}
        title={modalState.title}
      />
    </article>
  );
}
