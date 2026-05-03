"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServiceCard } from "./service-card";
import { services } from "@/lib/data/services";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";

const FEATURED = [
  "villas",
  "boats-yachts",
  "private-jet",
  "luxury-cars",
  "private-chefs",
  "vip-tables",
  "private-parties",
  "wellness",
];

export function ServicesPreview({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const tCta = useTranslations("cta");
  const featured = FEATURED.map((slug) =>
    services.find((s) => s.slug === slug),
  ).filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <section className="container-tight relative py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.32em] text-accent"
          >
            {t("servicesEyebrow")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-4 text-4xl text-balance text-foreground sm:text-5xl lg:text-6xl"
          >
            {t("servicesTitle")}
          </motion.h2>
        </div>
        <Link
          href="/services"
          className={`${buttonVariants({ variant: "outline" })} group`}
        >
          {tCta("viewServices")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((service, idx) => (
          <ServiceCard
            key={service.slug}
            service={service}
            locale={locale}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
}
