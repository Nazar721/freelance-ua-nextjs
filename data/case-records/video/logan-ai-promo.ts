import { key, text, type CaseRecord } from "../types";

/**
 * video/logan-ai-promo — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const loganAiPromo: CaseRecord = {
  id: "video/logan-ai-promo",
  slug: "logan-ai-promo",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/logan-ai-promo",
  enPath: "/en/cases/video/logan-ai-promo",
  h1: text("AI-промо LOGAN", "AI promo LOGAN"),
  lead: key("videoCases.loganAiPromo.subtitle"),
  seo: {
    title: text("AI-промо LOGAN | Freelance UA", "AI promo LOGAN | Freelance UA"),
    description: key("videoCases.loganAiPromo.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/logan-ai-promo/hero-poster.jpg",
  },
  badge: key("videoCases.loganAiPromo.category"),
  glow: { base: "rgba(219, 166, 156, 0.12)", strong: "rgba(219, 166, 156, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/logan-ai-promo/hero.mp4",
    poster: "/media/cases/logan-ai-promo/hero-poster.jpg",
    alt: key("videoCases.loganAiPromo.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.loganAiPromo.challengeTitle"),
      solutionTitle: key("videoCases.loganAiPromo.solutionTitle"),
      task: key("videoCases.loganAiPromo.challenge"),
      solution: key("videoCases.loganAiPromo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.loganAiPromo.result1"),
        key("videoCases.loganAiPromo.result2"),
        key("videoCases.loganAiPromo.result3"),
        key("videoCases.loganAiPromo.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.loganAiPromo.clientName"),
      subtitle: key("videoCases.loganAiPromo.clientRole"),
      text: key("videoCases.loganAiPromo.clientDesc"),
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.loganAiPromo.reviewTitle"),
    text: key("videoCases.loganAiPromo.reviewText"),
    author: key("videoCases.loganAiPromo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.loganAiPromo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
