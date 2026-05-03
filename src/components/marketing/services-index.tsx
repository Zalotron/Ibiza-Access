"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
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
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xs uppercase tracking-[0.32em] text-accent"
      >
        {t("catalog")}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display mt-4 max-w-3xl text-balance text-5xl text-foreground sm:text-7xl"
      >
        {t("title")}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-6 max-w-xl text-base text-foreground/70"
      >
        {t("subtitle")}
      </motion.p>

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

      <motion.div
        layout
        className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.map((service, idx) => (
          <ServiceCard
            key={service.slug}
            service={service}
            locale={locale}
            index={idx}
          />
        ))}
      </motion.div>
    </div>
  );
}
