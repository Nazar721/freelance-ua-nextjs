import { key, text, type CaseRecord } from "../types";

/**
 * it/shkiper-drop — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const shkiperDrop: CaseRecord = {
  id: "it/shkiper-drop",
  slug: "shkiper-drop",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/shkiper-drop",
  enPath: "/en/cases/it/shkiper-drop",

  h1: text("Shkiper Drop — лендінг streetwear дроп-магазину", "Shkiper Drop — streetwear drop store landing page"),
  lead: key("itCases.shkiperDrop.description"),
  seo: {
    title: text("Shkiper Drop — лендінг дроп-магазину з каталогом і Telegram-CTA | Freelance UA", "Shkiper Drop — drop store landing with a catalogue and Telegram CTA | Freelance UA"),
    description: key("itCases.shkiperDrop.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/shkiper-drop-mocap.webp",
  },
  badge: key("itCases.shkiperDrop.category"),
  glow: { base: "rgba(234, 179, 8, 0.15)", strong: "rgba(234, 179, 8, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/shkiper-drop-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.shkiperDrop.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.shkiperDrop.challenge"),
      solution: key("itCases.shkiperDrop.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.shkiperDrop.component1Title"),
          desc: key("itCases.shkiperDrop.component1Desc"),
          slider: { before: "/media/cases/shkiper-drop-hero.webp", after: "/media/cases/shkiper-drop-hero.webp" },
          link: { href: "https://shkiper-drop.vercel.app", label: key("itCases.shkiperDrop.viewSiteLabel") },
        },
        {
          title: key("itCases.shkiperDrop.component2Title"),
          desc: key("itCases.shkiperDrop.component2Desc"),
          slider: { before: "/media/cases/shkiper-drop-catalog.webp", after: "/media/cases/shkiper-drop-catalog.webp" },
        },
        {
          title: key("itCases.shkiperDrop.component3Title"),
          desc: key("itCases.shkiperDrop.component3Desc"),
          slider: { before: "/media/cases/shkiper-drop-advantages.webp", after: "/media/cases/shkiper-drop-advantages.webp" },
        },
        {
          title: key("itCases.shkiperDrop.component4Title"),
          desc: key("itCases.shkiperDrop.component4Desc"),
          slider: { before: "/media/cases/shkiper-drop-reviews.webp", after: "/media/cases/shkiper-drop-reviews.webp" },
        },
        {
          title: key("itCases.shkiperDrop.component5Title"),
          desc: key("itCases.shkiperDrop.component5Desc"),
          slider: { before: "/media/cases/shkiper-drop-delivery.webp", after: "/media/cases/shkiper-drop-cta.webp" },
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.shkiperDrop.result1"),
        key("itCases.shkiperDrop.result2"),
        key("itCases.shkiperDrop.result3"),
        key("itCases.shkiperDrop.result4"),
        key("itCases.shkiperDrop.result5"),
        key("itCases.shkiperDrop.result6"),
        key("itCases.shkiperDrop.result7"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.shkiperDrop.reviewTitle"),
    text: key("itCases.shkiperDrop.reviewText"),
    author: key("itCases.shkiperDrop.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.nazarDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/services/it#cases", en: "/en/services/it#cases" },
  },
};
