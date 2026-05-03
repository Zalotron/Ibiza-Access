import { setRequestLocale, getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  const title = t("title");
  const description = t("title");
  return {
    title,
    description,
    alternates: buildAlternates(locale as Locale, "/contact"),
    openGraph: buildOpenGraph({
      locale: locale as Locale,
      pathname: "/contact",
      title,
      description,
    }),
    twitter: buildTwitter({ title, description }),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  const entries: Array<{
    icon: typeof Phone;
    label: string;
    value: string;
    href?: string;
  }> = [
    {
      icon: Phone,
      label: t("phone"),
      value: "+34 666 812 575",
      href: "tel:+34666812575",
    },
    {
      icon: Mail,
      label: t("email"),
      value: "hello@ibizaaccess.com",
      href: "mailto:hello@ibizaaccess.com",
    },
    {
      icon: MapPin,
      label: t("office"),
      value: "Eivissa, Illes Balears",
    },
  ];

  return (
    <article className="container-tight pt-40 pb-32">
      <p className="text-xs uppercase tracking-[0.32em] text-accent">
        {t("eyebrow")}
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-balance text-5xl text-foreground sm:text-7xl">
        {t("title")}
      </h1>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {entries.map((entry) => (
          <a
            key={entry.label}
            href={entry.href ?? "#"}
            className="group rounded-2xl border border-foreground/10 bg-card p-8 transition-colors hover:border-accent"
          >
            <entry.icon className="h-6 w-6 text-accent" />
            <p className="mt-6 text-xs uppercase tracking-[0.28em] text-foreground/50">
              {entry.label}
            </p>
            <p className="font-display mt-2 text-2xl text-foreground transition-colors group-hover:text-accent">
              {entry.value}
            </p>
          </a>
        ))}
      </div>
    </article>
  );
}
