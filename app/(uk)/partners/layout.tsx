import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/ui/SiteBackdrop";
import { localizedMetadata } from "@/lib/seo";
import { translations } from "@/lib/i18n";

export const metadata: Metadata = localizedMetadata({
  locale: "uk",
  uaPath: "/partners",
  title: translations.uk["meta.partners.title"],
  description: translations.uk["meta.partners.description"],
  ogImage: "/og-freelance-ua-18d31c182c.jpg",
});

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
