import { key, text, type CaseRecord } from "../types";

/**
 * it/importera — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const importera: CaseRecord = {
  id: "it/importera",
  slug: "importera",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/importera",
  enPath: "/en/cases/it/importera",

  h1: text("Імпортера — корпоративний сайт для B2B-дистриб'ютора", "Importera — corporate website for a B2B distributor"),
  lead: key("itCases.importera.description"),
  seo: {
    title: text("Імпортера — двомовний корпоративний сайт B2B-дистриб'ютора | Freelance UA", "Importera — bilingual corporate website for a B2B distributor | Freelance UA"),
    description: text("Корпоративний сайт для B2B-дистриб'ютора з 250+ брендами, 50+ країнами, двомовністю та галереєю партнерів.", "Corporate website for a B2B distributor with 250+ brands, 50+ countries, two languages and a partners gallery."),
    ogImage: "https://freelance-ua.agency/media/cases/importera-mocap.webp",
  },
  badge: key("itCases.importera.category"),
  glow: { base: "rgba(59, 130, 246, 0.15)", strong: "rgba(59, 130, 246, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/importera-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.importera.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.importera.challenge"),
      solution: key("itCases.importera.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.importera.component1Title"),
          desc: key("itCases.importera.component1Desc"),
          images: [
            { src: "/media/cases/importera-hero.webp" },
          ],
          link: { href: "https://importera.in.ua/", label: key("itCases.importera.viewSiteLabel") },
        },
        {
          title: key("itCases.importera.component2Title"),
          desc: key("itCases.importera.component2Desc"),
          images: [
            { src: "/media/cases/importera-trust.webp" },
          ],
        },
        {
          title: key("itCases.importera.component3Title"),
          desc: key("itCases.importera.component3Desc"),
          images: [
            { src: "/media/cases/importera-services.webp" },
          ],
        },
        {
          title: key("itCases.importera.component4Title"),
          desc: key("itCases.importera.component4Desc"),
          images: [
            { src: "/media/cases/importera-brands.webp" },
          ],
        },
        {
          title: key("itCases.importera.component5Title"),
          desc: key("itCases.importera.component5Desc"),
          images: [
            { src: "/media/cases/importera-partners.webp" },
          ],
        },
        {
          title: key("itCases.importera.component6Title"),
          desc: key("itCases.importera.component6Desc"),
          images: [
            { src: "/media/cases/importera-process.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.importera.result1"),
        key("itCases.importera.result2"),
        key("itCases.importera.result3"),
        key("itCases.importera.result4"),
        key("itCases.importera.result5"),
        key("itCases.importera.result6"),
        key("itCases.importera.result7"),
        key("itCases.importera.result8"),
        key("itCases.importera.result9"),
        key("itCases.importera.result10"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.importera.reviewTitle"),
    text: key("itCases.importera.reviewText"),
    author: key("itCases.importera.reviewAuthor"),
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
