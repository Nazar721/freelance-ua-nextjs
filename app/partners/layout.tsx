import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/ui/SiteBackdrop";

export const metadata: Metadata = {
  title: "Партнерка — Freelance UA",
  description: "Рекомендуй нас клієнтам та отримуй 10–15% з кожного проекту. Без ризиків — лише прибуток.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Партнерка — Freelance UA",
    description: "Рекомендуй нас клієнтам та отримуй 10–15% з кожного проекту.",
  },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate overflow-hidden min-h-screen pt-24">
      <SiteBackdrop />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
