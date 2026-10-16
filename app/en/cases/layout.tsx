import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/ui/SiteBackdrop";
import { localizedMetadata } from "@/lib/seo";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = localizedMetadata({
  locale: "en",
  uaPath: "/cases",
  title: translations.en["meta.cases.title"],
  description: translations.en["meta.cases.description"],
  ogImage: "/og-image.jpg",
});

export default function EnCasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate overflow-hidden min-h-screen pt-24">
      <SiteBackdrop />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
