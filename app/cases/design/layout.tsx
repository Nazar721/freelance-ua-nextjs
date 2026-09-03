import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дизайн — Freelance UA",
  description: "Брендінг, поліграфія, банери, ретуш фотографій та SMM-дизайн. Портфоліо дизайнерських проєктів агенції Freelance UA.",
  alternates: {
    canonical: "/cases/design",
  },
  openGraph: {
    title: "Дизайн — Freelance UA",
    description: "Брендінг, поліграфія, банери, ретуш фотографій та SMM-дизайн.",
  },
};

export default function DesignCasesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
