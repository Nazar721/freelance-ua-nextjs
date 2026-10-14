import { key, text, type CaseRecord } from "../types";

/**
 * E.V.A. CODE™ — chosen as the IT pilot because its block mix is the widest
 * in the IT catalogue: hero screenshot, two-card brief, a five-item component
 * breakdown (three of them with screenshot sets, two with live product links),
 * a result list, a video review and a team line. That is exactly the shape a
 * generic IT record has to render.
 *
 * Every media path and link below is taken from the original page
 * (`app/(uk)/cases/it/eva-code/page.tsx` before the Package 4 rewrite) — 25
 * page images plus the review video = 26 references, the count the Package 1
 * inventory recorded for this case.
 */
export const evaCode: CaseRecord = {
  id: "it/eva-code",
  slug: "eva-code",
  direction: "it",
  subcategory: "saas-telegram",
  uaPath: "/cases/it/eva-code",
  enPath: "/en/cases/it/eva-code",

  // Owner-approved: the visible H1 is the project name in both languages;
  // the type and the exact scope of the work live in the subtitle below it.
  h1: text("E.V.A. CODE™", "E.V.A. CODE™"),
  // Owner-approved wording: the type and scope of the work only.
  subtitle: text(
    "Розробили лендинг, Telegram Mini App, CRM для експертів і кабінет власника",
    "We built a landing page, Telegram Mini App, CRM for experts and an owner dashboard",
  ),
  seo: {
    title: text(
      "E.V.A. CODE™ — лендинг, Telegram Mini App і CRM | Freelance UA",
      "E.V.A. CODE™ — landing, Telegram Mini App and CRM | Freelance UA",
    ),
    description: key("itCases.evaCode.shortDesc"),
    ogImage: "/media/cases/eva-web.webp?v=2",
  },
  badge: key("itCases.evaCode.category"),
  glow: { base: "rgba(99, 102, 241, 0.15)", strong: "rgba(99, 102, 241, 0.3)" },

  hero: {
    kind: "image",
    src: "/media/cases/eva-web.webp?v=2",
    w: 1200,
    h: 800,
    alt: key("itCases.evaCode.title"),
    priority: true,
  },

  sections: [
    {
      kind: "brief",
      task: key("itCases.evaCode.challenge"),
      solution: key("itCases.evaCode.solution"),
    },
    {
      kind: "featureList",
      decorated: true,
      title: key("itCases.technicals"),
      items: [
        {
          title: key("itCases.evaCode.component1Title"),
          desc: key("itCases.evaCode.component1Desc"),
          images: [
            { src: "/media/cases/eva-landing-decision.webp", w: 1200, h: 800 },
            { src: "/media/cases/eva-landing-skills.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-landing-lessons.webp", w: 400, h: 800 },
          ],
          link: { href: "https://evacode.app", label: key("itCases.evaCode.component1LinkLabel") },
        },
        {
          title: key("itCases.evaCode.component2Title"),
          desc: key("itCases.evaCode.component2Desc"),
          images: [
            { src: "/media/cases/eva-tg-welcome.webp", w: 1200, h: 800 },
            { src: "/media/cases/eva-tg-form.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-tg-ranking.webp", w: 400, h: 800 },
          ],
          link: { href: "https://t.me/evacode_tm_bot", label: key("itCases.evaCode.component2LinkLabel") },
        },
        {
          title: key("itCases.evaCode.component3Title"),
          desc: key("itCases.evaCode.component3Desc"),
          images: [
            { src: "/media/cases/eva-crm-dashboard.webp", w: 1200, h: 800 },
            { src: "/media/cases/eva-crm-clients.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-crm-sessions.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-crm-tasks.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-crm-referrals.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-crm-requests.jpeg", w: 400, h: 800 },
            { src: "/media/cases/eva-crm-mailings.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-crm-profile.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-crm-payments.webp", w: 400, h: 800 },
          ],
        },
        {
          title: key("itCases.evaCode.component4Title"),
          desc: key("itCases.evaCode.component4Desc"),
          images: [
            { src: "/media/cases/eva-owner-clients.webp", w: 1200, h: 800 },
            { src: "/media/cases/eva-owner-admin.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-owner-referrals.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-owner-tasks.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-owner-requests.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-owner-mailings.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-owner-sessions.jpeg", w: 400, h: 800 },
            { src: "/media/cases/eva-owner-booking.webp", w: 400, h: 800 },
            { src: "/media/cases/eva-owner-profile.webp", w: 400, h: 800 },
          ],
        },
        {
          title: key("itCases.evaCode.component5Title"),
          desc: key("itCases.evaCode.component5Desc"),
        },
      ],
    },
    {
      kind: "results",
      title: key("itCases.results"),
      columns: 1,
      items: [
        key("itCases.evaCode.result1"),
        key("itCases.evaCode.result2"),
        key("itCases.evaCode.result3"),
        key("itCases.evaCode.result4"),
        key("itCases.evaCode.result5"),
      ],
    },
  ],

  review: {
    kind: "video",
    title: key("itCases.evaCode.reviewTitle"),
    src: "/media/testimonials/eva-code.mp4",
  },
  team: {
    label: key("itCases.projectTeam"),
    value: key("itCases.team.andriiDeveloper"),
  },
  backToList: {
    label: key("itCases.backToList"),
    href: { uk: "/services/it#cases", en: "/en/services/it#cases" },
  },
};
