"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing, localeNames, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const t = useTranslations("footer");
  const current = (params?.locale as Locale) ?? routing.defaultLocale;

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em]",
        className,
      )}
    >
      {routing.locales.map((locale, idx) => (
        <span key={locale} className="flex items-center gap-1">
          {idx > 0 && (
            <span aria-hidden="true" className="text-foreground/30">
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale })}
            className={cn(
              "rounded-full px-1 transition-colors",
              current === locale
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground",
            )}
            aria-current={current === locale ? "true" : undefined}
            aria-label={localeNames[locale]}
            lang={locale}
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
