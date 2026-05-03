"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Plus, Check } from "lucide-react";
import type { Service } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { useTripStore, useIsInTrip } from "@/lib/store/trip-store";
import { formatPrice, cn } from "@/lib/utils";

export function ServiceCard({
  service,
  locale,
  index = 0,
  className,
}: {
  service: Service;
  locale: Locale;
  index?: number;
  className?: string;
}) {
  const t = useTranslations("services");
  const tCta = useTranslations("cta");
  const inTrip = useIsInTrip(service.slug);
  const add = useTripStore((s) => s.add);
  const remove = useTripStore((s) => s.remove);
  const items = useTripStore((s) => s.items);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inTrip) {
      const existing = items.find((i) => i.serviceSlug === service.slug);
      if (existing) remove(existing.id);
    } else {
      add({
        serviceSlug: service.slug,
        priceCents: service.basePriceCents,
        titleSnapshot: service.title[locale],
        imageSnapshot: service.image,
      });
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative overflow-hidden rounded-md", className)}
    >
      <Link href={`/services/${service.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
          <Image
            src={service.image}
            alt={service.title[locale]}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
          <button
            type="button"
            onClick={handleToggle}
            className={cn(
              "absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-md backdrop-blur-md transition-all",
              inTrip
                ? "bg-accent text-accent-foreground"
                : "bg-foreground/10 text-foreground hover:bg-accent hover:text-accent-foreground",
            )}
            aria-label={inTrip ? tCta("removeFromTrip") : tCta("addToTrip")}
          >
            {inTrip ? (
              <Check className="h-4 w-4" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
          </button>

          <div className="absolute inset-x-5 bottom-5">
            <p className="text-[10px] uppercase tracking-[0.32em] text-foreground/60">
              {service.unitLabel?.[locale] ?? ""}
            </p>
            <h3 className="font-display mt-1 text-2xl text-foreground">
              {service.title[locale]}
            </h3>
            {service.basePriceCents > 0 && (
              <p className="mt-2 text-sm text-foreground/80">
                {t("from")}{" "}
                <span className="font-medium text-foreground">
                  {formatPrice(service.basePriceCents, locale)}
                </span>
              </p>
            )}
          </div>
        </div>
      </Link>
      {inTrip && (
        <div className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-accent" />
      )}
    </motion.article>
  );
}
