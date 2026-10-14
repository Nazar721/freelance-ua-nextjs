import { key, text, type CaseRecord } from "../types";

/**
 * it/serezha-shop — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const serezhaShop: CaseRecord = {
  id: "it/serezha-shop",
  slug: "serezha-shop",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/serezha-shop",
  enPath: "/en/cases/it/serezha-shop",

  h1: text("Serezha Shop — лендінг-каталог кросівок зі США", "Serezha Shop — sneaker catalogue landing page"),
  lead: key("itCases.serezhaShop.description"),
  seo: {
    title: text("Serezha Shop — каталог кросівок зі США з відгуками | Freelance UA", "Serezha Shop — catalogue of sneakers from the USA with reviews | Freelance UA"),
    description: text("Конверсійний лендінг-каталог для продажу кросівок зі США з каталогом моделей, відгуками та прямим зв'язком через Telegram.", "Conversion catalogue landing for selling sneakers from the USA, with a model catalogue, reviews and direct contact via Telegram."),
    ogImage: "https://freelance-ua.agency/media/cases/serezha-mocap.webp",
  },
  badge: key("itCases.serezhaShop.category"),
  glow: { base: "rgba(168, 85, 247, 0.15)", strong: "rgba(236, 72, 153, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/serezha-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.serezhaShop.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.serezhaShop.challenge"),
      solution: key("itCases.serezhaShop.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.serezhaShop.component1Title"),
          desc: key("itCases.serezhaShop.component1Desc"),
          images: [
            { src: "/media/cases/serezha1.jpeg" },
          ],
          link: { href: "https://sereza-shop-96xe.vercel.app/", label: key("itCases.serezhaShop.viewSiteLabel") },
        },
        {
          title: key("itCases.serezhaShop.component2Title"),
          desc: key("itCases.serezhaShop.component2Desc"),
          images: [
            { src: "/media/cases/serezha2.webp" },
          ],
        },
        {
          title: key("itCases.serezhaShop.component3Title"),
          desc: key("itCases.serezhaShop.component3Desc"),
          images: [
            { src: "/media/cases/serezha3.webp" },
          ],
        },
        {
          title: key("itCases.serezhaShop.component4Title"),
          desc: key("itCases.serezhaShop.component4Desc"),
          images: [
            { src: "/media/cases/serezha4.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.serezhaShop.result1"),
        key("itCases.serezhaShop.result2"),
        key("itCases.serezhaShop.result3"),
        key("itCases.serezhaShop.result4"),
        key("itCases.serezhaShop.result5"),
        key("itCases.serezhaShop.result6"),
        key("itCases.serezhaShop.result7"),
        key("itCases.serezhaShop.result8"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.serezhaShop.reviewTitle"),
    text: key("itCases.serezhaShop.reviewText"),
    author: key("itCases.serezhaShop.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.nazarDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/services/it#cases", en: "/en/services/it#cases" },
  },
};
