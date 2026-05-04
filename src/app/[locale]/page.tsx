import { setRequestLocale } from "next-intl/server";
import { HeroCarousel } from "@/components/marketing/hero-carousel";
import { HeadlineSection } from "@/components/marketing/headline-section";
import { SectionDivider } from "@/components/marketing/section-divider";
import { ServicesIndex } from "@/components/marketing/services-index";
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
      <SectionDivider />
      <section id="services" className="scroll-mt-20">
        <ServicesIndex locale={typedLocale} />
      </section>
    </>
  );
}
