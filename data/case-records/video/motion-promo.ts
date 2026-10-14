import { key, text, type CaseRecord } from "../types";

/**
 * video/motion-promo — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const motionPromo: CaseRecord = {
  id: "video/motion-promo",
  slug: "motion-promo",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/motion-promo",
  enPath: "/en/cases/video/motion-promo",
  h1: text("Промо-ролик", "Promo video"),
  lead: key("videoCases.motionPromo.subtitle"),
  seo: {
    title: text("Промо-ролик | Freelance UA", "Promo video | Freelance UA"),
    description: key("videoCases.motionPromo.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/motion-promo/hero-poster.jpg",
  },
  badge: key("videoCases.motionPromo.category"),
  glow: { base: "rgba(6, 182, 212, 0.12)", strong: "rgba(6, 182, 212, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/motion-promo/hero.mp4",
    alt: key("videoCases.motionPromo.title"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.motionPromo.challengeTitle"),
      solutionTitle: key("videoCases.motionPromo.solutionTitle"),
      task: key("videoCases.motionPromo.challenge"),
      solution: key("videoCases.motionPromo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.motionPromo.result1"),
        key("videoCases.motionPromo.result2"),
        key("videoCases.motionPromo.result3"),
        key("videoCases.motionPromo.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.motionPromo.reviewTitle"),
    text: key("videoCases.motionPromo.reviewText"),
    author: key("videoCases.motionPromo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.motionPromo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
