"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check,
  Lightbulb,
  Pause,
  Play,
  Quote,
  Send,
} from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";
import GalleryImage from "@/components/ui/GalleryImage";
import { ImageModal } from "@/components/ui/ImageModal";
import ReviewAvatar from "@/components/ui/ReviewAvatar";
import { useTranslation } from "@/lib/LanguageContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, caseBreadcrumbs } from "@/lib/case-breadcrumbs";
// Runtime import is limited to the tiny text helper: the registry index (all
// case records + the catalogue) stays a server-only dependency, so the case
// page bundle never carries the other cases' copy.
import { isKeyRef } from "@/data/case-records/types";
import type {
  CaseRecord,
  CaseSection,
  CaseText,
  Locale,
  RelatedCaseCard,
  ResolveText,
  ReviewCard,
} from "@/data/case-records";
import CaseBreadcrumbs from "./CaseBreadcrumbs";
import CaseHero from "./CaseHero";
import {
  CaseCompare,
  CaseFeatureList,
  CaseGallery,
  CaseGalleryGroups,
  CaseScenes,
  CaseVideoGrid,
  type OpenImages,
} from "./CaseMedia";
import RelatedCases from "./RelatedCases";

// Reveal without a blur pass: the blur filter is the expensive part of this
// animation and it is the first thing to misbehave under reduced motion.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

interface LightboxState {
  images: string[];
  index: number;
  title: string;
}

/**
 * Shared renderer for a reworked case detail page.
 *
 * Structure follows the agreed skeleton — breadcrumb → back link → hero →
 * task/solution → materials → results → review → team → next step → similar
 * work — but only the blocks present in the record are rendered: an absent
 * `sections` entry, review or team never produces an empty shell.
 *
 * The page is a client component (like the pages it replaces) so galleries,
 * sliders and players keep their interactivity; the copy still renders into
 * the server HTML because App Router server-renders client components.
 */
