import { key, text, type CaseRecord } from "../types";

/**
 * video/auto-edits-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const autoEditsReels: CaseRecord = {
  id: "video/auto-edits-reels",
  slug: "auto-edits-reels",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/auto-edits-reels",
  enPath: "/en/cases/video/auto-edits-reels",
  h1: text("Reels для автобренду", "Reels for a car brand"),
  lead: key("videoCases.autoEdits.subtitle"),
  seo: {
    title: text("Reels для автобренду | Freelance UA", "Reels for a car brand | Freelance UA"),
    description: text("Динамічні Reels для автобренду — монтаж з швидкими переходами", "Dynamic Reels for a car brand — editing with fast transitions"),
    ogImage: "https://freelance-ua.agency/media/cases/auto-edits/hero-poster.jpg",
  },
  badge: key("videoCases.autoEdits.category"),
  glow: { base: "rgba(6, 182, 212, 0.12)", strong: "rgba(6, 182, 212, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/auto-edits/video-1.mp4", poster: "/media/cases/auto-edits/preview-1.jpg", label: text("Honda", "Honda") },
      { src: "/media/cases/auto-edits/video-2.mp4", poster: "/media/cases/auto-edits/preview-2.jpg", label: text("Audi A6", "Audi A6") },
      { src: "/media/cases/auto-edits/video-3.mp4", poster: "/media/cases/auto-edits/preview-3.jpg", label: text("Infiniti FX", "Infiniti FX") },
      { src: "/media/cases/auto-edits/video-4.mp4", poster: "/media/cases/auto-edits/preview-4.jpg", label: text("Mini Cooper", "Mini Cooper") },
      { src: "/media/cases/auto-edits/video-5.mp4", poster: "/media/cases/auto-edits/preview-5.jpg", label: text("BMW 3", "BMW 3") },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.autoEdits.challengeTitle"),
      solutionTitle: key("videoCases.autoEdits.solutionTitle"),
      task: key("videoCases.autoEdits.challenge"),
      solution: key("videoCases.autoEdits.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.autoEdits.result1"),
        key("videoCases.autoEdits.result2"),
        key("videoCases.autoEdits.result3"),
        key("videoCases.autoEdits.result4"),
      ],
    },
  ],

  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.autoEdits.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
