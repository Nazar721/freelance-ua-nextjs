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
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";

const galleryItems = [
  { src: "/media/cases/hope-media/hope-media1.webp", w: 2400, h: 1878, titleKey: "designCases.hopeMedia.item1.title", captionKey: "designCases.hopeMedia.item1.caption" },
  { src: "/media/cases/hope-media/hope-media2.webp", w: 2400, h: 1440, titleKey: "designCases.hopeMedia.item2.title", captionKey: "designCases.hopeMedia.item2.caption" },
  { src: "/media/cases/hope-media/hope-media3.webp", w: 1773, h: 788, titleKey: "designCases.hopeMedia.item3.title", captionKey: "designCases.hopeMedia.item3.caption" },
  { src: "/media/cases/hope-media/hope-media4.webp", w: 2400, h: 851, titleKey: "designCases.hopeMedia.item4.title", captionKey: "designCases.hopeMedia.item4.caption" },
  { src: "/media/cases/hope-media/hope-media5.webp", w: 1443, h: 2318, titleKey: "designCases.hopeMedia.item5.title", captionKey: "designCases.hopeMedia.item5.caption" },
  { src: "/media/cases/hope-media/hope-media6.webp", w: 2390, h: 1382, titleKey: "designCases.hopeMedia.item6.title", captionKey: "designCases.hopeMedia.item6.caption" },
  { src: "/media/cases/hope-media/hope-media7.webp", w: 2400, h: 1697, titleKey: "designCases.hopeMedia.item7.title", captionKey: "designCases.hopeMedia.item7.caption" },
  { src: "/media/cases/hope-media/hope-media8.webp", w: 2400, h: 851, titleKey: "designCases.hopeMedia.item8.title", captionKey: "designCases.hopeMedia.item8.caption" },
];

const allImages = galleryItems.map((item) => item.src);

const finalGroups = [
  {
    titleKey: "designCases.hopeMedia.group1Title",
    introKey: "designCases.hopeMedia.group1Intro",
    items: [0, 2, 3],
  },
  {
    titleKey: "designCases.hopeMedia.group2Title",
    introKey: "designCases.hopeMedia.group2Intro",
    items: [1, 7],
  },
  {
    titleKey: "designCases.hopeMedia.group3Title",
    introKey: "designCases.hopeMedia.group3Intro",
    items: [4, 5, 6],
  },
];

const mobileSplitItems = new Set(["/media/cases/hope-media/hope-media4.webp", "/media/cases/hope-media/hope-media8.webp"]);

