"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display mx-auto max-w-3xl text-balance text-4xl text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)] sm:text-6xl"
        >
          {t("ctaTitle")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mx-auto mt-6 max-w-xl text-pretty text-base text-white/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.4)] sm:text-lg"
        >
          {t("ctaSubtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/services"
            className={`${buttonVariants({ variant: "accent", size: "lg" })} group`}
          >
            {tCta("buildTrip")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
