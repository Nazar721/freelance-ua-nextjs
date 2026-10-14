import { key, text, type CaseRecord } from "../types";

/**
 * video/ai-spring-fashion — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const aiSpringFashion: CaseRecord = {
  id: "video/ai-spring-fashion",
  slug: "ai-spring-fashion",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/ai-spring-fashion",
  enPath: "/en/cases/video/ai-spring-fashion",
  h1: text("AI-відео моди", "AI fashion video"),
  lead: key("videoCases.aiSpringFashion.subtitle"),
  seo: {
    title: text("AI-відео моди | Freelance UA", "AI fashion video | Freelance UA"),
    description: text("AI-генероване відео весняної моди — динамічний контент для соціальних мереж", "AI-generated spring fashion video — dynamic content for social media"),
    ogImage: "https://freelance-ua.agency/media/cases/ai-spring-fashion/hero-poster.jpg",
  },
  badge: key("videoCases.aiSpringFashion.category"),
  glow: { base: "rgba(244, 114, 182, 0.12)", strong: "rgba(244, 114, 182, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/ai-spring-fashion/hero.mp4",
    poster: "/media/cases/ai-spring-fashion/hero-poster.jpg",
    alt: key("videoCases.aiSpringFashion.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.aiSpringFashion.challengeTitle"),
      solutionTitle: key("videoCases.aiSpringFashion.solutionTitle"),
      task: key("videoCases.aiSpringFashion.challenge"),
      solution: key("videoCases.aiSpringFashion.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.aiSpringFashion.result1"),
        key("videoCases.aiSpringFashion.result2"),
        key("videoCases.aiSpringFashion.result3"),
        key("videoCases.aiSpringFashion.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.aiSpringFashion.reviewTitle"),
    text: key("videoCases.aiSpringFashion.reviewText"),
    author: key("videoCases.aiSpringFashion.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.aiSpringFashion.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
