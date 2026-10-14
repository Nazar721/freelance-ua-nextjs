import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/ui/SiteBackdrop";

// English chrome for /en/services/{direction}. Metadata comes from the
// dynamic page's generateMetadata().
export default function EnServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative isolate overflow-hidden min-h-screen">
      <SiteBackdrop />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