export default function CaseDetail({
  record,
  locale,
  related,
}: {
  record: CaseRecord;
  locale: Locale;
  related: RelatedCaseCard[];
}) {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);
  const [reviewPlaying, setReviewPlaying] = useState(false);
  const [reviewVideo, setReviewVideo] = useState<HTMLVideoElement | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  /**
   * Start playback and only announce "playing" once it really happens.
   *
   * `HTMLMediaElement.play()` returns a promise that REJECTS when the browser
   * cannot start (unsupported codec, autoplay policy, load failure). Setting
   * the state before that verdict would show "Pause audio review" while the
   * element is still paused — the reproduced defect. So:
   *   - resolved  → the element is playing → label "Pause" (and if it got
   *                 paused again in between, we keep the honest "Play");
   *   - rejected  → nothing started → state stays/reverts to "Play";
   *   - no promise (very old engines) → the `onPlay` event decides.
   * `onError` on the element covers failures that never reject a promise.
   */
  const startMedia = (el: HTMLMediaElement | null, setPlaying: (value: boolean) => void) => {
    if (!el) return;
    let attempt: unknown;
    try {
      attempt = el.play();
    } catch {
      setPlaying(false);
      return;
    }
    if (attempt && typeof (attempt as Promise<void>).then === "function") {
      (attempt as Promise<void>).then(
        () => setPlaying(!el.paused),
        () => setPlaying(false),
      );
    }
  };

  const toggleAudio = () => {
    const el = audioRef;
    if (!el) return;
    // Branch on the element (the physical state); the label follows the
    // `onPlay`/`onPause`/`onEnded` events, so it can never disagree with it.
    if (el.paused) startMedia(el, setAudioPlaying);
    else el.pause();
  };

  const L: ResolveText = (value) => (isKeyRef(value) ? t(value.key) : value[locale]);
  // Per-review avatar resolution lives inside `renderReviewCard`: grouped
  // reviews resolve the author per item, single reviews behave as before
  // (the generated avatar falls back to the resolved author name).

  const h1 = L(record.h1);
  const prefix = locale === "en" ? "/en" : "";
  const crumbs = caseBreadcrumbs({ direction: record.direction, h1, locale });
  const jsonLd = breadcrumbJsonLd(crumbs, locale === "en" ? record.enPath : record.uaPath);

  const openImages: OpenImages = (images, index, title) => setLightbox({ images, index, title });

  /**
   * Check-marked statement list. Shared by `results` (what the client got)
   * and `checklist` (the design pages' "підхід" block) — same visual, two
   * section kinds so their meaning and heading keys stay distinct.
   */
  const renderStatements = ({
    block,
    key,
    title,
    intro,
    items,
    columns,
    decorated,
  }: {
    block: string;
    key: number;
    title?: CaseText;
    intro?: CaseText;
    items: CaseText[];
    columns?: 1 | 2;
    decorated?: boolean;
  }) => (
    <section
      key={key}
      data-case-block={block}
      className={`py-16 px-4 ${decorated ? "relative" : ""}`}
    >
      {decorated && (
        <CurvedDashedLines glowColor={record.glow?.base ?? "rgba(99, 102, 241, 0.15)"} side="both" />
      )}
      <div className="max-w-4xl mx-auto">
        {(title || intro) && (
          <FadeIn y={30} blur={8}>
            {title && (
              <h2 className={`${intro ? "mb-4" : "mb-8"} text-center text-3xl font-bold text-foreground`}>
                {L(title)}
              </h2>
            )}
            {intro && (
              <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">{L(intro)}</p>
            )}
          </FadeIn>
        )}
        <ul className={columns === 2 ? "grid grid-cols-1 gap-4 md:grid-cols-2" : "grid grid-cols-1 gap-4"}>
          {items.map((item, itemIndex) => (
            <FadeIn as="li" key={itemIndex} delay={0.1 + itemIndex * 0.08} y={20} blur={4}>
              <div className="flex h-full items-start gap-4 rounded-xl border border-border bg-surface-elevated/50 p-5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-green-500/30 bg-green-500/20">
                  <Check size={14} className="text-green-500" />
                </div>
                <p className="text-sm leading-relaxed text-foreground">{L(item)}</p>
              </div>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );

  const renderSection = (section: CaseSection, index: number) => {
    switch (section.kind) {
      case "brief": {
        const cards = [
          {
            title: section.taskTitle ? L(section.taskTitle) : t("itCases.challenge"),
            body: L(section.task),
            className:
              "bg-surface-elevated/40 border border-red-500/25 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)] hover:border-red-500/50",
            icon: <AlertTriangle size={20} className="shrink-0 text-red-500" />,
          },
          {
            title: section.solutionTitle ? L(section.solutionTitle) : t("itCases.solution"),
            body: L(section.solution),
            className:
              "bg-surface-elevated/40 border border-green-500/25 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] hover:border-green-500/50",
            icon: <Lightbulb size={20} className="shrink-0 text-green-500" />,
          },
        ];
        return (
          <section key={index} className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {cards.map((card, cardIndex) => {
                  const body = (
                    <>
                      <h2 className="mb-4 flex items-center gap-4 text-xl font-semibold text-foreground">
                        {card.icon}
                        {card.title}
                      </h2>
                      <p className="leading-relaxed text-muted-foreground">{card.body}</p>
                    </>
                  );
                  // Reduced motion: both cards are simply there — no reveal,
                  // no hover zoom, nothing that can stay hidden.
                  if (reduceMotion) {
                    return (
                      <div key={cardIndex} data-case-block="brief" className={card.className}>
                        {body}
                      </div>
                    );
                  }
                  return (
                    <motion.div
                      key={cardIndex}
                      data-case-block="brief"
                      custom={cardIndex}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-60px" }}
                      variants={cardVariants}
                      whileHover={{ scale: 1.02 }}
                      className={card.className}
                    >
                      {body}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      }

      case "featureList":
        return (
          <CaseFeatureList key={index} section={section} glow={record.glow?.base} L={L} onOpenImages={openImages} />
        );

      case "compare":
        return <CaseCompare key={index} section={section} L={L} />;

      case "galleryGroups":
        return <CaseGalleryGroups key={index} section={section} L={L} onOpenImages={openImages} />;

      case "scenes":
        return <CaseScenes key={index} section={section} L={L} onOpenImages={openImages} />;

      case "gallery":
        return <CaseGallery key={index} section={section} L={L} onOpenImages={openImages} />;

      case "videoGrid":
        return <CaseVideoGrid key={index} section={section} L={L} />;

      case "results":
        if (section.items.length === 0) return null;
        return renderStatements({
          block: "results",
          key: index,
          title: section.title,
          items: section.items,
          columns: section.columns,
          decorated: section.decorated,
        });

      case "checklist":
        if (section.items.length === 0) return null;
        return renderStatements({
          block: "checklist",
          key: index,
          title: section.title,
          intro: section.intro,
          items: section.items,
          columns: section.columns,
          decorated: section.decorated,
        });

      case "prose": {
        const proseImage = section.image ?? null;
        return (
          <section key={index} data-case-block="prose" className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="featured-case-card rounded-2xl border border-border p-6 md:p-8" style={{ borderRadius: "16px" }}>
                {proseImage && (
                  <div
                    data-case-block="prose-image"
                    className="mb-6 cursor-pointer overflow-hidden rounded-xl border border-border bg-background"
                    onClick={() => openImages([proseImage.src], 0, section.title ? L(section.title) : "")}
                  >
                    <GalleryImage
                      src={proseImage.src}
                      alt={proseImage.alt ? L(proseImage.alt) : section.title ? L(section.title) : ""}
                      width={proseImage.w ?? 1200}
                      height={proseImage.h ?? 800}
                      openLabel={t("cases.ui.openImage")}
                      onOpen={() => openImages([proseImage.src], 0, section.title ? L(section.title) : "")}
                    />
                  </div>
                )}
                {section.title && (
                  <h2 className="mb-3 text-xl font-bold text-foreground">{L(section.title)}</h2>
                )}
                {section.subtitle && (
                  <p className="mb-2 text-sm font-semibold text-primary">{L(section.subtitle)}</p>
                )}
                {section.note && (
                  <p className="mb-3 text-sm text-muted-foreground">{L(section.note)}</p>
                )}
                <p className="leading-relaxed text-muted-foreground">{L(section.text)}</p>
              </div>
            </div>
          </section>
        );
      }

      case "links": {
        if (section.items.length === 0) return null;
        // An internal route may carry a localized pair so an EN page never
        // hands the visitor back to the UA tree (eva-code-reels → IT case).
        const resolveHref = (href: (typeof section.items)[number]["href"]) =>
          typeof href === "string" ? href : href[locale];
        const asCards = section.items.some((item) => item.title || item.text || item.image);
        return (
          <section key={index} data-case-block="links" className="py-16 px-4">
            <div className="mx-auto max-w-3xl">
              {section.title && (
                <h2 className="mb-6 text-center text-2xl font-bold text-foreground">{L(section.title)}</h2>
              )}
              {asCards ? (
                <div className="grid grid-cols-1 gap-6">
                  {section.items.map((item) => {
                    const cardImage = item.image ?? null;
                    const cardTitle = item.title ? L(item.title) : L(item.label);
                    return (
                    <div
                      key={resolveHref(item.href)}
                      className="featured-case-card rounded-2xl border border-border p-6 text-center md:p-8"
                      style={{ borderRadius: "20px" }}
                    >
                      {cardImage && (
                        <div
                          className="mb-5 overflow-hidden rounded-xl border border-border bg-background"
                          onClick={() => openImages([cardImage.src], 0, cardTitle)}
                        >
                          <GalleryImage
                            src={cardImage.src}
                            alt={cardImage.alt ? L(cardImage.alt) : cardTitle}
                            width={cardImage.w ?? 1200}
                            height={cardImage.h ?? 800}
                            openLabel={t("cases.ui.openImage")}
                            onOpen={() => openImages([cardImage.src], 0, cardTitle)}
                          />
                        </div>
                      )}
                      {item.icon === "telegram" && (
                        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#2AABEE]/30 bg-[#2AABEE]/15">
                          <Send size={22} className="text-[#2AABEE]" />
                        </div>
                      )}
                      {item.title && (
                        <h3 className="mb-3 text-2xl font-bold text-foreground">{L(item.title)}</h3>
                      )}
                      {item.text && (
                        <p className="mx-auto mb-7 max-w-lg text-muted-foreground">{L(item.text)}</p>
                      )}
                      <div className="flex justify-center">
                        {item.internal ? (
                          <Link
                            href={resolveHref(item.href)}
                            className="magnetic-button inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 font-semibold text-primary transition-all duration-500-0.5 hover:bg-primary/10"
                          >
                            {L(item.label)}
                            <ArrowRight size={18} />
                          </Link>
                        ) : (
                          <a
                            href={resolveHref(item.href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="magnetic-button inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 font-semibold text-primary transition-all duration-500-0.5 hover:bg-primary/10"
                          >
                            {L(item.label)}
                            <ArrowRight size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    );
                  })}
                </div>
              ) : (
                <ul className="flex flex-wrap justify-center gap-3">
                  {section.items.map((item) => (
                    <li key={resolveHref(item.href)}>
                      <a
                        href={resolveHref(item.href)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-semibold text-primary transition-colors duration-300 hover:border-accent/50"
                      >
                        {L(item.label)}
                        <ArrowRight size={14} />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      }

      default:
        return null;
    }
  };

  const toggleReviewVideo = () => {
    const video = reviewVideo;
    if (!video) return;
    // Same contract as the audio button: branch on the element, let the
    // events decide the label.
    if (video.paused) startMedia(video, setReviewPlaying);
    else video.pause();
  };

  /**
   * One review card, shared by the single-review layout and each item of a
   * review group (wine-festival pairs a proof video with a screenshot review
   * under one heading). The section heading belongs to the caller; a group
   * item's own extras (`label` on a video, quote under the player) are
   * rendered inside the card, exactly where the original page drew them.
   */
  const renderReviewCard = (review: ReviewCard) => {
    const author = "author" in review && review.author ? L(review.author) : "";
    const avatarName = ("avatarName" in review && review.avatarName) || author;

    if (review.kind === "video") {
      return (
        <div
          className="group/video featured-case-card relative overflow-hidden rounded-2xl border border-border p-4"
          style={{ borderRadius: "20px" }}
        >
          {review.label && (
            <span className="absolute right-6 top-6 z-10 rounded-full border border-[#EC4899]/30 bg-[#EC4899]/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
              {L(review.label)}
            </span>
          )}
          <div className="mx-auto w-full max-w-[280px]">
            <video
              ref={setReviewVideo}
              src={review.src}
              poster={review.poster}
              onPlay={() => setReviewPlaying(true)}
              onPause={() => setReviewPlaying(false)}
              onEnded={() => setReviewPlaying(false)}
              onError={() => setReviewPlaying(false)}
              onClick={toggleReviewVideo}
              className="aspect-[9/16] max-h-[560px] w-full cursor-pointer rounded-xl object-cover"
            />
          </div>
          <button
            onClick={toggleReviewVideo}
            className={`absolute inset-0 z-10 m-auto flex h-16 w-16 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-xl transition-all duration-300 ${
              reviewPlaying
                ? "pointer-events-none scale-90 opacity-0 md:group-hover/video:pointer-events-auto md:group-hover/video:scale-100 md:group-hover/video:opacity-100"
                : "scale-100 bg-white/25 opacity-100 group-hover/video:scale-110 group-hover/video:bg-white/25"
            }`}
            aria-label={reviewPlaying ? t("cases.ui.pause") : t("cases.ui.play")}
          >
            {reviewPlaying ? (
              <Pause size={24} className="text-white" fill="white" />
            ) : (
              <Play size={24} className="ml-1 text-white" fill="white" />
            )}
          </button>
          {(review.text || author || avatarName) && (
            <div className="px-2 pb-2 pt-6 text-center">
              {review.text && (
                <>
                  <Quote size={24} className="mx-auto mb-3 text-primary opacity-50" />
                  <p className="mb-4 text-base italic leading-relaxed text-foreground md:text-lg">
                    &ldquo;{L(review.text)}&rdquo;
                  </p>
                </>
              )}
              {(author || avatarName) && (
                <div className="flex items-center justify-center gap-3 border-t border-border pt-4">
                  {avatarName !== "" && (
                    <span data-case-block="review-avatar">
                      <ReviewAvatar name={avatarName} />
                    </span>
                  )}
                  {author && <p className="text-sm font-semibold text-primary">{author}</p>}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    if (review.kind === "audio") {
      return (
        <div
          className="featured-case-card relative rounded-2xl border border-border p-8"
          style={{ borderRadius: "20px" }}
        >
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={audioPlaying ? t("cases.ui.pauseAudioReview") : t("cases.ui.playAudioReview")}
              className="flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#A855F7]/40 bg-[#A855F7]/20 transition-all duration-300 hover:bg-[#A855F7]/30"
            >
              {audioPlaying ? (
                <Pause size={24} className="text-[#A855F7]" fill="#A855F7" />
              ) : (
                <Play size={24} className="ml-1 text-[#A855F7]" fill="#A855F7" />
              )}
            </button>
            <div className="flex-1">
              <audio
                ref={setAudioRef}
                src={review.src}
                onPlay={() => setAudioPlaying(true)}
                onPause={() => setAudioPlaying(false)}
                onEnded={() => setAudioPlaying(false)}
                onError={() => setAudioPlaying(false)}
                className="hidden"
              />
              {(author || ("avatarName" in review && review.avatarName)) && (
                <div className="mb-2 flex items-center gap-2">
                  {avatarName && (
                    <span data-case-block="review-avatar">
                      <ReviewAvatar name={avatarName} size={28} />
                    </span>
                  )}
                  {author && <p className="font-medium text-foreground">{author}</p>}
                </div>
              )}
              {review.caption && <p className="text-sm text-muted-foreground">{L(review.caption)}</p>}
            </div>
          </div>
        </div>
      );
    }
    // screenshot | text
    return (
      <div
        className="featured-case-card overflow-hidden rounded-2xl border border-border"
        style={{ borderRadius: "20px" }}
      >
        {review.kind === "screenshot" && (() => {
          const shots = [review.src, ...(review.more ?? [])];
          return (
            <div className="p-4">
              <div className={shots.length > 1 ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : ""}>
                {shots.map((src, i) => (
                  <Image
                    key={i}
                    src={src}
                    alt={i === 0 ? L(review.alt) : L(record.h1)}
                    width={review.w ?? 600}
                    height={review.h ?? 800}
                    className="h-auto w-full rounded-xl object-contain"
                  />
                ))}
              </div>
              {review.caption && (
                <p className="mt-2 text-center text-xs text-muted-foreground">{L(review.caption)}</p>
              )}
            </div>
          );
        })()}
        {(review.text || author || avatarName) && (
          <div className="px-6 pb-6 text-center md:px-8 md:pb-8">
            {review.text && (
              <>
                <Quote size={24} className="mx-auto mb-3 text-primary opacity-50" />
                <p className="mb-4 text-base italic leading-relaxed text-foreground md:text-lg">
                  &ldquo;{L(review.text)}&rdquo;
                </p>
              </>
            )}
            {(author || avatarName) && (
              <div className="flex items-center justify-center gap-3 border-t border-border pt-4">
                {avatarName !== "" && (
                  <span data-case-block="review-avatar">
                    <ReviewAvatar name={avatarName} />
                  </span>
                )}
                {author && <p className="text-sm font-semibold text-primary">{author}</p>}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="max-w-7xl px-4 pt-8">
        <CaseBreadcrumbs items={crumbs} label={t("cases.breadcrumb.label")} />
        {record.backToList && (
          <Link
            href={record.backToList.href[locale]}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <ArrowLeft size={16} />
            {L(record.backToList.label)}
          </Link>
        )}
      </div>

      <CaseHero record={record} L={L} />

      {record.sections.map(renderSection)}

      {record.review && (
        <section className="py-16 px-4" data-case-block="review">
          {record.review.kind === "group" ? (
            <div className="mx-auto max-w-4xl">
              {record.review.title && (
                <FadeIn y={30} blur={8}>
                  <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
                    {L(record.review.title)}
                  </h2>
                </FadeIn>
              )}
              <FadeIn delay={0.1} y={30} blur={6}>
                <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
                  {record.review.items.map((item, index) => (
                    <div key={index}>{renderReviewCard(item)}</div>
                  ))}
                </div>
              </FadeIn>
            </div>
          ) : (
            <div className="mx-auto max-w-lg">
              {record.review.title && (
                <FadeIn y={30} blur={8}>
                  <h2 className="mb-8 text-center text-3xl font-bold text-foreground">
                    {L(record.review.title)}
                  </h2>
                </FadeIn>
              )}
              <FadeIn delay={0.1} y={30} blur={6}>
                {renderReviewCard(record.review)}
              </FadeIn>
            </div>
          )}

        </section>
      )}

      {record.team && (
        <section className="py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <p className="mb-1 text-xs text-muted-foreground/60">{L(record.team.label)}</p>
            <p className="text-sm text-muted-foreground">{L(record.team.value)}</p>
          </div>
        </section>
      )}

      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn y={30} blur={8}>
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{t("itCases.nextStep")}</h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">{t("itCases.nextStepDesc")}</p>
            <a
              href={siteConfig.telegram.consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-button inline-flex items-center gap-2 rounded-full border border-border px-8 py-4 font-semibold text-primary transition-all duration-500-0.5 hover:border-[#6366F1]/50 hover:bg-primary/10 hover:text-indigo-400 hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]"
            >
              {t("itCases.nextStepCta")}
              <ArrowRight size={18} />
            </a>
            <div className="mt-6">
              <Link
                href={`${prefix}/services/${record.direction}#cases`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {t("cases.allCases")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <RelatedCases items={related} />

      <ImageModal
        images={lightbox?.images ?? []}
        currentIndex={lightbox?.index ?? 0}
        isOpen={lightbox !== null}
        onClose={() => setLightbox(null)}
        onPrev={() =>
          setLightbox((state) =>
            state ? { ...state, index: (state.index - 1 + state.images.length) % state.images.length } : state,
          )
        }
        onNext={() =>
          setLightbox((state) =>
            state ? { ...state, index: (state.index + 1) % state.images.length } : state,
          )
        }
        title={lightbox?.title ?? ""}
        closeLabel={t("cases.ui.close")}
        prevLabel={t("cases.ui.previous")}
        nextLabel={t("cases.ui.next")}
      />
    </article>
  );
}
