"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

type Size = "default" | "sm" | "lg";

const PRIMARY_CTA_BASE =
  "group transition-all duration-cta ease-cta hover:brightness-125 hover:scale-[1.04] active:scale-[0.98]";

function CtaArrow() {
  return (
    <ArrowRight
      className="h-5 w-6 transition-transform duration-cta ease-cta group-hover:translate-x-2 group-hover:scale-x-125"
      aria-hidden="true"
    />
  );
}

/**
 * Brand primary CTA — `<Link>` flavor. Use for any "advance the user" link
 * (Build trip, View services, Begin experience, Continue checkout, etc.).
 * All such links share this component so visual tweaks (color, hover, arrow,
 * size) propagate everywhere by editing this file.
 */
type LinkProps = ComponentPropsWithoutRef<typeof Link> & {
  size?: Size;
};

export const PrimaryCtaLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, size = "lg", ...props }, ref) => (
    <Link
      ref={ref}
      className={cn(
        buttonVariants({ variant: "accent", size }),
        PRIMARY_CTA_BASE,
        className,
      )}
      {...props}
    >
      {children}
      <CtaArrow />
    </Link>
  ),
);
PrimaryCtaLink.displayName = "PrimaryCtaLink";

/**
 * Brand primary CTA — `<button>` flavor. Same pattern, for actions that don't
 * navigate (form submits, mutations, etc.). Pass `arrow={false}` if a specific
 * state shouldn't render the arrow (e.g. while showing a spinner).
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: Size;
  /** Render the trailing arrow icon. Default true. */
  arrow?: boolean;
  /** Optional override for the trailing visual (e.g. a spinner). Replaces the arrow when provided. */
  trailing?: ReactNode;
};

export const PrimaryCtaButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, size = "lg", arrow = true, trailing, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      className={cn(
        buttonVariants({ variant: "accent", size }),
        PRIMARY_CTA_BASE,
        className,
      )}
      {...props}
    >
      {children}
      {trailing ?? (arrow ? <CtaArrow /> : null)}
    </button>
  ),
);
PrimaryCtaButton.displayName = "PrimaryCtaButton";
