"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Drives Lenis from the GSAP ticker so smooth scrolling and ScrollTrigger
 * share one clock — otherwise scrubbed animations lag behind the scroll.
 *
 * Under prefers-reduced-motion Lenis never starts and the browser's native
 * scrolling is left completely alone.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Lenis owns the scroll position, so in-page anchors have to go through it.
    // This runs in the CAPTURE phase: next/link's own handler would otherwise
    // fire first and jump the page instantly before Lenis could animate.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const link = (e.target as HTMLElement)?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href) return;
      const hash = href.startsWith("#")
        ? href
        : href.startsWith("/#") && window.location.pathname === "/"
        ? href.slice(1)
        : null;
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;

      // We fully own this navigation, so stop it reaching the router too.
      e.preventDefault();
      e.stopPropagation();
      lenis.scrollTo(target as HTMLElement, {
        offset: -80,
        onComplete: () => window.history.replaceState(null, "", hash),
      });
    };
    document.addEventListener("click", onClick, true);

    return () => {
      document.removeEventListener("click", onClick, true);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
