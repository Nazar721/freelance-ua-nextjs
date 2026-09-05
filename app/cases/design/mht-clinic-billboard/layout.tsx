import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Білборд MHT Clinic | Freelance UA",
  description: "Дизайн зовнішньої реклами для медичної клініки пересадки волосся — презентація послуг у преміальному фірмовому стилі.",
  alternates: {
    canonical: "/cases/design/mht-clinic-billboard",
  },
  openGraph: {
    title: "Білборд MHT Clinic | Freelance UA",
    description: "Дизайн зовнішньої реклами для медичної клініки пересадки волосся — презентація послуг у преміальному фірмовому стилі.",
    images: ["https://freelance-ua.agency/media/cases/mht-clinic-billboard/mht-clinic-billboard-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
