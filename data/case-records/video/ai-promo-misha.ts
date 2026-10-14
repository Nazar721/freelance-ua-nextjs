import { key, text, type CaseRecord } from "../types";

/**
 * video/ai-promo-misha — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const aiPromoMisha: CaseRecord = {
  id: "video/ai-promo-misha",
  slug: "ai-promo-misha",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/ai-promo-misha",
  enPath: "/en/cases/video/ai-promo-misha",
  h1: text("AI промо-відео", "AI promo video"),
  lead: key("videoCases.aiPromoMisha.subtitle"),
  seo: {
    title: text("AI промо-відео | Freelance UA", "AI promo video | Freelance UA"),
    description: key("videoCases.aiPromoMisha.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/ai-city-promo/og-poster.jpg",
  },
  badge: key("videoCases.aiPromoMisha.category"),
  glow: { base: "rgba(34, 197, 94, 0.12)", strong: "rgba(34, 197, 94, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/ai-city-promo/hero.mp4",
    alt: key("videoCases.aiPromoMisha.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.aiPromoMisha.challengeTitle"),
      solutionTitle: key("videoCases.aiPromoMisha.solutionTitle"),
      task: key("videoCases.aiPromoMisha.challenge"),
      solution: key("videoCases.aiPromoMisha.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.aiPromoMisha.result1"),
        key("videoCases.aiPromoMisha.result2"),
        key("videoCases.aiPromoMisha.result3"),
        key("videoCases.aiPromoMisha.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.aiPromoMisha.reviewTitle"),
    text: key("videoCases.aiPromoMisha.reviewText"),
    author: key("videoCases.aiPromoMisha.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.aiPromoMisha.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
