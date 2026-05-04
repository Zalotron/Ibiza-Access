"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ServiceCard } from "./service-card";
import { services } from "@/lib/data/services";
import { useTripStore } from "@/lib/store/trip-store";
import { ScrollFade } from "@/components/motion/scroll-fade";
import { SplitText } from "@/components/motion/split-text";
import type { Locale } from "@/i18n/routing";

export function ServicesIndex({ locale }: { locale: Locale }) {
  const t = useTranslations("services");
  const trip = useTripStore((s) => s.items);

  return (
    <div className="container-tight py-10 sm:py-14">
      <SplitText
        as="h2"
        className="font-serif max-w-3xl text-balance text-4xl italic text-accent [text-shadow:0_2px_14px_rgba(0,0,0,0.18)] sm:text-5xl lg:text-6xl"
      >
        {t("title")}
      </SplitText>
      <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
        <SplitText as="p">{t("intro1")}</SplitText>
        <SplitText as="p">{t("intro2")}</SplitText>
        <SplitText as="p">{t("intro3")}</SplitText>
        <SplitText as="p">
          {t("intro4")}{" "}
          <SplitText as="em" className="italic text-foreground">
            {t("tagline")}
          </SplitText>
        </SplitText>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((service) => {
          const used = trip.some((i) => i.serviceSlug === service.slug);
          return (
            <ScrollFade key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md"
              >
                <ServiceCard
                  img={service.image}
                  titulo={service.title[locale]}
                  descripcion={service.tagline[locale]}
                  used={used}
                />
              </Link>
            </ScrollFade>
          );
        })}
      </div>
    </div>
  );
}
