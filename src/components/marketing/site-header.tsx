"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { LocaleSwitcher } from "./locale-switcher";
import { TripBadge } from "./trip-badge";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export function SiteHeader({ locale: _locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/services", label: t("services") },
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 backdrop-blur-md",
        scrolled
          ? "border-b border-foreground/5 bg-background/85 backdrop-blur-xl"
          : "border-b border-foreground/0 bg-black/50",
      )}
    >
      <div className="container-tight flex h-20 items-center justify-between">
        <Link href="/" aria-label="Ibiza Access" className="flex shrink-0 items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ibiza-access.com/wp-content/uploads/2025/06/Ibiza-access-aa.png"
            alt=""
            className="h-10 w-auto sm:h-12"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ibiza-access.com/wp-content/uploads/2025/04/ibiza-access-logo_dark-2025--141x68.png"
            alt="Ibiza Access"
            width={141}
            height={68}
            className="hidden h-10 w-auto sm:block sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <LocaleSwitcher className="hidden sm:inline-flex" />
          <TripBadge />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-foreground/20 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border-t border-foreground/10 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="container-tight flex flex-col gap-1 py-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display py-3 text-2xl text-foreground/90"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center justify-between">
                <LocaleSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
