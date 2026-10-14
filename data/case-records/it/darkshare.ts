import { key, text, type CaseRecord } from "../types";

/**
 * it/darkshare — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const darkshare: CaseRecord = {
  id: "it/darkshare",
  slug: "darkshare",
  direction: "it",
  subcategory: "saas-telegram",
  uaPath: "/cases/it/darkshare",
  enPath: "/en/cases/it/darkshare",

  h1: text("DARKSHARE — SaaS-платформа для кібербезпеки", "DARKSHARE — cybersecurity SaaS platform"),
  lead: key("itCases.darkshare.description"),
  seo: {
    title: text("DARKSHARE — SaaS для кібербезпеки з OSINT-модулями | Freelance UA", "DARKSHARE — cybersecurity SaaS with OSINT modules | Freelance UA"),
    description: key("itCases.darkshare.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/darkshare-mocap.webp",
  },
  badge: key("itCases.darkshare.category"),
  glow: { base: "rgba(249, 115, 22, 0.15)", strong: "rgba(249, 115, 22, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/darkshare-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.darkshare.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.darkshare.challenge"),
      solution: key("itCases.darkshare.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.darkshare.component1Title"),
          desc: key("itCases.darkshare.component1Desc"),
          images: [
            { src: "/media/cases/darkshare-hero.webp" },
          ],
        },
        {
          title: key("itCases.darkshare.component2Title"),
          desc: key("itCases.darkshare.component2Desc"),
          images: [
            { src: "/media/cases/darkshare-bot-menu.webp" },
          ],
        },
        {
          title: key("itCases.darkshare.component3Title"),
          desc: key("itCases.darkshare.component3Desc"),
          images: [
            { src: "/media/cases/darkshare-vpn-section.webp" },
          ],
        },
        {
          title: key("itCases.darkshare.component4Title"),
          desc: key("itCases.darkshare.component4Desc"),
          images: [
            { src: "/media/cases/darkshare-bot-scan.webp" },
          ],
        },
        {
          title: key("itCases.darkshare.component5Title"),
          desc: key("itCases.darkshare.component5Desc"),
          images: [
            { src: "/media/cases/darkshare-api.webp" },
          ],
        },
        {
          title: key("itCases.darkshare.component6Title"),
          desc: key("itCases.darkshare.component6Desc"),
          images: [
            { src: "/media/cases/darkshare-pricing.webp" },
            { src: "/media/cases/darkshare-apk.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.darkshare.result1"),
        key("itCases.darkshare.result2"),
        key("itCases.darkshare.result3"),
        key("itCases.darkshare.result4"),
        key("itCases.darkshare.result5"),
        key("itCases.darkshare.result6"),
        key("itCases.darkshare.result7"),
        key("itCases.darkshare.result8"),
        key("itCases.darkshare.result9"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.darkshare.reviewTitle"),
    text: key("itCases.darkshare.reviewText"),
    author: key("itCases.darkshare.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.bohdanDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/cases/it", en: "/en/cases/it" },
  },
};
