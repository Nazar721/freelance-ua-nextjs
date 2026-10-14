import { key, text, type CaseRecord } from "../types";

/**
 * it/ruslan-aviation — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const ruslanAviation: CaseRecord = {
  id: "it/ruslan-aviation",
  slug: "ruslan-aviation",
  direction: "it",
  subcategory: "ecommerce",
  uaPath: "/cases/it/ruslan-aviation",
  enPath: "/en/cases/it/ruslan-aviation",

  h1: text("Ruslan Aviation — інтернет-магазин авіаційних компонентів", "Ruslan Aviation — online store of aviation components"),
  lead: key("itCases.ruslan.description"),
  seo: {
    title: text("Ruslan Aviation — e-commerce з фільтрами та конверсійним дизайном | Freelance UA", "Ruslan Aviation — e-commerce with filters and a conversion-focused design | Freelance UA"),
    description: key("itCases.ruslan.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/ruslan-web-v3.webp",
  },
  badge: key("itCases.ruslan.category"),
  glow: { base: "rgba(139, 92, 246, 0.12)", strong: "rgba(139, 92, 246, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/ruslan-web-v3.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.ruslan.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.ruslan.challenge"),
      solution: key("itCases.ruslan.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.ruslan.component1Title"),
          desc: key("itCases.ruslan.component1Desc"),
          images: [
            { src: "/media/cases/ruslan-catalog.webp" },
          ],
        },
        {
          title: key("itCases.ruslan.component2Title"),
          desc: key("itCases.ruslan.component2Desc"),
          images: [
            { src: "/media/cases/ruslan-filter.webp" },
          ],
        },
        {
          title: key("itCases.ruslan.component3Title"),
          desc: key("itCases.ruslan.component3Desc"),
          images: [
            { src: "/media/cases/ruslan-checkout.webp" },
          ],
        },
        {
          title: key("itCases.ruslan.component4Title"),
          desc: key("itCases.ruslan.component4Desc"),
          images: [
            { src: "/media/cases/ruslan-trust.webp" },
          ],
        },
        {
          title: key("itCases.ruslan.component5Title"),
          desc: key("itCases.ruslan.component5Desc"),
          images: [
            { src: "/media/cases/ruslan-admin1.webp" },
            { src: "/media/cases/ruslan-admin2.webp" },
            { src: "/media/cases/ruslan-admin3.webp" },
          ],
        },
        {
          title: key("itCases.ruslan.component6Title"),
          desc: key("itCases.ruslan.component6Desc"),
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.ruslan.result1"),
        key("itCases.ruslan.result2"),
        key("itCases.ruslan.result3"),
        key("itCases.ruslan.result4"),
        key("itCases.ruslan.result5"),
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://www.ruslanaviationcomponents.com/", label: key("itCases.ruslan.viewSiteLabel") },
      ],
    },
  ],

  review: {
    kind: "screenshot",
    // The original page heads this review with the shared `itCases.review`
    // key (not a case-specific `*reviewTitle`).
    title: key("itCases.review"),
    src: "/media/cases/ruslan-review.png",
    alt: key("itCases.ruslan.reviewAuthor"),
    text: key("itCases.ruslan.reviewText"),
    author: key("itCases.ruslan.reviewAuthor"),
    w: 800,
    h: 600,
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.bohdanDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/services/it#cases", en: "/en/services/it#cases" },
  },
};
