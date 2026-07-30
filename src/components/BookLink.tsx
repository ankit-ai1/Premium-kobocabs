"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type Lenis = { scrollTo: (t: HTMLElement, o?: Record<string, unknown>) => void };

/**
 * No JS offset here on purpose. Lenis honours the target's CSS
 * `scroll-margin-top` (the section carries `scroll-mt-28`), so adding an
 * offset as well double-counts and stops ~200px short of the section.
 * Keeping the gap in CSS means the native scrollIntoView fallback used under
 * reduced motion lands in exactly the same place.
 */
export function scrollToBook() {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el = document.getElementById("book");
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Every booking CTA on the site. On the homepage it scrolls straight to the
 * Quick Booking section; from any other page it navigates to `/#book` and
 * BookHashScroll (mounted on the homepage) finishes the job after load.
 */
export default function BookLink({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();

  const onClick = (e: React.MouseEvent) => {
    if (pathname !== "/") return; // let the Link navigate
    e.preventDefault();
    scrollToBook();
  };

  return (
    <Link
      href="/#book"
      scroll={false}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}

/**
 * Mounted on the homepage: handles arrivals from another page at `/#book`.
 * Waits a frame so Lenis and layout are settled before scrolling.
 */
export function BookHashScroll() {
  useEffect(() => {
    if (window.location.hash !== "#book") return;
    const id = window.setTimeout(() => scrollToBook(), 120);
    return () => window.clearTimeout(id);
  }, []);
  return null;
}
