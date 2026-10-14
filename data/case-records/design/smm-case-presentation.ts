import { key, text, type CaseRecord } from "../types";

/**
 * design/smm-case-presentation — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const smmCasePresentation: CaseRecord = {
  id: "design/smm-case-presentation",
  slug: "smm-case-presentation",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/smm-case-presentation",
  enPath: "/en/cases/design/smm-case-presentation",

  h1: text("Презентація SMM-кейсів", "SMM case presentation"),
  lead: key("designCases.smmCasePresentation.subtitle"),
  seo: {
    title: text("Шаблон презентації для показу SMM-кейсів | Freelance UA", "Presentation template for showing SMM cases | Freelance UA"),
    description: key("designCases.smmCasePresentation.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/smm-case-presentation/smm-case-presentation-preview.webp",
  },
  badge: key("designCases.smmCasePresentation.category"),
  glow: { base: "rgba(99, 102, 241, 0.12)", strong: "rgba(99, 102, 241, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/smm-case-presentation/smm-case-presentation1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.smmCasePresentation.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.smmCasePresentation.challenge"),
      solution: key("designCases.smmCasePresentation.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.smmCasePresentation.finalsTitle"),
      intro: key("designCases.smmCasePresentation.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/smm-case-presentation/smm-case-presentation1.webp", w: 1280, h: 749, title: key("designCases.smmCasePresentation.item1.title"), caption: key("designCases.smmCasePresentation.item1.caption") },
        { src: "/media/cases/smm-case-presentation/smm-case-presentation2.webp", w: 1280, h: 749, title: key("designCases.smmCasePresentation.item2.title"), caption: key("designCases.smmCasePresentation.item2.caption") },
        { src: "/media/cases/smm-case-presentation/smm-case-presentation3.webp", w: 1280, h: 1112, title: key("designCases.smmCasePresentation.item3.title"), caption: key("designCases.smmCasePresentation.item3.caption"), wide: true },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.smmCasePresentation.result1"),
        key("designCases.smmCasePresentation.result2"),
        key("designCases.smmCasePresentation.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.smmCasePresentation.reviewTitle"),
    text: key("designCases.smmCasePresentation.reviewText"),
    author: key("designCases.smmCasePresentation.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.smmCasePresentation.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
