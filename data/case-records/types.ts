// Shared, typed model for detail case pages (Package 4).
//
// One record = one case detail page in BOTH languages. The record is the
// source for the page body, the metadata (title/description/OG/Twitter),
// the visible breadcrumb + its JSON-LD, and the EN sitemap entry. Card text
// for the catalogues keeps living in lib/i18n.ts (titleKey/descriptionKey of
// data/*Cases.ts) — a record never duplicates it.
//
// Text resolution: a CaseText is either a dictionary key (existing,
// already translated copy — no duplication) or a literal uk/en pair written
// in the record (new editorial copy). Nothing else is allowed, so an EN page
// can never render Ukrainian text by accident.
//
// Empty blocks are not rendered: `sections`, `review`, `team`, `badge` and
// every optional field inside a section are skipped when absent. A record
// never carries a placeholder block just to fit a template.

export type Locale = "uk" | "en";
export type Direction = "it" | "design" | "video";
export type Localized<T> = { uk: T; en: T };

/** Text stored either in the dictionary or directly in the record. */
export type CaseText = { key: string } | { uk: string; en: string };

/** Reference an existing dictionary key (lib/i18n.ts). */
export function key(value: string): CaseText {
  return { key: value };
}

/** Literal copy written in the record, already translated for both locales. */
export function text(uk: string, en: string): CaseText {
  return { uk, en };
}

/** Resolver passed down to the media blocks. */
export type ResolveText = (value: CaseText) => string;

export function isKeyRef(value: CaseText): value is { key: string } {
  return typeof (value as { key?: unknown }).key === "string";
}

/** Resolve a CaseText for a locale. `dict` is the locale dictionary. */
export function resolveText(value: CaseText, locale: Locale, dict: Record<string, string>): string {
  if (isKeyRef(value)) return dict[value.key] ?? value.key;
  return value[locale];
}

/* ───────────────────────── media ───────────────────────── */

export interface MediaImage {
  src: string;
  w?: number;
  h?: number;
  alt?: CaseText;
  /** Optional per-item caption shown under the image (design galleries). */
  title?: CaseText;
  caption?: CaseText;
  /** Span the full row (design galleries that mark an item as `wide`). */
  wide?: boolean;
  /**
   * Display-only presentation taken from the original page. The file itself
   * is never altered or duplicated in the data: the full image stays in the
   * gallery list and in the lightbox.
   */
  presentation?: {
    /**
     * Original `WideImage`/`mobileSplitItems` behaviour: the whole layout on
     * desktop, two halves of the same file side by side on mobile.
     */
    splitMobile?: boolean;
    /** Localized alt suffixes of the two mobile halves (left, right). */
    splitAlt?: { left: CaseText; right: CaseText };
    /** Cap the rendered width so a portrait sheet does not stretch. */
    maxWidth?: "280px" | "md";
  };
}

export interface VideoGridItem {
  src: string;
  poster?: string;
  /** Localized duration badge, e.g. "~33с" / "~33s". */
  duration?: CaseText;
  /** Ratio badge, e.g. "9:16" — the same in both languages. */
  format?: string;
  /** Caption under the tile, e.g. "Reels 1". */
  label?: CaseText;
}

export type HeroBlock =
  | { kind: "image"; src: string; w: number; h: number; alt?: CaseText; priority?: boolean }
  | { kind: "imageGrid"; items: MediaImage[] }
  /**
   * A single muted video with a poster. The tile is a real button: clicking
   * it opens the shared fullscreen player (controls, Escape, focus return) —
   * the same interaction the original page wired through `openFullscreen`.
   */
  | {
      kind: "video";
      src: string;
      poster?: string;
      w?: number;
      h?: number;
      alt?: CaseText;
      /** Localized duration badge, e.g. "~10с" / "~10s". */
      duration?: CaseText;
      /** Ratio badge, e.g. "9:16" — the same in both languages. */
      format?: string;
      /** CSS aspect ratio of the thumb, defaults to "9/16". */
      ratio?: string;
      /**
       * A separate, fuller file the fullscreen player opens while the tile
       * shows the lighter `src` preview (taranenko-trade: tile `hero.mp4`,
       * player `hero-full.mp4`). Both files are preserved.
       */
      fullSrc?: string;
    }
  | { kind: "videoGrid"; items: VideoGridItem[]; ratio?: string };

/* ───────────────────────── sections ───────────────────────── */

/** Common optional fields shared by every section kind. */
interface SectionCommon {
  /** Draw the decorative dashed curves behind the section (as the original pages did). */
  decorated?: boolean;
}

