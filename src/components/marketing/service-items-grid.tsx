"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import type { ServiceItem, ItemSpec } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { formatPrice, cn } from "@/lib/utils";
import { MOTION_CURVE, MOTION_DURATION_S } from "@/lib/motion";

function SpecChip({ spec }: { spec: ItemSpec }) {
  const t = useTranslations("items.specs");
  let text: string;

  if (spec.label) {
    text = spec.label;
  } else if (spec.key && spec.value !== undefined && spec.value !== null) {
    const label = t(spec.key as never);
    text = `${spec.value} ${label}`;
  } else if (spec.key) {
    text = t(spec.key as never);
  } else {
    return null;
  }

  return (
    <span className="inline-flex items-center rounded-sm bg-foreground/5 px-2 py-1 text-[11px] uppercase tracking-[0.12em] text-foreground/70">
      {text}
    </span>
  );
}

export function ServiceItemsGrid({
  items,
  locale,
}: {
  items: ServiceItem[];
  locale: Locale;
}) {
  const tItems = useTranslations("items");
  const tUnits = useTranslations("items.units");

  if (items.length === 0) return null;

  return (
    <section className="container-tight border-t border-foreground/10 py-20 sm:py-28">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: MOTION_DURATION_S * 2, ease: MOTION_CURVE }}
        className="font-display text-3xl text-foreground sm:text-4xl"
      >
        {tItems("options")}
      </motion.h2>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: MOTION_DURATION_S * 2,
              ease: MOTION_CURVE,
              delay: Math.min(idx * 0.06, 0.4),
            }}
            className={cn(
              "group flex flex-col overflow-hidden rounded-md border border-foreground/10 bg-card",
            )}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
              <header>
                <h3 className="font-display text-2xl text-foreground">
                  {item.name}
                </h3>
                {item.location && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs uppercase tracking-[0.18em] text-foreground/50">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {item.location}
                  </p>
                )}
              </header>

              {item.specs && item.specs.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.specs.map((spec, i) => (
                    <SpecChip key={`${item.id}-spec-${i}`} spec={spec} />
                  ))}
                </div>
              )}

              {item.priceFromCents !== undefined &&
                item.priceFromCents > 0 && (
                  <div className="mt-auto flex items-baseline gap-2 border-t border-foreground/10 pt-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                      {tItems("from")}
                    </span>
                    <span className="font-display text-xl text-foreground">
                      {formatPrice(item.priceFromCents, locale)}
                      {item.priceToCents && item.priceToCents > item.priceFromCents
                        ? ` – ${formatPrice(item.priceToCents, locale)}`
                        : ""}
                    </span>
                    {item.unit && (
                      <span className="text-xs text-foreground/50">
                        {tUnits(item.unit as never)}
                      </span>
                    )}
                  </div>
                )}
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
