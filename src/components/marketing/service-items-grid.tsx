"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { MapPin, Plus, Check } from "lucide-react";
import type { ServiceItem, ItemSpec } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { formatPrice, cn } from "@/lib/utils";
import { MOTION_CURVE, MOTION_DURATION_S } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import {
  useIsItemInTrip,
  useTripStore,
} from "@/lib/store/trip-store";

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

function ItemCard({
  item,
  serviceSlug,
  locale,
  index,
}: {
  item: ServiceItem;
  serviceSlug: string;
  locale: Locale;
  index: number;
}) {
  const tItems = useTranslations("items");
  const tUnits = useTranslations("items.units");
  const tCta = useTranslations("cta");
  const tServices = useTranslations("services");

  const inTrip = useIsItemInTrip(serviceSlug, item.id);
  const add = useTripStore((s) => s.add);
  const remove = useTripStore((s) => s.remove);
  const lineItems = useTripStore((s) => s.items);

  const handleToggle = () => {
    if (inTrip) {
      const existing = lineItems.find(
        (i) => i.serviceSlug === serviceSlug && i.itemId === item.id,
      );
      if (existing) remove(existing.id);
    } else {
      add({
        serviceSlug,
        itemId: item.id,
        priceCents: item.priceFromCents ?? 0,
        titleSnapshot: item.name,
        imageSnapshot: item.image,
      });
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: MOTION_DURATION_S * 2,
        ease: MOTION_CURVE,
        delay: Math.min(index * 0.06, 0.4),
      }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-md border border-foreground/10 bg-card transition-shadow duration-default ease-default hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
        inTrip && "ring-1 ring-accent",
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
          <h3 className="font-display text-2xl text-foreground">{item.name}</h3>
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

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-foreground/10 pt-4">
          {item.priceFromCents !== undefined && item.priceFromCents > 0 ? (
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                {tItems("from")}
              </span>
              <span className="font-display text-xl text-foreground">
                {formatPrice(item.priceFromCents, locale)}
                {item.priceToCents && item.priceToCents > item.priceFromCents
                  ? ` – ${formatPrice(item.priceToCents, locale)}`
                  : ""}
                {item.unit && (
                  <span className="ml-1 text-xs text-foreground/50">
                    {tUnits(item.unit as never)}
                  </span>
                )}
              </span>
            </div>
          ) : (
            <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">
              {item.unit ? tUnits(item.unit as never) : ""}
            </span>
          )}
          <Button
            type="button"
            variant={inTrip ? "outline" : "accent"}
            size="sm"
            onClick={handleToggle}
            aria-pressed={inTrip}
          >
            {inTrip ? (
              <>
                <Check className="h-3 w-3" aria-hidden="true" />
                {tServices("addedToTrip")}
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" aria-hidden="true" />
                {tCta("addToTrip")}
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.li>
  );
}

export function ServiceItemsGrid({
  items,
  serviceSlug,
  locale,
}: {
  items: ServiceItem[];
  serviceSlug: string;
  locale: Locale;
}) {
  const tItems = useTranslations("items");

  if (items.length === 0) return null;

  return (
    <section className="container-tight py-20 sm:py-28">
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
          <ItemCard
            key={item.id}
            item={item}
            serviceSlug={serviceSlug}
            locale={locale}
            index={idx}
          />
        ))}
      </ul>
    </section>
  );
}
