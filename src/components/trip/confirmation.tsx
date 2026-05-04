"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Check, ArrowRight } from "lucide-react";
import { tripService } from "@/lib/services/trip-service";
import type { Inquiry } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

function ConfirmationInner({ locale }: { locale: Locale }) {
  const t = useTranslations("confirmation");
  const tCta = useTranslations("cta");
  const params = useSearchParams();
  const id = params.get("id");
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    tripService.getInquiry(id).then((res) => {
      setInquiry(res);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="container-tight pt-40 pb-32">
        <div className="h-12 w-2/3 animate-pulse rounded bg-foreground/5" />
      </div>
    );
  }

  return (
    <div className="container-tight pt-40 pb-32 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent text-accent-foreground">
        <Check className="h-10 w-10" />
      </div>
      <h1 className="font-display mt-10 text-balance text-4xl text-foreground sm:text-5xl lg:text-7xl">
        {t("title")}
      </h1>
      <p className="mx-auto mt-6 max-w-md text-pretty text-foreground/80">
        {t("subtitle")}
      </p>

      {inquiry && (
        <div className="mx-auto mt-12 max-w-md rounded-md border border-foreground/10 bg-card p-5 text-left sm:p-8">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
              {t("reference")}
            </p>
            <p className="font-mono text-sm text-foreground">{inquiry.id}</p>
          </div>
          <ul className="mt-6 space-y-3 border-t border-foreground/10 pt-6">
            {inquiry.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="truncate text-foreground/90">
                  {item.titleSnapshot}
                </span>
                {item.priceCents > 0 && (
                  <span className="flex-shrink-0 text-foreground/60">
                    {formatPrice(item.priceCents, locale)}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-foreground/10 pt-6">
            <span className="text-sm text-foreground/60">
              {t("estimatedTotal")}
            </span>
            <span className="font-display text-2xl text-foreground">
              {formatPrice(inquiry.totalCents, locale)}
            </span>
          </div>
        </div>
      )}

      <div className="mt-12">
        <Link
          href="/"
          className={`${buttonVariants({ variant: "outline" })} group`}
        >
          {tCta("back")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}

export function Confirmation({ locale }: { locale: Locale }) {
  return (
    <Suspense
      fallback={
        <div className="container-tight pt-40 pb-32">
          <div className="h-12 w-2/3 animate-pulse rounded bg-foreground/5" />
        </div>
      }
    >
      <ConfirmationInner locale={locale} />
    </Suspense>
  );
}
