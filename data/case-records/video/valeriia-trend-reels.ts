import { key, text, type CaseRecord } from "../types";

/**
 * video/valeriia-trend-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const valeriiaTrendReels: CaseRecord = {
  id: "video/valeriia-trend-reels",
  slug: "valeriia-trend-reels",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/valeriia-trend-reels",
  enPath: "/en/cases/video/valeriia-trend-reels",
  h1: text("AI-оживлення фото", "AI photo animation"),
  lead: key("videoCases.valeriiaTrendReels.subtitle"),
  seo: {
    title: text("AI-оживлення фото | Freelance UA", "AI photo animation | Freelance UA"),
    description: key("videoCases.valeriiaTrendReels.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/valeriia-trend-reels/screenshot.webp",
  },
  badge: key("videoCases.valeriiaTrendReels.category"),
  glow: { base: "rgba(244, 114, 182, 0.12)", strong: "rgba(244, 114, 182, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/valeriia-trend-reels/hero.mp4",
    alt: key("videoCases.valeriiaTrendReels.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.valeriiaTrendReels.challengeTitle"),
      solutionTitle: key("videoCases.valeriiaTrendReels.solutionTitle"),
      task: key("videoCases.valeriiaTrendReels.challenge"),
      solution: key("videoCases.valeriiaTrendReels.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.valeriiaTrendReels.result1"),
        key("videoCases.valeriiaTrendReels.result2"),
        key("videoCases.valeriiaTrendReels.result3"),
        key("videoCases.valeriiaTrendReels.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.valeriiaTrendReels.reviewTitle"),
    src: "/media/cases/valeriia-trend-reels/screenshot.webp",
    alt: text("Відгук клієнта Valeriia", "Valeriia's client review"),
    text: key("videoCases.valeriiaTrendReels.reviewText"),
    author: key("videoCases.valeriiaTrendReels.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.valeriiaTrendReels.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
