import { key, text, type CaseRecord } from "../types";

/**
 * it/kroscar-detailing — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const kroscarDetailing: CaseRecord = {
  id: "it/kroscar-detailing",
  slug: "kroscar-detailing",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/kroscar-detailing",
  enPath: "/en/cases/it/kroscar-detailing",

  h1: text("KROSCAR Detailing — лендінг для детейлінг-студії", "KROSCAR Detailing — landing page for a detailing studio"),
  lead: key("itCases.kroscarDetailing.description"),
  seo: {
    title: text("KROSCAR Detailing — лендінг із записом онлайн і галереєю робіт | Freelance UA", "KROSCAR Detailing — landing with online booking and a work gallery | Freelance UA"),
    description: text("Лендінг для детейлінг-студії KROSCAR (Львів) з записом онлайн, галереєю робіт, слайдером «до/після» та системою відгуків Google.", "Landing page for the KROSCAR detailing studio (Lviv) with online booking, a work gallery, a before/after slider and Google reviews."),
    ogImage: "https://freelance-ua.agency/media/cases/kroscar-detailing-og.jpg",
  },
  badge: key("itCases.kroscarDetailing.category"),
  glow: { base: "rgba(6, 182, 212, 0.12)", strong: "rgba(6, 182, 212, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/kroscar-detailing-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.kroscarDetailing.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.kroscarDetailing.challenge"),
      solution: key("itCases.kroscarDetailing.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.kroscarDetailing.component1Title"),
          desc: key("itCases.kroscarDetailing.component1Desc"),
          images: [
            { src: "/media/cases/kroscar-hero.jpg" },
          ],
          link: { href: "https://deteling.vercel.app", label: key("itCases.kroscarDetailing.viewSiteLabel") },
        },
        {
          title: key("itCases.kroscarDetailing.component2Title"),
          desc: key("itCases.kroscarDetailing.component2Desc"),
          images: [
            { src: "/media/cases/kroscar-services.jpg" },
          ],
        },
        {
          title: key("itCases.kroscarDetailing.component3Title"),
          desc: key("itCases.kroscarDetailing.component3Desc"),
          images: [
            { src: "/media/cases/kroscar-gallery.jpg" },
            { src: "/media/cases/kroscar-before-after.jpg" },
          ],
        },
        {
          title: key("itCases.kroscarDetailing.component4Title"),
          desc: key("itCases.kroscarDetailing.component4Desc"),
          images: [
            { src: "/media/cases/kroscar-process.jpg" },
            { src: "/media/cases/kroscar-reviews.jpg" },
            { src: "/media/cases/kroscar-booking.jpg" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.kroscarDetailing.result1"),
        key("itCases.kroscarDetailing.result2"),
        key("itCases.kroscarDetailing.result3"),
        key("itCases.kroscarDetailing.result4"),
        key("itCases.kroscarDetailing.result5"),
        key("itCases.kroscarDetailing.result6"),
        key("itCases.kroscarDetailing.result7"),
        key("itCases.kroscarDetailing.result8"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.kroscarDetailing.reviewTitle"),
    text: key("itCases.kroscarDetailing.reviewText"),
    author: key("itCases.kroscarDetailing.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.nazarDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/cases/it", en: "/en/cases/it" },
  },
};
