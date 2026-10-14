import { key, text, type CaseRecord } from "../types";

/**
 * video/dance-competition-lviv — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const danceCompetitionLviv: CaseRecord = {
  id: "video/dance-competition-lviv",
  slug: "dance-competition-lviv",
  direction: "video",
  subcategory: "reels",
  uaPath: "/cases/video/dance-competition-lviv",
  enPath: "/en/cases/video/dance-competition-lviv",
  h1: text("Reels для танцювального конкурсу", "Reels for a dance competition"),
  lead: key("videoCases.danceCompetition.subtitle"),
  seo: {
    title: text("Reels для танцювального конкурсу | Freelance UA", "Reels for a dance competition | Freelance UA"),
    description: text("Reels для танцювального конкурсу у Львові — динамічний монтаж з атмосферними кадрами", "Reels for a dance competition in Lviv — dynamic editing with atmospheric shots"),
    ogImage: "https://freelance-ua.agency/media/cases/dance-competition-lviv/hero-poster.jpg",
  },
  badge: key("videoCases.danceCompetition.category"),
  glow: { base: "rgba(59, 130, 246, 0.12)", strong: "rgba(59, 130, 246, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/dance-competition-lviv/hero.mp4",
    poster: "/media/cases/dance-competition-lviv/hero-poster.jpg",
    alt: key("videoCases.danceCompetition.title"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.danceCompetition.challengeTitle"),
      solutionTitle: key("videoCases.danceCompetition.solutionTitle"),
      task: key("videoCases.danceCompetition.challenge"),
      solution: key("videoCases.danceCompetition.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.danceCompetition.result1"),
        key("videoCases.danceCompetition.result2"),
        key("videoCases.danceCompetition.result3"),
        key("videoCases.danceCompetition.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.danceCompetition.clientName"),
      subtitle: key("videoCases.danceCompetition.clientRole"),
      text: key("videoCases.danceCompetition.clientDesc"),
    },
  ],

  review: {
    kind: "screenshot",
    title: key("videoCases.danceCompetition.reviewTitle"),
    src: "/media/cases/dance-competition-lviv/screenshot.webp",
    alt: text("Відгук Borys Maslii", "Borys Maslii's review"),
    text: key("videoCases.danceCompetition.reviewText"),
    author: key("videoCases.danceCompetition.reviewAuthor"),
    w: 500,
    h: 600,
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.danceCompetition.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
