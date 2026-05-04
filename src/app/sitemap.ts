import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { services } from "@/lib/data/services";

export const dynamic = "force-static";

const ROOT = "https://zalotron.github.io/Ibiza-Access";

const STATIC_PATHS = [
  "",
  "/trip",
  "/about",
  "/blog",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = routing.locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${ROOT}/${locale}${path}/`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${ROOT}/${l}${path}/`]),
        ),
      },
    })),
  );

  const serviceEntries = routing.locales.flatMap((locale) =>
    services.map((s) => ({
      url: `${ROOT}/${locale}/services/${s.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${ROOT}/${l}/services/${s.slug}/`,
          ]),
        ),
      },
    })),
  );

  return [...staticEntries, ...serviceEntries];
}
