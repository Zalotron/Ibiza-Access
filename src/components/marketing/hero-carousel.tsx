"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDES = [
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 32 });
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    intervalRef.current = setInterval(() => emblaApi.scrollNext(), 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={t("heroTitle")}
      className="group relative isolate min-h-[100svh] overflow-hidden"
    >
      <div ref={emblaRef} className="absolute inset-0 -z-10 h-full">
        <div className="flex h-full">
          {SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${SLIDES.length}`}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/35 via-black/20 to-background" />

      <div className="container-tight flex min-h-[100svh] flex-col justify-end pb-28 pt-40 sm:pb-36">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-xs uppercase tracking-[0.32em] text-accent"
        >
          {t("heroEyebrow")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 max-w-4xl text-balance text-5xl leading-[1.05] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-7xl lg:text-8xl"
        >
          {t("heroTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-8 max-w-xl text-pretty text-base text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)] sm:text-lg"
        >
          {t("heroSubtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75 }}
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

      <button
        type="button"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
        className="absolute inset-y-0 left-0 z-20 flex w-20 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 sm:w-24 lg:w-28"
      >
        <ChevronLeft className="h-7 w-7" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
        className="absolute inset-y-0 right-0 z-20 flex w-20 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100 sm:w-24 lg:w-28"
      >
        <ChevronRight className="h-7 w-7" aria-hidden="true" />
      </button>

      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-sm transition-all",
              i === index
                ? "w-10 bg-accent"
                : "w-3 bg-white/40 hover:bg-white/70",
            )}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute right-6 bottom-6 z-10 hidden flex-col items-center gap-2 text-white/60 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.32em]">
          {t("scroll")}
        </span>
        <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
