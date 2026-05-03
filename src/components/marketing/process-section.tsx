"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";

const STEP_IMAGES = [
  "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1531256456869-ce942a665e80?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1517394834181-95ed159986c7?auto=format&fit=crop&w=1200&q=85",
];

export function ProcessSection() {
  const t = useTranslations("home");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  const steps = [
    { number: "01", title: t("processStep1Title"), body: t("processStep1Body") },
    { number: "02", title: t("processStep2Title"), body: t("processStep2Body") },
    { number: "03", title: t("processStep3Title"), body: t("processStep3Body") },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-foreground/5 bg-card py-24 sm:py-32"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -inset-y-32 inset-x-0 -z-10 opacity-[0.08]"
      >
        <Image
          src="https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?auto=format&fit=crop&w=2400&q=80"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="container-tight">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.32em] text-accent"
        >
          {t("processEyebrow")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display mt-4 max-w-2xl text-balance text-4xl text-foreground sm:text-5xl"
        >
          {t("processTitle")}
        </motion.h2>

        <div className="mt-20 grid gap-12 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
                <Image
                  src={STEP_IMAGES[i]}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="font-display absolute right-4 top-4 text-7xl text-accent/80">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display mt-6 text-2xl text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
