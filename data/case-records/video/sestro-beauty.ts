import { key, text, type CaseRecord } from "../types";

/**
 * video/sestro-beauty — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const sestroBeauty: CaseRecord = {
  id: "video/sestro-beauty",
  slug: "sestro-beauty",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/sestro-beauty",
  enPath: "/en/cases/video/sestro-beauty",
  h1: text("AI-відео для Sestro", "AI video for Sestro"),
  lead: key("videoCases.sestroBeauty.subtitle"),
  seo: {
    title: text("AI-відео для Sestro | Freelance UA", "AI video for Sestro | Freelance UA"),
    description: key("videoCases.sestroBeauty.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/sestro-beauty/screenshot.webp",
  },
  badge: key("videoCases.sestroBeauty.category"),
  glow: { base: "rgba(244, 114, 182, 0.12)", strong: "rgba(244, 114, 182, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/sestro-beauty/video-1.mp4", format: "9:16" },
      { src: "/media/cases/sestro-beauty/video-2.mp4", format: "9:16" },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.sestroBeauty.challengeTitle"),
      solutionTitle: key("videoCases.sestroBeauty.solutionTitle"),
      task: key("videoCases.sestroBeauty.challenge"),
      solution: key("videoCases.sestroBeauty.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.sestroBeauty.result1"),
        key("videoCases.sestroBeauty.result2"),
        key("videoCases.sestroBeauty.result3"),
        key("videoCases.sestroBeauty.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.sestroBeauty.reviewTitle"),
    src: "/media/cases/sestro-beauty/screenshot.webp",
    alt: text("Відгук клієнта Sestro", "Sestro client review"),
    text: key("videoCases.sestroBeauty.reviewText"),
    author: key("videoCases.sestroBeauty.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.sestroBeauty.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
