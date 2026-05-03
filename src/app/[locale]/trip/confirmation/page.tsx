import { setRequestLocale } from "next-intl/server";
import { Confirmation } from "@/components/trip/confirmation";
import type { Locale } from "@/i18n/routing";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Confirmation locale={locale as Locale} />;
}