/** Задача клієнта + рішення — the two-card brief every case page opens with. */
export interface BriefSection extends SectionCommon {
  kind: "brief";
  taskTitle?: CaseText;
  solutionTitle?: CaseText;
  task: CaseText;
  solution: CaseText;
}

/** IT-style component breakdown: title, description, screenshots, product link. */
export interface FeatureItem {
  title: CaseText;
  desc?: CaseText;
  images?: MediaImage[];
  /** Before/after pair inside the item (IT pages that show a live slider). */
  slider?: { before: string; after: string };
  link?: { href: string; label: CaseText };
}

export interface FeatureListSection extends SectionCommon {
  kind: "featureList";
  title?: CaseText;
  items: FeatureItem[];
}

/** Before/after material: interactive sliders and/or static pairs. */
export interface CompareItem {
  before: string;
  after: string;
  title?: CaseText;
  caption?: CaseText;
  /** `slider` — draggable BeforeAfterSlider; `static` — two images side by side. */
  mode: "slider" | "static";
  aspect?: string;
  /** Intrinsic size of the pair (static mode keeps the original placeholder). */
  w?: number;
  h?: number;
}

export interface CompareSection extends SectionCommon {
  kind: "compare";
  title?: CaseText;
  intro?: CaseText;
  items: CompareItem[];
}

/**
 * A gallery split into headed groups (`finalGroups`): one parent heading and
 * one sub-heading per group, each group keeping its own images and order.
 */
export interface GalleryGroupsSection extends SectionCommon {
  kind: "galleryGroups";
  title?: CaseText;
  intro?: CaseText;
  groups: Array<{ title?: CaseText; intro?: CaseText; items: MediaImage[] }>;
}

export interface GallerySection extends SectionCommon {
  kind: "gallery";
  title?: CaseText;
  intro?: CaseText;
  items: MediaImage[];
  /** 1 = single column (design galleries), 2/3 = responsive grids. */
  columns?: 1 | 2 | 3;
}

/**
 * One card of a `scenes` section: a numbered stage of one project shown as a
 * finished artifact, then in use.
 *
 * Reference: the moto-school storefront — "01 / макет" (the panoramic print
 * file) beside "02 / реалізація" (the same design on the real windows), with
 * mobile-only detail crops of the artwork under the first card.
 */
export interface SceneItem {
  /** Stage number rendered as "01 /" before the stage word. */
  number?: number;
  /** Stage word after the number, e.g. "макет" / "artwork". */
  stage?: CaseText;
  title?: CaseText;
  intro?: CaseText;
  image: MediaImage;
  /**
   * Detail crops of the scene image shown on small screens only: the same
   * file, framed on one zone (object-position) at 16:9. The original page
   * rendered them as `<Image fill>` with `scale-[2.15] object-cover`.
   */
  details?: Array<{
    alt: CaseText;
    /** Horizontal framing of the crop. */
    origin: "left" | "center" | "right";
  }>;
  /** Heading of the details block ("Ключові зони макета"). */
  detailsTitle?: CaseText;
  /** Accent colour of the card eyebrow/border, kept from the original. */
  accent?: string;
}

export interface SceneSection extends SectionCommon {
  kind: "scenes";
  title?: CaseText;
  intro?: CaseText;
  items: SceneItem[];
}

export interface VideoGridSection extends SectionCommon {
  kind: "videoGrid";
  title?: CaseText;
  intro?: CaseText;
  items: VideoGridItem[];
  /** CSS aspect ratio for every tile, e.g. "9/16". */
  ratio?: string;
  /** Tiles open in a fullscreen player. */
  fullscreen?: boolean;
}

/**
 * A heading + intro over a list of check-marked statements — the design
 * pages call it "підхід"/"approach" (`approachTitle`/`approachIntro`).
 * Kept separate from `results`: different meaning and heading keys, never
 * forced into one section kind.
 */
export interface ChecklistSection extends SectionCommon {
  kind: "checklist";
  title?: CaseText;
  intro?: CaseText;
  items: CaseText[];
  columns?: 1 | 2;
}

export interface ResultsSection extends SectionCommon {
  kind: "results";
  title?: CaseText;
  items: CaseText[];
  columns?: 1 | 2;
}

/** Context or agency contribution — a short factual paragraph. */
export interface ProseSection extends SectionCommon {
  kind: "prose";
  title?: CaseText;
  /** Optional line under the title (e.g. a client's role). */
  subtitle?: CaseText;
  /**
   * Optional second line under the subtitle, before the paragraph. Used when
   * the original card stacked three separate lines (heading, role, paragraph)
   * and none of them may be dropped (sestro-anniversary).
   */
  note?: CaseText;
  text: CaseText;
  /** Optional supporting image shown above the text (client profile, logo). */
  image?: MediaImage;
}

