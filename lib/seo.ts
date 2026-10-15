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
import fs from "node:fs";
import path from "node:path";
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

/** Pixel size + MIME of an image file already in memory. Returns null for
 *  formats this probe does not understand — callers then declare nothing. */
function measureImageBuffer(buf: Buffer): MeasuredImage | null {
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47 && buf.readUInt32BE(4) === 0x0d0a1a0a) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), mime: "image/png" };
  }
  // GIF
  if (buf.length > 10 && buf.toString("ascii", 0, 3) === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8), mime: "image/gif" };
  }
  // JPEG — walk segments to the first SOFn marker
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = buf[i + 1];
      if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2;
        continue;
      }
      if (marker >= 0xc0 && marker <= 0xc3) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5), mime: "image/jpeg" };
      }
      const length = buf.readUInt16BE(i + 2);
      if (length < 2) return null;
      i += 2 + length;
    }
    return null;
  }
  // WebP (RIFF … WEBP)
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8X") {
      return {
        width: buf.readUIntLE(24, 3) + 1,
        height: buf.readUIntLE(27, 3) + 1,
        mime: "image/webp",
      };
    }
    if (chunk === "VP8 ") {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, mime: "image/webp" };
    }
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1, mime: "image/webp" };
    }
    return null;
  }
  return null;
}

const measuredCache = new Map<string, MeasuredImage | null>();

/** Measure a cover that lives in `public/`. Unknown/missing/remote files
 *  yield null so the caller omits the optional properties instead of
 *  inventing them. */
export function measureLocalImage(src: string): MeasuredImage | null {
  const clean = src.split(/[?#]/)[0];
  if (!clean.startsWith("/")) return null;
  if (measuredCache.has(clean)) return measuredCache.get(clean) ?? null;
  let result: MeasuredImage | null = null;
  try {
    const filePath = path.join(process.cwd(), "public", clean.slice(1));
    result = measureImageBuffer(fs.readFileSync(filePath));
  } catch {
    result = null;
  }
  measuredCache.set(clean, result);
  return result;
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
