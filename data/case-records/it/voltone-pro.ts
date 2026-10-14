import { key, text, type CaseRecord } from "../types";

/**
 * it/voltone-pro — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const voltonePro: CaseRecord = {
  id: "it/voltone-pro",
  slug: "voltone-pro",
  direction: "it",
  subcategory: "ecommerce",
  uaPath: "/cases/it/voltone-pro",
  enPath: "/en/cases/it/voltone-pro",

  h1: text("Voltone.pro — інтернет-магазин павербанків і зарядних пристроїв", "Voltone.pro — online store of power banks and chargers"),
  lead: key("itCases.voltonePro.description"),
  seo: {
    title: text("Voltone.pro — каталог, кабінет і доставка павербанків | Freelance UA", "Voltone.pro — power bank catalogue, account and delivery | Freelance UA"),
    description: text("Інтернет-магазин павербанків та зарядних пристроїв з каталогом, знижками до −40%, відгуками, кабінетом та швидкою доставкою.", "Online store for power banks and chargers with a catalogue, discounts up to −40%, reviews, an account and fast delivery."),
    ogImage: "https://freelance-ua.agency/media/cases/voltone-mocap.webp?v=2",
  },
  badge: key("itCases.voltonePro.category"),
  glow: { base: "rgba(132, 204, 22, 0.12)", strong: "rgba(132, 204, 22, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/voltone-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.voltonePro.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.voltonePro.challenge"),
      solution: key("itCases.voltonePro.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.voltonePro.component1Title"),
          desc: key("itCases.voltonePro.component1Desc"),
          images: [
            { src: "/media/cases/voltone-landing-1.webp" },
          ],
        },
        {
          title: key("itCases.voltonePro.component2Title"),
          desc: key("itCases.voltonePro.component2Desc"),
          images: [
            { src: "/media/cases/voltone-catalog.webp" },
            { src: "/media/cases/voltone-discounts.webp" },
          ],
        },
        {
          title: key("itCases.voltonePro.component3Title"),
          desc: key("itCases.voltonePro.component3Desc"),
          images: [
            { src: "/media/cases/voltone-product.webp" },
          ],
        },
        {
          title: key("itCases.voltonePro.component4Title"),
          desc: key("itCases.voltonePro.component4Desc"),
          images: [
            { src: "/media/cases/voltone-reviews.webp" },
          ],
        },
        {
          title: key("itCases.voltonePro.component5Title"),
          desc: key("itCases.voltonePro.component5Desc"),
          images: [
            { src: "/media/cases/voltone-instagram.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.voltonePro.result1"),
        key("itCases.voltonePro.result2"),
        key("itCases.voltonePro.result3"),
        key("itCases.voltonePro.result4"),
        key("itCases.voltonePro.result5"),
        key("itCases.voltonePro.result6"),
        key("itCases.voltonePro.result7"),
        key("itCases.voltonePro.result8"),
        key("itCases.voltonePro.result9"),
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://voltone.pro", label: key("itCases.voltonePro.viewSiteLabel") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.voltonePro.reviewTitle"),
    text: key("itCases.voltonePro.reviewText"),
    author: key("itCases.voltonePro.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.andriiDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/services/it#cases", en: "/en/services/it#cases" },
  },
};
