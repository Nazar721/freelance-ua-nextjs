import { key, text, type CaseRecord } from "../types";

/**
 * video/presentation-animation — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const presentationAnimation: CaseRecord = {
  id: "video/presentation-animation",
  slug: "presentation-animation",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/presentation-animation",
  enPath: "/en/cases/video/presentation-animation",
  h1: text("Анімація презентації", "Presentation animation"),
  lead: key("videoCases.presentationAnimation.subtitle"),
  seo: {
    title: text("Анімація презентації | Freelance UA", "Presentation animation | Freelance UA"),
    description: text("Анімація для презентації — моушн-ефекти для професійної подачі", "Animation for a presentation — motion effects for a professional delivery"),
    ogImage: "https://freelance-ua.agency/media/cases/presentation-animation/hero-poster.jpg",
  },
  badge: key("videoCases.presentationAnimation.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/presentation-animation/hero.mp4",
    alt: key("videoCases.presentationAnimation.title"),
    duration: text("~14с", "~14s"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.presentationAnimation.challengeTitle"),
      solutionTitle: key("videoCases.presentationAnimation.solutionTitle"),
      task: key("videoCases.presentationAnimation.challenge"),
      solution: key("videoCases.presentationAnimation.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.presentationAnimation.result1"),
        key("videoCases.presentationAnimation.result2"),
        key("videoCases.presentationAnimation.result3"),
        key("videoCases.presentationAnimation.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.presentationAnimation.reviewTitle"),
    src: "/media/cases/presentation-animation/review.webp",
    alt: text("Відгук клієнта", "Client review"),
    text: key("videoCases.presentationAnimation.reviewText"),
    author: key("videoCases.presentationAnimation.reviewAuthor"),
    w: 1164,
    h: 504,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.presentationAnimation.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
