"use client";

import { useEffect } from "react";
import { logWhatsApp, messageFromWaHref } from "@/lib/wa-log";
import type { WhatsAppLeadKind } from "@/lib/supabase/types";

/**
 * Logs every tap on a WhatsApp link across the public site.
 *
 * One delegated listener instead of an onClick on each of the ~15 links: any
 * WhatsApp button added later is tracked the moment it renders, with no chance
 * of someone forgetting to wire it up. The three places that open WhatsApp with
 * `window.open` rather than an anchor call `logWhatsApp` themselves.
 *
 * A link can name itself with `data-wa-kind` / `data-wa-label`, or opt out
 * with `data-wa-skip`; otherwise the button's own text is the label.
 */
export default function WhatsAppTracker() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!link) return;
      // Hand-offs whose lead is already recorded elsewhere (a saved booking)
      // opt out, so the Enquiries list stays a list of untracked leads.
      if (link.dataset.waSkip !== undefined) return;

      const kind = (link.dataset.waKind as WhatsAppLeadKind) || "link";
      const label =
        link.dataset.waLabel ||
        link.textContent?.trim() ||
        link.getAttribute("aria-label") ||
        null;

      logWhatsApp({ kind, label, message: messageFromWaHref(link.href) });
    };

    // Capture phase, so a handler that stops propagation can't hide the tap.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
