import { key, text, type CaseRecord } from "../types";

/**
 * video/twin-a-auto — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const twinAAuto: CaseRecord = {
  id: "video/twin-a-auto",
  slug: "twin-a-auto",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/twin-a-auto",
  enPath: "/en/cases/video/twin-a-auto",
  h1: text("Reels для автосервісу Twin-A-Auto", "Reels for Twin-A-Auto auto service"),
  lead: key("videoCases.twinAAuto.subtitle"),
  seo: {
    title: text("Reels для автосервісу Twin-A-Auto | Freelance UA", "Reels for Twin-A-Auto auto service | Freelance UA"),
    description: text("Динамічний польськомовний Reels про послуги автосервісу Twin-A-Auto в Мисловіці — монтаж, адаптація під Instagram 9:16", "Dynamic Polish-language Reels about the Twin-A-Auto auto service in Mysłowice — editing, adapted for Instagram 9:16"),
    ogImage: "https://freelance-ua.agency/media/cases/twin-a-auto/hero-poster.jpg",
  },
  badge: key("videoCases.twinAAuto.category"),
  glow: { base: "rgba(6, 182, 212, 0.12)", strong: "rgba(6, 182, 212, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/twin-a-auto/hero.mp4",
    poster: "/media/cases/twin-a-auto/hero-poster.jpg",
    alt: key("videoCases.twinAAuto.title"),
    duration: text("~46с", "~46s"),
    format: "9:16",
  },

  sections: [
    {
      kind: "results",
      columns: 1,
      items: [
        key("videoCases.twinAAuto.result1"),
        key("videoCases.twinAAuto.result2"),
        key("videoCases.twinAAuto.result3"),
        key("videoCases.twinAAuto.result4"),
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.twinAAuto.challengeTitle"),
      solutionTitle: key("videoCases.twinAAuto.solutionTitle"),
      task: key("videoCases.twinAAuto.challenge"),
      solution: key("videoCases.twinAAuto.solution"),
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.twinAAuto.reviewTitle"),
    text: key("videoCases.twinAAuto.reviewText"),
    author: key("videoCases.twinAAuto.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.twinAAuto.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
