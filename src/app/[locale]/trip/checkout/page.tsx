import { setRequestLocale } from "next-intl/server";
import { CheckoutForm } from "@/components/trip/checkout-form";
import type { Locale } from "@/i18n/routing";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CheckoutForm locale={locale as Locale} />;
}
