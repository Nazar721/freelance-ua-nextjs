import { key, text, type CaseRecord } from "../types";

/**
 * video/motion-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const motionReels: CaseRecord = {
  id: "video/motion-reels",
  slug: "motion-reels",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/motion-reels",
  enPath: "/en/cases/video/motion-reels",
  h1: text("Моушн Reels", "Motion Reels"),
  lead: key("videoCases.motionReels.subtitle"),
  seo: {
    title: text("Моушн Reels | Freelance UA", "Motion Reels | Freelance UA"),
    description: text("Моушн-дизайн для Instagram Reels — динамічні відео з анімаціями", "Motion design for Instagram Reels — dynamic videos with animations"),
    ogImage: "https://freelance-ua.agency/media/cases/motion-reels/hero-poster.jpg",
  },
  badge: key("videoCases.motionReels.category"),
  glow: { base: "rgba(236, 72, 153, 0.12)", strong: "rgba(236, 72, 153, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/motion-reels/hero.mp4", format: "9:16" },
      { src: "/media/cases/motion-reels/video2.mp4", format: "9:16" },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.motionReels.challengeTitle"),
      solutionTitle: key("videoCases.motionReels.solutionTitle"),
      task: key("videoCases.motionReels.challenge"),
      solution: key("videoCases.motionReels.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.motionReels.result1"),
        key("videoCases.motionReels.result2"),
        key("videoCases.motionReels.result3"),
        key("videoCases.motionReels.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.motionReels.reviewTitle"),
    text: key("videoCases.motionReels.reviewText"),
    author: key("videoCases.motionReels.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.motionReels.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
