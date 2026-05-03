"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Plus, Check, Sparkles } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Service } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { useTripStore, useIsInTrip } from "@/lib/store/trip-store";
import { formatPrice, cn } from "@/lib/utils";

export function ServiceDetail({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const tCta = useTranslations("cta");
  const tServices = useTranslations("services");
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.95]);

  const inTrip = useIsInTrip(service.slug);
  const add = useTripStore((s) => s.add);
  const remove = useTripStore((s) => s.remove);
  const items = useTripStore((s) => s.items);

  const handleToggle = () => {
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
    <article>
      <section
        ref={heroRef}
        className="relative isolate flex min-h-[80svh] items-end overflow-hidden"
      >
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={service.image}
            alt={service.title[locale]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/40 to-background"
        />

        <div className="container-tight pb-16 pt-32">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/80 transition-opacity hover:opacity-100"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            {tCta("back")}
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 max-w-4xl text-balance text-5xl leading-[1.05] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-7xl lg:text-8xl"
          >
            {service.title[locale]}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-6 max-w-2xl text-pretty text-base text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)] sm:text-lg"
          >
            {service.tagline[locale]}
          </motion.p>
        </div>
      </section>

      <section className="container-tight grid gap-16 py-24 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-3xl text-foreground">
            {tServices("whatsIncluded")}
          </h2>
          <ul className="mt-8 space-y-5">
            {service.highlights[locale].map((highlight, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4 border-b border-foreground/10 pb-5"
              >
                <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                <p className="text-base leading-relaxed text-foreground/90">
                  {highlight}
                </p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-16 grid gap-6 rounded-2xl border border-foreground/10 bg-card p-8">
            <p className="text-xs uppercase tracking-[0.28em] text-accent">
              {tServices("howCoordinate")}
            </p>
            <p className="text-base leading-relaxed text-foreground/80">
              {tServices("coordinationCopy")}
            </p>
          </div>
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-foreground/10 bg-card p-8">
            {service.basePriceCents > 0 ? (
              <>
                <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                  {tServices("from")}
                </p>
                <p className="font-display mt-2 text-5xl text-foreground">
                  {formatPrice(service.basePriceCents, locale)}
                </p>
                <p className="mt-1 text-sm text-foreground/60">
                  {service.unitLabel?.[locale]}
                </p>
                {service.durationLabel && (
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-foreground/50">
                    {service.durationLabel[locale]}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
                  {tServices("price")}
                </p>
                <p className="font-display mt-2 text-3xl text-foreground">
                  {service.unitLabel?.[locale]}
                </p>
              </>
            )}
            <Button
              type="button"
              onClick={handleToggle}
              variant={inTrip ? "outline" : "accent"}
              size="lg"
              className="mt-8 w-full"
            >
              {inTrip ? (
                <>
                  <Check className="h-4 w-4" />
                  {tServices("addedToTrip")}
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  {tCta("addToTrip")}
                </>
              )}
            </Button>
            {inTrip && (
              <Link
                href="/trip"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "default" }),
                  "mt-3 w-full",
                )}
              >
                {tCta("viewTrip")}
              </Link>
            )}
          </div>
        </aside>
      </section>
    </article>
  );
}
