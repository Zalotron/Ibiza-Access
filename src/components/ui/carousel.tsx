"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CarouselSlide = {
  src: string;
  alt: string;
};

export type CarouselProps = {
  slides: CarouselSlide[];
  /** Auto-rotate slides. Disabled if user prefers reduced motion. Default true. */
  autoplay?: boolean;
  /** Interval between auto-rotations in ms. Default 5500. */
  autoplayMs?: number;
  /** Show prev/next side buttons (slide in on hover). Default true. */
  showArrows?: boolean;
  /** Show pagination dots. Default true. */
  showDots?: boolean;
  /** Mark first slide image as `priority` for next/image. Default true. */
  priority?: boolean;
  /** Loop infinitely. Default true. */
  loop?: boolean;
  /** ARIA label for the carousel landmark. */
  ariaLabel?: string;
  /** Extra classes for the outer <section>. */
  className?: string;
  /**
   * Optional overlay content rendered absolutely on top of the slides
   * (e.g. a hero headline + CTAs). Stacks above the gradient overlay.
   */
  children?: ReactNode;
  /**
   * Optional gradient overlay class (e.g. `bg-gradient-to-b from-black/35 via-black/20 to-background`).
   * Use for hero-style readability on top of photos. Leave undefined for clean image-only carousels.
   */
  overlayClassName?: string;
  /** sizes attribute passed to next/image. Default "100vw". */
  sizes?: string;
};

/**
 * Brand carousel. Reusable. All visual decisions (side button slide+blur+mask,
 * dot styling, motion timing, autoplay defaults) live here. Instances only
 * pass slides + optional overlay children.
 */
export function Carousel({
  slides,
  autoplay = true,
  autoplayMs = 5500,
  showArrows = true,
  showDots = true,
  priority = true,
  loop = true,
  ariaLabel,
  className,
  children,
  overlayClassName,
  sizes = "100vw",
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, duration: 32 });
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
    if (!emblaApi || !autoplay) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    intervalRef.current = setInterval(() => emblaApi.scrollNext(), autoplayMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [emblaApi, autoplay, autoplayMs]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={cn("relative isolate overflow-hidden", className)}
    >
      <div ref={emblaRef} className="absolute inset-0 -z-10 h-full">
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div
              key={`${slide.src}-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
              className="relative h-full min-w-0 flex-[0_0_100%]"
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={priority && i === 0}
                sizes={sizes}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {overlayClassName && (
        <div
          className={cn("pointer-events-none absolute inset-0 -z-10", overlayClassName)}
        />
      )}

      {children}

      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label="Previous slide"
            className="group/prev absolute inset-y-0 left-0 z-20 w-64 sm:w-[22rem] lg:w-[28rem]"
          >
            <div className="absolute inset-0 -translate-x-full transition-transform duration-default ease-default group-hover/prev:translate-x-0 group-focus-visible/prev:translate-x-0">
              <div className="absolute inset-0 backdrop-blur-md [-webkit-mask-image:linear-gradient(to_right,black_0%,black_25%,transparent_100%)] [mask-image:linear-gradient(to_right,black_0%,black_25%,transparent_100%)]" />
              <div className="relative flex h-full items-center justify-start pl-6 text-white text-shadow-photo sm:pl-8 lg:pl-10">
                <ChevronLeft className="h-12 w-12" aria-hidden="true" />
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label="Next slide"
            className="group/next absolute inset-y-0 right-0 z-20 w-64 sm:w-[22rem] lg:w-[28rem]"
          >
            <div className="absolute inset-0 translate-x-full transition-transform duration-default ease-default group-hover/next:translate-x-0 group-focus-visible/next:translate-x-0">
              <div className="absolute inset-0 backdrop-blur-md [-webkit-mask-image:linear-gradient(to_left,black_0%,black_25%,transparent_100%)] [mask-image:linear-gradient(to_left,black_0%,black_25%,transparent_100%)]" />
              <div className="relative flex h-full items-center justify-end pr-6 text-white text-shadow-photo sm:pr-8 lg:pr-10">
                <ChevronRight className="h-12 w-12" aria-hidden="true" />
              </div>
            </div>
          </button>
        </>
      )}

      {showDots && slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-sm transition-all duration-default ease-default",
                i === index
                  ? "w-10 bg-accent"
                  : "w-3 bg-white/40 hover:bg-white/70",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
