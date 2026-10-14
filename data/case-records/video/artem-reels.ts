import { key, text, type CaseRecord } from "../types";

/**
 * video/artem-reels — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const artemReels: CaseRecord = {
  id: "video/artem-reels",
  slug: "artem-reels",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/artem-reels",
  enPath: "/en/cases/video/artem-reels",
  h1: text("Reels для Артема", "Reels for Artem"),
  lead: key("videoCases.artem.subtitle"),
  seo: {
    title: text("Reels для Артема | Freelance UA", "Reels for Artem | Freelance UA"),
    description: text("Створили Reels для блогера Артема — динамічний монтаж для соцмереж", "Created Reels for blogger Artem — dynamic editing for social media"),
    ogImage: "https://freelance-ua.agency/media/cases/artem-reels/hero-poster.jpg",
  },
  badge: key("videoCases.artem.category"),
  glow: { base: "rgba(239, 68, 68, 0.12)", strong: "rgba(239, 68, 68, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/artem-reels/hero.mp4",
    poster: "/media/cases/artem-reels/hero-poster.jpg",
    alt: key("videoCases.artem.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.artem.challengeTitle"),
      solutionTitle: key("videoCases.artem.solutionTitle"),
      task: key("videoCases.artem.challenge"),
      solution: key("videoCases.artem.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.artem.result1"),
        key("videoCases.artem.result2"),
        key("videoCases.artem.result3"),
        key("videoCases.artem.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.artem.clientName"),
      subtitle: key("videoCases.artem.clientRole"),
      text: key("videoCases.artem.clientDesc"),
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.artem.reviewTitle"),
    text: key("videoCases.artem.reviewText"),
    author: key("videoCases.artem.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.artem.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
