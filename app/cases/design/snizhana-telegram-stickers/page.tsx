"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  AlertTriangle,
  Lightbulb,
  Quote,
  Send,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";
import GalleryImage from "@/components/ui/GalleryImage";
import { ImageModal } from "@/components/ui/ImageModal";
import { useTranslation } from "@/lib/LanguageContext";
import RelatedProjectsSection from "@/components/sections/RelatedProjectsSection";
import ReviewAvatar from "@/components/ui/ReviewAvatar";

const STICKER_PACK_URL = "https://t.me/addstickers/Sn071225ka";

const galleryItems = [
  { src: "/media/cases/snizhana-telegram-stickers/sticker-02.png", w: 510, h: 392 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-03.png", w: 474, h: 464 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-04.png", w: 468, h: 436 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-05.png", w: 470, h: 498 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-06.png", w: 480, h: 422 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-07.png", w: 492, h: 462 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-08.png", w: 478, h: 482 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-10.png", w: 484, h: 470 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-11.png", w: 408, h: 462 },
  { src: "/media/cases/snizhana-telegram-stickers/sticker-13.png", w: 484, h: 366 },
];

const allImages = galleryItems.map((item) => item.src);

const results = [
  "designCases.snizhanaStickers.result1",
  "designCases.snizhanaStickers.result2",
  "designCases.snizhanaStickers.result3",
  "designCases.snizhanaStickers.result4",
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

export default function SnizhanaTelegramStickersPage() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const [modalState, setModalState] = useState<{ images: string[]; index: number }>({
    images: [],
    index: 0,
  });

  const openModal = (images: string[], index: number) => setModalState({ images, index });
  const closeModal = () => setModalState({ images: [], index: 0 });
  const goToPrev = () =>
    setModalState((s) => ({ ...s, index: s.index > 0 ? s.index - 1 : s.images.length - 1 }));
  const goToNext = () =>
    setModalState((s) => ({ ...s, index: s.index < s.images.length - 1 ? s.index + 1 : 0 }));

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
          {t("designCases.snizhanaStickers.backToList")}
        </Link>
      </div>

      <section ref={heroRef} className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeIn y={30} blur={8}>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
              {t("designCases.snizhanaStickers.category")}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
              {t("designCases.snizhanaStickers.title")}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed mb-10">
              {t("designCases.snizhanaStickers.subtitle")}
            </p>
          </FadeIn>

          <div
            className="featured-case-card border border-border rounded-2xl relative"
            style={
              {
                "--case-glow": "rgba(42, 171, 238, 0.12)",
                "--case-glow-strong": "rgba(42, 171, 238, 0.28)",
              } as React.CSSProperties
            }
          >
            <motion.div
              className="px-4 py-8 md:px-10 md:py-12"
              style={{
                scale: mockupScale,
                y: mockupY,
                opacity: mockupOpacity,
                rotateX: mockupRotateX,
                perspective: 1200,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-xl overflow-hidden bg-background max-w-[560px] mx-auto border border-border"
                style={{ boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.35)" }}
              >
                <Image
                  src="/media/cases/snizhana-telegram-stickers/sticker-01.png"
                  alt={t("designCases.snizhanaStickers.title")}
                  width={506}
                  height={386}
                  className="w-full h-auto object-contain"
                  priority
                  draggable={false}
                />
              </motion.div>
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
                {t("designCases.snizhanaStickers.challenge")}
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
                {t("designCases.snizhanaStickers.solution")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn y={30} blur={8}>
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              {t("designCases.snizhanaStickers.galleryTitle")}
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              {t("designCases.snizhanaStickers.galleryDesc")}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {galleryItems.map((item, i) => (
              <FadeIn key={item.src} delay={0.05 + (i % 3) * 0.1} y={30} blur={4}>
                <div
                  className="featured-case-card border border-border rounded-2xl p-4"
                  style={{ borderRadius: "16px" }}
                >
                  <div className="relative rounded-xl border border-border bg-background overflow-hidden">
                    <GalleryImage
                      src={item.src}
                      alt={t("designCases.snizhanaStickers.title")}
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

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn y={30} blur={8}>
            <div
              className="featured-case-card border border-border rounded-2xl p-8 md:p-10 text-center"
              style={
                {
                  borderRadius: "20px",
                  "--case-glow": "rgba(42, 171, 238, 0.12)",
                  "--case-glow-strong": "rgba(42, 171, 238, 0.28)",
                } as React.CSSProperties
              }
            >
              <div className="w-12 h-12 rounded-full bg-[#2AABEE]/15 border border-[#2AABEE]/30 flex items-center justify-center mx-auto mb-5">
                <Send size={22} className="text-[#2AABEE]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t("designCases.snizhanaStickers.packTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-7 max-w-lg mx-auto">
                {t("designCases.snizhanaStickers.packDesc")}
              </p>
              <a
                href={STICKER_PACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-button inline-flex items-center gap-2 border border-border text-[#2AABEE] hover:border-[#2AABEE]/50 hover:bg-[#2AABEE]/10 hover:text-[#229ED9] font-semibold px-8 py-4 rounded-full transition-all duration-500-0.5 hover:shadow-[0_0_40px_rgba(42,171,238,0.12)]"
              >
                {t("designCases.snizhanaStickers.packCta")}
                <ArrowRight size={18} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 px-4 relative">
        <CurvedDashedLines glowColor="rgba(42, 171, 238, 0.12)" side="both" />
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
              {t("designCases.snizhanaStickers.reviewTitle")}
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} y={30} blur={6}>
            <div
              className="featured-case-card border border-border rounded-2xl p-8 md:p-12 text-center"
              style={{ borderRadius: "20px" }}
            >
              <Quote size={32} className="text-[#2AABEE] mx-auto mb-6 opacity-50" />
              <p className="text-foreground text-lg md:text-xl italic leading-relaxed mb-6">
                &ldquo;{t("designCases.snizhanaStickers.reviewText")}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <ReviewAvatar name={t("designCases.snizhanaStickers.reviewAuthor")} />
                <p className="text-[#2AABEE] font-semibold">
                  {t("designCases.snizhanaStickers.reviewAuthor")}
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
              className="magnetic-button inline-flex items-center gap-2 border border-border text-[#2AABEE] hover:border-[#2AABEE]/50 hover:bg-[#2AABEE]/10 hover:text-[#229ED9] font-semibold px-8 py-4 rounded-full transition-all duration-500-0.5 hover:shadow-[0_0_40px_rgba(42,171,238,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
          </FadeIn>
        </div>
      </section>

      <RelatedProjectsSection currentSlug="snizhana-telegram-stickers" section="design" />

      <ImageModal
        images={modalState.images}
        currentIndex={modalState.index}
        isOpen={modalState.images.length > 0}
        onClose={closeModal}
        onPrev={goToPrev}
        onNext={goToNext}
        title={t("designCases.snizhanaStickers.title")}
      />
    </article>
  );
}
