import { key, text, type CaseRecord } from "../types";

/**
 * it/mnm-detailing — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const mnmDetailing: CaseRecord = {
  id: "it/mnm-detailing",
  slug: "mnm-detailing",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/mnm-detailing",
  enPath: "/en/cases/it/mnm-detailing",

  h1: text("MNM Detailing — редизайн сайту детейлінг-студії", "MNM Detailing — redesign of a detailing studio website"),
  lead: key("itCases.mnmDetailing.description"),
  seo: {
    title: text("MNM Detailing — редизайн сайту зі слайдером до/після | Freelance UA", "MNM Detailing — website redesign with a before/after slider | Freelance UA"),
    description: key("itCases.mnmDetailing.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/mnm-detailing-mocap.webp",
  },
  badge: key("itCases.mnmDetailing.category"),
  glow: { base: "rgba(239, 68, 68, 0.12)", strong: "rgba(239, 68, 68, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/mnm-detailing-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.mnmDetailing.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.mnmDetailing.challenge"),
      solution: key("itCases.mnmDetailing.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.mnmDetailing.component1Title"),
          desc: key("itCases.mnmDetailing.component1Desc"),
          slider: { before: "/media/cases/mnm-hero-new.webp", after: "/media/cases/mnm-hero-old.jpeg" },
          link: { href: "https://mnmdetailing.vercel.app", label: key("itCases.mnmDetailing.viewSiteLabel") },
        },
        {
          title: key("itCases.mnmDetailing.component2Title"),
          desc: key("itCases.mnmDetailing.component2Desc"),
          slider: { before: "/media/cases/mnm-services-old.jpeg", after: "/media/cases/mnm-services-new.webp" },
        },
        {
          title: key("itCases.mnmDetailing.component3Title"),
          desc: key("itCases.mnmDetailing.component3Desc"),
          slider: { before: "/media/cases/mnm-gallery-new.jpeg", after: "/media/cases/mnm-gallery-old.jpeg" },
        },
        {
          title: key("itCases.mnmDetailing.component4Title"),
          desc: key("itCases.mnmDetailing.component4Desc"),
          slider: { before: "/media/cases/mnm-contacts-new.webp", after: "/media/cases/mnm-contacts-old.webp" },
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.mnmDetailing.result1"),
        key("itCases.mnmDetailing.result2"),
        key("itCases.mnmDetailing.result3"),
        key("itCases.mnmDetailing.result4"),
        key("itCases.mnmDetailing.result5"),
        key("itCases.mnmDetailing.result6"),
        key("itCases.mnmDetailing.result7"),
        key("itCases.mnmDetailing.result8"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.mnmDetailing.reviewTitle"),
    text: key("itCases.mnmDetailing.reviewText"),
    author: key("itCases.mnmDetailing.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.nazarDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/cases/it", en: "/en/cases/it" },
  },
};
