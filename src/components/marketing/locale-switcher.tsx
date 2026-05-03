"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const current = (params?.locale as Locale) ?? routing.defaultLocale;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-xs uppercase tracking-[0.2em]",
        className,
      )}
    >
      {routing.locales.map((locale, idx) => (
        <span key={locale} className="flex items-center gap-1">
          {idx > 0 && <span className="text-foreground/30">·</span>}
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
          >
            {locale}
          </button>
        </span>
      ))}
    </div>
  );
}
