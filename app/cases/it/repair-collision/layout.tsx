import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Repair Collision | Freelance UA",
  description: "Сайт для польської автосервісної компанії з CRM, SEO просуванням, портфоліо 50+ авто та мультимовністю.",
  alternates: {
    canonical: "/cases/it/repair-collision",
  },
  openGraph: {
    title: "Repair Collision | Freelance UA",
    description: "Сайт для польської автосервісної компанії з CRM, SEO просуванням, портфоліо 50+ авто та мультимовністю.",
    images: ["https://freelance-ua.agency/media/cases/repair-collision-web.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
