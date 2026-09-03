import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вакансія | Freelance UA",
  description: "Рекламний банер вакансії для крипто-офісу в Дніпрі — яскравий персонаж, конкретна зарплата та заклик залишити заявку.",
  alternates: {
    canonical: "/cases/design/crypto-chat-manager-vacancy",
  },
  openGraph: {
    title: "Вакансія | Freelance UA",
    description: "Рекламний банер вакансії для крипто-офісу в Дніпрі — яскравий персонаж, конкретна зарплата та заклик залишити заявку.",
    images: ["https://freelance-ua.agency/media/cases/crypto-chat-manager-vacancy/crypto-chat-manager-vacancy-preview.webp"],
  },
};

export default function CaseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
