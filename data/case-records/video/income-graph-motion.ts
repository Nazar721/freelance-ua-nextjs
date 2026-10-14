import { key, text, type CaseRecord } from "../types";

/**
 * video/income-graph-motion — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const incomeGraphMotion: CaseRecord = {
  id: "video/income-graph-motion",
  slug: "income-graph-motion",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/income-graph-motion",
  enPath: "/en/cases/video/income-graph-motion",
  h1: text("Анімація графіку доходів", "Income graph animation"),
  lead: key("videoCases.incomeGraphMotion.subtitle"),
  seo: {
    title: text("Анімація графіку доходів | Freelance UA", "Income graph animation | Freelance UA"),
    description: text("Моушн-анімація графіку доходів — динамічна візуалізація даних", "Motion animation of an income graph — dynamic data visualization"),
    ogImage: "https://freelance-ua.agency/media/cases/income-graph-motion/hero-poster.jpg",
  },
  badge: key("videoCases.incomeGraphMotion.category"),
  glow: { base: "rgba(34, 197, 94, 0.12)", strong: "rgba(34, 197, 94, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/income-graph-motion/hero.mp4",
    poster: "/media/cases/income-graph-motion/hero-poster.jpg",
    alt: key("videoCases.incomeGraphMotion.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.incomeGraphMotion.challengeTitle"),
      solutionTitle: key("videoCases.incomeGraphMotion.solutionTitle"),
      task: key("videoCases.incomeGraphMotion.challenge"),
      solution: key("videoCases.incomeGraphMotion.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.incomeGraphMotion.result1"),
        key("videoCases.incomeGraphMotion.result2"),
        key("videoCases.incomeGraphMotion.result3"),
        key("videoCases.incomeGraphMotion.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.incomeGraphMotion.reviewTitle"),
    text: key("videoCases.incomeGraphMotion.reviewText"),
    author: key("videoCases.incomeGraphMotion.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.incomeGraphMotion.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
