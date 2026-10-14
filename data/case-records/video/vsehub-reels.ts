import { key, text, type CaseRecord } from "../types";

/**
 * video/vsehub-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const vsehubReels: CaseRecord = {
  id: "video/vsehub-reels",
  slug: "vsehub-reels",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/vsehub-reels",
  enPath: "/en/cases/video/vsehub-reels",
  h1: text("ВсеHub", "VseHub"),
  lead: key("videoCases.vsehub.subtitle"),
  seo: {
    title: text("ВсеHub | Freelance UA", "VseHub | Freelance UA"),
    description: text("Серія Instagram Reels для YouTube-каналу ВсеHub — повний цикл від монтажу до публікації у форматі 9:16", "A series of Instagram Reels for the VseHub YouTube channel — full cycle from editing to publishing in 9:16"),
    ogImage: "https://freelance-ua.agency/media/cases/vsehub-reels/hero-poster.jpg",
  },
  badge: key("videoCases.vsehub.category"),
  glow: { base: "rgba(245, 158, 11, 0.12)", strong: "rgba(245, 158, 11, 0.25)" },

  hero: {
    kind: "videoGrid",
    ratio: "9/16",
    items: [
      { src: "/media/cases/vsehub-reels/hero.mp4", format: "9:16" },
      { src: "/media/cases/vsehub-reels/hero-poster.jpg", format: "9:16" },
      { src: "/media/cases/vsehub-reels/process-1.mp4", format: "9:16" },
      { src: "/media/cases/vsehub-reels/process-1-poster.jpg", format: "9:16" },
      { src: "/media/cases/vsehub-reels/process-2.mp4", format: "9:16" },
      { src: "/media/cases/vsehub-reels/process-2-poster.jpg", format: "9:16" },
    ],
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.vsehub.challengeTitle"),
      solutionTitle: key("videoCases.vsehub.solutionTitle"),
      task: key("videoCases.vsehub.challenge"),
      solution: key("videoCases.vsehub.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.vsehub.result1"),
        key("videoCases.vsehub.result2"),
        key("videoCases.vsehub.result3"),
        key("videoCases.vsehub.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.vsehub.clientName"),
      subtitle: key("videoCases.vsehub.clientRole"),
      text: key("videoCases.vsehub.clientDesc"),
      image: { src: "/media/cases/vsehub-reels/avatar.jpeg", alt: text("YouTube канал VseHub", "VseHub YouTube channel") },
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.vsehub.reviewTitle"),
    src: "/media/cases/vsehub-reels/screenshot.webp",
    alt: text("Відгук VseHub", "VseHub review"),
    text: key("videoCases.vsehub.reviewText"),
    author: key("videoCases.vsehub.reviewAuthor"),
    w: 400,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.vsehub.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
