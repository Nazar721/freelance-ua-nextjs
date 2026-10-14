import { key, text, type CaseRecord } from "../types";

/**
 * Ретуш портретів — chosen as the design pilot because it exercises the three
 * material types the design catalogue is built from: interactive before/after
 * sliders, a static before/after pair, and a multi-image gallery with a
 * fullscreen lightbox, plus a video review. It also carries the longest
 * caption set (title + caption per comparison), which is what the shared
 * renderer has to reproduce.
 *
 * Media taken from the original page: 3 slider pairs (6 files) + 1 static
 * pair (2 files) + 6 gallery frames + the review video = 13 references, the
 * count recorded by the Package 1 inventory. The hero shows the first three
 * gallery frames, exactly as before.
 */
export const nastyaPortraitRetouch: CaseRecord = {
  id: "design/nastya-portrait-retouch",
  slug: "nastya-portrait-retouch",
  direction: "design",
  subcategory: "photo-retouch",
  uaPath: "/cases/design/nastya-portrait-retouch",
  enPath: "/en/cases/design/nastya-portrait-retouch",

  h1: text(
    "Ретуш портретів: кольорокорекція та обробка фото",
    "Portrait retouching: color grading and photo editing",
  ),
  lead: key("designCases.nastyaPortraitRetouch.subtitle"),
  seo: {
    title: text(
      "Ретуш портретів і кольорокорекція | Freelance UA",
      "Portrait retouching and color grading | Freelance UA",
    ),
    description: key("designCases.nastyaPortraitRetouch.shortDesc"),
    ogImage: "/media/cases/nastya-portrait-retouch/og-poster.jpg",
  },
  badge: key("designCases.nastyaPortraitRetouch.category"),
  glow: { base: "rgba(168, 132, 100, 0.12)", strong: "rgba(168, 132, 100, 0.28)" },

  hero: {
    kind: "imageGrid",
    items: [
      { src: "/media/cases/nastya-portrait-retouch/final-1.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.title") },
      { src: "/media/cases/nastya-portrait-retouch/final-2.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.title") },
      { src: "/media/cases/nastya-portrait-retouch/final-3.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.title") },
    ],
  },

  sections: [
    {
      kind: "brief",
      task: key("designCases.nastyaPortraitRetouch.challenge"),
      solution: key("designCases.nastyaPortraitRetouch.solution"),
    },
    {
      kind: "compare",
      title: key("designCases.nastyaPortraitRetouch.processTitle"),
      intro: key("designCases.nastyaPortraitRetouch.processIntro"),
      items: [
        {
          mode: "slider",
          before: "/media/cases/nastya-portrait-retouch/portrait-1-before.jpg",
          after: "/media/cases/nastya-portrait-retouch/portrait-1-after.jpg",
          title: key("designCases.nastyaPortraitRetouch.slider1Title"),
          caption: key("designCases.nastyaPortraitRetouch.slider1Caption"),
          aspect: "aspect-[3/4]",
        },
        {
          mode: "slider",
          before: "/media/cases/nastya-portrait-retouch/portrait-2-before.jpg",
          after: "/media/cases/nastya-portrait-retouch/portrait-2-after.jpg",
          title: key("designCases.nastyaPortraitRetouch.slider2Title"),
          caption: key("designCases.nastyaPortraitRetouch.slider2Caption"),
          aspect: "aspect-[3/4]",
        },
        {
          mode: "static",
          before: "/media/cases/nastya-portrait-retouch/portrait-3-before.jpg",
          after: "/media/cases/nastya-portrait-retouch/portrait-3-after.jpg",
          title: key("designCases.nastyaPortraitRetouch.slider3Title"),
          caption: key("designCases.nastyaPortraitRetouch.slider3Caption"),
          w: 1200,
          h: 1600,
        },
      ],
    },
    {
      kind: "gallery",
      title: key("designCases.nastyaPortraitRetouch.finalsTitle"),
      intro: key("designCases.nastyaPortraitRetouch.finalsIntro"),
      columns: 3,
      items: [
        { src: "/media/cases/nastya-portrait-retouch/final-1.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.finalsTitle") },
        { src: "/media/cases/nastya-portrait-retouch/final-2.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.finalsTitle") },
        { src: "/media/cases/nastya-portrait-retouch/final-3.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.finalsTitle") },
        { src: "/media/cases/nastya-portrait-retouch/final-4.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.finalsTitle") },
        { src: "/media/cases/nastya-portrait-retouch/final-5.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.finalsTitle") },
        { src: "/media/cases/nastya-portrait-retouch/final-6.jpg", w: 4000, h: 6000, alt: key("designCases.nastyaPortraitRetouch.finalsTitle") },
      ],
    },
    {
      kind: "results",
      decorated: true,
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("designCases.nastyaPortraitRetouch.result1"),
        key("designCases.nastyaPortraitRetouch.result2"),
        key("designCases.nastyaPortraitRetouch.result3"),
      ],
    },
  ],

  review: {
    kind: "video",
    title: key("designCases.nastyaPortraitRetouch.reviewTitle"),
    src: "/media/testimonials/video-2.mp4",
  },
  team: {
    label: key("designCases.projectTeam"),
    value: key("designCases.team.snizhanaDesigner"),
  },
  backToList: {
    label: key("designCases.nastyaPortraitRetouch.backToList"),
    href: {
      uk: "/cases?tab=design&type=photo-retouch",
      en: "/en/cases?tab=design&type=photo-retouch",
    },
  },
};
