import { key, text, type CaseRecord } from "../types";

/**
 * it/pivden-solar — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const pivdenSolar: CaseRecord = {
  id: "it/pivden-solar",
  slug: "pivden-solar",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/pivden-solar",
  enPath: "/en/cases/it/pivden-solar",

  h1: text("Південь Солар — конверсійний лендинг для монтажу СЕС", "Pivden Solar — conversion landing for solar installation"),
  lead: key("itCases.pivdenSolar.description"),
  seo: {
    title: text("Південь Солар — лендинг СЕС із каталогом комплектів | Freelance UA", "Pivden Solar — solar landing with a kit catalogue | Freelance UA"),
    description: text("Конверсійний лендинг для компанії з монтажу СЕС з каталогом комплектів, галереєю робіт та адмін-панеллю.", "Conversion landing for a solar installation company with a kit catalogue, a works gallery and an admin panel."),
    ogImage: "https://freelance-ua.agency/media/cases/pivdensolar-mocap-v2.webp",
  },
  badge: key("itCases.pivdenSolar.category"),
  glow: { base: "rgba(34, 197, 94, 0.15)", strong: "rgba(34, 197, 94, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/pivdensolar-mocap-v2.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.pivdenSolar.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.pivdenSolar.challenge"),
      solution: key("itCases.pivdenSolar.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.pivdenSolar.component1Title"),
          desc: key("itCases.pivdenSolar.component1Desc"),
          images: [
            { src: "/media/cases/pivdensolar1.jpeg" },
          ],
          link: { href: "https://pivdensolar.com.ua/", label: key("itCases.pivdenSolar.viewSiteLabel") },
        },
        {
          title: key("itCases.pivdenSolar.component2Title"),
          desc: key("itCases.pivdenSolar.component2Desc"),
          images: [
            { src: "/media/cases/pivdensolar2.webp" },
          ],
        },
        {
          title: key("itCases.pivdenSolar.component3Title"),
          desc: key("itCases.pivdenSolar.component3Desc"),
          images: [
            { src: "/media/cases/pivdensolar3.jpeg" },
          ],
        },
        {
          title: key("itCases.pivdenSolar.component4Title"),
          desc: key("itCases.pivdenSolar.component4Desc"),
          images: [
            { src: "/media/cases/pivdensolar4.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.pivdenSolar.result1"),
        key("itCases.pivdenSolar.result2"),
        key("itCases.pivdenSolar.result3"),
        key("itCases.pivdenSolar.result4"),
        key("itCases.pivdenSolar.result5"),
        key("itCases.pivdenSolar.result6"),
        key("itCases.pivdenSolar.result7"),
        key("itCases.pivdenSolar.result8"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.pivdenSolar.reviewTitle"),
    text: key("itCases.pivdenSolar.reviewText"),
    author: key("itCases.pivdenSolar.reviewAuthor"),
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
