import { key, text, type CaseRecord } from "../types";

/**
 * it/prime-auto-shipping — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const primeAutoShipping: CaseRecord = {
  id: "it/prime-auto-shipping",
  slug: "prime-auto-shipping",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/prime-auto-shipping",
  enPath: "/en/cases/it/prime-auto-shipping",

  h1: text("Prime Auto Shipping — конверсійний лендинг перевезень авто", "Prime Auto Shipping — conversion landing for vehicle shipping"),
  lead: key("itCases.primeAuto.description"),
  seo: {
    title: text("Prime Auto Shipping — лендинг для транспортування авто в США | Freelance UA", "Prime Auto Shipping — landing for vehicle shipping in the USA | Freelance UA"),
    description: key("itCases.primeAuto.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/prime-autoshipping-mockup.webp",
  },
  badge: key("itCases.primeAuto.category"),
  glow: { base: "rgba(59, 130, 246, 0.12)", strong: "rgba(59, 130, 246, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/prime-autoshipping-mockup.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.primeAuto.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.primeAuto.challenge"),
      solution: key("itCases.primeAuto.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.primeAuto.component1Title"),
          desc: key("itCases.primeAuto.component1Desc"),
          images: [
            { src: "/media/cases/prime-autoshipping-landing-1.jpeg" },
          ],
        },
        {
          title: key("itCases.primeAuto.component2Title"),
          desc: key("itCases.primeAuto.component2Desc"),
          images: [
            { src: "/media/cases/prime-autoshipping-landing-2.webp" },
          ],
        },
        {
          title: key("itCases.primeAuto.component3Title"),
          desc: key("itCases.primeAuto.component3Desc"),
          images: [
            { src: "/media/cases/prime-autoshipping-landing-3.webp" },
          ],
        },
        {
          title: key("itCases.primeAuto.component4Title"),
          desc: key("itCases.primeAuto.component4Desc"),
          images: [
            { src: "/media/cases/prime-autoshipping-landing-4.jpeg" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.primeAuto.result1"),
        key("itCases.primeAuto.result2"),
        key("itCases.primeAuto.result3"),
        key("itCases.primeAuto.result4"),
        key("itCases.primeAuto.result5"),
        key("itCases.primeAuto.result6"),
        key("itCases.primeAuto.result7"),
        key("itCases.primeAuto.result8"),
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://prime-autoshippingllc.com/", label: key("itCases.primeAuto.viewSiteLabel") },
      ],
    },
  ],

  review: {
    kind: "text",
    text: key("itCases.primeAuto.reviewText"),
    author: key("itCases.primeAuto.reviewAuthor"),
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
