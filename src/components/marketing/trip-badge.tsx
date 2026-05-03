"use client";

import { useTripCount } from "@/lib/store/trip-store";
import { Link } from "@/i18n/navigation";
import { ShoppingBag } from "lucide-react";
import { useTranslations } from "next-intl";

export function TripBadge() {
  const count = useTripCount();
  const t = useTranslations("nav");

  return (
    <Link
      href="/trip"
      className="group relative inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent"
      aria-label={t("trip")}
    >
      <ShoppingBag className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">{t("trip")}</span>
      {count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
