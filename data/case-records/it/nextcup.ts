import { key, text, type CaseRecord } from "../types";

/**
 * it/nextcup — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const nextcup: CaseRecord = {
  id: "it/nextcup",
  slug: "nextcup",
  direction: "it",
  subcategory: "ecommerce",
  uaPath: "/cases/it/nextcup",
  enPath: "/en/cases/it/nextcup",

  h1: text("NextCup — оновлення інтернет-магазину", "NextCup — online store update"),
  lead: key("itCases.nextCup.description"),
  seo: {
    title: text("NextCup — оновлення каталогу та checkout на Хорошоп | Freelance UA", "NextCup — catalogue and checkout update on Horoshop | Freelance UA"),
    description: text("Оновлення інтернет-магазину на Хорошоп з новим дизайном, каталогом, банерами та швидким checkout.", "An online store update on Horoshop with a new design, catalogue, banners and a faster checkout."),
    ogImage: "https://freelance-ua.agency/media/cases/nextcup-mocap.webp",
  },
  badge: key("itCases.nextCup.category"),
  glow: { base: "rgba(94, 45, 77, 0.18)", strong: "rgba(94, 45, 77, 0.4)" },

  hero: {
    kind: "image",
    src: "/media/cases/nextcup-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.nextCup.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.nextCup.challenge"),
      solution: key("itCases.nextCup.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.nextCup.component1Title"),
          desc: key("itCases.nextCup.component1Desc"),
          images: [
            { src: "/media/cases/nextcup1.jpeg" },
          ],
          link: { href: "https://nextcup.com.ua/", label: key("itCases.nextCup.viewSiteLabel") },
        },
        {
          title: key("itCases.nextCup.component2Title"),
          desc: key("itCases.nextCup.component2Desc"),
          images: [
            { src: "/media/cases/nextcup2.webp" },
          ],
        },
        {
          title: key("itCases.nextCup.component3Title"),
          desc: key("itCases.nextCup.component3Desc"),
          images: [
            { src: "/media/cases/nextcup3.webp" },
          ],
        },
        {
          title: key("itCases.nextCup.component4Title"),
          desc: key("itCases.nextCup.component4Desc"),
          images: [
            { src: "/media/cases/nextcup4.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.nextCup.result1"),
        key("itCases.nextCup.result2"),
        key("itCases.nextCup.result3"),
        key("itCases.nextCup.result4"),
        key("itCases.nextCup.result5"),
        key("itCases.nextCup.result6"),
        key("itCases.nextCup.result7"),
        key("itCases.nextCup.result8"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.nextCup.reviewTitle"),
    text: key("itCases.nextCup.reviewText"),
    author: key("itCases.nextCup.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.andriiDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/cases/it", en: "/en/cases/it" },
  },
};
