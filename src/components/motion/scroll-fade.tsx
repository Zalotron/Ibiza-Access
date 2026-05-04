"use client";

import { useRef, type ReactNode, type ElementType } from "react";
import { useScrollFade } from "@/lib/hooks/use-scroll-fade";
import { cn } from "@/lib/utils";

/**
 * Wrap any element so it fades+blurs+shrinks as it leaves the viewport center.
 * Drives the visual via the `.scroll-fade` utility class (see globals.css).
 */
export function ScrollFade({
  children,
  className,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollFade(ref);
  return (
    <As ref={ref} className={cn("scroll-fade", className)}>
      {children}
    </As>
  );
}
