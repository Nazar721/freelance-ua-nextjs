import { key, text, type CaseRecord } from "../types";

/**
 * video/ai-ice-cream — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const aiIceCream: CaseRecord = {
  id: "video/ai-ice-cream",
  slug: "ai-ice-cream",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/ai-ice-cream",
  enPath: "/en/cases/video/ai-ice-cream",
  h1: text("AI-відео морозива", "AI ice cream video"),
  lead: key("videoCases.aiIceCream.subtitle"),
  seo: {
    title: text("AI-відео морозива | Freelance UA", "AI ice cream video | Freelance UA"),
    description: key("videoCases.aiIceCream.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/ai-ice-cream/hero-poster.jpg",
  },
  badge: key("videoCases.aiIceCream.category"),
  glow: { base: "rgba(244, 114, 182, 0.12)", strong: "rgba(244, 114, 182, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/ai-ice-cream/hero.mp4",
    poster: "/media/cases/ai-ice-cream/hero-poster.jpg",
    alt: key("videoCases.aiIceCream.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.aiIceCream.challengeTitle"),
      solutionTitle: key("videoCases.aiIceCream.solutionTitle"),
      task: key("videoCases.aiIceCream.challenge"),
      solution: key("videoCases.aiIceCream.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.aiIceCream.result1"),
        key("videoCases.aiIceCream.result2"),
        key("videoCases.aiIceCream.result3"),
        key("videoCases.aiIceCream.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.aiIceCream.reviewTitle"),
    src: "/media/cases/ai-ice-cream/screenshot.webp",
    alt: text("Відгук клієнта", "Client review"),
    text: key("videoCases.aiIceCream.reviewText"),
    author: key("videoCases.aiIceCream.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.aiIceCream.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
