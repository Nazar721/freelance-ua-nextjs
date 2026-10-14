import { key, text, type CaseRecord } from "../types";

/**
 * video/vitalii-cheverda — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const vitaliiCheverda: CaseRecord = {
  id: "video/vitalii-cheverda",
  slug: "vitalii-cheverda",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/vitalii-cheverda",
  enPath: "/en/cases/video/vitalii-cheverda",
  h1: text("Reels для Віталія Чеверда", "Reels for Vitalii Cheverda"),
  lead: key("videoCases.vitaliiCheverda.subtitle"),
  seo: {
    title: text("Reels для Віталія Чеверда | Freelance UA", "Reels for Vitalii Cheverda | Freelance UA"),
    description: text("Reels для блогера Віталія Чеверда — динамічний монтаж для Instagram", "Reels for blogger Vitalii Cheverda — dynamic editing for Instagram"),
    ogImage: "https://freelance-ua.agency/media/cases/vitalii-cheverda/hero-poster.jpg",
  },
  badge: key("videoCases.vitaliiCheverda.category"),
  glow: { base: "rgba(139, 92, 246, 0.12)", strong: "rgba(139, 92, 246, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/vitalii-cheverda/hero.mp4", poster: "/media/cases/vitalii-cheverda/hero-poster.jpg", format: "9:16", label: key("videoCases.vitaliiCheverda.heroLabel") },
      { src: "/media/cases/vitalii-cheverda/hook-1.mp4", poster: "/media/cases/vitalii-cheverda/hook-1-poster.jpg", format: "9:16" },
      { src: "/media/cases/vitalii-cheverda/hook-2.mp4", poster: "/media/cases/vitalii-cheverda/hook-2-poster.jpg", format: "9:16" },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.vitaliiCheverda.challengeTitle"),
      solutionTitle: key("videoCases.vitaliiCheverda.solutionTitle"),
      task: key("videoCases.vitaliiCheverda.challenge"),
      solution: key("videoCases.vitaliiCheverda.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.vitaliiCheverda.result1"),
        key("videoCases.vitaliiCheverda.result2"),
        key("videoCases.vitaliiCheverda.result3"),
        key("videoCases.vitaliiCheverda.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.vitaliiCheverda.clientName"),
      subtitle: key("videoCases.vitaliiCheverda.clientRole"),
      text: key("videoCases.vitaliiCheverda.clientDesc"),
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.vitaliiCheverda.reviewTitle"),
    src: "/media/testimonials/tg-screenshots/16-vitalii.webp",
    alt: text("Відгук Віталія Чеверди в Telegram", "Vitalii Cheverda's review on Telegram"),
    text: key("videoCases.vitaliiCheverda.reviewText"),
    author: key("videoCases.vitaliiCheverda.reviewAuthor"),
    w: 600,
    h: 800,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.vitaliiCheverda.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
