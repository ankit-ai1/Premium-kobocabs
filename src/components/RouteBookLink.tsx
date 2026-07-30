"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routeToBookingHref } from "@/lib/bookingRoute";
import { scrollToBook } from "@/components/BookLink";

export default function RouteBookLink({
  route,
  children,
  className,
  style,
}: {
  route: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();
  const href = routeToBookingHref(route);

  const onClick = (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    window.history.pushState({}, "", href);
    window.dispatchEvent(new Event("booking-route-change"));
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
