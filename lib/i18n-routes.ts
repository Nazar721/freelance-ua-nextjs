// Which pages currently exist in BOTH languages, and how to map a path from
// one language to the other.
//
// Language is defined by the URL: a path without `/en` is Ukrainian, a path
// with `/en` is English. There is no automatic redirect by cookie, IP or
// browser language.
//
// `BILINGUAL_UA_PATHS` lists the UA paths whose EN counterpart is live.
// It is the single source of truth for:
//   - the language switcher (a missing counterpart disables the other
//     segment instead of silently sending the visitor to the home page);
//   - canonical/hreflang alternates (declared only for existing pairs).
// Packages 3–4 extend this list as `/services/*` and case pages are migrated.
//
// It stays a plain string array because the language switcher runs on the
// client: importing the case registry here would ship every case's copy to
// the browser. The reverse direction is checked by `scripts/inventory.mjs`
// (`bilingual-vs-registry`), so a case page can never be live in one list and
// missing in the other.
export const BILINGUAL_UA_PATHS: readonly string[] = [
  "/",
  "/cases",
  "/partners",
  "/services/it",
  "/services/design",
  "/services/video",
  // Reworked case pages with a published English twin (Package 4).
  // NOTE: a plain string array on purpose — the language switcher runs on
  // the client, so it cannot import the registry without shipping every
  // case's copy to the browser. Kept honest by scripts/inventory.mjs
  // (bilingual-vs-registry): every record's uaPath must be listed here.
  "/cases/it/eva-code",
  "/cases/it/asandra-soul",
  "/cases/it/darkshare",
  "/cases/it/epiland",
  "/cases/it/importera",
  "/cases/it/kroscar-detailing",
  "/cases/it/liudmyla-tsybrii",
  "/cases/it/md-dental",
  "/cases/it/mnm-detailing",
  "/cases/it/nextcup",
  "/cases/it/pivden-solar",
  "/cases/it/prime-auto-shipping",
  "/cases/it/repair-collision",
  "/cases/it/route-core",
  "/cases/it/ruslan-aviation",
  "/cases/it/sdent",
  "/cases/it/selloflow",
  "/cases/it/serezha-shop",
  "/cases/it/shkiper-drop",
  "/cases/it/stretching-ch",
  "/cases/it/voltone-pro",
  "/cases/design/apple-tecnologia",
  "/cases/design/barvy-interior",
  "/cases/design/globus-billboard",
  "/cases/design/mht-clinic-billboard",
  "/cases/design/gel-polish",
  "/cases/design/mydutyfree",
  "/cases/design/photo-retouch",
  "/cases/design/pink-pr-flyers",
  "/cases/design/schonheit-gift-certificate",
  "/cases/design/sembud-repair",
  "/cases/design/smm-case-presentation",
  "/cases/design/snizhana-telegram-stickers",
  "/cases/design/vikontse-logo",
  "/cases/design/color-correction",
  "/cases/design/crypto-chat-manager-vacancy",
  "/cases/design/divorce-legal-ad",
  "/cases/design/f5-guitars-youtube",
  "/cases/design/giesbrecht-pv",
  "/cases/design/gopro-hero13",
  "/cases/design/hope-media-group",
  "/cases/design/nastya-smm",
  "/cases/design/prestige-school-billboard",
  "/cases/design/nastya-portrait-retouch",
  "/cases/design/moto-school-window-branding",
  "/cases/video/ai-avatars",
  "/cases/video/ai-ice-cream",
  "/cases/video/ai-promo-misha",
  "/cases/video/ai-spring-fashion",
  "/cases/video/ai-video-new",
  "/cases/video/alien-city-adventure",
  "/cases/video/artem-reels",
  "/cases/video/auto-edits-reels",
  "/cases/video/automation-1click",
  "/cases/video/barvy-interior-ai-reels",
  "/cases/video/barvy-interior-reels",
  "/cases/video/cuprus-life",
  "/cases/video/dance-competition-lviv",
  "/cases/video/dominanta-youtube-intro",
  "/cases/video/dr-trichologist-promo",
  "/cases/video/eva-code-reels",
  "/cases/video/income-graph-motion",
  "/cases/video/internet-svit-promo",
  "/cases/video/ivan-ig-creative",
  "/cases/video/liliya-product-business",
  "/cases/video/logan-ai-promo",
  "/cases/video/logo-animation",
  "/cases/video/maccoudi-youtube",
  "/cases/video/motion-promo",
  "/cases/video/motion-reels",
  "/cases/video/nikita-sheremet-crypto",
  "/cases/video/passive-income-video",
  "/cases/video/podcast-editing",
  "/cases/video/presentation-animation",
  "/cases/video/sales-bible-promo",
  "/cases/video/selloflow-intro",
  "/cases/video/serhii-yarmolenko-reels",
  "/cases/video/serhii-yarmolenko-video-lesson",
  "/cases/video/sestro-anniversary",
  "/cases/video/sestro-beauty",
  "/cases/video/sheglam-freedom-fest",
  "/cases/video/sheglam-promo",
  "/cases/video/skool-10-features",
  "/cases/video/taranenko-trade",
  "/cases/video/telegram-emoji-stickers",
  "/cases/video/travel-vlog-turkey",
  "/cases/video/twin-a-auto",
  "/cases/video/valeriia-trend-reels",
  "/cases/video/varto-reels",
  "/cases/video/veronika-ai-muscles",
  "/cases/video/vibe-nation-promo",
  "/cases/video/vitalii-cheverda",
  "/cases/video/vladlen-lisynko-interview",
  "/cases/video/vorodi-medical",
  "/cases/video/vsehub-reels",
  "/cases/video/vtikha-promo",
  "/cases/video/website-message-animation",
  "/cases/video/watch-hype-intro",
  "/cases/video/watch-hype-motion",
  "/cases/video/wine-festival",
  "/cases/video/youtube-conversational-video",
  "/cases/video/yulia-smm-reels",
];

export type Locale = "uk" | "en";
export type Direction = "it" | "design" | "video";

/** Strip a trailing slash except for the root path. */
function clean(pathname: string): string {
  return pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
}

/** Locale defined by the URL. */
export function localeFromPath(pathname: string): Locale {
  const p = clean(pathname);
  return p === "/en" || p.startsWith("/en/") ? "en" : "uk";
}

/** Prefix that turns a UA path into its EN URL root ("" or "/en"). */
export function pathPrefix(locale: Locale): string {
  return locale === "en" ? "/en" : "";
}

/**
 * Counterpart of `pathname` in language `to`, or `null` when the counterpart
 * is not available yet. Never falls back to another page — callers must show
 * a disabled state instead of a silent redirect to the home page.
 */
export function counterpartPath(pathname: string, to: Locale): string | null {
  const p = clean(pathname);
  if (to === "en") {
    if (localeFromPath(p) === "en") return null;
    if (!BILINGUAL_UA_PATHS.includes(p)) return null;
    return p === "/" ? "/en" : `/en${p}`;
  }
  // to uk
  if (localeFromPath(p) === "uk") return null;
  const uk = p.slice("/en".length) || "/";
  return BILINGUAL_UA_PATHS.includes(uk) ? uk : null;
}

/** Absolute URL on the production origin (no hash, no query). */
export function absUrl(pathnameOrUrl: string): string {
  const origin = "https://freelance-ua.agency";
  if (/^https?:\/\//i.test(pathnameOrUrl)) return pathnameOrUrl;
  const p = pathnameOrUrl.startsWith("/") ? pathnameOrUrl : `/${pathnameOrUrl}`;
  return `${origin}${p === "/" ? "" : p}` || origin;
}
