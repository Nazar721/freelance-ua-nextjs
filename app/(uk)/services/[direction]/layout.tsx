import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/ui/SiteBackdrop";

// Chrome for /services/{direction}. Metadata is NOT set here — each dynamic
// page provides its own via generateMetadata(). The main wrapper does not add
// top padding: the direction page controls its own spacing so the fixed
// header never overlaps the H1.
export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate overflow-hidden min-h-screen">
      <SiteBackdrop />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
