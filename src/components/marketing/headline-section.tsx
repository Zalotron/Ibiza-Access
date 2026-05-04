"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { PrimaryCtaLink } from "@/components/ui/primary-cta";
import { ScrollFade } from "@/components/motion/scroll-fade";
import { SplitText } from "@/components/motion/split-text";

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
      <div className="container-tight grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <ScrollFade className="relative h-full min-h-[60vh] overflow-hidden rounded-md bg-muted lg:min-h-0">
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
          </ScrollFade>
          <div className="absolute -inset-x-4 -bottom-4 -z-10 h-2/3 rounded-md bg-accent/15 blur-3xl" />
        </div>

        <div className="lg:col-span-7">
          <SplitText
            as="p"
            className="text-xs uppercase tracking-[0.32em] text-accent"
          >
            {t("headlineEyebrow")}
          </SplitText>

          <h2 className="font-serif mt-5 text-balance text-3xl leading-[1.1] text-foreground sm:text-4xl lg:text-5xl lg:text-pretty">
            <SplitText as="span" className="block lg:whitespace-nowrap">
              {t("headlineTitleLead")}{" "}
              <SplitText className="italic text-accent">
                {t("headlineTitleAccent")}
              </SplitText>{" "}
              {t("headlineTitleConnector")}
            </SplitText>
            <SplitText as="span" className="block lg:whitespace-nowrap">
              {t("headlineTitleSecond")}{" "}
              <SplitText className="italic text-accent">
                {t("headlineTitleAccent2")}
              </SplitText>
            </SplitText>
          </h2>

          <div className="mt-10 space-y-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
            <SplitText as="p">{t("headlineParagraph1")}</SplitText>
            <SplitText as="p">
              {t("headlineParagraph2")}{" "}
              <SplitText as="em" className="italic text-foreground">
                {t("headlineTagline")}
              </SplitText>
            </SplitText>
          </div>

          <ScrollFade className="mt-10 inline-block max-w-full">
            <PrimaryCtaLink
              href="/#services"
              className="h-auto min-h-14 max-w-full whitespace-normal text-balance px-5 py-3 sm:h-14 sm:whitespace-nowrap sm:px-8 sm:py-0"
            >
              {t("headlineCta")}
            </PrimaryCtaLink>
          </ScrollFade>
        </div>
      </div>
    </section>
  );
}
