// Case detail registry (Package 4).
//
// A case enters the registry when its detail page has been reworked on the
// shared model AND its English counterpart exists — the two always travel
// together, so `caseEnPaths()` is exactly the set of EN case URLs that may
// appear in the sitemap and in hreflang pairs.
//
// The catalogue card text stays in lib/i18n.ts (titleKey/descriptionKey of
// data/*Cases.ts); a record never repeats it. Nothing here imports the
// dictionary, so the registry can be read by Node scripts as well as by the
// server components.
import { itCases } from "../itCases";
import { designCases } from "../designCases";
import { videoCases } from "../videoCases";
import type { CaseRecord, Direction } from "./types";
import { evaCode } from "./it/eva-code";
import { mhtClinicBillboard } from "./design/mht-clinic-billboard";
import { nastyaPortraitRetouch } from "./design/nastya-portrait-retouch";
import { cuprusLife } from "./video/cuprus-life";
import { asandraSoul } from "./it/asandra-soul";
import { darkshare } from "./it/darkshare";
import { epiland } from "./it/epiland";
import { importera } from "./it/importera";
import { kroscarDetailing } from "./it/kroscar-detailing";
import { liudmylaTsybrii } from "./it/liudmyla-tsybrii";
import { mdDental } from "./it/md-dental";
import { mnmDetailing } from "./it/mnm-detailing";
import { nextcup } from "./it/nextcup";
import { pivdenSolar } from "./it/pivden-solar";
import { primeAutoShipping } from "./it/prime-auto-shipping";
import { repairCollision } from "./it/repair-collision";
import { routeCore } from "./it/route-core";
import { ruslanAviation } from "./it/ruslan-aviation";
import { sdent } from "./it/sdent";
import { selloflow } from "./it/selloflow";
import { serezhaShop } from "./it/serezha-shop";
import { shkiperDrop } from "./it/shkiper-drop";
import { stretchingCh } from "./it/stretching-ch";
import { voltonePro } from "./it/voltone-pro";
import { barvyInterior } from "./design/barvy-interior";
import { photoRetouch } from "./design/photo-retouch";
import { gelPolish } from "./design/gel-polish";
import { mydutyfree } from "./design/mydutyfree";
import { vikontseLogo } from "./design/vikontse-logo";
import { schonheitGiftCertificate } from "./design/schonheit-gift-certificate";
import { sembudRepair } from "./design/sembud-repair";
import { appleTecnologia } from "./design/apple-tecnologia";
import { globusBillboard } from "./design/globus-billboard";
import { snizhanaTelegramStickers } from "./design/snizhana-telegram-stickers";
import { smmCasePresentation } from "./design/smm-case-presentation";
import { pinkPrFlyers } from "./design/pink-pr-flyers";
import { colorCorrection } from "./design/color-correction";
import { cryptoChatManagerVacancy } from "./design/crypto-chat-manager-vacancy";
import { divorceLegalAd } from "./design/divorce-legal-ad";
import { f5GuitarsYoutube } from "./design/f5-guitars-youtube";
import { giesbrechtPv } from "./design/giesbrecht-pv";
import { goproHero13 } from "./design/gopro-hero13";
import { hopeMediaGroup } from "./design/hope-media-group";
import { nastyaSmm } from "./design/nastya-smm";
import { prestigeSchoolBillboard } from "./design/prestige-school-billboard";
import { motoSchoolWindowBranding } from "./design/moto-school-window-branding";
import { aiAvatars } from "./video/ai-avatars";
import { aiIceCream } from "./video/ai-ice-cream";
import { aiPromoMisha } from "./video/ai-promo-misha";
import { aiSpringFashion } from "./video/ai-spring-fashion";
import { aiVideoNew } from "./video/ai-video-new";
import { alienCityAdventure } from "./video/alien-city-adventure";
import { artemReels } from "./video/artem-reels";
import { autoEditsReels } from "./video/auto-edits-reels";
import { automation1click } from "./video/automation-1click";
import { barvyInteriorAiReels } from "./video/barvy-interior-ai-reels";
import { danceCompetitionLviv } from "./video/dance-competition-lviv";
import { dominantaYoutubeIntro } from "./video/dominanta-youtube-intro";
import { drTrichologistPromo } from "./video/dr-trichologist-promo";
import { incomeGraphMotion } from "./video/income-graph-motion";
import { internetSvitPromo } from "./video/internet-svit-promo";
import { ivanIgCreative } from "./video/ivan-ig-creative";
import { liliyaProductBusiness } from "./video/liliya-product-business";
import { loganAiPromo } from "./video/logan-ai-promo";
import { logoAnimation } from "./video/logo-animation";
import { motionPromo } from "./video/motion-promo";
import { motionReels } from "./video/motion-reels";
import { nikitaSheremetCrypto } from "./video/nikita-sheremet-crypto";
import { passiveIncomeVideo } from "./video/passive-income-video";
import { podcastEditing } from "./video/podcast-editing";
import { presentationAnimation } from "./video/presentation-animation";
import { salesBiblePromo } from "./video/sales-bible-promo";
import { selloflowIntro } from "./video/selloflow-intro";
import { serhiiYarmolenkoReels } from "./video/serhii-yarmolenko-reels";
import { serhiiYarmolenkoVideoLesson } from "./video/serhii-yarmolenko-video-lesson";
import { sestroBeauty } from "./video/sestro-beauty";
import { sheglamFreedomFest } from "./video/sheglam-freedom-fest";
import { skool10Features } from "./video/skool-10-features";
import { taranenkoTrade } from "./video/taranenko-trade";
import { travelVlogTurkey } from "./video/travel-vlog-turkey";
import { twinAAuto } from "./video/twin-a-auto";
import { valeriiaTrendReels } from "./video/valeriia-trend-reels";
import { vartoReels } from "./video/varto-reels";
import { veronikaAiMuscles } from "./video/veronika-ai-muscles";
import { vibeNationPromo } from "./video/vibe-nation-promo";
import { vitaliiCheverda } from "./video/vitalii-cheverda";
import { vladlenLisynkoInterview } from "./video/vladlen-lisynko-interview";
import { vorodiMedical } from "./video/vorodi-medical";
import { vsehubReels } from "./video/vsehub-reels";
import { vtikhaPromo } from "./video/vtikha-promo";
import { watchHypeIntro } from "./video/watch-hype-intro";
import { watchHypeMotion } from "./video/watch-hype-motion";
import { youtubeConversationalVideo } from "./video/youtube-conversational-video";
import { yuliaSmmReels } from "./video/yulia-smm-reels";
import { wineFestival } from "./video/wine-festival";
import { telegramEmojiStickers } from "./video/telegram-emoji-stickers";
import { maccoudiYoutube } from "./video/maccoudi-youtube";
import { sestroAnniversary } from "./video/sestro-anniversary";
import { sheglamPromo } from "./video/sheglam-promo";
import { evaCodeReels } from "./video/eva-code-reels";
import { barvyInteriorReels } from "./video/barvy-interior-reels";
import { websiteMessageAnimation } from "./video/website-message-animation";

