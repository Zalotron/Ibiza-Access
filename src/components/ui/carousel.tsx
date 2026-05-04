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
import { cn, withBase } from "@/lib/utils";

export type CarouselSlide = {
  /** REQUIRED background image. */
  src: string;
  /** Alt text for the image. */
  alt: string;
  /** Optional decorative icon (rendered first, top of the stack). */
  icon?: ReactNode;
  /** Optional eyebrow text rendered above the title. */
  text?: string;
  /** Optional headline. Display serif, large. */
  title?: string;
  /** Optional body description below the title. */
  description?: string;
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
   * Static overlay content rendered on top of slides — not bound to slide changes.
   * Use for CTAs, scroll indicators, anything that should persist across rotations.
   */
  children?: ReactNode;
  /**
   * Optional gradient/overlay class for legibility on top of photos
   * (e.g. `bg-black/20`).
   */
  overlayClassName?: string;
  /**
   * Wrapper class for the per-slide content stack (icon/text/title/description).
   * Default positions it bottom-left inside container-tight.
   */
  contentClassName?: string;
  /** sizes attribute passed to next/image. Default "100vw". */
  sizes?: string;
  /**
   * Foreground parallax factor. Higher = foreground moves further than the
   * background image, giving a "closer to camera" feel. Applies to both the
   * horizontal swipe parallax and the vertical page-scroll parallax. Default 1.
   * Set to 0 to disable parallax.
   */
  parallaxFactor?: number;
};

