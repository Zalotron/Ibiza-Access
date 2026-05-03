import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://zalotron.github.io/Ibiza-Access";
export const SITE_NAME = "Ibiza Access";

const OG_LOCALES: Record<Locale, string> = {
  en: "en_GB",
  es: "es_ES",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
};

export function buildCanonical(locale: Locale, pathname = "") {
  const clean = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${SITE_URL}/${locale}${pathname ? clean : "/"}`;
}

export function buildAlternates(
  locale: Locale,
  pathname = "",
): Metadata["alternates"] {
  const path = pathname ? (pathname.startsWith("/") ? pathname : `/${pathname}`) : "";
  const url = (l: Locale) => {
    const tail = path ? `${path}${path.endsWith("/") ? "" : "/"}` : "/";
    return `${SITE_URL}/${l}${tail}`;
  };
  return {
    canonical: url(locale),
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, url(l)])),
      "x-default": url("en"),
    },
  };
}

export function buildOpenGraph({
  locale,
  pathname = "",
  title,
  description,
  image,
}: {
  locale: Locale;
  pathname?: string;
  title: string;
  description: string;
  image?: string;
}): Metadata["openGraph"] {
  const ogImage = image ?? `${SITE_URL}/og.jpg`;
  return {
    type: "website",
    siteName: SITE_NAME,
    url: buildCanonical(locale, pathname),
    locale: OG_LOCALES[locale],
    alternateLocale: routing.locales
      .filter((l) => l !== locale)
      .map((l) => OG_LOCALES[l]),
    title,
    description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };
}

export function buildTwitter({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [image ?? `${SITE_URL}/og.jpg`],
  };
}

export const SEO_KEYWORDS = [
  "Ibiza luxury concierge",
  "Ibiza villas",
  "private yacht Ibiza",
  "Ibiza VIP tables",
  "private chef Ibiza",
  "private jet Ibiza",
  "Ibiza tailored holidays",
  "luxury Ibiza experiences",
  "concierge Ibiza español",
  "Ibiza luxus konzierge",
  "conciergerie Ibiza",
  "concierge Ibiza italiano",
];