const results = [
  "designCases.hopeMedia.result1",
  "designCases.hopeMedia.result2",
  "designCases.hopeMedia.result3",
  "designCases.hopeMedia.result4",
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

function WideImage({ src, alt, w, h }: { src: string; alt: string; w: number; h: number }) {
  const isPortrait = src === "/media/cases/hope-media/hope-media5.webp";
  if (mobileSplitItems.has(src)) {
    return (
      <>
        <div className="hidden md:block relative overflow-hidden rounded-xl border border-border bg-background">
          <Image src={src} alt={alt} width={w} height={h} className="w-full h-auto object-cover" draggable={false} />
        </div>
        <div className="md:hidden grid grid-cols-2 gap-3">
          {[0, 1].map((half) => (
            <div key={half} className="relative overflow-hidden rounded-xl border border-border bg-background" style={{ aspectRatio: `${w / 2} / ${h}` }}>
              <Image
                src={src}
                alt={half === 0 ? `${alt} — QR` : `${alt} — content`}
                width={w / 2}
                height={h}
                className="absolute top-0 h-full w-auto max-w-none"
                style={{ left: half === 0 ? 0 : "-100%" }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </>
    );
  }
  return (
    <div className={`relative overflow-hidden rounded-xl border border-border bg-background ${isPortrait ? "max-w-md mx-auto" : ""}`}>
      <Image src={src} alt={alt} width={w} height={h} className="w-full h-auto object-cover" draggable={false} />
    </div>
  );
}

export default function HopeMediaGroupPage() {
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
          href="/cases?tab=design"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm transition-colors duration-300"
        >
          <ArrowLeft size={16} />
          {t("designCases.hopeMedia.backToList")}
        </Link>
      </div>

      <section ref={heroRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {t("designCases.hopeMedia.category")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("designCases.hopeMedia.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("designCases.hopeMedia.subtitle")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border rounded-2xl relative"
            style={
              {
                "--case-glow": "rgba(250, 204, 21, 0.12)",
                "--case-glow-strong": "rgba(59, 130, 246, 0.25)",
              } as React.CSSProperties
            }
          >
            {/* Mobile: vertical stack */}
            <div className="md:hidden px-4 py-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative overflow-hidden rounded-xl"
                style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
              >
                <Image
                  src="/media/cases/hope-media/hope-media4.webp"
                  alt={t("designCases.hopeMedia.title")}
                  width={2400}
                  height={851}
                  className="w-full h-auto object-cover"
                  draggable={false}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative overflow-hidden rounded-xl max-w-[280px] mx-auto"
                style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
              >
                <Image
                  src="/media/cases/hope-media/hope-media5.webp"
                  alt={t("designCases.hopeMedia.title")}
                  width={1443}
                  height={2318}
                  className="w-full h-auto object-cover"
                  draggable={false}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative overflow-hidden rounded-xl"
                style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)" }}
              >
                <Image
                  src="/media/cases/hope-media/hope-media6.webp"
                  alt={t("designCases.hopeMedia.title")}
                  width={2390}
                  height={1382}
                  className="w-full h-auto object-cover"
                  draggable={false}
                />
              </motion.div>
            </div>

            {/* Desktop: 3D composition */}
            <motion.div
              className="hidden md:block relative w-full max-w-5xl mx-auto px-4 py-10"
              style={{
                scale: mockupScale,
                y: mockupY,
                opacity: mockupOpacity,
                rotateX: mockupRotateX,
                perspective: 1200,
              }}
            >
              <div className="relative w-full" style={{ minHeight: "500px" }}>
                {/* Poster - background */}
                <motion.div
                  initial={{ opacity: 0, y: 30, rotateY: -10 }}
                  animate={{ opacity: 1, y: 0, rotateY: -2 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[75%] z-10"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.4)",
                  }}
                >
                <div className="relative overflow-hidden rounded-xl bg-black">
                  <Image
                    src="/media/cases/hope-media/hope-media4.webp"
                    alt={t("designCases.hopeMedia.title")}
                    width={2400}
                    height={851}
                    className="w-full h-auto object-cover"
                    draggable={false}
                  />
                </div>
                </motion.div>

                {/* Brochures - foreground left */}
                <motion.div
                  initial={{ opacity: 0, y: 40, rotateY: 15 }}
                  animate={{ opacity: 1, y: 0, rotateY: 5 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 left-[12%] w-[24%] z-20"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 25px 70px rgba(0, 0, 0, 0.7), 0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-black">
                    <Image
                      src="/media/cases/hope-media/hope-media5.webp"
                      alt={t("designCases.hopeMedia.title")}
                      width={1443}
                      height={2318}
                      className="w-full h-auto object-cover"
                      draggable={false}
                    />
                  </div>
                </motion.div>

                {/* Stickers - foreground right */}
                <motion.div
                  initial={{ opacity: 0, y: 40, rotateY: -15 }}
                  animate={{ opacity: 1, y: 0, rotateY: -4 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-[5%] right-[12%] w-[28%] z-20"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 25px 70px rgba(0, 0, 0, 0.7), 0 10px 30px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-black">
                    <Image
                      src="/media/cases/hope-media/hope-media6.webp"
                      alt={t("designCases.hopeMedia.title")}
                      width={2390}
                      height={1382}
                      className="w-full h-auto object-cover"
                      draggable={false}
                    />
                  </div>
                </motion.div>
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
                {t("designCases.hopeMedia.challenge")}
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
                {t("designCases.hopeMedia.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              {t("designCases.hopeMedia.galleryTitle")}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {t("designCases.hopeMedia.galleryDesc")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {galleryItems.map((item, i) => (
              <FadeIn key={item.src} delay={0.05 + (i % 3) * 0.1} y={30} blur={4} className={i === 3 || i === 7 ? "md:col-span-3" : ""}>
                <div className="featured-case-card border border-border rounded-2xl p-4" style={{ borderRadius: "16px" }}>
                  <div className={`relative overflow-hidden rounded-xl border border-border bg-background ${item.h > item.w ? "max-w-[280px] mx-auto" : ""}`}>
                    <GalleryImage
                      src={item.src}
                      alt={t(item.titleKey)}
                      width={item.w}
                      height={item.h}
                      onOpen={() => openModal(allImages, i)}
                    />
                  </div>
                  <p className="text-foreground text-sm font-semibold mt-4">{t(item.titleKey)}</p>
                  <p className="text-muted-foreground text-xs mt-1">{t(item.captionKey)}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">
              {t("designCases.hopeMedia.finalsTitle")}
            </h2>
          </FadeIn>

          <div className="space-y-12">
            {finalGroups.map((group) => (
              <div key={group.titleKey}>
                <FadeIn y={20} blur={4} className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {t(group.titleKey)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed max-w-3xl">
                    {t(group.introKey)}
                  </p>
                </FadeIn>

                <div className="grid grid-cols-1 gap-6">
                  {group.items.map((itemIdx, j) => {
                    const item = galleryItems[itemIdx];
                    return (
                      <FadeIn key={item.src} delay={0.1 + j * 0.08} y={30} blur={4}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 + j * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="featured-case-card border border-border rounded-2xl p-4 md:p-6"
                          style={{ borderRadius: "16px" }}
                        >
                          <GalleryImage src={item.src} alt={t(item.titleKey)} width={item.w} height={item.h} className={item.h > item.w ? "max-w-md mx-auto" : ""} onOpen={() => openModal(allImages, allImages.indexOf(item.src))} />
                          <p className="text-foreground text-sm font-semibold mt-4">{t(item.titleKey)}</p>
                          <p className="text-muted-foreground text-xs mt-1">{t(item.captionKey)}</p>
                        </motion.div>
                      </FadeIn>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(250, 204, 21, 0.12)" side="both" />
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
              {t("designCases.hopeMedia.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div className="featured-case-card border border-border rounded-2xl overflow-hidden p-4 relative group/video" style={{ borderRadius: "20px" }}>
              <video
                ref={videoRef}
                src="/media/testimonials/video-3.mp4"
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

      <RelatedProjectsSection currentSlug="hope-media-group" section="design" />

      <ImageModal
        images={modalState.images}
        currentIndex={modalState.index}
        isOpen={modalState.images.length > 0}
        onClose={closeModal}
        onPrev={goToPrev}
        onNext={goToNext}
        title={t("designCases.hopeMedia.title")}
      />
    </article>
  );
}
