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
import GalleryImage from "@/components/ui/GalleryImage";
import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";

const components = [
  {
    titleKey: "itCases.evaCode.component1Title",
    descKey: "itCases.evaCode.component1Desc",
    images: ["/media/cases/eva-landing-decision.webp", "/media/cases/eva-landing-skills.webp", "/media/cases/eva-landing-lessons.webp"],
    link: "https://evacode.app",
    linkLabelKey: "itCases.evaCode.component1LinkLabel",
  },
  { titleKey: "itCases.evaCode.component2Title", descKey: "itCases.evaCode.component2Desc", images: ["/media/cases/eva-tg-welcome.webp", "/media/cases/eva-tg-form.webp", "/media/cases/eva-tg-ranking.webp"], link: "https://t.me/evacode_tm_bot", linkLabelKey: "itCases.evaCode.component2LinkLabel" },
  { titleKey: "itCases.evaCode.component3Title", descKey: "itCases.evaCode.component3Desc", images: ["/media/cases/eva-crm-dashboard.webp", "/media/cases/eva-crm-clients.webp", "/media/cases/eva-crm-sessions.webp", "/media/cases/eva-crm-tasks.webp", "/media/cases/eva-crm-referrals.webp", "/media/cases/eva-crm-requests.jpeg", "/media/cases/eva-crm-mailings.webp", "/media/cases/eva-crm-profile.webp", "/media/cases/eva-crm-payments.webp"] },
  { titleKey: "itCases.evaCode.component4Title", descKey: "itCases.evaCode.component4Desc", images: ["/media/cases/eva-owner-clients.webp", "/media/cases/eva-owner-admin.webp", "/media/cases/eva-owner-referrals.webp", "/media/cases/eva-owner-tasks.webp", "/media/cases/eva-owner-requests.webp", "/media/cases/eva-owner-mailings.webp", "/media/cases/eva-owner-sessions.jpeg", "/media/cases/eva-owner-booking.webp", "/media/cases/eva-owner-profile.webp"] },
  { titleKey: "itCases.evaCode.component5Title", descKey: "itCases.evaCode.component5Desc" },
];

const results = [
  "itCases.evaCode.result1",
  "itCases.evaCode.result2",
  "itCases.evaCode.result3",
  "itCases.evaCode.result4",
  "itCases.evaCode.result5",
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

export default function EVACodePage() {
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
              {t("itCases.evaCode.category")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {t("itCases.evaCode.title")}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed mb-12">
              {t("itCases.evaCode.description")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border rounded-2xl relative"
            style={
              {
                "--case-glow": "rgba(99, 102, 241, 0.15)",
                "--case-glow-strong": "rgba(99, 102, 241, 0.3)",
              } as React.CSSProperties
            }
          >
            <motion.div
              className="w-full max-w-5xl mx-auto"
              style={{
                scale: mockupScale,
                y: mockupY,
                opacity: mockupOpacity,
                rotateX: mockupRotateX,
                perspective: 1200,
              }}
            >
              <Image
                src="/media/cases/eva-web.webp?v=2"
                alt={t("itCases.evaCode.title")}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
                draggable={false}
                priority
              />
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
                {t("itCases.evaCode.challenge")}
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
                {t("itCases.evaCode.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(99, 102, 241, 0.15)" side="both" />
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
                          <GalleryImage
                            src={src}
                            alt={`${t(comp.titleKey)} — ${j === 0 ? "desktop" : "mobile"}`}
                            width={j === 0 ? 1200 : 400}
                            height={j === 0 ? 800 : 800}
                            className="w-full h-auto object-cover"
                            onOpen={() => openModal(comp.images!, j, t(comp.titleKey))}
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
                      className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-primary hover:text-indigo-400 transition-colors duration-300"
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
              {t("itCases.evaCode.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card border border-border rounded-2xl overflow-hidden p-4 relative group/video" style={{ borderRadius: "20px" }}>
              <video
                ref={videoRef}
                src="/media/testimonials/eva-code.mp4"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={toggleVideo}
                className="w-full max-h-[80vh] object-cover object-[center_35%] rounded-xl cursor-pointer"
              />
              <button
                onClick={toggleVideo}
                className={`absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer z-10 ${
                  isPlaying
                    ? "opacity-0 scale-90 pointer-events-none md:group-hover/video:opacity-100 md:group-hover/video:scale-100 md:group-hover/video:pointer-events-auto"
                    : "opacity-100 scale-100 group-hover/video:scale-110 group-hover/video:bg-white/25"
                }`}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause size={24} className="text-white" fill="white" />
                ) : (
                  <Play size={24} className="text-white ml-1" fill="white" />
                )}
              </button>
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
            {t("itCases.team.andriiDeveloper")}
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

      <RelatedProjectsSection currentSlug="eva-code" />

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
