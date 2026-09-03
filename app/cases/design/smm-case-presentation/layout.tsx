import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Презентація кейсів | Freelance UA",
  description: "Шаблон презентації для демонстрації SMM-кейсів клієнтам — від фітнес-тренера до стоматологічної клініки.",
  alternates: {
    canonical: "/cases/design/smm-case-presentation",
  },
  openGraph: {
    title: "Презентація кейсів | Freelance UA",
    description: "Шаблон презентації для демонстрації SMM-кейсів клієнтам — від фітнес-тренера до стоматологічної клініки.",
    images: ["https://freelance-ua.agency/media/cases/smm-case-presentation/smm-case-presentation-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
