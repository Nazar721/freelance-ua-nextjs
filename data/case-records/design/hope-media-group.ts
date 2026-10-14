import { key, text, type CaseRecord } from "../types";

/**
 * design/hope-media-group — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const hopeMediaGroup: CaseRecord = {
  id: "design/hope-media-group",
  slug: "hope-media-group",
  direction: "design",
  subcategory: "branding",
  uaPath: "/cases/design/hope-media-group",
  enPath: "/en/cases/design/hope-media-group",

  h1: text("HOPE Media Group — брендинг для виставки", "HOPE Media Group — branding for an exhibition"),
  lead: key("designCases.hopeMedia.subtitle"),
  seo: {
    title: text("Брендинг для виставки в США: листівки, банери, стікери | Freelance UA", "Branding for a US exhibition: postcards, banners, stickers | Freelance UA"),
    description: text("Брендинг-рішення для виставки в США: листівки, банери, закладки, стікери та значки — єдина візуальна історія Prophecy Road Map.", "Branding solution for an exhibition in the US: printed postcards and banners, bookmarks, stickers and badges — one visual story for the Prophecy Road Map."),
    ogImage: "https://freelance-ua.agency/media/cases/hope-media/hope-media-preview.webp",
  },
  badge: key("designCases.hopeMedia.category"),
  glow: { base: "rgba(250, 204, 21, 0.12)", strong: "rgba(59, 130, 246, 0.25)" },

  hero: {
    kind: "imageGrid",
    items: [
      { src: "/media/cases/hope-media/hope-media4.webp", w: 2400, h: 851, alt: key("designCases.hopeMedia.title") },
      { src: "/media/cases/hope-media/hope-media5.webp", w: 1443, h: 2318, alt: key("designCases.hopeMedia.title") },
      { src: "/media/cases/hope-media/hope-media6.webp", w: 2390, h: 1382, alt: key("designCases.hopeMedia.title") },
      { src: "/media/cases/hope-media/hope-media4.webp", w: 2400, h: 851, alt: key("designCases.hopeMedia.title") },
      { src: "/media/cases/hope-media/hope-media5.webp", w: 1443, h: 2318, alt: key("designCases.hopeMedia.title") },
      { src: "/media/cases/hope-media/hope-media6.webp", w: 2390, h: 1382, alt: key("designCases.hopeMedia.title") },
    ],
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.hopeMedia.challenge"),
      solution: key("designCases.hopeMedia.solution"),
    },
    {
      kind: "gallery",
      title: key("designCases.hopeMedia.galleryTitle"),
      intro: key("designCases.hopeMedia.galleryDesc"),
      columns: 3,
      items: [
        { src: "/media/cases/hope-media/hope-media1.webp", w: 2400, h: 1878, title: key("designCases.hopeMedia.item1.title"), caption: key("designCases.hopeMedia.item1.caption") },
        { src: "/media/cases/hope-media/hope-media2.webp", w: 2400, h: 1440, title: key("designCases.hopeMedia.item2.title"), caption: key("designCases.hopeMedia.item2.caption") },
        { src: "/media/cases/hope-media/hope-media3.webp", w: 1773, h: 788, title: key("designCases.hopeMedia.item3.title"), caption: key("designCases.hopeMedia.item3.caption") },
        {
          src: "/media/cases/hope-media/hope-media4.webp",
          w: 2400,
          h: 851,
          title: key("designCases.hopeMedia.item4.title"),
          caption: key("designCases.hopeMedia.item4.caption"),
          wide: true,
          // Original `WideImage`/`mobileSplitItems`: whole layout on desktop,
          // two halves of the same file on mobile. Suffixes keep the original
          // hardcoded alt wording ("— QR" / "— content").
          presentation: {
            splitMobile: true,
            splitAlt: { left: text("— QR", "— QR"), right: text("— content", "— content") },
          },
        },
        { src: "/media/cases/hope-media/hope-media5.webp", w: 1443, h: 2318, title: key("designCases.hopeMedia.item5.title"), caption: key("designCases.hopeMedia.item5.caption"), presentation: { maxWidth: "280px" } },
        { src: "/media/cases/hope-media/hope-media6.webp", w: 2390, h: 1382, title: key("designCases.hopeMedia.item6.title"), caption: key("designCases.hopeMedia.item6.caption") },
        { src: "/media/cases/hope-media/hope-media7.webp", w: 2400, h: 1697, title: key("designCases.hopeMedia.item7.title"), caption: key("designCases.hopeMedia.item7.caption") },
        {
          src: "/media/cases/hope-media/hope-media8.webp",
          w: 2400,
          h: 851,
          title: key("designCases.hopeMedia.item8.title"),
          caption: key("designCases.hopeMedia.item8.caption"),
          wide: true,
          presentation: {
            splitMobile: true,
            splitAlt: { left: text("— QR", "— QR"), right: text("— content", "— content") },
          },
        },
      ],
    },
    {
      kind: "galleryGroups",
      title: key("designCases.hopeMedia.finalsTitle"),
      groups: [
        {
          title: key("designCases.hopeMedia.group1Title"),
          intro: key("designCases.hopeMedia.group1Intro"),
          items: [
            { src: "/media/cases/hope-media/hope-media1.webp", w: 2400, h: 1878, title: key("designCases.hopeMedia.item1.title"), caption: key("designCases.hopeMedia.item1.caption") },
            { src: "/media/cases/hope-media/hope-media3.webp", w: 1773, h: 788, title: key("designCases.hopeMedia.item3.title"), caption: key("designCases.hopeMedia.item3.caption") },
            { src: "/media/cases/hope-media/hope-media4.webp", w: 2400, h: 851, title: key("designCases.hopeMedia.item4.title"), caption: key("designCases.hopeMedia.item4.caption") },
          ],
        },
        {
          title: key("designCases.hopeMedia.group2Title"),
          intro: key("designCases.hopeMedia.group2Intro"),
          items: [
            { src: "/media/cases/hope-media/hope-media2.webp", w: 2400, h: 1440, title: key("designCases.hopeMedia.item2.title"), caption: key("designCases.hopeMedia.item2.caption") },
            { src: "/media/cases/hope-media/hope-media8.webp", w: 2400, h: 851, title: key("designCases.hopeMedia.item8.title"), caption: key("designCases.hopeMedia.item8.caption") },
          ],
        },
        {
          title: key("designCases.hopeMedia.group3Title"),
          intro: key("designCases.hopeMedia.group3Intro"),
          items: [
            { src: "/media/cases/hope-media/hope-media5.webp", w: 1443, h: 2318, title: key("designCases.hopeMedia.item5.title"), caption: key("designCases.hopeMedia.item5.caption"), presentation: { maxWidth: "md" } },
            { src: "/media/cases/hope-media/hope-media6.webp", w: 2390, h: 1382, title: key("designCases.hopeMedia.item6.title"), caption: key("designCases.hopeMedia.item6.caption") },
            { src: "/media/cases/hope-media/hope-media7.webp", w: 2400, h: 1697, title: key("designCases.hopeMedia.item7.title"), caption: key("designCases.hopeMedia.item7.caption") },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.hopeMedia.result1"),
        key("designCases.hopeMedia.result2"),
        key("designCases.hopeMedia.result3"),
        key("designCases.hopeMedia.result4"),
      ],
    },
  ],

  review: {
    kind: "video",
    title: key("designCases.hopeMedia.reviewTitle"),
    src: "/media/testimonials/video-3.mp4",
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.hopeMedia.backToList"),
    href: { uk: "/cases?tab=design", en: "/en/cases?tab=design" },
  },
};
