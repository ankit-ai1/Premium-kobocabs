"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cabToBookingHref } from "@/lib/bookingRoute";
import { scrollToBook } from "@/components/BookLink";

export default function CabBookLink({
  cab,
  children,
  className,
  style,
}: {
  cab: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();
  const href = cabToBookingHref(cab);

  const onClick = (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new Event("booking-prefill-change"));
    scrollToBook();
  };

  return (
    <Link
      href={href}
      scroll={false}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </Link>
  );
}