export type {
  BriefSection,
  CaseRecord,
  CaseSection,
  CaseText,
  ChecklistSection,
  CompareItem,
  CompareSection,
  Direction,
  FeatureItem,
  FeatureListSection,
  GalleryGroupsSection,
  GallerySection,
  HeroBlock,
  LinksSection,
  Locale,
  MediaImage,
  ProseSection,
  ResolveText,
  ResultsSection,
  ReviewBlock,
  ReviewCard,
  ReviewGroupBlock,
  SceneItem,
  SceneSection,
  VideoGridItem,
  VideoGridSection,
} from "./types";
export { key, text, resolveText, isKeyRef } from "./types";

/** All reworked cases, in a stable order. */
export const caseRecords: CaseRecord[] = [
  websiteMessageAnimation,
  yuliaSmmReels,
  youtubeConversationalVideo,
  wineFestival,
  watchHypeMotion,
  watchHypeIntro,
  vtikhaPromo,
  vsehubReels,
  vorodiMedical,
  vladlenLisynkoInterview,
  vitaliiCheverda,
  vibeNationPromo,
  veronikaAiMuscles,
  vartoReels,
  valeriiaTrendReels,
  twinAAuto,
  travelVlogTurkey,
  telegramEmojiStickers,
  taranenkoTrade,
  skool10Features,
  sheglamPromo,
  sheglamFreedomFest,
  sestroAnniversary,
  sestroBeauty,
  serhiiYarmolenkoVideoLesson,
  serhiiYarmolenkoReels,
  selloflowIntro,
  salesBiblePromo,
  presentationAnimation,
  podcastEditing,
  passiveIncomeVideo,
  nikitaSheremetCrypto,
  motionReels,
  motionPromo,
  maccoudiYoutube,
  logoAnimation,
  loganAiPromo,
  liliyaProductBusiness,
  ivanIgCreative,
  internetSvitPromo,
  incomeGraphMotion,
  evaCodeReels,
  drTrichologistPromo,
  dominantaYoutubeIntro,
  danceCompetitionLviv,
  barvyInteriorAiReels,
  barvyInteriorReels,
  automation1click,
  autoEditsReels,
  artemReels,
  alienCityAdventure,
  aiVideoNew,
  aiSpringFashion,
  aiPromoMisha,
  aiIceCream,
  aiAvatars,
  mhtClinicBillboard,
  prestigeSchoolBillboard,
  nastyaSmm,
  hopeMediaGroup,
  goproHero13,
  giesbrechtPv,
  f5GuitarsYoutube,
  divorceLegalAd,
  cryptoChatManagerVacancy,
  colorCorrection,
  pinkPrFlyers,
  smmCasePresentation,
  snizhanaTelegramStickers,
  globusBillboard,
  appleTecnologia,
  sembudRepair,
  schonheitGiftCertificate,
  vikontseLogo,
  mydutyfree,
  gelPolish,
  photoRetouch,
  barvyInterior,
  voltonePro,
  stretchingCh,
  shkiperDrop,
  serezhaShop,
  selloflow,
  sdent,
  ruslanAviation,
  routeCore,
  repairCollision,
  primeAutoShipping,
  pivdenSolar,
  nextcup,
  mnmDetailing,
  mdDental,
  liudmylaTsybrii,
  kroscarDetailing,
  importera,
  epiland,
  darkshare,
  asandraSoul,
  evaCode,
  nastyaPortraitRetouch,
  cuprusLife,
  motoSchoolWindowBranding
];

