import { key, text, type CaseRecord } from "../types";

/**
 * design/sembud-repair — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const sembudRepair: CaseRecord = {
  id: "design/sembud-repair",
  slug: "sembud-repair",
  direction: "design",
  subcategory: "banners",
  uaPath: "/cases/design/sembud-repair",
  enPath: "/en/cases/design/sembud-repair",

  h1: text("SEMBUD — рекламний банер ремонтної компанії", "SEMBUD — banner for a repair company"),
  lead: key("designCases.sembudRepair.subtitle"),
  seo: {
    title: text("Банер ремонтної компанії у Львові: ціна й гарантія | Freelance UA", "Banner for a Lviv repair company: price and warranty | Freelance UA"),
    description: key("designCases.sembudRepair.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/sembud-repair/sembud-repair-preview.webp",
  },
  badge: key("designCases.sembudRepair.category"),
  glow: { base: "rgba(239, 68, 68, 0.12)", strong: "rgba(239, 68, 68, 0.28)" },

  hero: {
    kind: "image",
    src: "/media/cases/sembud-repair/sembud-repair1.webp",
    w: 1200,
    h: 800,
    alt: key("designCases.sembudRepair.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.sembudRepair.challenge"),
      solution: key("designCases.sembudRepair.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.sembudRepair.finalsTitle"),
      intro: key("designCases.sembudRepair.finalsIntro"),
      columns: 2,
      items: [
        { src: "/media/cases/sembud-repair/sembud-repair1.webp", w: 1080, h: 1080, title: key("designCases.sembudRepair.item1.title"), caption: key("designCases.sembudRepair.item1.caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.sembudRepair.result1"),
        key("designCases.sembudRepair.result2"),
        key("designCases.sembudRepair.result3"),
        key("designCases.sembudRepair.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.sembudRepair.reviewTitle"),
    text: key("designCases.sembudRepair.reviewText"),
    author: key("designCases.sembudRepair.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.sembudRepair.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
