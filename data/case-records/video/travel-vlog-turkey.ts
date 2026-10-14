import { key, text, type CaseRecord } from "../types";

/**
 * video/travel-vlog-turkey — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const travelVlogTurkey: CaseRecord = {
  id: "video/travel-vlog-turkey",
  slug: "travel-vlog-turkey",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/travel-vlog-turkey",
  enPath: "/en/cases/video/travel-vlog-turkey",
  h1: text("Travel Vlog — Туреччина", "Travel Vlog — Turkey"),
  lead: key("videoCases.travelVlogTurkey.subtitle"),
  seo: {
    title: text("Travel Vlog — Туреччина | Freelance UA", "Travel Vlog — Turkey | Freelance UA"),
    description: key("videoCases.travelVlogTurkey.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/travel-vlog-turkey/screen-1.jpg",
  },
  badge: key("videoCases.travelVlogTurkey.category"),
  glow: { base: "rgba(251, 146, 60, 0.12)", strong: "rgba(251, 146, 60, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/travel-vlog-turkey/screen-1.jpg",
    w: 1200,
    h: 800,
    alt: key("videoCases.travelVlogTurkey.title"),
    priority: true,
  },

  sections: [
    {
      kind: "links",
      items: [
        { href: "https://t.me/FreelanceUADigitalAgency/161/1074", label: text("Дивитись в Telegram", "View in Telegram") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.travelVlogTurkey.challengeTitle"),
      solutionTitle: key("videoCases.travelVlogTurkey.solutionTitle"),
      task: key("videoCases.travelVlogTurkey.challenge"),
      solution: key("videoCases.travelVlogTurkey.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.travelVlogTurkey.result1"),
        key("videoCases.travelVlogTurkey.result2"),
        key("videoCases.travelVlogTurkey.result3"),
        key("videoCases.travelVlogTurkey.result4"),
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з відео", "Video frames"),
      columns: 2,
      items: [
        { src: "/media/cases/travel-vlog-turkey/screen-1.jpg", alt: text("Аерозйомка готелю біля моря", "Aerial shot of a hotel by the sea") },
        { src: "/media/cases/travel-vlog-turkey/screen-2.jpg", alt: text("Скелястий пляж з горами", "Rocky beach with mountains") },
        { src: "/media/cases/travel-vlog-turkey/screen-3.jpg", alt: text("Вид з балкону на море", "Sea view from a balcony") },
        { src: "/media/cases/travel-vlog-turkey/screen-4.jpg", alt: text("Діти на водній гірці", "Children on a water slide") },
        { src: "/media/cases/travel-vlog-turkey/screen-5.jpg", alt: text("Емоції на водних гірках", "Emotions on the water slides") },
        { src: "/media/cases/travel-vlog-turkey/screen-6.jpg", alt: text("Чоловік на водній гірці", "Man on a water slide") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.travelVlogTurkey.reviewTitle"),
    text: key("videoCases.travelVlogTurkey.reviewText"),
    author: key("videoCases.travelVlogTurkey.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.travelVlogTurkey.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
