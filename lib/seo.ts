// Shared metadata helpers for localized pages.
//
// Rules (approved):
//   - canonical is a self-referencing FULL absolute URL for the page's own
//     language path;
//   - hreflang alternates are declared only for EXISTING bilingual pairs
//     (see BILINGUAL_UA_PATHS) — never for a counterpart that is not live;
//   - no x-default for now;
//   - UA and EN pages each keep their own canonical — the EN translation is
//     never canonicalized to the Ukrainian page.
import imageMeasurements from "./generated/image-measurements.json";
import type { Metadata } from "next";
import { absUrl, counterpartPath, type Locale } from "./i18n-routes";

/** An Open Graph cover: either a local path (its real size/format is measured
 *  before publishing) or an explicit descriptor when the file cannot be read
 *  from this process. Never guess — a wrong width/height/type misleads every
 *  social crawler that reads the card. */
export type OgImage = string | { src: string; width?: number; height?: number; type?: string };

interface MeasuredImage {
  width: number;
  height: number;
  mime: string;
}

/** Read build-generated image measurements; never trace public media into Functions. */
export function measureLocalImage(src: string): MeasuredImage | null {
  const clean = src.split(/[?#]/)[0];
  if (!clean.startsWith("/")) return null;
  return (imageMeasurements as Record<string, MeasuredImage>)[clean] ?? null;
}

export { absUrl, counterpartPath, localeFromPath, pathPrefix, type Locale } from "./i18n-routes";

export const SITE_ORIGIN = "https://freelance-ua.agency";

/**
 * `alternates` for a page whose UA path is `uaPath`. Returns `languages`
 * only while both language versions are live; otherwise `undefined` so no
 * false hreflang counterpart is emitted.
 */
export function localizedAlternates(uaPath: string): Metadata["alternates"] {
  const enPath = counterpartPath(uaPath, "en");
  if (!enPath) return undefined;
  return {
    languages: {
      uk: absUrl(uaPath),
      en: absUrl(enPath),
    },
  };
}

/**
 * Build the metadata for a page in a given language.
 * `uaPath` is always the Ukrainian path; the canonical follows `locale`.
 *
 * For locale="en" the UA path MUST have a registered EN counterpart
 * (BILINGUAL_UA_PATHS) — a missing counterpart throws instead of silently
 * falling back to the Ukrainian canonical, so an unregistered pair is caught
 * at build/render time rather than published as a wrong canonical URL.
 */
export function localizedMetadata({
  locale,
  uaPath,
  title,
  description,
  ogImage,
  ogImageAlt,
  ogType = "website",
}: {
  locale: Locale;
  uaPath: string;
  title: string;
  description: string;
  ogImage?: OgImage;
  ogImageAlt?: string;
  ogType?: "website" | "article";
}): Metadata {
  let canonicalPath: string;
  if (locale === "en") {
    const enPath = counterpartPath(uaPath, "en");
    if (!enPath) {
      throw new Error(
        `localizedMetadata: no EN counterpart registered for "${uaPath}" — add it to BILINGUAL_UA_PATHS before publishing an EN page`,
      );
    }
    canonicalPath = enPath;
  } else {
    canonicalPath = uaPath;
  }
  const canonicalUrl = absUrl(canonicalPath);

  // Cover properties: measured from the file for local images, taken from the
  // descriptor when provided, omitted when nothing is known. Omitting is the
  // correct behaviour — these fields are optional, a wrong guess is not.
  const descriptor = typeof ogImage === "string" ? (ogImage ? { src: ogImage } : undefined) : ogImage;
  const image = descriptor ? absUrl(descriptor.src) : undefined;
  const measured =
    descriptor && (descriptor.width == null || descriptor.height == null || descriptor.type == null)
      ? measureLocalImage(descriptor.src)
      : null;
  const width = descriptor?.width ?? measured?.width;
  const height = descriptor?.height ?? measured?.height;
  const type = descriptor?.type ?? measured?.mime;
  const known = width != null && height != null && !!type;
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      ...localizedAlternates(uaPath),
    },
    openGraph: {
      type: ogType,
      url: canonicalUrl,
      siteName: "Freelance UA || Digital Agency",
      locale: locale === "en" ? "en_US" : "uk_UA",
      title,
      description,
      ...(image
        ? {
            images: [
              {
                url: image,
                alt: ogImageAlt ?? "Freelance UA — Digital Agency",
                ...(known ? { width, height, type } : {}),
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image
        ? {
            images: [
              ogImageAlt
                ? {
                    url: image,
                    alt: ogImageAlt,
                    ...(known ? { width, height, type } : {}),
                  }
                : image,
            ],
          }
        : {}),
    },
  };
}
