import { key, text, type CaseRecord } from "../types";

/**
 * video/dr-trichologist-promo — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const drTrichologistPromo: CaseRecord = {
  id: "video/dr-trichologist-promo",
  slug: "dr-trichologist-promo",
  direction: "video",
  subcategory: "ai",
  uaPath: "/cases/video/dr-trichologist-promo",
  enPath: "/en/cases/video/dr-trichologist-promo",
  h1: text("AI-промо для Dr. Trichologist", "AI promo for Dr. Trichologist"),
  lead: key("videoCases.drTrichologistPromo.subtitle"),
  seo: {
    title: text("AI-промо для Dr. Trichologist | Freelance UA", "AI promo for Dr. Trichologist | Freelance UA"),
    description: key("videoCases.drTrichologistPromo.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/dr-trichologist-promo/screenshot.jpg",
  },
  badge: key("videoCases.drTrichologistPromo.category"),
  glow: { base: "rgba(168, 85, 247, 0.12)", strong: "rgba(168, 85, 247, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/dr-trichologist-promo/hero.mp4",
    alt: key("videoCases.drTrichologistPromo.title"),
    duration: text("~15с", "~15s"),
    format: "9:16",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.drTrichologistPromo.challengeTitle"),
      solutionTitle: key("videoCases.drTrichologistPromo.solutionTitle"),
      task: key("videoCases.drTrichologistPromo.challenge"),
      solution: key("videoCases.drTrichologistPromo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.drTrichologistPromo.result1"),
        key("videoCases.drTrichologistPromo.result2"),
        key("videoCases.drTrichologistPromo.result3"),
        key("videoCases.drTrichologistPromo.result4"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.drTrichologistPromo.reviewTitle"),
    text: key("videoCases.drTrichologistPromo.reviewText"),
    author: key("videoCases.drTrichologistPromo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.drTrichologistPromo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
