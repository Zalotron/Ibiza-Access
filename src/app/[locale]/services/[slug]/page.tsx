import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { services, getService } from "@/lib/data/services";
import { ServiceDetail } from "@/components/marketing/service-detail";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import type { Metadata } from "next";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const typedLocale = locale as Locale;
  return {
    title: service.title[typedLocale],
    description: service.tagline[typedLocale],
    openGraph: {
      title: service.title[typedLocale],
      description: service.tagline[typedLocale],
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = getService(slug);
  if (!service) notFound();
  return <ServiceDetail service={service} locale={locale as Locale} />;
}
