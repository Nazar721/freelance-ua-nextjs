import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Імпортера | Freelance UA",
  description: "Спільний проєкт з компанією «Імпортера» — корпоративний сайт для B2B-дистриб'ютора з 250+ брендами, 50+ країнами, двомовністю (UA/EN) та галереєю партнерів.",
  alternates: {
    canonical: "/cases/it/importera",
  },
  openGraph: {
    title: "Імпортера | Freelance UA",
    description: "Спільний проєкт з компанією «Імпортера» — корпоративний сайт для B2B-дистриб'ютора з 250+ брендами, 50+ країнами, двомовністю (UA/EN) та галереєю партнерів.",
    images: ["https://freelance-ua.agency/media/cases/importera-mocap.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
