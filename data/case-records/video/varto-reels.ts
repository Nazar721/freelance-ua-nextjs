import { key, text, type CaseRecord } from "../types";

/**
 * video/varto-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const vartoReels: CaseRecord = {
  id: "video/varto-reels",
  slug: "varto-reels",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/varto-reels",
  enPath: "/en/cases/video/varto-reels",
  h1: text("Varto — Енергетика", "Varto — energy drink"),
  lead: key("videoCases.varto.subtitle"),
  seo: {
    title: text("Varto — Енергетика | Freelance UA", "Varto — energy drink | Freelance UA"),
    description: key("videoCases.varto.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/varto-reels/hero-poster.jpg",
  },
  badge: key("videoCases.varto.category"),
  glow: { base: "rgba(250, 204, 21, 0.12)", strong: "rgba(250, 204, 21, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/varto-reels/hero.mp4",
    poster: "/media/cases/varto-reels/hero-poster.jpg",
    alt: key("videoCases.varto.title"),
    duration: text("~19с", "~19s"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.varto.challengeTitle"),
      solutionTitle: key("videoCases.varto.solutionTitle"),
      task: key("videoCases.varto.challenge"),
      solution: key("videoCases.varto.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.varto.result1"),
        key("videoCases.varto.result2"),
        key("videoCases.varto.result3"),
        key("videoCases.varto.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.varto.reviewTitle"),
    src: "/media/cases/varto-reels/screenshot.webp",
    alt: text("Відгук Varto", "Varto review"),
    text: key("videoCases.varto.reviewText"),
    author: key("videoCases.varto.reviewAuthor"),
    w: 400,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.varto.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
