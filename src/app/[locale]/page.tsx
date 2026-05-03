import { setRequestLocale } from "next-intl/server";
import { HeroCarousel } from "@/components/marketing/hero-carousel";
import { HeadlineSection } from "@/components/marketing/headline-section";
import { ServicesPreview } from "@/components/marketing/services-preview";
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
      <HeroCarousel />
      <HeadlineSection />
      <ServicesPreview locale={typedLocale} />
      <Testimonials locale={typedLocale} />
      <CtaStrip />
    </>
  );
}
