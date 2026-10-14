import { key, text, type CaseRecord } from "../types";

/**
 * video/ivan-ig-creative — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const ivanIgCreative: CaseRecord = {
  id: "video/ivan-ig-creative",
  slug: "ivan-ig-creative",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/ivan-ig-creative",
  enPath: "/en/cases/video/ivan-ig-creative",
  h1: text("AI для Instagram", "AI for Instagram"),
  lead: key("videoCases.ivanIgCreative.subtitle"),
  seo: {
    title: text("AI для Instagram | Freelance UA", "AI for Instagram | Freelance UA"),
    description: key("videoCases.ivanIgCreative.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/ivan-ig-creative/screenshot.webp",
  },
  badge: key("videoCases.ivanIgCreative.category"),
  glow: { base: "rgba(99, 102, 241, 0.12)", strong: "rgba(99, 102, 241, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/ivan-ig-creative/hero.mp4", format: "9:16" },
      { src: "/media/cases/ivan-ig-creative/process-1.mp4", format: "9:16" },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.ivanIgCreative.challengeTitle"),
      solutionTitle: key("videoCases.ivanIgCreative.solutionTitle"),
      task: key("videoCases.ivanIgCreative.challenge"),
      solution: key("videoCases.ivanIgCreative.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.ivanIgCreative.result1"),
        key("videoCases.ivanIgCreative.result2"),
        key("videoCases.ivanIgCreative.result3"),
        key("videoCases.ivanIgCreative.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.ivanIgCreative.reviewTitle"),
    src: "/media/cases/ivan-ig-creative/screenshot.webp",
    alt: text("Відгук клієнта Іван", "Ivan's client review"),
    text: key("videoCases.ivanIgCreative.reviewText"),
    author: key("videoCases.ivanIgCreative.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.ivanIgCreative.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
