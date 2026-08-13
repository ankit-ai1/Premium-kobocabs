"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/drivers", label: "Drivers" },
  { href: "/admin/vehicles", label: "Rates" },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col">
      {links.map((l) => {
        // Only "/admin" needs an exact match; the rest own their subtrees.
        const active =
          l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap rounded-lg px-3.5 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors ${
              active
                ? "bg-taxi text-ink"
                : "text-ink-muted hover:bg-ink/5 hover:text-ink"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
