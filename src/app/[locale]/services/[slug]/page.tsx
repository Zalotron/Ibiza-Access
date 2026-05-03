import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { services, getService } from "@/lib/data/services";
import { getServiceItems } from "@/lib/data/service-items";
import { ServiceDetail } from "@/components/marketing/service-detail";
import { ServiceItemsGrid } from "@/components/marketing/service-items-grid";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";
import {
  SITE_URL,
  SITE_NAME,
  buildAlternates,
  buildOpenGraph,
  buildTwitter,
} from "@/lib/seo";
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
  const title = service.title[typedLocale];
  const description = service.tagline[typedLocale];
  const pathname = `/services/${slug}`;

  return {
    title,
    description,
    alternates: buildAlternates(typedLocale, pathname),
    openGraph: buildOpenGraph({
      locale: typedLocale,
      pathname,
      title,
      description,
      image: service.image,
    }),
    twitter: buildTwitter({ title, description, image: service.image }),
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
  const typedLocale = locale as Locale;
  const items = getServiceItems(slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title[typedLocale],
    description: service.tagline[typedLocale],
    image: service.image,
    provider: {
      "@type": "TravelAgency",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Place",
      name: "Ibiza",
    },
    ...(service.basePriceCents > 0 && {
      offers: {
        "@type": "Offer",
        price: (service.basePriceCents / 100).toFixed(2),
        priceCurrency: service.currency,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/${locale}/services/${slug}/`,
      },
    }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/${locale}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/${locale}/services/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title[typedLocale],
        item: `${SITE_URL}/${locale}/services/${slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ServiceDetail service={service} locale={typedLocale} />
      <ServiceItemsGrid items={items} serviceSlug={slug} locale={typedLocale} />
    </>
  );
}
