import { key, text, type CaseRecord } from "../types";

/**
 * MHT Clinic billboard — hand-migrated (Package 4).
 *
 * `scripts/migrate-case.mjs` refuses this page: its "finals" section keeps a
 * standalone `<Image>` outside the hero and the review, and the shared schema
 * has no place for it yet — the blocker exists so the image is never dropped
 * silently. The block was therefore transcribed by hand, following the
 * original order: hero → brief → finals (heading, intro, one captioned image)
 * → results → review → team.
 *
 * Both the hero and the finals image are the same file (the page reuses it);
 * the media check counts it twice — once per rendering, as on the original.
 */
export const mhtClinicBillboard: CaseRecord = {
  id: "design/mht-clinic-billboard",
  slug: "mht-clinic-billboard",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/mht-clinic-billboard",
  enPath: "/en/cases/design/mht-clinic-billboard",

  h1: text("MHT Clinic — білборд для клініки", "MHT Clinic — billboard for the clinic"),
  lead: key("designCases.mhtClinicBillboard.subtitle"),
  seo: {
    title: text(
      "Білборд MHT Clinic: дизайн зовнішньої реклами | Freelance UA",
      "MHT Clinic billboard: outdoor advertising design | Freelance UA",
    ),
    description: key("designCases.mhtClinicBillboard.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/mht-clinic-billboard/mht-clinic-billboard-preview.webp",
  },
  badge: key("designCases.mhtClinicBillboard.category"),
  glow: { base: "rgba(26, 54, 93, 0.15)", strong: "rgba(26, 54, 93, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/mht-clinic-billboard/mht-billboard1.jpg",
    w: 1400,
    h: 700,
    alt: key("designCases.mhtClinicBillboard.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.mhtClinicBillboard.challenge"),
      solution: key("designCases.mhtClinicBillboard.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.mhtClinicBillboard.finalsTitle"),
      intro: key("designCases.mhtClinicBillboard.finalsIntro"),
      columns: 1,
      items: [
        {
          src: "/media/cases/mht-clinic-billboard/mht-billboard1.jpg",
          w: 1400,
          h: 700,
          title: key("designCases.mhtClinicBillboard.item1.title"),
          caption: key("designCases.mhtClinicBillboard.item1.caption"),
        },
      ],
    },
    {
      kind: "results",
      decorated: true,
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.mhtClinicBillboard.result1"),
        key("designCases.mhtClinicBillboard.result2"),
        key("designCases.mhtClinicBillboard.result3"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("designCases.mhtClinicBillboard.reviewTitle"),
    text: key("designCases.mhtClinicBillboard.reviewText"),
    author: key("designCases.mhtClinicBillboard.reviewAuthor"),
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.mhtClinicBillboard.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
