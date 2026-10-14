import { key, text, type CaseRecord } from "../types";

/**
 * video/internet-svit-promo — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const internetSvitPromo: CaseRecord = {
  id: "video/internet-svit-promo",
  slug: "internet-svit-promo",
  direction: "video",
  subcategory: "motion",
  uaPath: "/cases/video/internet-svit-promo",
  enPath: "/en/cases/video/internet-svit-promo",
  h1: text("Промо для Інтернет Світ", "Promo for Internet Svit"),
  lead: key("videoCases.internetSvitPromo.subtitle"),
  seo: {
    title: text("Промо для Інтернет Світ | Freelance UA", "Promo for Internet Svit | Freelance UA"),
    description: text("Моушн-промо для Інтернет Світ — яскравий та динамічний візуал", "Motion promo for Internet Svit — bright and dynamic visuals"),
    ogImage: "https://freelance-ua.agency/media/cases/internet-svit-promo/hero-poster.jpg",
  },
  badge: key("videoCases.internetSvitPromo.category"),
  glow: { base: "rgba(250, 204, 21, 0.12)", strong: "rgba(250, 204, 21, 0.25)" },

  hero: {
    kind: "video",
    src: "/media/cases/internet-svit-promo/hero.mp4",
    poster: "/media/cases/internet-svit-promo/hero-poster.jpg",
    alt: key("videoCases.internetSvitPromo.title"),
    format: "16:9",
  },

  sections: [
    {
      kind: "brief",
      taskTitle: key("videoCases.internetSvitPromo.challengeTitle"),
      solutionTitle: key("videoCases.internetSvitPromo.solutionTitle"),
      task: key("videoCases.internetSvitPromo.challenge"),
      solution: key("videoCases.internetSvitPromo.solution"),
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("videoCases.internetSvitPromo.result1"),
        key("videoCases.internetSvitPromo.result2"),
        key("videoCases.internetSvitPromo.result3"),
        key("videoCases.internetSvitPromo.result4"),
      ],
    },
    {
      kind: "prose",
      title: key("videoCases.internetSvitPromo.clientName"),
      subtitle: key("videoCases.internetSvitPromo.clientRole"),
      text: key("videoCases.internetSvitPromo.clientDesc"),
    },
  ],

  review: {
    kind: "text",
    title: key("videoCases.internetSvitPromo.reviewTitle"),
    text: key("videoCases.internetSvitPromo.reviewText"),
    author: key("videoCases.internetSvitPromo.reviewAuthor"),
  },
  team: {
    label: key("videoCases.projectTeam"),
    value: key("videoCases.internetSvitPromo.teamMember"),
  },
  backToList: {
    label: key("videoCases.backToList"),
    href: { uk: "/cases?tab=video", en: "/en/cases?tab=video" },
  },
};