const byId = new Map<string, CaseRecord>(caseRecords.map((r) => [r.id, r]));

export function getCaseRecord(id: string): CaseRecord | undefined {
  return byId.get(id);
}

export function getCaseRecordByRoute(
  direction: string,
  slug: string,
): CaseRecord | undefined {
  if (direction !== "it" && direction !== "design" && direction !== "video") return undefined;
  return byId.get(`${direction}/${slug}`);
}

/** UA paths of every reworked case — the address never changes. */
export function caseUaPaths(): string[] {
  return caseRecords.map((r) => r.uaPath);
}

/** EN paths of every reworked case — only these are published. */
export function caseEnPaths(): string[] {
  return caseRecords.map((r) => r.enPath);
}

/**
 * Every `/media/…` reference held by a record, in document order.
 * `withOgImage: false` skips the metadata image — it is not part of the page
 * body, and the original pages kept it in `layout.tsx`.
 */
export function collectRecordMedia(record: CaseRecord, withOgImage = true): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (src?: string) => {
    if (!src) return;
    const path = src.startsWith("/media/") ? src : null;
    if (!path || seen.has(path)) return;
    seen.add(path);
    out.push(path);
  };

  if (withOgImage) push(record.seo.ogImage);

  const hero = record.hero;
  if (hero.kind === "image") push(hero.src);
  if (hero.kind === "imageGrid") hero.items.forEach((i) => push(i.src));
  if (hero.kind === "video") { push(hero.src); push(hero.poster); push(hero.fullSrc); }
  if (hero.kind === "videoGrid") hero.items.forEach((i) => { push(i.src); push(i.poster); });

  for (const section of record.sections) {
    if (section.kind === "featureList") {
      section.items.forEach((item) => {
        item.images?.forEach((img) => push(img.src));
        push(item.slider?.before);
        push(item.slider?.after);
      });
    }
    if (section.kind === "compare") {
      section.items.forEach((item) => { push(item.before); push(item.after); });
    }
    if (section.kind === "gallery") section.items.forEach((img) => push(img.src));
    if (section.kind === "galleryGroups") section.groups.forEach((group) => group.items.forEach((img) => push(img.src)));
    // A scene's detail crops reuse the scene image — one file, many renders.
    if (section.kind === "scenes") section.items.forEach((item) => push(item.image.src));
    if (section.kind === "videoGrid") section.items.forEach((i) => { push(i.src); push(i.poster); });
    if (section.kind === "prose") push(section.image?.src);
    if (section.kind === "links") section.items.forEach((i) => push(i.image?.src));
  }

  if (record.review) {
    const pushReview = (review: Exclude<CaseRecord["review"], undefined>) => {
      if (review.kind === "group") {
        review.items.forEach((item) => pushReview(item));
        return;
      }
      if (review.kind === "video") {
        push(review.src);
        push(review.poster);
      }
      if (review.kind === "screenshot") { push(review.src); (review.more ?? []).forEach(push); }
      if (review.kind === "audio") push(review.src);
    };
    pushReview(record.review);
  }
  return out;
}

