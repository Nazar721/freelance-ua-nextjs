import { key, text, type CaseRecord } from "../types";

/**
 * it/selloflow — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const selloflow: CaseRecord = {
  id: "it/selloflow",
  slug: "selloflow",
  direction: "it",
  subcategory: "saas-telegram",
  uaPath: "/cases/it/selloflow",
  enPath: "/en/cases/it/selloflow",

  h1: text("Selloflow — платформа для створення магазинів", "Selloflow — platform for building online stores"),
  lead: key("itCases.selloflow.description"),
  seo: {
    title: text("Selloflow — SaaS для магазинів: каталог, замовлення, Telegram-бот | Freelance UA", "Selloflow — SaaS for stores: catalogue, orders, Telegram bot | Freelance UA"),
    description: key("itCases.selloflow.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/selloflow-mocap.webp?v=2",
  },
  badge: key("itCases.selloflow.category"),
  glow: { base: "rgba(139, 92, 246, 0.12)", strong: "rgba(139, 92, 246, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/selloflow-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.selloflow.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.selloflow.challenge"),
      solution: key("itCases.selloflow.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.selloflow.component1Title"),
          desc: key("itCases.selloflow.component1Desc"),
          images: [
            { src: "/media/cases/selloflow-dashboard.webp" },
          ],
        },
        {
          title: key("itCases.selloflow.component2Title"),
          desc: key("itCases.selloflow.component2Desc"),
          images: [
            { src: "/media/cases/selloflow-products.webp" },
          ],
        },
        {
          title: key("itCases.selloflow.component3Title"),
          desc: key("itCases.selloflow.component3Desc"),
          images: [
            { src: "/media/cases/selloflow-orders.webp" },
          ],
        },
        {
          title: key("itCases.selloflow.component4Title"),
          desc: key("itCases.selloflow.component4Desc"),
          images: [
            { src: "/media/cases/selloflow-settings.webp" },
          ],
        },
        {
          title: key("itCases.selloflow.component5Title"),
          desc: key("itCases.selloflow.component5Desc"),
          images: [
            { src: "/media/cases/selloflow-pricing.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.selloflow.result1"),
        key("itCases.selloflow.result2"),
        key("itCases.selloflow.result3"),
        key("itCases.selloflow.result4"),
        key("itCases.selloflow.result5"),
        key("itCases.selloflow.result6"),
        key("itCases.selloflow.result7"),
        key("itCases.selloflow.result8"),
        key("itCases.selloflow.result9"),
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://selloflow.store/", label: key("itCases.selloflow.viewSiteLabel") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.selloflow.reviewTitle"),
    text: key("itCases.selloflow.reviewText"),
    author: key("itCases.selloflow.reviewAuthor"),
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
