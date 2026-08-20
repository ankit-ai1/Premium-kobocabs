import { Suspense } from "react";
import type { Metadata } from "next";
import QuoteView from "./QuoteView";

export const metadata: Metadata = {
  title: "Fare Quote — YantraCabs",
  description:
    "Live distance and fare estimate for your YantraCabs trip across North India. Toll and driver allowance extra.",
};

export default function QuotePage() {
  // useSearchParams needs a Suspense boundary for this route to prerender.
  return (
    <Suspense
      fallback={
        <section className="wrap grid min-h-[60vh] place-items-center py-24">
          <span className="h-8 w-8 animate-spin rounded-full border-[3px] border-ink/20 border-t-ink" />
        </section>
      }
    >
      <QuoteView />
    </Suspense>
  );
}
