// Single source of truth for the three direction pages (/services/{d}).
// Services lists, the before/after material moved out of the old modal, and
// the subcategory filters used by the cases grid on the page.
import type { Direction } from "@/lib/i18n-routes";

export type { Direction };

export interface DirectionSubcategory {
  /** value stored in the data files (itCategory / category / subCategory) */
  value: string;
  /** filter label key in i18n (cases.subtab.*) */
  labelKey: string;
}

export interface DirectionConfig {
  key: Direction;
  /** how many numbered services this direction has (services.{key}.1…n) */
  serviceCount: number;
  /** which data-file field carries the subcategory */
  subcategoryField: "itCategory" | "category" | "subCategory";
  subcategories: DirectionSubcategory[];
  /** before/after material moved from the old ServicesModal */
  sliderBefore: string;
  sliderAfter: string;
  sliderAfterVideo?: string;
  sliderAspect?: string;
}

export const DIRECTIONS: Record<Direction, DirectionConfig> = {
  it: {
    key: "it",
    serviceCount: 7,
    subcategoryField: "itCategory",
    subcategories: [
      { value: "ecommerce", labelKey: "cases.subtab.ecommerce" },
      { value: "landing", labelKey: "cases.subtab.landing" },
      { value: "saas-telegram", labelKey: "cases.subtab.saasTelegram" },
    ],
    sliderBefore: "/media/services/code-before.webp",
    sliderAfter: "/media/services/website-after.webp",
  },
  design: {
    key: "design",
    serviceCount: 5,
    subcategoryField: "category",
    subcategories: [
      { value: "banners", labelKey: "cases.subtab.banners" },
      { value: "branding", labelKey: "cases.subtab.branding" },
      { value: "photo-retouch", labelKey: "cases.subtab.photoRetouch" },
    ],
    sliderBefore: "/media/services/design-before.webp",
    sliderAfter: "/media/services/design-after.webp",
  },
  video: {
    key: "video",
    serviceCount: 6,
    subcategoryField: "subCategory",
    subcategories: [
      { value: "reels", labelKey: "cases.subtab.reels" },
      { value: "motion", labelKey: "cases.subtab.motion" },
      { value: "youtube", labelKey: "cases.subtab.youtube" },
      { value: "ai", labelKey: "cases.subtab.ai" },
    ],
    sliderBefore: "/media/services/video-poster.webp?v=2",
    sliderAfter: "/media/services/video-poster.webp?v=2",
    sliderAfterVideo: "/media/cases/nikita-sheremet-crypto/process-3.mp4",
    sliderAspect: "aspect-video",
  },
};

export function isDirection(value: string): value is Direction {
  return value === "it" || value === "design" || value === "video";
}
