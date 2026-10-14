import { key, text, type CaseRecord } from "../types";

/**
 * video/yulia-smm-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const yuliaSmmReels: CaseRecord = {
  id: "video/yulia-smm-reels",
  slug: "yulia-smm-reels",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/yulia-smm-reels",
  enPath: "/en/cases/video/yulia-smm-reels",
  h1: text("Reels для SMM", "Reels for SMM"),
  lead: key("videoCases.yuliaSmm.subtitle"),
  seo: {
    title: text("Reels для SMM | Freelance UA", "Reels for SMM | Freelance UA"),
    description: text("Монтаж Reels для SMM-спеціалістки — динамічні відео для Instagram", "Editing Reels for an SMM specialist — dynamic videos for Instagram"),
    ogImage: "https://freelance-ua.agency/media/cases/yulia-smm-reels/hero-poster.jpg",
  },
  badge: key("videoCases.yuliaSmm.category"),
  glow: { base: "rgba(245, 158, 11, 0.12)", strong: "rgba(245, 158, 11, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/yulia-smm-reels/hero.mp4",
    poster: "/media/cases/yulia-smm-reels/hero-poster.jpg",
    alt: key("videoCases.yuliaSmm.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.yuliaSmm.challengeTitle"),
      solutionTitle: key("videoCases.yuliaSmm.solutionTitle"),
      task: key("videoCases.yuliaSmm.challenge"),
      solution: key("videoCases.yuliaSmm.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.yuliaSmm.result1"),
        key("videoCases.yuliaSmm.result2"),
        key("videoCases.yuliaSmm.result3"),
        key("videoCases.yuliaSmm.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.yuliaSmm.clientName"),
      subtitle: key("videoCases.yuliaSmm.clientRole"),
      text: key("videoCases.yuliaSmm.clientDesc"),
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.yuliaSmm.reviewTitle"),
    src: "/media/cases/yulia-smm-reels/screenshot.webp",
    alt: text("Відгук Юлії Хиленко", "Yuliia Khylenko's review"),
    text: key("videoCases.yuliaSmm.reviewText"),
    author: key("videoCases.yuliaSmm.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.yuliaSmm.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
