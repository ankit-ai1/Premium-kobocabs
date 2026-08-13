import Hero from "@/components/home/Hero";
import DriveStrip from "@/components/home/DriveStrip";
import BookBottom from "@/components/home/BookBottom";
import PremiumCabsPreview from "@/components/home/PremiumCabsPreview";
import About from "@/components/home/About";
import LocationTabs from "@/components/home/LocationTabs";
import Services from "@/components/home/Services";
import Stats from "@/components/home/Stats";
import CallToBook from "@/components/home/CallToBook";
import Reviews from "@/components/home/Reviews";
import CtaBand from "@/components/home/CtaBand";
import { BookHashScroll } from "@/components/BookLink";

export default function HomePage() {
  return (
    <>
      {/* Scrolls to #book when arriving from another page's booking CTA. */}
      <BookHashScroll />
      <Hero />
      <DriveStrip />
      <BookBottom />
      <PremiumCabsPreview />
      <About />
      <LocationTabs />
      <Services />
      <Stats />
      <CallToBook />
      <Reviews />
      <CtaBand />
    </>
  );
}