/**
 * Brand carousel. Reusable. Includes:
 * - Embla horizontal scroll with autoplay
 * - Side buttons (slide in on hover with mask + blur)
 * - Pagination dots
 * - Per-slide overlay (icon → text → title → description) with TWO axis parallax:
 *     · X parallax bound to swipe progress (foreground travels further than the slide image)
 *     · Y parallax bound to page scroll position (foreground races ahead of the slide image vertically)
 *   Shadows on text/halos lag opposite to the motion direction (set via --parallax-x / --parallax-y CSS vars
 *   consumed by the global --text-shadow-photo / --shadow-photo tokens).
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
  contentClassName = "container-tight flex h-full flex-col justify-end pb-28 pt-40 sm:pb-36",
  sizes = "100vw",
  parallaxFactor = 1,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, duration: 32 });
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRefs = useRef<Array<HTMLDivElement | null>>([]);

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

  // Autoplay — pauses when the document is hidden (tab change) or the window
  // loses focus (alt-tab / dev tools / other window). Also resets the timer on
  // every slide change so a manual nav doesn't immediately get followed by an
  // auto-advance.
  useEffect(() => {
    if (!emblaApi || !autoplay) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const start = () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => emblaApi.scrollNext(), autoplayMs);
    };
    const stop = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    const isActive = () =>
      document.visibilityState === "visible" && document.hasFocus();

    const sync = () => (isActive() ? start() : stop());
    const onSelect = () => {
      if (isActive()) start();
    };
    const onPointerDown = () => stop();
    const onPointerUp = () => {
      if (isActive()) start();
    };

    sync();
    emblaApi.on("select", onSelect);
    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);
    document.addEventListener("visibilitychange", sync);
    window.addEventListener("focus", sync);
    window.addEventListener("blur", sync);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
      document.removeEventListener("visibilitychange", sync);
      window.removeEventListener("focus", sync);
      window.removeEventListener("blur", sync);
      stop();
    };
  }, [emblaApi, autoplay, autoplayMs]);

  // X parallax: on every Embla scroll frame, compute each slide's distance to the
  // active position and write CSS vars on its foreground wrapper. The transform
  // and the text-shadow read those vars so the foreground glides further than the
  // slide image, with the shadow lagging on the opposite side.
  useEffect(() => {
    if (!emblaApi || parallaxFactor === 0) return;

    const update = () => {
      const scrollProgress = emblaApi.scrollProgress();
      const snaps = emblaApi.scrollSnapList();
      // Read section width once per frame so shadow offsets stay proportional
      // to the carousel's actual size (consistent feel on any viewport).
      const sectionWidth =
        sectionRef.current?.offsetWidth ?? window.innerWidth;

      snaps.forEach((snap, i) => {
        let diff = snap - scrollProgress;
        if (loop) {
          if (diff > 0.5) diff -= 1;
          if (diff < -0.5) diff += 1;
        }
        const translateX = diff * parallaxFactor * 100; // %
        // Shadow lags opposite to motion. Multiplier is a fraction of the
        // section width so the visual offset is proportional across screen sizes.
        const shadowX = -diff * parallaxFactor * sectionWidth * 0.98; // px
        const node = parallaxRefs.current[i];
        if (node) {
          node.style.setProperty("--parallax-translate-x", `${translateX}%`);
          node.style.setProperty("--parallax-x", `${shadowX}px`);
        }
      });
    };

    emblaApi.on("scroll", update);
    emblaApi.on("reInit", update);
    update();

    return () => {
      emblaApi.off("scroll", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi, parallaxFactor, loop]);

  // Y parallax: drive a CSS var on the section root from the page scroll position.
  // The var cascades into every slide foreground (as it shares the same root).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || parallaxFactor === 0) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = vh / 2;
      const diffPx = sectionCenter - viewportCenter;
      const range = (vh + rect.height) / 2;
      const normalized = Math.max(-1, Math.min(1, diffPx / range));
      // translateY: when section is BELOW center (entering, normalized > 0),
      // foreground sits below its rest position and races up toward 0 as we scroll.
      const translateY = normalized * parallaxFactor * 12; // vh
      // shadowY: opposite direction. Multiplier is a fraction of the section
      // height so the visual offset stays proportional across screen sizes.
      const shadowY = -normalized * parallaxFactor * rect.height * 0.12; // px
      section.style.setProperty("--parallax-translate-y", `${translateY}vh`);
      section.style.setProperty("--parallax-y", `${shadowY}px`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [parallaxFactor]);

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={cn("relative isolate select-none overflow-hidden", className)}
    >
      <div ref={emblaRef} className="absolute inset-0 z-0 h-full">
        <div className="flex h-full">
          {slides.map((slide, i) => {
            const hasContent =
              slide.icon || slide.text || slide.title || slide.description;
            return (
              <div
                key={`${slide.src}-${i}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${slides.length}`}
                className="relative h-full min-w-0 flex-[0_0_100%]"
              >
                <Image
                  src={withBase(slide.src)}
                  alt={slide.alt}
                  fill
                  priority={priority && i === 0}
                  sizes={sizes}
                  className="object-cover"
                />

                {overlayClassName && (
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 z-[1]",
                      overlayClassName,
                    )}
                  />
                )}

                {hasContent && (
                  <div
                    ref={(el) => {
                      parallaxRefs.current[i] = el;
                    }}
                    className="pointer-events-none absolute inset-0 z-[2] will-change-transform"
                    style={{
                      transform:
                        "translate3d(var(--parallax-translate-x, 0%), var(--parallax-translate-y, 0%), 0)",
                    }}
                  >
                    <div className={cn("pointer-events-auto", contentClassName)}>
                      <div className="flex flex-col items-center">
                        {slide.icon && (
                          <div className="mb-4 text-accent text-shadow-photo">
                            {slide.icon}
                          </div>
                        )}
                        {slide.text && (
                          <p className="text-center text-xs font-semibold uppercase tracking-[0.32em] text-white text-shadow-photo">
                            {slide.text}
                          </p>
                        )}
                        {slide.title && (
                          <h2 className="font-serif mt-6 max-w-none text-center text-3xl uppercase leading-[1.1] tracking-tight text-white text-shadow-photo sm:text-5xl lg:text-6xl">
                            {slide.title.split("\n").map((line, li) => (
                              <span
                                key={li}
                                className="block whitespace-nowrap"
                              >
                                {line}
                              </span>
                            ))}
                          </h2>
                        )}
                        {slide.description && (
                          <p className="mt-8 max-w-xl text-pretty text-center text-base text-white/90 text-shadow-photo sm:text-lg">
                            {slide.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

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
                "h-1.5 rounded-sm shadow-photo transition-all duration-default ease-default",
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
