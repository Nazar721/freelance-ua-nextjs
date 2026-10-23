import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import KineticGrid from "@/components/ui/kinetic-grid";

// English chrome for /en/services/{direction}. Metadata comes from the
// dynamic page's generateMetadata().
export default function EnServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid-page relative isolate overflow-hidden min-h-screen">
      <KineticGrid />
      <Header />
      {children}
      <Footer />
    </main>
  );
}
