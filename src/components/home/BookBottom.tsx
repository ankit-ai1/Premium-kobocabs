import BookingWidget from "@/components/BookingWidget";
import { SectionHead } from "@/components/Bits";
import Reveal from "@/components/Reveal";

export default function BookBottom() {
  // Only a bottom divider — the dark hero above is its own separation.
  return (
    <section className="border-b border-ink/[0.08] bg-paper py-24" id="book">
      <div className="wrap">
        <SectionHead
          center
          eyebrow="Quick Booking"
          title="Book Your Ride"
          hi="In Seconds"
          sub="Tell us where you're going and we'll confirm on WhatsApp — no advance, no surprises."
        />
        <Reveal className="mx-auto mt-10 max-w-7xl" y={40} scale={0.98}>
          <div data-reveal>
            <BookingWidget />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
