import { key, text, type CaseRecord } from "../types";

/**
 * design/snizhana-telegram-stickers — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const snizhanaTelegramStickers: CaseRecord = {
  id: "design/snizhana-telegram-stickers",
  slug: "snizhana-telegram-stickers",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/snizhana-telegram-stickers",
  enPath: "/en/cases/design/snizhana-telegram-stickers",

  h1: text("Стікери для Telegram — дизайн пака емоцій", "Telegram stickers — emotion pack design"),
  lead: key("designCases.snizhanaStickers.subtitle"),
  seo: {
    title: text("Авторські стікери для Telegram: єдина стилістика персонажа | Freelance UA", "Original Telegram stickers: a single character style | Freelance UA"),
    description: key("designCases.snizhanaStickers.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/snizhana-telegram-stickers/sticker-01.png",
  },
  // The original hero eyebrow uses `category` (the card keeps its own
  // `categoryShort` for the catalogues).
  badge: key("designCases.snizhanaStickers.category"),
  glow: { base: "rgba(42, 171, 238, 0.12)", strong: "rgba(42, 171, 238, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/snizhana-telegram-stickers/sticker-01.png",
    w: 1200,
    h: 800,
    alt: key("designCases.snizhanaStickers.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.snizhanaStickers.challenge"),
      solution: key("designCases.snizhanaStickers.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.snizhanaStickers.galleryTitle"),
      intro: key("designCases.snizhanaStickers.galleryDesc"),
      columns: 2,
      items: [
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
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://t.me/addstickers/Sn071225ka", label: key("designCases.snizhanaStickers.packCta"), title: key("designCases.snizhanaStickers.packTitle"), text: key("designCases.snizhanaStickers.packDesc"), icon: "telegram" },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.snizhanaStickers.result1"),
        key("designCases.snizhanaStickers.result2"),
        key("designCases.snizhanaStickers.result3"),
        key("designCases.snizhanaStickers.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.snizhanaStickers.reviewTitle"),
    text: key("designCases.snizhanaStickers.reviewText"),
    author: key("designCases.snizhanaStickers.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.snizhanaStickers.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
