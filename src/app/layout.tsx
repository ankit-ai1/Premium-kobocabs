import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/site-url";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // Makes the relative image paths in per-page openGraph blocks resolve to
  // absolute URLs, which is what social platforms require.
  metadataBase: new URL(siteUrl()),
  title: `${site.name} — ${site.tagline}`,
  description:
    "Book outstation and city cabs at clear per-kilometre rates. Verified drivers, clean vehicles, zero advance. 500+ routes across North India.",
  keywords: [
    "cab booking",
    "outstation taxi",
    "Delhi cab",
    "Nainital taxi",
    "one-way cab",
    "YantraCabs",
  ],
};

/**
 * Document shell only.
 *
 * The public site's chrome (navbar, smooth scroll, preloader) lives in
 * (site)/layout.tsx so the admin portal at /admin can opt out of all of it —
 * a dashboard should not have a marquee and a scroll-hijacker.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
