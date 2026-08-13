import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

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
  title: `${site.name} — ${site.tagline}`,
  description:
    "Book outstation and city cabs at fixed, all-inclusive prices. Verified drivers, clean vehicles, zero advance. 500+ routes across North India.",
  keywords: [
    "cab booking",
    "outstation taxi",
    "Bareilly cab",
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
