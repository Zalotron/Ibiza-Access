"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ServiceCard } from "./service-card";
import { services } from "@/lib/data/services";
import type { Locale } from "@/i18n/routing";
import type { ServiceCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const CATEGORY_IDS = ["all", "stay", "transport", "experience", "wellness"] as const;
type CategoryId = (typeof CATEGORY_IDS)[number];

export function ServicesIndex({ locale }: { locale: Locale }) {
  const t = useTranslations("services");
  const [active, setActive] = useState<CategoryId>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? services
        : services.filter((s) => s.category === (active as ServiceCategory)),
    [active],
  );

  return (
    <div className="container-tight pt-32 sm:pt-40 pb-20">
      <p className="text-xs uppercase tracking-[0.32em] text-accent">
        {t("catalog")}
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-balance text-5xl text-foreground sm:text-7xl">
        {t("title")}
      </h1>
      <p className="mt-6 max-w-xl text-base text-foreground/70">
        {t("subtitle")}
      </p>

      <div className="mt-12 flex flex-wrap gap-2">
        {CATEGORY_IDS.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={cn(
              "rounded-md border px-4 py-2 text-xs uppercase tracking-[0.2em] transition-colors",
              active === id
                ? "border-accent bg-accent text-accent-foreground"
                : "border-foreground/15 text-foreground/70 hover:border-foreground/30",
            )}
          >
            {t(`categories.${id}`)}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((service) => (
          <ServiceCard key={service.slug} service={service} locale={locale} />
        ))}
      </div>
    </div>
  );
}
