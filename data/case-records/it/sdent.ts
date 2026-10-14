import { key, text, type CaseRecord } from "../types";

/**
 * it/sdent — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const sdent: CaseRecord = {
  id: "it/sdent",
  slug: "sdent",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/sdent",
  enPath: "/en/cases/it/sdent",

  h1: text("S-Dent — редизайн сайту стоматологічної клініки", "S-Dent — dental clinic website redesign"),
  lead: key("itCases.sdent.description"),
  seo: {
    title: text("S-Dent — сайт стоматології з послугами, лікарями та слайдером до/після | Freelance UA", "S-Dent — dental website with services, dentists and a before/after slider | Freelance UA"),
    description: text("Редизайн сайту стоматологічної клініки з 14 послугами, 8 лікарями, відгуками та слайдером «до/після».", "Website redesign for a dental clinic with 14 services, 8 dentists, reviews and a before/after slider."),
    ogImage: "https://freelance-ua.agency/media/cases/sdent-mocap.webp",
  },
  badge: key("itCases.sdent.category"),
  glow: { base: "rgba(59, 130, 246, 0.12)", strong: "rgba(59, 130, 246, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/sdent-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.sdent.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.sdent.challenge"),
      solution: key("itCases.sdent.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.sdent.component1Title"),
          desc: key("itCases.sdent.component1Desc"),
          slider: { before: "/media/cases/sdent1-2.webp", after: "/media/cases/sdent1.webp" },
          link: { href: "https://sdent-redesign.vercel.app", label: key("itCases.sdent.viewSiteLabel") },
        },
        {
          title: key("itCases.sdent.component2Title"),
          desc: key("itCases.sdent.component2Desc"),
          slider: { before: "/media/cases/sdent2-2.webp", after: "/media/cases/sdent2.webp" },
        },
        {
          title: key("itCases.sdent.component3Title"),
          desc: key("itCases.sdent.component3Desc"),
          slider: { before: "/media/cases/sdent3-2.webp", after: "/media/cases/sdent3.webp" },
        },
        {
          title: key("itCases.sdent.component4Title"),
          desc: key("itCases.sdent.component4Desc"),
          slider: { before: "/media/cases/sdent4-2.webp", after: "/media/cases/sdent4.webp" },
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.sdent.result1"),
        key("itCases.sdent.result2"),
        key("itCases.sdent.result3"),
        key("itCases.sdent.result4"),
        key("itCases.sdent.result5"),
        key("itCases.sdent.result6"),
        key("itCases.sdent.result7"),
        key("itCases.sdent.result8"),
        key("itCases.sdent.result9"),
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://s-dent.ua/", label: key("itCases.sdent.oldSiteLabel") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.sdent.reviewTitle"),
    text: key("itCases.sdent.reviewText"),
    author: key("itCases.sdent.reviewAuthor"),
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
