// Card-prop mapping from the data files to the two card components.
//
// DirectionPage (/services/{direction}) and CasesCatalog (/cases) render the
// SAME case entries. Without a shared mapper it is easy for one of them to
// drop a presentation field (badge, hoverImage, imageFit, hideCta …) and lose
// the look a case had before the Package 3 restructure. Both call sites go
// through these two helpers instead.
import type { CaseEntry } from "@/data/types";
import type { VideoCaseEntry } from "@/data/videoCases";
import type FeaturedCaseCard from "@/components/ui/FeaturedCaseCard";
import type VideoCaseCard from "@/components/ui/VideoCaseCard";

type FeaturedCardProps = Parameters<typeof FeaturedCaseCard>[0];
type VideoCardProps = Parameters<typeof VideoCaseCard>[0];

/** Presentation fields every IT/design case carries into FeaturedCaseCard. */
export function featuredCardProps(c: CaseEntry): FeaturedCardProps {
  return {
    categoryKey: c.categoryKey,
    titleKey: c.titleKey,
    descriptionKey: c.descriptionKey,
    href: c.href,
    glowColor: c.glowColor,
    glowColorStrong: c.glowColorStrong,
    image: c.image,
    hoverImage: c.hoverImage,
    galleryImages: c.galleryImages,
    imageFit: c.imageFit,
    objectPosition: c.objectPosition,
    hideCta: c.hideCta,
    badge: c.badge,
  };
}

/** Presentation fields every video case carries into VideoCaseCard. */
export function videoCardProps(c: VideoCaseEntry): VideoCardProps {
  return {
    categoryKey: c.categoryKey,
    titleKey: c.titleKey,
    descriptionKey: c.descriptionKey,
    href: c.href,
    glowColor: c.glowColor,
    glowColorStrong: c.glowColorStrong,
    video: c.heroVideo,
    thumbnail: c.thumbnail,
    poster: c.poster,
    duration: c.duration,
    format: c.format,
    hideCta: c.hideCta,
  };
}
