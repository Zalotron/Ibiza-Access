import { setRequestLocale, getTranslations } from "next-intl/server";
import { ServicesIndex } from "@/components/marketing/services-index";
import type { Locale } from "@/i18n/routing";
import {
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const typedLocale = locale as Locale;
  const title = t("title");
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: buildAlternates(typedLocale, "/services"),
    openGraph: buildOpenGraph({
      locale: typedLocale,
      pathname: "/services",
      title,
      description,
    }),
    twitter: buildTwitter({ title, description }),
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
