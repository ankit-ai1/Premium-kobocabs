import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import WhatsAppTracker from "@/components/WhatsAppTracker";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";

/** Chrome for the public marketing site. /admin deliberately does not use this. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Unmounts itself once the intro finishes — see Preloader. */}
      <Preloader />
      {/* Ultra-faint grain so large light areas don't read as flat. */}
      <div aria-hidden className="grain" />
      <ScrollProgress />
      <SmoothScroll>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        {/* Logs every WhatsApp hand-off into the admin Enquiries screen. */}
        <WhatsAppTracker />
      </SmoothScroll>
    </>
  );
}
