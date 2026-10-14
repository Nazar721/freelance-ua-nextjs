import { key, text, type CaseRecord } from "../types";

/**
 * video/sales-bible-promo — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const salesBiblePromo: CaseRecord = {
  id: "video/sales-bible-promo",
  slug: "sales-bible-promo",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/sales-bible-promo",
  enPath: "/en/cases/video/sales-bible-promo",
  h1: text("Біблія продавця", "Sales bible"),
  lead: key("videoCases.salesBiblePromo.subtitle"),
  seo: {
    title: text("Біблія продавця | Freelance UA", "Sales bible | Freelance UA"),
    description: key("videoCases.salesBiblePromo.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/sales-bible-promo/hero-poster.jpg",
  },
  badge: key("videoCases.salesBiblePromo.category"),
  glow: { base: "rgba(245, 158, 11, 0.12)", strong: "rgba(245, 158, 11, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/sales-bible-promo/hero.mp4",
    poster: "/media/cases/sales-bible-promo/hero-poster.jpg",
    alt: key("videoCases.salesBiblePromo.title"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.salesBiblePromo.challengeTitle"),
      solutionTitle: key("videoCases.salesBiblePromo.solutionTitle"),
      task: key("videoCases.salesBiblePromo.challenge"),
      solution: key("videoCases.salesBiblePromo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.salesBiblePromo.result1"),
        key("videoCases.salesBiblePromo.result2"),
        key("videoCases.salesBiblePromo.result3"),
        key("videoCases.salesBiblePromo.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.salesBiblePromo.reviewTitle"),
    text: key("videoCases.salesBiblePromo.reviewText"),
    author: key("videoCases.salesBiblePromo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.salesBiblePromo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
