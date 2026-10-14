import { key, text, type CaseRecord } from "../types";

/**
 * video/vtikha-promo — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const vtikhaPromo: CaseRecord = {
  id: "video/vtikha-promo",
  slug: "vtikha-promo",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/vtikha-promo",
  enPath: "/en/cases/video/vtikha-promo",
  h1: text("AI-відео Втіха", "AI video for Vtikha"),
  lead: key("videoCases.vtikha.subtitle"),
  seo: {
    title: text("AI-відео Втіха | Freelance UA", "AI video for Vtikha | Freelance UA"),
    description: key("videoCases.vtikha.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/vtikha-promo/hero-poster.jpg",
  },
  badge: key("videoCases.vtikha.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/vtikha-promo/hero.mp4",
    poster: "/media/cases/vtikha-promo/hero-poster.jpg",
    alt: key("videoCases.vtikha.title"),
    format: "1:1",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.vtikha.challengeTitle"),
      solutionTitle: key("videoCases.vtikha.solutionTitle"),
      task: key("videoCases.vtikha.challenge"),
      solution: key("videoCases.vtikha.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.vtikha.result1"),
        key("videoCases.vtikha.result2"),
        key("videoCases.vtikha.result3"),
        key("videoCases.vtikha.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.vtikha.clientName"),
      subtitle: key("videoCases.vtikha.clientRole"),
      text: key("videoCases.vtikha.clientDesc"),
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.vtikha.reviewTitle"),
    src: "/media/cases/vtikha-promo/review-emotions.webp",
    more: ["/media/cases/vtikha-promo/review-full.jpg"],
    alt: text("Емоційний відгук Volodymyr Takudis", "Emotional review by Volodymyr Takudis"),
    text: key("videoCases.vtikha.reviewText"),
    author: key("videoCases.vtikha.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.vtikha.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
