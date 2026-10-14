import { key, text, type CaseRecord } from "../types";

/**
 * design/globus-billboard — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const globusBillboard: CaseRecord = {
  id: "design/globus-billboard",
  slug: "globus-billboard",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/globus-billboard",
  enPath: "/en/cases/design/globus-billboard",

  h1: text("GLOBUS — дизайн білбордів", "GLOBUS — billboard design"),
  lead: key("designCases.globusBillboard.subtitle"),
  seo: {
    title: text("GLOBUS — білборди для будівельної компанії | Freelance UA", "GLOBUS — billboards for a construction company | Freelance UA"),
    description: key("designCases.globusBillboard.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/globus-billboard/og.jpg",
  },
  badge: key("designCases.globusBillboard.category"),
  glow: { base: "rgba(59, 130, 246, 0.12)", strong: "rgba(37, 99, 235, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/globus-billboard/globus-arch-horizontal.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.globusBillboard.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.globusBillboard.challenge"),
      solution: key("designCases.globusBillboard.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.globusBillboard.finalsTitle"),
      intro: key("designCases.globusBillboard.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/globus-billboard/globus-arch-horizontal.webp", w: 16383, h: 2731, title: key("designCases.globusBillboard.item1.title"), caption: key("designCases.globusBillboard.item1.caption") },
        { src: "/media/cases/globus-billboard/globus-arch-square.webp", w: 7087, h: 3544, title: key("designCases.globusBillboard.item2.title"), caption: key("designCases.globusBillboard.item2.caption") },
        { src: "/media/cases/globus-billboard/globus-arch-wide.webp", w: 16383, h: 5703, title: key("designCases.globusBillboard.item3.title"), caption: key("designCases.globusBillboard.item3.caption") },
        { src: "/media/cases/globus-billboard/globus-arch-banner.webp", w: 16383, h: 2048, title: key("designCases.globusBillboard.item4.title"), caption: key("designCases.globusBillboard.item4.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.globusBillboard.result1"),
        key("designCases.globusBillboard.result2"),
        key("designCases.globusBillboard.result3"),
        key("designCases.globusBillboard.result4"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("designCases.globusBillboard.reviewTitle"),
    src: "/media/cases/globus-billboard/globus-review.webp",
    alt: key("designCases.globusBillboard.reviewScreenshotAlt"),
    caption: key("designCases.globusBillboard.reviewScreenshotCaption"),
    text: key("designCases.globusBillboard.reviewText"),
    author: key("designCases.globusBillboard.reviewAuthor"),
    w: 670,
    h: 498,
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.globusBillboard.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
