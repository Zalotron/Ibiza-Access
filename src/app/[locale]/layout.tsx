import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { LenisProvider } from "@/components/motion/lenis-provider";
import { LangEffect } from "@/components/motion/lang-effect";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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
        <main className="relative">{children}</main>
        <SiteFooter locale={locale as Locale} />
      </LenisProvider>
    </NextIntlClientProvider>
  );
}
