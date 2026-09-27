import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GLOBUS — білборд | Freelance UA",
  description:
    "Дизайн білбордів для будівельної компанії GLOBUS — архітектура майбутнього у форматі зовнішньої реклами.",
  alternates: {
    canonical: "/cases/design/globus-billboard",
  },
  openGraph: {
    title: "GLOBUS — білборд | Freelance UA",
    description:
      "Дизайн білбордів для будівельної компанії GLOBUS — архітектура майбутнього у форматі зовнішньої реклами.",
    images: ["https://freelance-ua.agency/media/cases/globus-billboard/og.jpg"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
