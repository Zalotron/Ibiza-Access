"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import type { Service } from "@/lib/types";
import type { Locale } from "@/i18n/routing";

export function ServiceDetail({
  service,
  locale,
}: {
  service: Service;
  locale: Locale;
}) {
  const tCta = useTranslations("cta");
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0.95]);

  return (
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
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-white/80 text-shadow-photo transition-opacity hover:opacity-100"
        >
          <ArrowLeft className="h-3 w-3" aria-hidden="true" />
          {tCta("back")}
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display mt-6 max-w-4xl text-balance text-5xl leading-[1.05] text-white text-shadow-photo sm:text-7xl lg:text-8xl"
        >
          {service.title[locale]}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-6 max-w-2xl text-pretty text-base text-white/90 text-shadow-photo sm:text-lg"
        >
          {service.tagline[locale]}
        </motion.p>
      </div>
    </section>
  );
}
