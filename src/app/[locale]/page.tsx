import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/marketing/hero";
import { ServicesPreview } from "@/components/marketing/services-preview";
import { ProcessSection } from "@/components/marketing/process-section";
import { Testimonials } from "@/components/marketing/testimonials";
import { CtaStrip } from "@/components/marketing/cta-strip";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const typedLocale = locale as Locale;

  return (
    <>
      <Hero />
      <ServicesPreview locale={typedLocale} />
      <ProcessSection />
      <Testimonials locale={typedLocale} />
      <CtaStrip />
    </>
  );
}
