import { setRequestLocale } from "next-intl/server";
import { TripCart } from "@/components/trip/trip-cart";
import type { Locale } from "@/i18n/routing";

export default async function TripPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <TripCart locale={locale as Locale} />;
}
