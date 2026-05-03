"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

export function Hero() {
  const t = useTranslations("home");
  const tCta = useTranslations("cta");
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2400&q=85"
          alt="Ibiza coastline at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/30 via-background/50 to-background"
      />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-tight pb-24 pt-40 sm:pb-32"
      >
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
          className="font-display mt-6 max-w-4xl text-balance text-5xl leading-[1.05] text-foreground sm:text-7xl lg:text-8xl"
        >
          {t("heroTitle")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="mt-8 max-w-xl text-pretty text-base text-foreground/75 sm:text-lg"
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
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            {tCta("viewServices")}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 text-foreground/50">
          <span className="text-[10px] uppercase tracking-[0.32em]">{t("scroll")}</span>
          <ArrowDown className="h-3 w-3 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
