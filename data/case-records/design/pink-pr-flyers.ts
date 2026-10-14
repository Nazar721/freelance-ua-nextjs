import { key, text, type CaseRecord } from "../types";

/**
 * design/pink-pr-flyers — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const pinkPrFlyers: CaseRecord = {
  id: "design/pink-pr-flyers",
  slug: "pink-pr-flyers",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/pink-pr-flyers",
  enPath: "/en/cases/design/pink-pr-flyers",

  h1: text("Pink PR — комплект флаєрів для друку", "Pink PR — print flyer set"),
  lead: key("designCases.pinkPrFlyers.subtitle"),
  seo: {
    title: text("Друковані флаєри для маркетинг-платформи Pink PR | Freelance UA", "Print flyers for the Pink PR marketing platform | Freelance UA"),
    description: key("designCases.pinkPrFlyers.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/pink-pr-flyers/pink-pr-flyers-preview.webp",
  },
  badge: key("designCases.pinkPrFlyers.category"),
  glow: { base: "rgba(244, 114, 182, 0.12)", strong: "rgba(236, 72, 153, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/pink-pr-flyers/pink-pr-flyers1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.pinkPrFlyers.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.pinkPrFlyers.challenge"),
      solution: key("designCases.pinkPrFlyers.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.pinkPrFlyers.finalsTitle"),
      intro: key("designCases.pinkPrFlyers.finalsIntro"),
      columns: 3,
      items: [
        { src: "/media/cases/pink-pr-flyers/pink-pr-flyers1.webp", w: 1240, h: 1748, title: key("designCases.pinkPrFlyers.item1.title"), caption: key("designCases.pinkPrFlyers.item1.caption") },
        { src: "/media/cases/pink-pr-flyers/pink-pr-flyers2.webp", w: 1240, h: 1748, title: key("designCases.pinkPrFlyers.item2.title"), caption: key("designCases.pinkPrFlyers.item2.caption") },
        { src: "/media/cases/pink-pr-flyers/pink-pr-flyers3.webp", w: 1240, h: 1748, title: key("designCases.pinkPrFlyers.item3.title"), caption: key("designCases.pinkPrFlyers.item3.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.pinkPrFlyers.result1"),
        key("designCases.pinkPrFlyers.result2"),
        key("designCases.pinkPrFlyers.result3"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("designCases.pinkPrFlyers.reviewTitle"),
    src: "/media/cases/pink-pr-flyers/pink-pr-flyers-review.webp",
    alt: key("designCases.pinkPrFlyers.reviewScreenshotAlt"),
    caption: key("designCases.pinkPrFlyers.reviewScreenshotCaption"),
    text: key("designCases.pinkPrFlyers.reviewText"),
    author: key("designCases.pinkPrFlyers.reviewAuthor"),
    w: 908,
    h: 354,
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.pinkPrFlyers.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
