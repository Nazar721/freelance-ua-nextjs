import { key, text, type CaseRecord } from "../types";

/**
 * it/repair-collision — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const repairCollision: CaseRecord = {
  id: "it/repair-collision",
  slug: "repair-collision",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/repair-collision",
  enPath: "/en/cases/it/repair-collision",

  h1: text("Repair Collision — сайт для автосервісної компанії", "Repair Collision — website for a car service company"),
  lead: key("itCases.repairCollision.description"),
  seo: {
    title: text("Repair Collision — сайт автосервісу з CRM і портфоліо | Freelance UA", "Repair Collision — auto repair website with CRM and portfolio | Freelance UA"),
    description: key("itCases.repairCollision.shortDesc"),
    ogImage: "https://freelance-ua.agency/media/cases/repair-collision-web.webp",
  },
  badge: key("itCases.repairCollision.category"),
  glow: { base: "rgba(34, 197, 94, 0.12)", strong: "rgba(34, 197, 94, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/repair-collision-web.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.repairCollision.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.repairCollision.challenge"),
      solution: key("itCases.repairCollision.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.repairCollision.component1Title"),
          desc: key("itCases.repairCollision.component1Desc"),
          images: [
            { src: "/media/cases/repair-collision-landing-1.jpeg" },
            { src: "/media/cases/repair-collision-landing-2.jpeg" },
          ],
        },
        {
          title: key("itCases.repairCollision.component2Title"),
          desc: key("itCases.repairCollision.component2Desc"),
          images: [
            { src: "/media/cases/repair-collision-contacts.webp" },
          ],
        },
        {
          title: key("itCases.repairCollision.component3Title"),
          desc: key("itCases.repairCollision.component3Desc"),
          images: [
            { src: "/media/cases/repair-collision-landing-3.webp" },
          ],
        },
        {
          title: key("itCases.repairCollision.component4Title"),
          desc: key("itCases.repairCollision.component4Desc"),
        },
        {
          title: key("itCases.repairCollision.component5Title"),
          desc: key("itCases.repairCollision.component5Desc"),
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.repairCollision.result1"),
        key("itCases.repairCollision.result2"),
        key("itCases.repairCollision.result3"),
        key("itCases.repairCollision.result4"),
        key("itCases.repairCollision.result5"),
        key("itCases.repairCollision.result6"),
        key("itCases.repairCollision.result7"),
        key("itCases.repairCollision.result8"),
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://kolizjaoc.pl/pl", label: key("itCases.repairCollision.viewSiteLabel") },
      ],
    },
  ],

  review: {
    kind: "text",
    text: key("itCases.repairCollision.reviewText"),
    author: key("itCases.repairCollision.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.andriiDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/cases/it", en: "/en/cases/it" },
  },
};
