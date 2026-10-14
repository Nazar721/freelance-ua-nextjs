import { key, text, type CaseRecord } from "../types";

/**
 * video/vladlen-lisynko-interview — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const vladlenLisynkoInterview: CaseRecord = {
  id: "video/vladlen-lisynko-interview",
  slug: "vladlen-lisynko-interview",
  direction: "video",
  subcategory: "youtube",
  uaPath: "/cases/video/vladlen-lisynko-interview",
  enPath: "/en/cases/video/vladlen-lisynko-interview",
  h1: text("Інтерв'ю з Владленом Лисенко", "Interview with Vladlen Lysenko"),
  lead: key("videoCases.vladlenLisynkoInterview.subtitle"),
  seo: {
    title: text("Інтерв'ю з Владленом Лисенко | Freelance UA", "Interview with Vladlen Lysenko | Freelance UA"),
    description: text("Монтаж інтерв'ю з Владленом Лисенко — YouTube-відео з професійним монтажем", "Editing an interview with Vladlen Lysenko — YouTube video with professional editing"),
    ogImage: "https://freelance-ua.agency/media/cases/vladlen-lisynko-interview/screen-3.jpg",
  },
  badge: key("videoCases.vladlenLisynkoInterview.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/vladlen-lisynko-interview/screen-3.jpg",
    w: 1200,
    h: 800,
    alt: key("videoCases.vladlenLisynkoInterview.title"),
    priority: true,
  },

  sections: [
    {
      kind: "links",
      items: [
        { href: "https://t.me/FreelanceUADigitalAgency/161/432", label: text("Дивитись на Telegram", "View on Telegram") },
      ],
    },
    {
      kind: "brief",
      taskTitle: key("videoCases.vladlenLisynkoInterview.challengeTitle"),
      solutionTitle: key("videoCases.vladlenLisynkoInterview.solutionTitle"),
      task: key("videoCases.vladlenLisynkoInterview.challenge"),
      solution: key("videoCases.vladlenLisynkoInterview.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.vladlenLisynkoInterview.result1"),
        key("videoCases.vladlenLisynkoInterview.result2"),
        key("videoCases.vladlenLisynkoInterview.result3"),
        key("videoCases.vladlenLisynkoInterview.result4"),
      ],
    },
    {
      kind: "gallery",
      title: text("Кадри з інтерв'ю", "Interview frames"),
      columns: 2,
      items: [
        { src: "/media/cases/vladlen-lisynko-interview/screen-1.jpg", alt: text("Владлен Лисинко — крупний план", "Vadlen Lysenko — close-up") },
        { src: "/media/cases/vladlen-lisynko-interview/screen-2.jpg", alt: text("Учениця — крупний план", "Student — close-up") },
        { src: "/media/cases/vladlen-lisynko-interview/screen-3.jpg", alt: text("Загальний кадр — обидва учасники в студії", "Wide shot — both participants in the studio") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.vladlenLisynkoInterview.reviewTitle"),
    text: key("videoCases.vladlenLisynkoInterview.reviewText"),
    author: key("videoCases.vladlenLisynkoInterview.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.vladlenLisynkoInterview.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
