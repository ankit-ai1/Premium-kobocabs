"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * ScrollTrigger measures start positions from the current page height, which is
 * wrong until images and webfonts have settled. Several sections ask for a
 * refresh at once, so coalesce them into a single pass per frame.
 */
let refreshQueued = false;
function scheduleRefresh() {
  if (refreshQueued) return;
  refreshQueued = true;
  requestAnimationFrame(() => {
    refreshQueued = false;
    ScrollTrigger.refresh();
  });
}

/**
 * Reveals direct children (or elements matching `selector`) with a
 * staggered slide-up as they scroll into view.
 *
 * The guiding rule: skipping the animation is fine, leaving content invisible
 * is not. `fromTo` + `immediateRender: false` means the elements are never
 * pre-hidden — the opacity-0 state is only applied once the trigger fires — so
 * a mis-measured or never-firing trigger degrades to "no animation" instead of
 * a permanently blank section.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  selector = "[data-reveal]",
  opts: { y?: number; stagger?: number; start?: string; scale?: number } = {}
) {
  const ref = useRef<T>(null);
  const { y, stagger, start, scale } = opts;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(selector));
    if (!targets.length) return;

    if (prefersReduced()) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    let failsafe = 0;

    const ctx = gsap.context(() => {
      const anim = gsap.fromTo(
        targets,
        { opacity: 0, y: y ?? 40, scale: scale ?? 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.95,
          ease: "power3.out",
          stagger: stagger ?? 0.12,
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: start ?? "top 85%",
            once: true,
            invalidateOnRefresh: true,
          },
        }
      );

      // Re-measure once this frame has painted, and again when images finish
      // loading (they change the page height, and therefore every start point).
      scheduleRefresh();
      window.addEventListener("load", scheduleRefresh);

      // Last resort: if the trigger never fired and something is still hidden,
      // show it anyway.
      failsafe = window.setTimeout(() => {
        if (anim.progress() > 0) return;
        const hidden = targets.filter(
          (t) => Number(gsap.getProperty(t, "opacity")) < 1
        );
        if (hidden.length) {
          gsap.to(hidden, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.3,
            stagger: 0.04,
          });
        }
      }, 1500);

      return () => {
        window.removeEventListener("load", scheduleRefresh);
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    }, el);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, [selector, y, stagger, start, scale]);

  return ref;
}

/**
 * Very slight magnetic pull toward the cursor. Skipped on touch devices and
 * under reduced motion, where it would be meaningless or unwanted.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(
  strength = 0.25,
  radius = 90
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const setX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const setY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      if (Math.hypot(dx, dy) > radius + Math.max(r.width, r.height) / 2) {
        setX(0);
        setY(0);
        return;
      }
      setX(dx * strength);
      setY(dy * strength);
    };
    const reset = () => {
      setX(0);
      setY(0);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("blur", reset);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [strength, radius]);

  return ref;
}

/**
 * Animates a number from 0 to `end` when it enters the viewport.
 */
export function useCounter(
  end: number,
  opts: { duration?: number; suffix?: string; prefix?: string } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (v: number) =>
      `${opts.prefix ?? ""}${Math.round(v).toLocaleString("en-IN")}${
        opts.suffix ?? ""
      }`;

    if (prefersReduced()) {
      el.textContent = format(end);
      return;
    }

    const obj = { val: 0 };
    let failsafe = 0;

    const ctx = gsap.context(() => {
      const anim = gsap.to(obj, {
        val: end,
        duration: opts.duration ?? 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          el.textContent = format(obj.val);
        },
      });

      scheduleRefresh();
      window.addEventListener("load", scheduleRefresh);

      // Same failsafe as useReveal: a stat stuck at "0" is as broken as a
      // blank card, so show the real number if the trigger never fired.
      failsafe = window.setTimeout(() => {
        if (anim.progress() === 0) el.textContent = format(end);
      }, 1500);

      return () => {
        window.removeEventListener("load", scheduleRefresh);
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    }, el);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, [end, opts.duration, opts.suffix, opts.prefix]);

  return ref;
}

/**
 * Drifts an element slower than the page scroll. Attach to a background layer
 * that is taller than its frame, otherwise the drift exposes an edge.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  distance = 90
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return;
    const target = el.querySelector(selector);
    if (!target) return;

    const ctx = gsap.context(() => {
      const anim = gsap.fromTo(
        target,
        { yPercent: -distance / 20 },
        {
          yPercent: distance / 20,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
      scheduleRefresh();
      window.addEventListener("load", scheduleRefresh);
      return () => {
        window.removeEventListener("load", scheduleRefresh);
        anim.scrollTrigger?.kill();
        anim.kill();
      };
    }, el);

    return () => ctx.revert();
  }, [selector, distance]);

  return ref;
}

/**
 * Gentle scale + clip-in for images as they enter view. Same failsafe rule as
 * useReveal: the image is visible by default and only animates if the trigger
 * fires, so it can never be left blank.
 */
export function useImageReveal<T extends HTMLElement = HTMLDivElement>(
  selector = "[data-img-reveal]"
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = gsap.utils.toArray<HTMLElement>(el.querySelectorAll(selector));
    if (!targets.length || prefersReduced()) return;

    const ctx = gsap.context(() => {
      const anims = targets.map((t) =>
        gsap.fromTo(
          t,
          { clipPath: "inset(12% 12% 12% 12% round 16px)", scale: 1.08 },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            immediateRender: false,
            scrollTrigger: { trigger: t, start: "top 88%", once: true },
          }
        )
      );
      scheduleRefresh();
      return () => anims.forEach((a) => {
        a.scrollTrigger?.kill();
        a.kill();
      });
    }, el);

    return () => ctx.revert();
  }, [selector]);

  return ref;
}

/** Refreshes ScrollTrigger after route/content changes. */
export function useScrollRefresh() {
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);
}
