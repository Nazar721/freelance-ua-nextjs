import { key, text, type CaseRecord } from "../types";

/**
 * video/alien-city-adventure — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const alienCityAdventure: CaseRecord = {
  id: "video/alien-city-adventure",
  slug: "alien-city-adventure",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/alien-city-adventure",
  enPath: "/en/cases/video/alien-city-adventure",
  h1: text("AI-відео про пригоди", "AI adventure video"),
  lead: key("videoCases.alienCityAdventure.subtitle"),
  seo: {
    title: text("AI-відео про пригоди | Freelance UA", "AI adventure video | Freelance UA"),
    description: text("AI-згенероване відео про пригоди в інопланетному місті — креативний контент", "AI-generated video about adventures in an alien city — creative content"),
    ogImage: "https://freelance-ua.agency/media/cases/alien-city-adventure/hero-poster.jpg",
  },
  badge: key("videoCases.alienCityAdventure.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/alien-city-adventure/hero.mp4",
    poster: "/media/cases/alien-city-adventure/hero-poster.jpg",
    alt: key("videoCases.alienCityAdventure.title"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.alienCityAdventure.challengeTitle"),
      solutionTitle: key("videoCases.alienCityAdventure.solutionTitle"),
      task: key("videoCases.alienCityAdventure.challenge"),
      solution: key("videoCases.alienCityAdventure.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.alienCityAdventure.result1"),
        key("videoCases.alienCityAdventure.result2"),
        key("videoCases.alienCityAdventure.result3"),
        key("videoCases.alienCityAdventure.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.alienCityAdventure.reviewTitle"),
    text: key("videoCases.alienCityAdventure.reviewText"),
    author: key("videoCases.alienCityAdventure.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.alienCityAdventure.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
