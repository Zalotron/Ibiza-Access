import { cn } from "@/lib/utils";

/**
 * Reusable hairline + diamond ornament between two sections.
 * Drop in `<SectionDivider />` between any two siblings on a page.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "container-tight flex justify-center py-2 sm:py-3",
        className,
      )}
    >
      <div className="flex items-center gap-5 text-accent">
        <span className="h-px w-20 bg-current" />
        <span className="block h-1.5 w-1.5 rotate-45 bg-current" />
        <span className="h-px w-20 bg-current" />
      </div>
    </div>
  );
}
