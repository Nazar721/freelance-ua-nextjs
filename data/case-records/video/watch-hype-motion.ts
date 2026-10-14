import { key, text, type CaseRecord } from "../types";

/**
 * video/watch-hype-motion — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const watchHypeMotion: CaseRecord = {
  id: "video/watch-hype-motion",
  slug: "watch-hype-motion",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/watch-hype-motion",
  enPath: "/en/cases/video/watch-hype-motion",
  h1: text("Моушн для Watch Hype", "Watch Hype motion"),
  lead: key("videoCases.watchHypeMotion.subtitle"),
  seo: {
    title: text("Моушн для Watch Hype | Freelance UA", "Watch Hype motion | Freelance UA"),
    description: text("Моушн-промо для Watch Hype — динамічний монтаж для соцмереж", "Motion promo for Watch Hype — dynamic editing for social media"),
    ogImage: "https://freelance-ua.agency/media/cases/watch-hype-motion/hero-poster.jpg",
  },
  badge: key("videoCases.watchHypeMotion.category"),
  glow: { base: "rgba(148, 163, 184, 0.12)", strong: "rgba(148, 163, 184, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/watch-hype-motion/hero.mp4",
    alt: key("videoCases.watchHypeMotion.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.watchHypeMotion.challengeTitle"),
      solutionTitle: key("videoCases.watchHypeMotion.solutionTitle"),
      task: key("videoCases.watchHypeMotion.challenge"),
      solution: key("videoCases.watchHypeMotion.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.watchHypeMotion.result1"),
        key("videoCases.watchHypeMotion.result2"),
        key("videoCases.watchHypeMotion.result3"),
        key("videoCases.watchHypeMotion.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.watchHypeMotion.reviewTitle"),
    text: key("videoCases.watchHypeMotion.reviewText"),
    author: key("videoCases.watchHypeMotion.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.watchHypeMotion.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
