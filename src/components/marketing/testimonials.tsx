"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function Testimonials({ locale }: { locale: Locale }) {
  const t = useTranslations("home");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    update();
    emblaApi.on("select", update);
    return () => {
      emblaApi.off("select", update);
    };
  }, [emblaApi]);

  return (
    <section className="container-tight py-24 sm:py-32">
      <div className="flex items-end justify-between gap-6">
        <p className="font-display max-w-3xl text-balance text-3xl text-foreground sm:text-5xl">
          {t("testimonialsEyebrow")}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            className="grid h-12 w-12 place-items-center rounded-md border border-foreground/15 text-foreground/70 transition-colors hover:border-accent hover:text-accent"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            className="grid h-12 w-12 place-items-center rounded-md border border-foreground/15 text-foreground/70 transition-colors hover:border-accent hover:text-accent"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-12 overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="min-w-0 flex-[0_0_100%] pr-6 sm:flex-[0_0_60%] lg:flex-[0_0_45%]"
            >
              <div className="flex h-full flex-col gap-8 rounded-md border border-foreground/5 bg-card p-8 sm:p-12">
                <Quote className="h-8 w-8 text-accent" aria-hidden="true" />
                <p className="font-display text-pretty text-2xl leading-snug text-foreground sm:text-3xl">
                  {testimonial.quote[locale]}
                </p>
                <div className="mt-auto flex items-center justify-between border-t border-foreground/10 pt-6">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                      {testimonial.origin[locale]}
                    </p>
                  </div>
                  <div className="text-accent">
                    {"★".repeat(testimonial.rating)}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => emblaApi?.scrollTo(idx)}
            className={cn(
              "h-1 rounded-sm transition-all",
              selectedIndex === idx
                ? "w-8 bg-accent"
                : "w-3 bg-foreground/20 hover:bg-foreground/40",
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
