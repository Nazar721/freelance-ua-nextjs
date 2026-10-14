import { key, text, type CaseRecord } from "../types";

/**
 * it/route-core — draft produced by scripts/migrate-case.mjs from the original page.
 * Media, blocks, links and captions come from that page; the editorial fields
 * (H1, SEO title) still carry placeholders and must be reviewed.
 */
export const routeCore: CaseRecord = {
  id: "it/route-core",
  slug: "route-core",
  direction: "it",
  subcategory: "landing",
  uaPath: "/cases/it/route-core",
  enPath: "/en/cases/it/route-core",

  h1: text("RouteCore — рекрутинговий лендинг для найму інженерів", "RouteCore — recruitment landing page for hiring engineers"),
  lead: key("itCases.routeCore.description"),
  seo: {
    title: text("RouteCore — лендинг для найму інженерів з процесом відбору | Freelance UA", "RouteCore — recruitment landing page with a selection process | Freelance UA"),
    description: text("Рекрутинговий лендинг для найму BAS & ZennoPoster інженерів з перевагами, вимогами та 4-етапним процесом відбору. Мультимовність UA/EN.", "A recruitment landing page for hiring BAS and ZennoPoster engineers with benefits, requirements and a 4-step selection process. UA/EN multilingual."),
    ogImage: "https://freelance-ua.agency/media/cases/routecore-mocap.webp",
  },
  badge: key("itCases.routeCore.category"),
  glow: { base: "rgba(99, 102, 241, 0.15)", strong: "rgba(99, 102, 241, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/routecore-mocap.webp",
    w: 1200,
    h: 800,
    alt: key("itCases.routeCore.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.routeCore.challenge"),
      solution: key("itCases.routeCore.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.routeCore.component1Title"),
          desc: key("itCases.routeCore.component1Desc"),
          images: [
            { src: "/media/cases/routecore1.jpeg" },
          ],
          link: { href: "https://route-core-umber.vercel.app/", label: key("itCases.routeCore.viewSiteLabel") },
        },
        {
          title: key("itCases.routeCore.component2Title"),
          desc: key("itCases.routeCore.component2Desc"),
          images: [
            { src: "/media/cases/routecore2.jpeg" },
          ],
        },
        {
          title: key("itCases.routeCore.component3Title"),
          desc: key("itCases.routeCore.component3Desc"),
          images: [
            { src: "/media/cases/routecore3.jpeg" },
          ],
        },
        {
          title: key("itCases.routeCore.component4Title"),
          desc: key("itCases.routeCore.component4Desc"),
          images: [
            { src: "/media/cases/routecore4.jpeg" },
          ],
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.routeCore.result1"),
        key("itCases.routeCore.result2"),
        key("itCases.routeCore.result3"),
        key("itCases.routeCore.result4"),
        key("itCases.routeCore.result5"),
        key("itCases.routeCore.result6"),
        key("itCases.routeCore.result7"),
        key("itCases.routeCore.result8"),
      ],
    },
  ],

  review: {
    kind: "text",
    title: key("itCases.routeCore.reviewTitle"),
    text: key("itCases.routeCore.reviewText"),
    author: key("itCases.routeCore.reviewAuthor"),
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.nazarDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/services/it#cases", en: "/en/services/it#cases" },
  },
};
