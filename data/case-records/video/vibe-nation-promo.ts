import { key, text, type CaseRecord } from "../types";

/**
 * video/vibe-nation-promo — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const vibeNationPromo: CaseRecord = {
  id: "video/vibe-nation-promo",
  slug: "vibe-nation-promo",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/vibe-nation-promo",
  enPath: "/en/cases/video/vibe-nation-promo",
  h1: text("Промо для Vibe Nation", "Promo for Vibe Nation"),
  lead: key("videoCases.vibeNationPromo.subtitle"),
  seo: {
    title: text("Промо для Vibe Nation | Freelance UA", "Promo for Vibe Nation | Freelance UA"),
    description: text("AI-промо-ролик для бренду Vibe Nation — динамічний візуал для соцмереж", "AI promo video for the Vibe Nation brand — dynamic visuals for social media"),
    ogImage: "https://freelance-ua.agency/media/cases/vibe-nation-promo/hero-poster.jpg",
  },
  badge: key("videoCases.vibeNationPromo.category"),
  glow: { base: "rgba(220, 38, 38, 0.12)", strong: "rgba(220, 38, 38, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/vibe-nation-promo/hero.mp4",
    poster: "/media/cases/vibe-nation-promo/hero-poster.jpg",
    alt: key("videoCases.vibeNationPromo.title"),
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.vibeNationPromo.challengeTitle"),
      solutionTitle: key("videoCases.vibeNationPromo.solutionTitle"),
      task: key("videoCases.vibeNationPromo.challenge"),
      solution: key("videoCases.vibeNationPromo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.vibeNationPromo.result1"),
        key("videoCases.vibeNationPromo.result2"),
        key("videoCases.vibeNationPromo.result3"),
        key("videoCases.vibeNationPromo.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.vibeNationPromo.reviewTitle"),
    text: key("videoCases.vibeNationPromo.reviewText"),
    author: key("videoCases.vibeNationPromo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.vibeNationPromo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
