import type { Metadata } from "next";
import { site } from "@/data/site";
import { PageHero } from "@/components/Bits";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: `Blog — ${site.name}`,
  description:
    "Expert travel guides for every North India road trip — hill stations, pilgrimages, one-way routes and more.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="YantraCabs Blog"
        title="Travel Guides &"
        hi="Route Tips"
        sub="Expert guides for every North India road trip — hill stations, pilgrimages, one-way routes and more."
      />
      {/* Filters + listing live in a client component so the chips can filter. */}
      <BlogList />
    </>
  );
}
