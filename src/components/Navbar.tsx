"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import BookLink from "@/components/BookLink";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`bg-white transition-shadow duration-300 ${
          scrolled ? "border-b border-ink/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : ""
        }`}
      >
        <nav className="wrap flex h-[70px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-taxi font-display text-2xl text-ink">
              Y
            </span>
            <span className="font-display text-2xl uppercase tracking-tight leading-none">
              Yantra<span className="text-taxi drop-shadow-[1px_1px_0_#0B0B0B]">Cabs</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative text-[13px] font-bold uppercase tracking-wide transition-colors hover:text-ink ${
                      active ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {item.label}
                    {/* Grows out from the centre on hover; stays put when active. */}
                    <span
                      className={`absolute -bottom-2 left-1/2 h-[3px] w-full origin-center -translate-x-1/2 rounded-full bg-taxi transition-transform duration-300 ease-out ${
                        active ? "scale-x-50" : "scale-x-0 group-hover:scale-x-50"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <BookLink className="btn-taxi hidden !rounded-full sm:inline-flex">
              Book A Cab
            </BookLink>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-ink/12 transition-colors duration-300 hover:border-ink/30 lg:hidden"
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-all ${open ? "top-2 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-2 h-0.5 w-5 bg-ink transition-all ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-5 bg-ink transition-all ${open ? "top-2 -rotate-45" : "top-4"}`} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div
        className={`overflow-hidden bg-white shadow-lg transition-[max-height] duration-300 lg:hidden ${
          open ? "max-h-96 border-t border-ink/10" : "max-h-0"
        }`}
      >
        <ul className="wrap flex flex-col gap-1 py-4">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block py-2 text-lg font-bold uppercase tracking-wide">
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <BookLink className="btn-taxi w-full !rounded-full">
              Book A Cab
            </BookLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
