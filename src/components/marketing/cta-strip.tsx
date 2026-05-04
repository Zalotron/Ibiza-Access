"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";

export function CtaStrip() {
  const t = useTranslations("home");
  const tCta = useTranslations("cta");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden py-32 sm:py-40"
    >
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=2400&q=85"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-black/45" />

      <div className="container-tight text-center">
        <h2 className="font-display mx-auto max-w-3xl text-balance text-4xl text-white text-shadow-photo sm:text-6xl">
          {t("ctaTitle")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-base text-white/90 text-shadow-photo sm:text-lg">
          {t("ctaSubtitle")}
        </p>
        <div className="mt-10 flex justify-center">
          <PrimaryCtaLink href="/services">{tCta("buildTrip")}</PrimaryCtaLink>
        </div>
      </div>
    </section>
  );
}
