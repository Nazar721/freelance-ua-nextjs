import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CasesBackdrop from "@/components/ui/CasesBackdrop";

export const metadata: Metadata = {
  title: "Кейси — Freelance UA",
  description: "Портфоліо проєктів: ІТ-розробка (Telegram-боти, CRM, веб-сайти), дизайн (брендінг, поліграфія, ретуш) та відеовиробництво.",
  alternates: {
    canonical: "/cases",
  },
  openGraph: {
    title: "Кейси — Freelance UA",
    description: "Портфоліо проєктів: ІТ-розробка, дизайн та відеовиробництво.",
  },
};

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate overflow-hidden min-h-screen pt-24">
      <CasesBackdrop />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
