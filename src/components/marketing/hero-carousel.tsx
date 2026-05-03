"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Carousel, type CarouselSlide } from "@/components/ui/carousel";
import { MOTION_CURVE, MOTION_DURATION_S } from "@/lib/motion";

const HERO_SLIDES: CarouselSlide[] = [
  {
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=85",
    alt: "Ibiza coastline at golden hour",
  },
  {
    src: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=2400&q=85",
    alt: "Private villa with infinity pool",
  },
  {
    src: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&w=2400&q=85",
    alt: "Luxury yacht at sea",
  },
  {
    src: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=2400&q=85",
    alt: "Ibiza nightlife scene",
  },
];

export function HeroCarousel() {
  const t = useTranslations("home");
  const tCta = useTranslations("cta");

  return (
    <Carousel
      slides={HERO_SLIDES}
      ariaLabel={t("heroTitle")}
      className="min-h-[100svh]"
      overlayClassName="bg-gradient-to-b from-black/35 via-black/20 to-background"
    >
      <div className="container-tight flex min-h-[100svh] flex-col justify-end pb-28 pt-40 sm:pb-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION_S, ease: MOTION_CURVE, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.32em] text-accent text-shadow-photo"
        >
          {t("heroEyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION_S * 3, delay: 0.25, ease: MOTION_CURVE }}
          className="font-display mt-6 max-w-4xl text-balance text-5xl leading-[1.05] text-white text-shadow-photo sm:text-7xl lg:text-8xl"
        >
          {t("heroTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION_S * 3, ease: MOTION_CURVE, delay: 0.55 }}
          className="mt-8 max-w-xl text-pretty text-base text-white/90 text-shadow-photo sm:text-lg"
        >
          {t("heroSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: MOTION_DURATION_S * 3, ease: MOTION_CURVE, delay: 0.75 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/services"
            className={`${buttonVariants({ variant: "accent", size: "lg" })} group`}
          >
            {tCta("buildTrip")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/services"
            className="inline-flex h-14 items-center gap-2 rounded-md border border-white/40 bg-black/50 px-8 text-base font-medium text-white backdrop-blur-md transition-all hover:bg-white hover:text-foreground"
          >
            {tCta("viewServices")}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: MOTION_DURATION_S * 3 }}
        className="pointer-events-none absolute right-6 bottom-6 z-10 hidden flex-col items-center gap-2 text-white/70 text-shadow-photo sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.32em]">
          {t("scroll")}
        </span>
        <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden="true" />
      </motion.div>
    </Carousel>
  );
}
