import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es", "de", "fr", "it"] as const,
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  es: "ES",
  de: "DE",
  fr: "FR",
  it: "IT",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};
