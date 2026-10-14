import { key, text, type CaseRecord } from "../types";

/**
 * it/md-dental — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const mdDental: CaseRecord = {
  id: "it/md-dental",
  slug: "md-dental",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/md-dental",
  enPath: "/en/cases/it/md-dental",

  h1: text("M+D Dental — сайт двох стоматологічних клінік", "M+D Dental — website for two dental clinics"),
  lead: key("itCases.mdDental.description"),
  seo: {
    title: text("M+D Dental — сайт стоматології з онлайн-записом і послугами | Freelance UA", "M+D Dental — dental clinic website with online booking and services | Freelance UA"),
    description: text("Сайт для двох стоматологічних клінік у Сумах: 23 послуги, команда лікарів з фото, онлайн-запис, довіра зі страховими компаніями та FAQ.", "Website for two dental clinics in Sumy: 23 services, a team of dentists with photos, online booking, trust from insurance companies and an FAQ."),
    ogImage: "https://freelance-ua.agency/media/cases/mddental-mocap.webp?v=2",
  },
  badge: key("itCases.mdDental.category"),
  glow: { base: "rgba(124, 91, 180, 0.12)", strong: "rgba(146, 112, 202, 0.25)" },

  hero: {
    kind: "image",
    src: "/media/cases/mddental-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.mdDental.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.mdDental.challenge"),
      solution: key("itCases.mdDental.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.mdDental.component1Title"),
          desc: key("itCases.mdDental.component1Desc"),
          images: [
            { src: "/media/cases/mddental-landing-1.webp" },
          ],
        },
        {
          title: key("itCases.mdDental.component2Title"),
          desc: key("itCases.mdDental.component2Desc"),
          images: [
            { src: "/media/cases/mddental-services.webp" },
          ],
        },
        {
          title: key("itCases.mdDental.component3Title"),
          desc: key("itCases.mdDental.component3Desc"),
          images: [
            { src: "/media/cases/mddental-trust.webp" },
          ],
        },
        {
          title: key("itCases.mdDental.component4Title"),
          desc: key("itCases.mdDental.component4Desc"),
          images: [
            { src: "/media/cases/mddental-team.webp" },
          ],
        },
        {
          title: key("itCases.mdDental.component5Title"),
          desc: key("itCases.mdDental.component5Desc"),
          images: [
            { src: "/media/cases/mddental-appointment.webp" },
            { src: "/media/cases/mddental-contacts.webp" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.mdDental.result1"),
        key("itCases.mdDental.result2"),
        key("itCases.mdDental.result3"),
        key("itCases.mdDental.result4"),
        key("itCases.mdDental.result5"),
        key("itCases.mdDental.result6"),
        key("itCases.mdDental.result7"),
        key("itCases.mdDental.result8"),
      ],
    },
    {
      kind: "links",
      items: [
        { href: "https://md-dental.in.ua/", label: key("itCases.mdDental.viewSiteLabel") },
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.mdDental.reviewTitle"),
    text: key("itCases.mdDental.reviewText"),
    author: key("itCases.mdDental.reviewAuthor"),
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
