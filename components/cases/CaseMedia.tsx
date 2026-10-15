"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, MoveRight, Play, X } from "lucide-react";
import { FadeIn, staggerDelay } from "@/components/ui/FadeIn";
import CurvedDashedLines from "@/components/ui/CurvedDashedLines";
import GalleryImage from "@/components/ui/GalleryImage";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { useTranslation } from "@/lib/LanguageContext";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import type {
  CompareItem,
  CompareSection,
  FeatureListSection,
  GalleryGroupsSection,
  GallerySection,
  MediaImage,
  ResolveText,
  SceneSection,
  VideoGridItem,
  VideoGridSection,
} from "@/data/case-records";

export type OpenImages = (images: string[], index: number, title: string) => void;

const DEFAULT_GLOW = "rgba(99, 102, 241, 0.15)";

/* ───────────────────────── component breakdown (IT) ───────────────────────── */

export function CaseFeatureList({
  section,
  glow = DEFAULT_GLOW,
  L,
  onOpenImages,
}: {
  section: FeatureListSection;
  glow?: string;
  L: ResolveText;
  onOpenImages: OpenImages;
}) {
  const { t } = useTranslation();
  const reduceMotion = usePrefersReducedMotion();
  return (
    <section className="relative py-16 px-4" data-case-block="featureList">
      {section.decorated && <CurvedDashedLines glowColor={glow} side="both" />}
      <div className="max-w-4xl mx-auto">
        {section.title && (
          <FadeIn y={30} blur={8}>
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">{L(section.title)}</h2>
          </FadeIn>
        )}
        <div className="space-y-8">
          {section.items.map((item, index) => {
            const images = item.images ?? [];
            const alt = L(item.title);
            return (
              <FadeIn key={index} delay={staggerDelay(index)} y={30} blur={4}>
                <div
                  data-case-block="feature"
                  className={`featured-case-card p-6 md:p-8 ${item.link ? "pb-10 md:pb-12" : ""}`}
                  style={{ borderRadius: "16px" }}
                >
                  <h3 className="mb-3 text-xl font-bold text-foreground">{L(item.title)}</h3>
                  {item.desc && <p className="leading-relaxed text-muted-foreground">{L(item.desc)}</p>}

                  {images.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 gap-4">
                      {images.map((img, imageIndex) => {
                        const open = () => onOpenImages(images.map((i) => i.src), imageIndex, alt);
                        // The enclosing FadeIn card already owns the reveal;
                        // a nested whileInView here would animate the same
                        // properties a second time and lag low-end devices.
                        return (
                          <div
                            key={imageIndex}
                            data-case-block="feature-image"
                            className={`relative cursor-pointer overflow-hidden rounded-xl border border-border bg-background transition-transform duration-300 ${reduceMotion ? "" : "hover:scale-[1.02]"}`}
                            onClick={open}
                          >
                            <GalleryImage
                              src={img.src}
                              alt={img.alt ? L(img.alt) : alt}
                              width={img.w ?? 1200}
                              height={img.h ?? 800}
                              className="w-full object-cover"
                              openLabel={t("cases.ui.openImage")}
                              onOpen={open}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {item.slider && (
                    <div className="mt-6" data-case-block="feature-slider">
                      <BeforeAfterSlider
                        beforeSrc={item.slider.before}
                        afterSrc={item.slider.after}
                        beforeAlt={alt}
                        afterAlt={alt}
                      />
                    </div>
                  )}

                  {item.link && (
                    <a
                      href={item.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors duration-300 hover:text-indigo-400"
                    >
                      {L(item.link.label)}
                      <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── before / after ───────────────────────── */

export function CaseCompare({ section, L }: { section: CompareSection; L: ResolveText }) {
  // Record order is the document order. Consecutive sliders still share one
  // grid, but a static pair sitting between two sliders stays between them —
  // items are never re-grouped by mode.
  const runs: Array<{ mode: CompareItem["mode"]; items: CompareItem[] }> = [];
  for (const item of section.items) {
    const last = runs[runs.length - 1];
    if (last && last.mode === item.mode) last.items.push(item);
    else runs.push({ mode: item.mode, items: [item] });
  }
  let order = 0;

  return (
    <section className="py-16 px-4" data-case-block="compare">
      <div className="max-w-5xl mx-auto">
        <FadeIn y={30} blur={8}>
          {section.title && (
            <h2 className="mb-4 text-center text-3xl font-bold text-foreground">{L(section.title)}</h2>
          )}
          {section.intro && (
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{L(section.intro)}</p>
          )}
        </FadeIn>

        <div className="flex flex-col gap-10">
          {runs.map((run, runIndex) => {
            const items = run.items.map((item) => ({ item, position: order++ }));
            if (run.mode === "slider") {
              return (
                <div key={runIndex} className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {items.map(({ item, position }) => (
                    <FadeIn key={position} delay={staggerDelay(position)} y={30} blur={4}>
                      <div data-case-block="compare-item">
                        {item.title && (
                          <p className="mb-3 text-center text-sm font-semibold text-foreground">{L(item.title)}</p>
                        )}
                        {item.caption && (
                          <p className="mb-4 text-center text-xs text-muted-foreground">{L(item.caption)}</p>
                        )}
                        <BeforeAfterSlider
                          beforeSrc={item.before}
                          afterSrc={item.after}
                          beforeAlt={item.title ? L(item.title) : ""}
                          afterAlt={item.title ? L(item.title) : ""}
                          aspectClassName={item.aspect ?? "aspect-[16/10]"}
                        />
                      </div>
                    </FadeIn>
                  ))}
                </div>
              );
            }
            return (
              <div key={runIndex} className="flex flex-col gap-10">
                {items.map(({ item, position }) => {
                  const alt = item.title ? L(item.title) : "";
                  return (
                    <FadeIn key={position} delay={staggerDelay(position)} y={30} blur={4}>
                      <div data-case-block="compare-item">
                        {item.title && (
                          <p className="mb-3 text-center text-sm font-semibold text-foreground">{L(item.title)}</p>
                        )}
                        {item.caption && (
                          <p className="mb-4 text-center text-xs text-muted-foreground">{L(item.caption)}</p>
                        )}
                        <div className="mx-auto grid max-w-lg grid-cols-2 gap-4">
                          <div className="relative overflow-hidden rounded-2xl bg-background">
                            <Image
                              src={item.before}
                              alt={alt}
                              width={item.w ?? 1200}
                              height={item.h ?? 1600}
                              className="h-auto w-full object-cover"
                              draggable={false}
                            />
                          </div>
                          <div className="relative overflow-hidden rounded-2xl bg-background">
                            <Image
                              src={item.after}
                              alt={alt}
                              width={item.w ?? 1200}
                              height={item.h ?? 1600}
                              className="h-auto w-full object-cover"
                              draggable={false}
                            />
                          </div>
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── gallery ───────────────────────── */

/** One image card of a gallery: media + optional per-item title/caption. */
function GalleryCard({
  item,
  onOpen,
  fallbackAlt,
  openLabel,
  L,
}: {
  item: MediaImage;
  onOpen: () => void;
  fallbackAlt: string;
  openLabel: string;
  L: ResolveText;
}) {
  const alt = item.alt ? L(item.alt) : item.title ? L(item.title) : fallbackAlt;
  const maxWidthClass =
    item.presentation?.maxWidth === "280px"
      ? "mx-auto max-w-[280px]"
      : item.presentation?.maxWidth === "md"
        ? "mx-auto max-w-md"
        : "";
  return (
    <div
      data-case-block="gallery-item"
      className="featured-case-card rounded-2xl border border-border p-3"
      style={{ borderRadius: "16px" }}
    >
      {item.presentation?.splitMobile ? (
        // Original `WideImage` for `mobileSplitItems`: the whole layout on
        // desktop, two halves of the same file side by side on mobile. The
        // halves are display-only — the full image stays clickable and is
        // what the lightbox opens.
        <>
          <div className="relative hidden overflow-hidden rounded-xl border border-border bg-background md:block">
            <GalleryImage
              src={item.src}
              alt={alt}
              width={item.w ?? 1200}
              height={item.h ?? 800}
              openLabel={openLabel}
              onOpen={onOpen}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {([0, 1] as const).map((half) => {
              const suffix = item.presentation?.splitAlt
                ? ` ${L(half === 0 ? item.presentation.splitAlt.left : item.presentation.splitAlt.right)}`
                : "";
              return (
                <div
                  key={half}
                  data-case-split-part={half === 0 ? "left" : "right"}
                  className="relative overflow-hidden rounded-xl border border-border bg-background"
                  style={{ aspectRatio: `${(item.w ?? 2400) / 2} / ${item.h ?? 800}` }}
                >
                  <Image
                    src={item.src}
                    alt={`${alt}${suffix}`}
                    width={(item.w ?? 2400) / 2}
                    height={item.h ?? 800}
                    className="absolute top-0 h-full w-auto max-w-none"
                    style={{ left: half === 0 ? 0 : "-100%" }}
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className={`relative overflow-hidden rounded-xl border border-border bg-background ${maxWidthClass}`}>
          <GalleryImage
            src={item.src}
            alt={alt}
            width={item.w ?? 1200}
            height={item.h ?? 800}
            openLabel={openLabel}
            onOpen={onOpen}
          />
        </div>
      )}
      {item.title && <p className="mt-3 text-sm font-semibold text-foreground">{L(item.title)}</p>}
      {item.caption && <p className="mt-1 text-xs text-muted-foreground">{L(item.caption)}</p>}
    </div>
  );
}

/** Grid classes per recorded column count. A single narrow item keeps the
 *  original `max-w-xl` container so a 1000×1000 logo does not stretch. */
function galleryGrid(section: GallerySection): string {
  if (section.columns === 1) {
    return section.items.length === 1
      ? "mx-auto grid max-w-xl grid-cols-1 gap-6"
      : "grid grid-cols-1 gap-6";
  }
  if (section.columns === 2) return "grid grid-cols-1 gap-6 md:grid-cols-2";
  return "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6";
}

export function CaseGallery({
  section,
  L,
  onOpenImages,
}: {
  section: GallerySection;
  L: ResolveText;
  onOpenImages: OpenImages;
}) {
  const { t } = useTranslation();
  const sources = section.items.map((item) => item.src);
  const fallbackAlt = section.title ? L(section.title) : "";

  return (
    <section className="py-16 px-4" data-case-block="gallery">
      <div className="max-w-6xl mx-auto">
        <FadeIn y={30} blur={8}>
          {section.title && (
            <h2 className="mb-4 text-center text-3xl font-bold text-foreground">{L(section.title)}</h2>
          )}
          {section.intro && (
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{L(section.intro)}</p>
          )}
        </FadeIn>

        <div className={galleryGrid(section)}>
          {section.items.map((item, index) => (
            <FadeIn
              key={index}
              delay={staggerDelay(index)}
              y={30}
              blur={4}
              // Original pages: `md:col-span-2` in two-column grids,
              // `md:col-span-3` (full row) in three-column ones.
              className={item.wide ? (section.columns === 3 ? "md:col-span-3" : "md:col-span-2") : undefined}
            >
              <GalleryCard
                item={item}
                L={L}
                openLabel={t("cases.ui.openImage")}
                fallbackAlt={fallbackAlt || t("cases.openMedia")}
                onOpen={() => onOpenImages(sources, index, fallbackAlt || t("cases.openMedia"))}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/** `finalGroups`: a parent heading plus one sub-heading per group. */
export function CaseGalleryGroups({
  section,
  L,
  onOpenImages,
}: {
  section: GalleryGroupsSection;
  L: ResolveText;
  onOpenImages: OpenImages;
}) {
  const { t } = useTranslation();
  const flat = section.groups.flatMap((group) => group.items);
  const sources = flat.map((item) => item.src);
  const fallbackAlt = section.title ? L(section.title) : "";
  let cursor = 0;

  return (
    <section className="py-16 px-4" data-case-block="galleryGroups">
      <div className="max-w-5xl mx-auto">
        <FadeIn y={30} blur={8}>
          {section.title && (
            <h2 className="mb-4 text-center text-3xl font-bold text-foreground">{L(section.title)}</h2>
          )}
          {section.intro && (
            <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">{L(section.intro)}</p>
          )}
        </FadeIn>

        {section.groups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-10">
            <FadeIn y={20} blur={4} className="mb-6">
              <h3 className="mb-2 flex items-center gap-3 text-2xl font-bold text-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {group.title ? L(group.title) : ""}
              </h3>
              {group.intro && (
                <p className="max-w-3xl leading-relaxed text-muted-foreground">{L(group.intro)}</p>
              )}
            </FadeIn>
            <div className="grid grid-cols-1 gap-6">
              {group.items.map((item) => {
                const index = cursor++;
                return (
                  <FadeIn key={index} delay={staggerDelay(index, 0.05, 3)} y={30} blur={4}>
                    <GalleryCard
                      item={item}
                      L={L}
                      openLabel={t("cases.ui.openImage")}
                      fallbackAlt={fallbackAlt}
                      onOpen={() => onOpenImages(sources, index, fallbackAlt || t("cases.openMedia"))}
                    />
                  </FadeIn>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── scenes (numbered stages) ───────────────────────── */

/** Accent palette of the scene cards — the original page used red / lime. */
const SCENE_ACCENTS: Record<string, { card: string; eyebrow: string; line: string }> = {
  red: {
    card: "border-red-500/25 hover:border-red-500/50 hover:shadow-[0_0_40px_rgba(239,68,68,0.1)]",
    eyebrow: "text-red-400",
    line: "from-red-500/50",
  },
  lime: {
    card: "border-lime-500/25 hover:border-lime-500/50 hover:shadow-[0_0_40px_rgba(132,204,22,0.1)]",
    eyebrow: "text-lime-400",
    line: "from-lime-500/50",
  },
};
const SCENE_DEFAULT_ACCENT = { card: "border-border", eyebrow: "text-muted-foreground", line: "from-border" };

/** Static classes: Tailwind cannot see a dynamically composed `origin-*`. */
const SCENE_DETAIL_ORIGIN: Record<"left" | "center" | "right", string> = {
  left: "origin-left",
  center: "origin-center",
  right: "origin-right",
};

/**
 * Numbered stages of one project — the artwork, then the same design in use.
 *
 * `details` are display-only crops of the scene image (same file, 16:9,
 * object-position framing) shown on small screens, exactly as the original
 * page rendered its "Ключові зони макета" block. The full image stays
 * clickable and is what the lightbox opens.
 */
export function CaseScenes({
  section,
  L,
  onOpenImages,
}: {
  section: SceneSection;
  L: ResolveText;
  onOpenImages: OpenImages;
}) {
  const { t } = useTranslation();
  const sources = section.items.map((item) => item.image.src);
  const fallbackAlt = section.title ? L(section.title) : "";

  return (
    <section className="relative overflow-hidden py-16 px-4" data-case-block="scenes">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_35%,rgba(239,68,68,0.08),transparent_28%),radial-gradient(circle_at_72%_65%,rgba(132,204,22,0.08),transparent_30%)]" />
      <div className="relative mx-auto max-w-7xl">
        <FadeIn y={30} blur={8}>
          {section.title && (
            <h2 className="mb-4 text-center text-3xl font-bold text-foreground">{L(section.title)}</h2>
          )}
          {section.intro && (
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{L(section.intro)}</p>
          )}
        </FadeIn>

        <div className="relative grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {section.items.length >= 2 && (
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-12 z-10 hidden h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-red-500/40 bg-background shadow-[0_0_30px_rgba(239,68,68,0.16)] lg:flex"
            >
              <MoveRight size={20} className="text-red-400" />
            </div>
          )}

          {section.items.map((item, index) => {
            const accent = SCENE_ACCENTS[item.accent ?? ""] ?? SCENE_DEFAULT_ACCENT;
            const alt = item.image.alt ? L(item.image.alt) : item.image.title ? L(item.image.title) : fallbackAlt;
            return (
              <FadeIn key={index} delay={staggerDelay(index)} y={30} blur={4}>
                <div
                  data-case-block="scene"
                  className={`featured-case-card rounded-2xl border p-4 shadow-[0_0_60px_rgba(132,204,22,0.07)] transition-all duration-300 md:p-6 ${accent.card}`}
                >
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${accent.eyebrow}`}>
                      {item.number != null && `${String(item.number).padStart(2, "0")} / `}
                      {item.stage ? L(item.stage) : ""}
                    </span>
                    <span className={`h-px flex-1 bg-gradient-to-r to-transparent ${accent.line}`} />
                  </div>
                  {item.title && <h3 className="mb-3 text-2xl font-bold text-foreground">{L(item.title)}</h3>}
                  {item.intro && (
                    <p className="mb-6 leading-relaxed text-muted-foreground">{L(item.intro)}</p>
                  )}

                  <div
                    data-case-block="scene-image"
                    className="relative cursor-pointer overflow-hidden rounded-xl border border-border bg-background"
                    onClick={() => onOpenImages(sources, index, alt || t("cases.openMedia"))}
                  >
                    <GalleryImage
                      src={item.image.src}
                      alt={alt}
                      width={item.image.w ?? 1600}
                      height={item.image.h ?? 900}
                      openLabel={t("cases.ui.openImage")}
                      onOpen={() => onOpenImages(sources, index, alt || t("cases.openMedia"))}
                    />
                  </div>
                  {item.image.title && (
                    <p className="mt-4 text-sm font-semibold text-foreground">{L(item.image.title)}</p>
                  )}
                  {item.image.caption && (
                    <p className="mt-1 text-xs text-muted-foreground">{L(item.image.caption)}</p>
                  )}

                  {item.details && item.details.length > 0 && (
                    <div data-case-block="scene-details" className="mt-6 border-t border-border pt-5 md:hidden">
                      {item.detailsTitle && (
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground">
                          {L(item.detailsTitle)}
                        </p>
                      )}
                      <div className="grid gap-3">
                        {item.details.map((detail, detailIndex) => (
                          <figure key={detailIndex} data-case-block="scene-detail">
                            <div className="relative aspect-[16/9] overflow-hidden rounded-lg border border-border bg-black">
                              <Image
                                src={item.image.src}
                                alt={L(detail.alt)}
                                fill
                                sizes="(max-width: 768px) calc(100vw - 64px)"
                                className={`scale-[2.15] object-cover ${SCENE_DETAIL_ORIGIN[detail.origin] ?? "origin-center"}`}
                                draggable={false}
                              />
                            </div>
                            <figcaption className="mt-2 text-xs text-muted-foreground">{L(detail.alt)}</figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── video grid ───────────────────────── */

export function CaseVideoGrid({
  section,
  ratio = "16/9",
  L,
}: {
  section: VideoGridSection;
  ratio?: string;
  L: ResolveText;
}) {
  const [fullscreen, setFullscreen] = useState<{ src: string; opener: HTMLElement | null } | null>(null);

  return (
    <section className="py-16 px-4" data-case-block="videoGrid">
      <div className="max-w-6xl mx-auto">
        {(section.title || section.intro) && (
          <FadeIn y={30} blur={8}>
            {section.title && (
              <h2 className="mb-4 text-center text-3xl font-bold text-foreground">{L(section.title)}</h2>
            )}
            {section.intro && (
              <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">{L(section.intro)}</p>
            )}
          </FadeIn>
        )}
        <VideoTiles
          items={section.items}
          ratio={section.ratio ?? ratio}
          L={L}
          onOpen={(src, opener) => setFullscreen({ src, opener })}
          className={
            section.items.length >= 3
              ? "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
              : section.items.length === 1
                ? "mx-auto grid max-w-3xl grid-cols-1 gap-4"
                : "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
          }
        />

        {fullscreen && (
          <FullscreenVideo src={fullscreen.src} opener={fullscreen.opener} onClose={() => setFullscreen(null)} />
        )}
      </div>
    </section>
  );
}

/**
 * Fullscreen player for the hero / section video grids.
 *
 * Dialog contract (mirrors `ImageModal`, which already does this for the
 * image lightbox):
 *   - `role="dialog"` + `aria-modal` + a localized accessible name;
 *   - everything outside the dialog is `inert` and `aria-hidden`, so the
 *     background tiles cannot take focus (reported defect: Shift+Tab from the
 *     close button reached a background tile);
 *   - Tab / Shift+Tab cycle inside the player, and focus that somehow lands
 *     outside is pulled back in;
 *   - the page behind cannot scroll while the player is open;
 *   - Escape closes it and focus returns to the tile that opened it;
 *   - on close every one of those changes is restored (inert flags, body
 *     overflow, previous focus).
 */
export function FullscreenVideo({
  src,
  opener,
  onClose,
}: {
  src: string;
  /** The tile that opened the player — focus returns there on close. */
  opener?: HTMLElement | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    // WebKit does not move focus to a <button> on click, so `previousFocus`
    // is often <body> there: the clicked tile is the reliable target.
    const restoreTarget =
      opener && opener.isConnected
        ? opener
        : previousFocus && previousFocus !== document.body
          ? previousFocus
          : null;

    // Isolate the background: walk up to <body> and mark every sibling of the
    // dialog's ancestor chain as inert (same walk ImageModal performs).
    const isolated: Array<{ element: HTMLElement; inert: boolean; ariaHidden: string | null }> = [];
    let current: HTMLElement | null = dialog;
    while (current?.parentElement) {
      const parent = current.parentElement;
      for (const sibling of Array.from(parent.children)) {
        if (sibling === current || !(sibling instanceof HTMLElement)) continue;
        isolated.push({
          element: sibling,
          inert: sibling.inert,
          ariaHidden: sibling.getAttribute("aria-hidden"),
        });
        sibling.inert = true;
        sibling.setAttribute("aria-hidden", "true");
      }
      if (parent === document.body) break;
      current = parent;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          "button:not([disabled]), a[href], video[controls], input:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!first) {
        event.preventDefault();
        return;
      }
      // Focus escaped the dialog (or never entered it) — bring it back.
      if (!dialog.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      for (const { element, inert, ariaHidden } of isolated) {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      }
      if (restoreTarget) restoreTarget.focus();
      else previousFocus?.focus();
    };
  }, [onClose, opener]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("cases.ui.player")}
      data-case-block="fullscreen-player"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        onClick={onClose}
        className="absolute right-4 top-4 z-10 text-white/70 transition-colors hover:text-white"
        aria-label={t("cases.ui.close")}
      >
        <X size={32} />
      </button>
      <video
        src={src}
        className="h-full max-h-[90vh] w-full max-w-4xl rounded-xl object-contain"
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

/** Tiles shared by the hero grid and a video-grid section. */
export function VideoTiles({
  items,
  ratio,
  L,
  onOpen,
  className = "grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5",
}: {
  items: VideoGridItem[];
  ratio: string;
  L: ResolveText;
  onOpen: (src: string, opener: HTMLElement | null) => void;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index} className="flex flex-col">
          <button
            type="button"
            data-case-block="video-tile"
            className="group/thumb relative block w-full cursor-pointer overflow-hidden rounded-xl bg-background text-left"
            onClick={(event) => onOpen(item.src, event.currentTarget)}
            aria-label={t("cases.ui.openVideo")}
          >
            <video
              src={item.src}
              className="h-full w-full object-cover"
              style={{ aspectRatio: ratio, maxHeight: ratio === "9/16" ? "560px" : undefined }}
              muted
              preload="metadata"
              poster={item.poster}
              aria-label={t("cases.ui.openVideo")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 transition-all duration-300 group-hover/thumb:from-black/70 group-hover/thumb:via-black/20 group-hover/thumb:to-black/30" />
            {(item.duration || item.format) && (
              <div className="absolute right-3 top-3 flex gap-1.5">
                {item.duration && (
                  <span className="rounded-full border border-border bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                    {L(item.duration)}
                  </span>
                )}
                {item.format && (
                  <span className="rounded-full border border-[#EAB308]/30 bg-[#EAB308]/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-md">
                    {item.format}
                  </span>
                )}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-lg shadow-black/20 transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:border-white/40 group-hover/thumb:bg-white/20 backdrop-blur-sm">
                <Play size={26} className="ml-1 fill-white text-white" />
              </div>
            </div>
          </button>
          {item.label && (
            <div className="mt-3 text-center">
              <p className="text-sm text-muted-foreground">{L(item.label)}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
