"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";

export function HeadlineSection() {
  const t = useTranslations("home");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
    >
      <div className="container-tight grid items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <div className="relative h-full min-h-[60vh] overflow-hidden rounded-md bg-muted lg:min-h-0">
            <motion.div
              style={{ y: imgY }}
              className="absolute -inset-y-12 inset-x-0"
            >
              <Image
                src="https://ibiza-access.com/wp-content/uploads/2025/04/photo-home-page-new-.jpg"
                alt="Ibiza Access concierge experience"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          <div className="absolute -inset-x-4 -bottom-4 -z-10 h-2/3 rounded-md bg-accent/15 blur-3xl" />
        </div>

        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.32em] text-accent">
            {t("headlineEyebrow")}
          </p>

          <h2 className="font-serif mt-5 text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl">
            <span className="block whitespace-nowrap">
              {t("headlineTitleLead")}{" "}
              <span className="italic text-accent">
                {t("headlineTitleAccent")}
              </span>{" "}
              {t("headlineTitleConnector")}
            </span>
            <span className="block whitespace-nowrap">
              {t("headlineTitleSecond")}{" "}
              <span className="italic text-accent">
                {t("headlineTitleAccent2")}
              </span>
            </span>
          </h2>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
            <p>{t("headlineParagraph1")}</p>
            <p>
              {t("headlineParagraph2")}{" "}
              <em className="italic text-foreground">{t("headlineTagline")}</em>
            </p>
          </div>

          <div className="mt-10">
            <PrimaryCtaLink href="/#services">{t("headlineCta")}</PrimaryCtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
