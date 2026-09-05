"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, AlertTriangle, Lightbulb, Play, Pause } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";
import { ImageModal } from "@/components/ui/ImageModal";
import GalleryImage from "@/components/ui/GalleryImage";

import { useTranslation } from "@/lib/LanguageContext";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";

const sliderPairs = [
  {
    before: "/media/cases/nastya-portrait-retouch/portrait-1-before.jpg",
    after: "/media/cases/nastya-portrait-retouch/portrait-1-after.jpg",
    titleKey: "designCases.nastyaPortraitRetouch.slider1Title",
    captionKey: "designCases.nastyaPortraitRetouch.slider1Caption",
  },
  {
    before: "/media/cases/nastya-portrait-retouch/portrait-2-before.jpg",
    after: "/media/cases/nastya-portrait-retouch/portrait-2-after.jpg",
    titleKey: "designCases.nastyaPortraitRetouch.slider2Title",
    captionKey: "designCases.nastyaPortraitRetouch.slider2Caption",
  },
];

const sliderFinals = [
  {
    before: "/media/cases/nastya-portrait-retouch/portrait-3-before.jpg",
    after: "/media/cases/nastya-portrait-retouch/portrait-3-after.jpg",
    titleKey: "designCases.nastyaPortraitRetouch.slider3Title",
    captionKey: "designCases.nastyaPortraitRetouch.slider3Caption",
  },
];

const finalItems = [
  { src: "/media/cases/nastya-portrait-retouch/final-1.jpg", w: 4000, h: 6000 },
  { src: "/media/cases/nastya-portrait-retouch/final-2.jpg", w: 4000, h: 6000 },
  { src: "/media/cases/nastya-portrait-retouch/final-3.jpg", w: 4000, h: 6000 },
  { src: "/media/cases/nastya-portrait-retouch/final-4.jpg", w: 4000, h: 6000 },
  { src: "/media/cases/nastya-portrait-retouch/final-5.jpg", w: 4000, h: 6000 },
  { src: "/media/cases/nastya-portrait-retouch/final-6.jpg", w: 4000, h: 6000 },
];

const allImages = finalItems.map((item) => item.src);

const results = [
  "designCases.nastyaPortraitRetouch.result1",
  "designCases.nastyaPortraitRetouch.result2",
  "designCases.nastyaPortraitRetouch.result3",
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

export default function NastyaPortraitRetouchPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalState, setModalState] = useState<{ images: string[]; index: number }>({ images: [], index: 0 });

  const openModal = (images: string[], index: number) => setModalState({ images, index });
  const closeModal = () => setModalState({ images: [], index: 0 });
  const goToPrev = () => setModalState((s) => ({ ...s, index: s.index > 0 ? s.index - 1 : s.images.length - 1 }));
  const goToNext = () => setModalState((s) => ({ ...s, index: s.index < s.images.length - 1 ? s.index + 1 : 0 }));

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
          {t("designCases.nastyaPortraitRetouch.backToList")}
        </Link>
      </div>

      <section ref={heroRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {t("designCases.nastyaPortraitRetouch.category")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("designCases.nastyaPortraitRetouch.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("designCases.nastyaPortraitRetouch.subtitle")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border rounded-2xl relative"
            style={
              {
                "--case-glow": "rgba(168, 132, 100, 0.12)",
                "--case-glow-strong": "rgba(168, 132, 100, 0.28)",
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
              {finalItems.slice(0, 3).map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                  className="relative overflow-hidden rounded-xl max-w-[360px] mx-auto"
                  style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
                >
                  <Image
                    src={img.src}
                    alt={t("designCases.nastyaPortraitRetouch.title")}
                    width={img.w}
                    height={img.h}
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
                {finalItems.slice(0, 3).map((img, i) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative overflow-hidden rounded-xl bg-black"
                    style={{ boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.4)" }}
                  >
                    <Image
                      src={img.src}
                      alt={t("designCases.nastyaPortraitRetouch.title")}
                      width={img.w}
                      height={img.h}
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
                {t("designCases.nastyaPortraitRetouch.challenge")}
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
                {t("designCases.nastyaPortraitRetouch.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              {t("designCases.nastyaPortraitRetouch.processTitle")}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {t("designCases.nastyaPortraitRetouch.processIntro")}
            </p>
          </FadeIn>

          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sliderPairs.map((pair, i) => (
                <FadeIn key={pair.before} delay={0.1 + i * 0.1} y={30} blur={4}>
                  <div>
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
                      aspectClassName="aspect-[3/4]"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>

            {sliderFinals.map((item, i) => (
              <FadeIn key={i} delay={0.1 + sliderPairs.length * 0.1 + i * 0.1} y={30} blur={4}>
                <div>
                  <p className="text-foreground text-sm font-semibold mb-3 text-center">
                    {t(item.titleKey)}
                  </p>
                  <p className="text-muted-foreground text-xs mb-4 text-center">
                    {t(item.captionKey)}
                  </p>
                  <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                    <div className="relative rounded-2xl overflow-hidden bg-background">
                      <Image
                        src={item.before}
                        alt={t(item.titleKey)}
                        width={1200}
                        height={1600}
                        className="w-full h-auto object-cover"
                        draggable={false}
                      />
                    </div>
                    <div className="relative rounded-2xl overflow-hidden bg-background">
                      <Image
                        src={item.after}
                        alt={t(item.titleKey)}
                        width={1200}
                        height={1600}
                        className="w-full h-auto object-cover"
                        draggable={false}
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              {t("designCases.nastyaPortraitRetouch.finalsTitle")}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {t("designCases.nastyaPortraitRetouch.finalsIntro")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {finalItems.map((item, i) => (
              <FadeIn key={item.src} delay={0.05 + i * 0.06} y={30} blur={4}>
                <div className="featured-case-card border border-border rounded-2xl p-3" style={{ borderRadius: "16px" }}>
                  <div className="relative overflow-hidden rounded-xl border border-border bg-background">
                    <GalleryImage
                      src={item.src}
                      alt={t("designCases.nastyaPortraitRetouch.finalsTitle")}
                      width={item.w}
                      height={item.h}
                      onOpen={() => openModal(allImages, i)}
                    />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(168, 132, 100, 0.12)" side="both" />
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
              {t("designCases.nastyaPortraitRetouch.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card border border-border rounded-2xl overflow-hidden p-4 relative group/video" style={{ borderRadius: "20px" }}>
              <video
                ref={videoRef}
                src="/media/testimonials/video-2.mp4"
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

      <RelatedProjectsSection currentSlug="nastya-portrait-retouch" section="design" />

      <ImageModal
        images={modalState.images}
        currentIndex={modalState.index}
        isOpen={modalState.images.length > 0}
        onClose={closeModal}
        onPrev={goToPrev}
        onNext={goToNext}
        title={t("designCases.nastyaPortraitRetouch.title")}
      />
    </article>
  );
}
