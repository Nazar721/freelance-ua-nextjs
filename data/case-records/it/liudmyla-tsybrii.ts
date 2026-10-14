import { key, text, type CaseRecord } from "../types";

/**
 * it/liudmyla-tsybrii — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const liudmylaTsybrii: CaseRecord = {
  id: "it/liudmyla-tsybrii",
  slug: "liudmyla-tsybrii",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/liudmyla-tsybrii",
  enPath: "/en/cases/it/liudmyla-tsybrii",

  h1: text("Liudmyla Tsybrii — сайт-портфоліо для бізнес-коуча", "Liudmyla Tsybrii — portfolio website for a business coach"),
  lead: key("itCases.liudmyla.description"),
  seo: {
    title: text("Liudmyla Tsybrii — сайт-портфоліо з послугами та кейсами | Freelance UA", "Liudmyla Tsybrii — portfolio site with services and cases | Freelance UA"),
    description: key("itCases.liudmyla.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/liudmyla-mocap-v2.webp",
  },
  badge: key("itCases.liudmyla.category"),
  glow: { base: "rgba(184, 134, 11, 0.15)", strong: "rgba(184, 134, 11, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/liudmyla-mocap-v2.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.liudmyla.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.liudmyla.challenge"),
      solution: key("itCases.liudmyla.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.liudmyla.component1Title"),
          desc: key("itCases.liudmyla.component1Desc"),
          images: [
            { src: "/media/cases/liudmyla1.jpeg" },
          ],
          link: { href: "https://www.liudmylatsybrii.com/", label: key("itCases.liudmyla.viewSiteLabel") },
        },
        {
          title: key("itCases.liudmyla.component2Title"),
          desc: key("itCases.liudmyla.component2Desc"),
          images: [
            { src: "/media/cases/liudmyla2.webp" },
          ],
        },
        {
          title: key("itCases.liudmyla.component3Title"),
          desc: key("itCases.liudmyla.component3Desc"),
          images: [
            { src: "/media/cases/liudmyla3.webp" },
          ],
        },
        {
          title: key("itCases.liudmyla.component4Title"),
          desc: key("itCases.liudmyla.component4Desc"),
          images: [
            { src: "/media/cases/liudmyla4.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.liudmyla.result1"),
        key("itCases.liudmyla.result2"),
        key("itCases.liudmyla.result3"),
        key("itCases.liudmyla.result4"),
        key("itCases.liudmyla.result5"),
        key("itCases.liudmyla.result6"),
        key("itCases.liudmyla.result7"),
        key("itCases.liudmyla.result8"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.liudmyla.reviewTitle"),
    text: key("itCases.liudmyla.reviewText"),
    author: key("itCases.liudmyla.reviewAuthor"),
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