/* ───────────────────────── similar work ───────────────────────── */

export interface RelatedCaseCard {
  /** `direction/slug` — the primary key, never the slug alone. */
  id: string;
  href: string;
  direction: Direction;
  image: string;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
}

type CardEntry = {
  slug: string;
  href: string;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  image?: string;
  poster?: string;
  thumbnail?: string;
  screenshot?: string;
};

const catalogue: Array<{ direction: Direction; subcategory: string; entry: CardEntry }> = [
  ...itCases.map((c) => ({
    direction: "it" as const,
    subcategory: c.itCategory ?? "",
    entry: c as CardEntry,
  })),
  ...designCases.map((c) => ({
    direction: "design" as const,
    subcategory: c.category ?? "",
    entry: c as CardEntry,
  })),
  ...videoCases.map((c) => ({
    direction: "video" as const,
    subcategory: c.subCategory ?? "",
    entry: c as CardEntry,
  })),
];

/** A card preview is only useful when a still frame actually exists. */
function cardImage(entry: CardEntry): string | null {
  const src = entry.image ?? entry.poster ?? entry.thumbnail ?? entry.screenshot ?? null;
  return src && src.startsWith("/media/") ? src : null;
}

/**
 * Similar work for a case, taken from the catalogue registry: the same
 * subcategory first, then the rest of the same direction. The current case is
 * excluded by its primary id, so a slug collision between directions can
 * never drop the wrong record. Deterministic — the catalogue order decides.
 */
export function pickRelatedCases(record: CaseRecord, limit = 3): RelatedCaseCard[] {
  const sameSubcategory = catalogue.filter(
    (c) => c.subcategory === record.subcategory && `${c.direction}/${c.entry.slug}` !== record.id,
  );
  const sameDirection = catalogue.filter(
    (c) =>
      c.direction === record.direction &&
      c.subcategory !== record.subcategory &&
      `${c.direction}/${c.entry.slug}` !== record.id,
  );
  const picked: RelatedCaseCard[] = [];
  const taken = new Set<string>();

  for (const group of [sameSubcategory, sameDirection]) {
    for (const c of group) {
      if (picked.length >= limit) break;
      const id = `${c.direction}/${c.entry.slug}`;
      if (taken.has(id)) continue;
      const image = cardImage(c.entry);
      if (!image) continue;
      taken.add(id);
      picked.push({
        id,
        href: c.entry.href,
        direction: c.direction,
        image,
        categoryKey: c.entry.categoryKey,
        titleKey: c.entry.titleKey,
        descriptionKey: c.entry.descriptionKey,
      });
    }
    if (picked.length >= limit) break;
  }
  return picked;
}
