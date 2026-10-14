import { key, text, type CaseRecord } from "../types";

/**
 * design/gopro-hero13 — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const goproHero13: CaseRecord = {
  id: "design/gopro-hero13",
  slug: "gopro-hero13",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/gopro-hero13",
  enPath: "/en/cases/design/gopro-hero13",

  h1: text("GoPro — продуктовий постер", "GoPro — product poster"),
  lead: key("designCases.goproHero13.subtitle"),
  seo: {
    title: text("Постер камери GoPro Black з технічними перевагами | Freelance UA", "GoPro Black camera poster with key technical features | Freelance UA"),
    description: key("designCases.goproHero13.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/gopro-hero13/gopro-hero13-preview.webp",
  },
  badge: key("designCases.goproHero13.category"),
  glow: { base: "rgba(59, 130, 246, 0.12)", strong: "rgba(59, 130, 246, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/gopro-hero13/gopro-hero131.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.goproHero13.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.goproHero13.challenge"),
      solution: key("designCases.goproHero13.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.goproHero13.finalsTitle"),
      intro: key("designCases.goproHero13.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/gopro-hero13/gopro-hero131.webp", w: 900, h: 1200, title: key("designCases.goproHero13.item1.title"), caption: key("designCases.goproHero13.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.goproHero13.result1"),
        key("designCases.goproHero13.result2"),
        key("designCases.goproHero13.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.goproHero13.reviewTitle"),
    text: key("designCases.goproHero13.reviewText"),
    author: key("designCases.goproHero13.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.goproHero13.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
