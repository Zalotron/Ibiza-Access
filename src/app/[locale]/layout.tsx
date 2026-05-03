import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { LangEffect } from "@/components/motion/lang-effect";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "site" });
  const home = await getTranslations({ locale, namespace: "home" });
  const title = home("heroTitle");
  const description = t("description");

  return {
    title,
    description,
    alternates: buildAlternates(typedLocale),
    openGraph: buildOpenGraph({
      locale: typedLocale,
      title: `${title} — ${t("name")}`,
      description,
    }),
    twitter: buildTwitter({
      title: `${title} — ${t("name")}`,
      description,
    }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <LangEffect locale={locale} />
      <LenisProvider>
        <SiteHeader locale={locale as Locale} />
        <main id="main-content" className="relative">
          {children}
        </main>
        <SiteFooter locale={locale as Locale} />
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
