import { key, text, type CaseRecord } from "../types";

/**
 * design/f5-guitars-youtube — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const f5GuitarsYoutube: CaseRecord = {
  id: "design/f5-guitars-youtube",
  slug: "f5-guitars-youtube",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/f5-guitars-youtube",
  enPath: "/en/cases/design/f5-guitars-youtube",

  h1: text("F5 Guitars — обкладинка для YouTube", "F5 Guitars — YouTube thumbnail"),
  lead: key("designCases.f5Guitars.subtitle"),
  seo: {
    title: text("Кліковабельна обкладинка для відео про гітари | Freelance UA", "Clickable thumbnail for a guitars video | Freelance UA"),
    description: key("designCases.f5Guitars.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/f5-guitars-youtube/f5-guitars-youtube-preview.webp",
  },
  badge: key("designCases.f5Guitars.category"),
  glow: { base: "rgba(239, 68, 68, 0.10)", strong: "rgba(34, 197, 94, 0.26)" },

  hero: {
    kind: "image",
    src: "/media/cases/f5-guitars-youtube/f5-guitars-youtube1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.f5Guitars.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.f5Guitars.challenge"),
      solution: key("designCases.f5Guitars.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.f5Guitars.finalsTitle"),
      intro: key("designCases.f5Guitars.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/f5-guitars-youtube/f5-guitars-youtube1.webp", w: 1280, h: 720, title: key("designCases.f5Guitars.item1.title"), caption: key("designCases.f5Guitars.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.f5Guitars.result1"),
        key("designCases.f5Guitars.result2"),
        key("designCases.f5Guitars.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.f5Guitars.reviewTitle"),
    text: key("designCases.f5Guitars.reviewText"),
    author: key("designCases.f5Guitars.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.f5Guitars.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
