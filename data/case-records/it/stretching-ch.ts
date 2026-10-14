import { key, text, type CaseRecord } from "../types";

/**
 * it/stretching-ch — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const stretchingCh: CaseRecord = {
  id: "it/stretching-ch",
  slug: "stretching-ch",
  direction: "it",
  subcategory: "saas-telegram",
  uaPath: "/cases/it/stretching-ch",
  enPath: "/en/cases/it/stretching-ch",

  h1: text("Stretching.ch — Instagram DM бот для фітнес-тренерки", "Stretching.ch — Instagram DM bot for a fitness coach"),
  lead: key("itCases.stretchingCh.description"),
  seo: {
    title: text("Stretching.ch — Instagram DM бот для лідогенерації у фітнесі | Freelance UA", "Stretching.ch — Instagram DM bot for fitness lead generation | Freelance UA"),
    description: key("itCases.stretchingCh.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/stretching-ch-og.jpg",
  },
  badge: key("itCases.stretchingCh.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/stretching-ch-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.stretchingCh.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.stretchingCh.challenge"),
      solution: key("itCases.stretchingCh.solution"),
    },
    {
      // Hand-mapped: this page renders its components as standalone sections,
      // not as a `components` array (scripts/migrate-case.mjs refuses to guess
      // that structure). Media, captions and order follow the original page.
      kind: "featureList",
      decorated: false,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.stretchingCh.component1Title"),
          desc: key("itCases.stretchingCh.component1Desc"),
          images: [{ src: "/media/cases/stretching-ch-mocap.webp", w: 800, h: 450 }],
        },
      ],
    },
    {
      kind: "results",
      decorated: true,
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.stretchingCh.result1"),
        key("itCases.stretchingCh.result2"),
        key("itCases.stretchingCh.result3"),
        key("itCases.stretchingCh.result4"),
        key("itCases.stretchingCh.result5"),
        key("itCases.stretchingCh.result6"),
        key("itCases.stretchingCh.result7"),
      ],
    },
    {
      // Second standalone component block: heading, text and one image.
      kind: "gallery",
      title: key("itCases.stretchingCh.component2Title"),
      intro: key("itCases.stretchingCh.component2Desc"),
      columns: 2,
      items: [
        {
          src: "/media/cases/stretching-ch-profile.png",
          w: 500,
          h: 180,
          alt: key("itCases.stretchingCh.component2Title"),
        },
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://www.instagram.com/stretchting.ch/", label: key("itCases.stretchingCh.viewSiteLabel") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.stretchingCh.reviewTitle"),
    text: key("itCases.stretchingCh.reviewText"),
    author: key("itCases.stretchingCh.reviewAuthor"),
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
