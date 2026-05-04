"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Trash2, Calendar, Users } from "lucide-react";
import { useTripStore, useTripTotal, useTripDeposit } from "@/lib/store/trip-store";
import { services } from "@/lib/data/services";
import { formatPrice, cn, withBase } from "@/lib/utils";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import type { Locale } from "@/i18n/routing";

export function TripCart({ locale }: { locale: Locale }) {
  const tTrip = useTranslations("trip");
  const tCta = useTranslations("cta");
  const items = useTripStore((s) => s.items);
  const hydrated = useTripStore((s) => s.hydrated);
  const remove = useTripStore((s) => s.remove);
  const update = useTripStore((s) => s.update);
  const total = useTripTotal();
  const deposit = useTripDeposit();

  if (!hydrated) {
    return (
      <div className="container-tight pt-32 pb-32">
        <div className="h-12 w-2/3 animate-pulse rounded bg-foreground/5" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-tight pt-40 pb-32 text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">
          {tTrip("title")}
        </p>
        <h1 className="font-display mt-6 text-balance text-4xl text-foreground sm:text-5xl lg:text-6xl">
          {tTrip("empty")}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-foreground/70">
          {tTrip("emptyHint")}
        </p>
        <PrimaryCtaLink href="/#services" className="mt-10">
          {tCta("viewServices")}
        </PrimaryCtaLink>
      </div>
    );
  }

  return (
    <div className="container-tight pt-32 pb-32">
      <p className="text-xs uppercase tracking-[0.32em] text-accent">
        {tTrip("items")}
      </p>
      <h1 className="font-display mt-4 text-balance text-4xl text-foreground sm:text-5xl lg:text-6xl">
        {tTrip("title")}
      </h1>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_360px]">
        <ul className="space-y-5">
          <AnimatePresence initial={false}>
            {items.map((item) => {
              const service = services.find((s) => s.slug === item.serviceSlug);
              return (
                <motion.li
                  key={item.id}
                  layout
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="group relative flex gap-5 rounded-md border border-foreground/10 bg-card p-4 sm:p-6"
                >
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-sm sm:h-32 sm:w-32">
                    <Image
                      src={withBase(item.imageSnapshot)}
                      alt={item.titleSnapshot}
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/services/${item.serviceSlug}`}
                        className="font-display text-2xl text-foreground transition-colors hover:text-accent"
                      >
                        {item.titleSnapshot}
                      </Link>
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="text-foreground/40 transition-colors hover:text-red-400"
                        aria-label={tTrip("remove")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                      <label className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-1.5 text-foreground/70">
                        <Calendar className="h-3 w-3" aria-hidden="true" />
                        <span className="sr-only">{tTrip("startDate")}</span>
                        <input
                          type="date"
                          aria-label={tTrip("startDate")}
                          value={item.startDate ?? ""}
                          onChange={(e) =>
                            update(item.id, { startDate: e.target.value })
                          }
                          className="bg-transparent text-foreground outline-none"
                        />
                      </label>
                      <label className="inline-flex items-center gap-2 rounded-md border border-foreground/15 px-3 py-1.5 text-foreground/70">
                        <Users className="h-3 w-3" aria-hidden="true" />
                        <span className="sr-only">{tTrip("guests")}</span>
                        <input
                          type="number"
                          aria-label={tTrip("guests")}
                          min={1}
                          value={item.guests ?? 2}
                          onChange={(e) =>
                            update(item.id, {
                              guests: Math.max(1, +e.target.value),
                            })
                          }
                          className="w-12 bg-transparent text-foreground outline-none"
                        />
                      </label>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      {item.priceCents > 0 ? (
                        <p className="font-display text-2xl text-foreground">
                          {formatPrice(item.priceCents, locale)}
                          <span className="ml-2 text-xs uppercase tracking-[0.2em] text-foreground/50">
                            {service?.unitLabel?.[locale]}
                          </span>
                        </p>
                      ) : (
                        <p className="text-sm uppercase tracking-[0.2em] text-foreground/60">
                          {service?.unitLabel?.[locale]}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-md border border-foreground/10 bg-card p-5 sm:p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
              {tTrip("summary")}
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground/70">{tTrip("total")}</p>
                <p className="font-display text-2xl text-foreground">
                  {formatPrice(total, locale)}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-foreground/10 pt-3">
                <p className="text-sm text-foreground/70">{tTrip("deposit")}</p>
                <p className="font-display text-xl text-accent">
                  {formatPrice(deposit, locale)}
                </p>
              </div>
            </div>
            <PrimaryCtaLink href="/trip/checkout" className="mt-8 w-full">
              {tCta("checkout")}
            </PrimaryCtaLink>
            <p className="mt-4 text-xs leading-relaxed text-foreground/50">
              {tTrip("estimateNotice")}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
