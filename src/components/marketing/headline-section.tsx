"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

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
      className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      <div className="container-tight grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-muted">
            <motion.div style={{ y: imgY }} className="absolute -inset-y-10 inset-x-0">
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
        </motion.div>

        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-[0.32em] text-accent"
          >
            {t("headlineEyebrow")}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display mt-5 text-balance text-4xl leading-[1.05] text-foreground sm:text-5xl lg:text-6xl"
          >
            {t("headlineTitleLead")}{" "}
            <span className="italic text-accent">{t("headlineTitleAccent")}</span>{" "}
            {t("headlineTitleConnector")}
            <br className="hidden sm:block" />
            {t("headlineTitleSecond")}{" "}
            <span className="italic text-accent">{t("headlineTitleAccent2")}</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 space-y-5 text-base leading-relaxed text-foreground/75 sm:text-lg"
          >
            <p>{t("headlineParagraph1")}</p>
            <p>{t("headlineParagraph2")}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10"
          >
            <Link
              href="/services"
              className={`${buttonVariants({ variant: "accent", size: "lg" })} group`}
            >
              {t("headlineCta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