export interface LinksSection extends SectionCommon {
  kind: "links";
  title?: CaseText;
  items: Array<{
    /**
     * A plain URL, or a localized pair when an internal route must stay in the
     * visitor's language (`/cases/it/eva-code` ↔ `/en/cases/it/eva-code`).
     */
    href: string | Localized<string>;
    label: CaseText;
    /** Optional card treatment: heading + text above the link (e.g. the
     *  Telegram sticker-pack promo). */
    title?: CaseText;
    text?: CaseText;
    icon?: "telegram";
    /** Optional preview image at the top of the card (related-case promo). */
    image?: MediaImage;
    /** Internal routes (`/…`) render as Next links, not `target=_blank`. */
    internal?: boolean;
  }>;
}

export type CaseSection =
  | BriefSection
  | ChecklistSection
  | FeatureListSection
  | CompareSection
  | GallerySection
  | GalleryGroupsSection
  | SceneSection
  | VideoGridSection
  | ResultsSection
  | ProseSection
  | LinksSection;

/* ───────────────────────── social proof ───────────────────────── */

/**
 * Reviews that can carry an avatar.
 *
 * `avatarName` is only needed when the avatar's seed differs from the review
 * author (e.g. Cuprus Life uses "Alina" while the author line reads
 * "Аліна Ушакова"). Every original text/screenshot review passed the resolved
 * author into `ReviewAvatar`, so omitting the field keeps that behaviour in
 * both languages — the renderer falls back to the resolved author and never
 * invents an avatar for a review that had none.
 */
export type ReviewCard =
  | {
      kind: "video";
      title?: CaseText;
      src: string;
      poster?: string;
      /** Pill badge over the video (e.g. «Відео-відгук» / "Video review"). */
      label?: CaseText;
      /** Quote under the video — a video review that also carries text
       *  (eva-code-reels keeps the Telegram quote under the player). */
      text?: CaseText;
      author?: CaseText;
      avatarName?: string;
    }
  | {
      kind: "screenshot";
      title?: CaseText;
      src: string;
      alt: CaseText;
      /** Localized line under the screenshot (when the page had one). */
      caption?: CaseText;
      text?: CaseText;
      author?: CaseText;
      avatarName?: string;
      w?: number;
      h?: number;
      /** Additional review screenshots shown beside the first (vtikha). */
      more?: string[];
    }
  | { kind: "text"; title?: CaseText; text: CaseText; author: CaseText; avatarName?: string }
  /** Voice review: a play button over a hidden <audio> element. */
  | { kind: "audio"; title?: CaseText; src: string; author?: CaseText; avatarName?: string; caption?: CaseText };

/**
 * Several reviews rendered side by side under ONE shared heading — the
 * wine-festival page pairs a "proof of use" video with a Telegram screenshot
 * review inside a single section, and the grouping must survive the rework.
 */
export interface ReviewGroupBlock {
  kind: "group";
  title?: CaseText;
  items: ReviewCard[];
}

export type ReviewBlock = ReviewCard | ReviewGroupBlock;

/* ───────────────────────── record ───────────────────────── */

export interface CaseRecord {
  /** Primary key: `${direction}/${slug}`. The slug alone is never unique. */
  id: string;
  slug: string;
  direction: Direction;
  /** Subcategory of the card entry — drives "similar work". */
  subcategory: string;
  /** Ukrainian path — the address that exists today and never changes. */
  uaPath: string;
  /** English counterpart — live only when the record is published. */
  enPath: string;

  /** Visible H1. */
  h1: CaseText;
  /** Lead paragraph under the H1 (who/what, for whom, scope of work). */
  lead?: CaseText;
  /**
   * Localized subtitle directly under the H1: the type and the exact scope of
   * the delivered work. Shown when the H1 itself must stay a plain project
   * name (approved for E.V.A. CODE™); may replace `lead` so the same fact is
   * never printed twice.
   */
  subtitle?: CaseText;
  seo: {
    title: CaseText;
    description: CaseText;
    ogImage: string;
  };

  /** Category eyebrow above the H1. */
  badge?: CaseText;
  /** Small format pill next to the eyebrow (e.g. "Reels"). */
  pill?: CaseText;
  /** Glow colours of the hero frame — kept from the original page. */
  glow?: { base: string; strong: string };

  hero: HeroBlock;
  /** Ordered content blocks. Empty/absent blocks are never rendered. */
  sections: CaseSection[];

  review?: ReviewBlock;
  team?: { label: CaseText; value: CaseText };

  /** "Back to list" link above the hero — kept from the original page. */
  backToList?: { label: CaseText; href: Localized<string> };
}
