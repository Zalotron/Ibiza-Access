"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowDown } from "lucide-react";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { Carousel, type CarouselSlide } from "@/components/ui/carousel";

export function HeroCarousel() {
  const t = useTranslations("home");
  const tCta = useTranslations("cta");

  const slides: CarouselSlide[] = [
    {
      src: "/hero/villas.jpg",
      alt: "Luxury villa in Ibiza",
      text: t("slideVillasEyebrow"),
      title: t("slideVillasTitle"),
    },
    {
      src: "/hero/es-vedra.jpg",
      alt: "Es Vedrà, Ibiza coastline",
      text: t("slideConciergeEyebrow"),
      title: t("slideConciergeTitle"),
    },
    {
      src: "/hero/yachts.jpg",
      alt: "Yacht charter at sea",
      text: t("slideYachtsEyebrow"),
      title: t("slideYachtsTitle"),
    },
    {
      src: "/hero/parties.jpg",
      alt: "Private villa party",
      text: t("slidePartiesEyebrow"),
      title: t("slidePartiesTitle"),
    },
  ];

  return (
    <Carousel
      slides={slides}
      ariaLabel={t("heroTitle")}
      className="min-h-[100svh] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)]"
      overlayClassName="bg-black/20"
      contentClassName="container-tight flex h-full min-h-[100svh] flex-col justify-center pt-20"
    >
      {/* Static row of CTAs anchored just below the slide-bound description.
          Foreground Y-parallax so they share depth with the titles instead of
          sitting flush with the background image. */}
      <div
        className="container-tight pointer-events-none absolute inset-x-0 bottom-28 z-10 will-change-transform sm:bottom-36"
        style={{
          transform: "translate3d(0, var(--parallax-translate-y, 0%), 0)",
        }}
      >
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3">
          <PrimaryCtaLink
            href="/#services"
            className="shadow-[var(--parallax-x,0px)_var(--parallax-y,0px)_28px_rgba(0,0,0,0.45)] transition-[background-color,color,scale,filter] duration-cta ease-cta"
          >
            {tCta("buildTrip")}
          </PrimaryCtaLink>
          <Link
            href="/#services"
            className="inline-flex h-14 items-center gap-2 rounded-md border border-white/40 bg-black/50 px-8 text-base font-medium text-white shadow-[var(--parallax-x,0px)_var(--parallax-y,0px)_28px_rgba(0,0,0,0.45)] backdrop-blur-md transition-[background-color,color] duration-default ease-default hover:bg-white hover:text-foreground"
          >
            {tCta("viewServices")}
          </Link>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 bottom-6 z-10 hidden flex-col items-center gap-2 text-white/70 text-shadow-photo sm:flex">
        <span className="text-[10px] uppercase tracking-[0.32em]">
          {t("scroll")}
        </span>
        <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden="true" />
      </div>
    </Carousel>
  );
}
