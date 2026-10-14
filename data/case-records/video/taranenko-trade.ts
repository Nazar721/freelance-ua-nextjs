import { key, text, type CaseRecord } from "../types";

/**
 * video/taranenko-trade — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const taranenkoTrade: CaseRecord = {
  id: "video/taranenko-trade",
  slug: "taranenko-trade",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/taranenko-trade",
  enPath: "/en/cases/video/taranenko-trade",
  h1: text("Торгівля Тараненко", "Taranenko trading"),
  lead: key("videoCases.taranenkoTrade.subtitle"),
  seo: {
    title: text("Торгівля Тараненко | Freelance UA", "Taranenko trading | Freelance UA"),
    description: text("YouTube-відео про торгівлю — монтаж з динамічною подачею", "YouTube video about trading — editing with dynamic delivery"),
    ogImage: "https://freelance-ua.agency/media/cases/taranenko-trade/poster.jpg",
  },
  badge: key("videoCases.taranenkoTrade.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/taranenko-trade/hero.mp4",
    poster: "/media/cases/taranenko-trade/hero-poster.jpg",
    fullSrc: "/media/cases/taranenko-trade/hero-full.mp4",
    alt: key("videoCases.taranenkoTrade.title"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.taranenkoTrade.challengeTitle"),
      solutionTitle: key("videoCases.taranenkoTrade.solutionTitle"),
      task: key("videoCases.taranenkoTrade.challenge"),
      solution: key("videoCases.taranenkoTrade.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.taranenkoTrade.result1"),
        key("videoCases.taranenkoTrade.result2"),
        key("videoCases.taranenkoTrade.result3"),
        key("videoCases.taranenkoTrade.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.taranenkoTrade.reviewTitle"),
    text: key("videoCases.taranenkoTrade.reviewText"),
    author: key("videoCases.taranenkoTrade.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.taranenkoTrade.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
