import { key, text, type CaseRecord } from "../types";

/**
 * video/sheglam-freedom-fest — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const sheglamFreedomFest: CaseRecord = {
  id: "video/sheglam-freedom-fest",
  slug: "sheglam-freedom-fest",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/sheglam-freedom-fest",
  enPath: "/en/cases/video/sheglam-freedom-fest",
  h1: text("Промо SHEGLAM Freedom Fest", "SHEGLAM Freedom Fest promo"),
  lead: key("videoCases.sheglamFreedomFest.subtitle"),
  seo: {
    title: text("Промо SHEGLAM Freedom Fest | Freelance UA", "SHEGLAM Freedom Fest promo | Freelance UA"),
    description: text("AI-промо для SHEGLAM Freedom Fest — динамічний візуал для маркетингової кампанії", "AI promo for SHEGLAM Freedom Fest — dynamic visuals for a marketing campaign"),
    ogImage: "https://freelance-ua.agency/media/cases/sheglam-freedom-fest/hero-poster.jpg",
  },
  badge: key("videoCases.sheglamFreedomFest.category"),
  glow: { base: "rgba(192, 132, 252, 0.12)", strong: "rgba(192, 132, 252, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/sheglam-freedom-fest/hero.mp4",
    poster: "/media/cases/sheglam-freedom-fest/hero-poster.jpg",
    alt: key("videoCases.sheglamFreedomFest.title"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.sheglamFreedomFest.challengeTitle"),
      solutionTitle: key("videoCases.sheglamFreedomFest.solutionTitle"),
      task: key("videoCases.sheglamFreedomFest.challenge"),
      solution: key("videoCases.sheglamFreedomFest.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.sheglamFreedomFest.result1"),
        key("videoCases.sheglamFreedomFest.result2"),
        key("videoCases.sheglamFreedomFest.result3"),
        key("videoCases.sheglamFreedomFest.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.sheglamFreedomFest.clientName"),
      subtitle: key("videoCases.sheglamFreedomFest.clientRole"),
      text: key("videoCases.sheglamFreedomFest.clientDesc"),
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.sheglamFreedomFest.reviewTitle"),
    text: key("videoCases.sheglamFreedomFest.reviewText"),
    author: key("videoCases.sheglamFreedomFest.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.sheglamFreedomFest.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
