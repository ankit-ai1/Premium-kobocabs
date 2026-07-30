"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/hooks/useGsap";

export default function Reveal({
  children,
  className,
  stagger,
  y,
  scale,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  scale?: number;
}) {
  const ref = useReveal<HTMLDivElement>("[data-reveal]", { stagger, y, scale });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
