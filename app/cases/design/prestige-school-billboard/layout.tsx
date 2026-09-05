import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Білборд школи Престиж | Freelance UA",
  description: "Дизайн зовнішньої реклами для приватної початкової школи — анонс набору учнів у фірмовому стилі закладу.",
  alternates: {
    canonical: "/cases/design/prestige-school-billboard",
  },
  openGraph: {
    title: "Білборд школи Престиж | Freelance UA",
    description: "Дизайн зовнішньої реклами для приватної початкової школи — анонс набору учнів у фірмовому стилі закладу.",
    images: ["https://freelance-ua.agency/media/cases/prestige-school-billboard/prestige-school-billboard-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
