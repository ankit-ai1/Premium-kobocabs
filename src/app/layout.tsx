import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";

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
    "KoboCabs",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="font-sans">
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
        </SmoothScroll>
      </body>
    </html>
  );
}
