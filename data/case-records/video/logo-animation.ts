import { key, text, type CaseRecord } from "../types";

/**
 * video/logo-animation — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const logoAnimation: CaseRecord = {
  id: "video/logo-animation",
  slug: "logo-animation",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/logo-animation",
  enPath: "/en/cases/video/logo-animation",
  h1: text("Анімація логотипу", "Logo animation"),
  lead: key("videoCases.logoAnimation.subtitle"),
  seo: {
    title: text("Анімація логотипу | Freelance UA", "Logo animation | Freelance UA"),
    description: text("Анімація логотипу — моушн-дизайн для створення динамічного візуалу бренду", "Logo animation — motion design to create a dynamic brand visual"),
    ogImage: "https://freelance-ua.agency/media/cases/logo-animation/hero-poster.jpg",
  },
  badge: key("videoCases.logoAnimation.category"),
  glow: { base: "rgba(6, 182, 212, 0.12)", strong: "rgba(6, 182, 212, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/logo-animation/hero.mp4",
    alt: key("videoCases.logoAnimation.title"),
    duration: text("~13с", "~13s"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.logoAnimation.challengeTitle"),
      solutionTitle: key("videoCases.logoAnimation.solutionTitle"),
      task: key("videoCases.logoAnimation.challenge"),
      solution: key("videoCases.logoAnimation.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.logoAnimation.result1"),
        key("videoCases.logoAnimation.result2"),
        key("videoCases.logoAnimation.result3"),
        key("videoCases.logoAnimation.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.logoAnimation.reviewTitle"),
    text: key("videoCases.logoAnimation.reviewText"),
    author: key("videoCases.logoAnimation.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.logoAnimation.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
