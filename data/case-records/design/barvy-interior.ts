import { key, text, type CaseRecord } from "../types";

/**
 * design/barvy-interior — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const barvyInterior: CaseRecord = {
  id: "design/barvy-interior",
  slug: "barvy-interior",
  direction: "design",
  subcategory: "photo-retouch",
  uaPath: "/cases/design/barvy-interior",
  enPath: "/en/cases/design/barvy-interior",

  h1: text("BARVY interior — ретуш і кольорокорекція зйомки", "BARVY interior — retouching and color grading of the shoot"),
  lead: key("designCases.barvyInterior.subtitle"),
  seo: {
    title: text("BARVY interior — до/після обробки інтер'єрної зйомки | Freelance UA", "BARVY interior — before/after editing of an interior photo shoot | Freelance UA"),
    description: text("Кольорокорекція та ретуш інтер'єрної зйомки для студії дизайну інтер'єрів BARVY interior: прихожа, гардеробна, спальня, санвузли. До/після.", "Color grading and retouching of an interior photo shoot for the BARVY interior design studio: hallway, wardrobe, bedroom, bathroom. Before/after."),
    ogImage: "https://freelance-ua.agency/media/cases/barvy-interior/preview.jpg",
  },
  badge: key("designCases.barvyInterior.category"),
  glow: { base: "rgba(217, 164, 116, 0.12)", strong: "rgba(217, 164, 116, 0.28)" },

  hero: {
    kind: "imageGrid",
    items: [
      { src: "/media/cases/barvy-interior/after-9.jpg", alt: key("designCases.barvyInterior.title") },
      { src: "/media/cases/barvy-interior/after-7.jpg", alt: key("designCases.barvyInterior.title") },
      { src: "/media/cases/barvy-interior/after-3.jpg", alt: key("designCases.barvyInterior.title") },
    ],
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.barvyInterior.challenge"),
      solution: key("designCases.barvyInterior.solution"),
    },
    {
      kind: "checklist",
      title: key("designCases.barvyInterior.approachTitle"),
      intro: key("designCases.barvyInterior.approachIntro"),
      columns: 2,
      items: [
        key("designCases.barvyInterior.approach1"),
        key("designCases.barvyInterior.approach2"),
        key("designCases.barvyInterior.approach3"),
        key("designCases.barvyInterior.approach4"),
        key("designCases.barvyInterior.approach5"),
      ],
    },
    {
      kind: "compare",
      title: key("designCases.barvyInterior.finalsTitle"),
      intro: key("designCases.barvyInterior.finalsIntro"),
      items: [
        { mode: "slider", before: "/media/cases/barvy-interior/before-2.jpg", after: "/media/cases/barvy-interior/after-2.jpg", title: key("designCases.barvyInterior.slider1Title"), caption: key("designCases.barvyInterior.slider1Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-3.jpg", after: "/media/cases/barvy-interior/after-3.jpg", title: key("designCases.barvyInterior.slider2Title"), caption: key("designCases.barvyInterior.slider2Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-4.jpg", after: "/media/cases/barvy-interior/after-4.jpg", title: key("designCases.barvyInterior.slider3Title"), caption: key("designCases.barvyInterior.slider3Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-5.jpg", after: "/media/cases/barvy-interior/after-5.jpg", title: key("designCases.barvyInterior.slider4Title"), caption: key("designCases.barvyInterior.slider4Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-6.jpg", after: "/media/cases/barvy-interior/after-6.jpg", title: key("designCases.barvyInterior.slider5Title"), caption: key("designCases.barvyInterior.slider5Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-7.jpg", after: "/media/cases/barvy-interior/after-7.jpg", title: key("designCases.barvyInterior.slider6Title"), caption: key("designCases.barvyInterior.slider6Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-8.jpg", after: "/media/cases/barvy-interior/after-8.jpg", title: key("designCases.barvyInterior.slider7Title"), caption: key("designCases.barvyInterior.slider7Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-9.jpg", after: "/media/cases/barvy-interior/after-9.jpg", title: key("designCases.barvyInterior.slider8Title"), caption: key("designCases.barvyInterior.slider8Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-10.jpg", after: "/media/cases/barvy-interior/after-10.jpg", title: key("designCases.barvyInterior.slider9Title"), caption: key("designCases.barvyInterior.slider9Caption") },
        { mode: "slider", before: "/media/cases/barvy-interior/before-11.jpg", after: "/media/cases/barvy-interior/after-11.jpg", title: key("designCases.barvyInterior.slider10Title"), caption: key("designCases.barvyInterior.slider10Caption") },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.barvyInterior.result1"),
        key("designCases.barvyInterior.result2"),
        key("designCases.barvyInterior.result3"),
      ],
    },
  ],

  review: {
    kind: "screenshot",
    title: key("designCases.barvyInterior.reviewTitle"),
    src: "/media/cases/barvy-interior/review.png",
    alt: key("designCases.barvyInterior.reviewAuthor"),
    text: key("designCases.barvyInterior.reviewText"),
    author: key("designCases.barvyInterior.reviewAuthor"),
    w: 800,
    h: 600,
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.andriiRetoucher"),
  },
  backToList: {
    label: key("designCases.barvyInterior.backToList"),
    href: { uk: "/cases?tab=design&type=photo-retouch", en: "/en/cases?tab=design&type=photo-retouch" },
  },
};
