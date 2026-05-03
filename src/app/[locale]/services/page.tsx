import { setRequestLocale, getTranslations } from "next-intl/server";
import { ServicesIndex } from "@/components/marketing/services-index";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ServicesListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesIndex locale={locale as Locale} />;
}
