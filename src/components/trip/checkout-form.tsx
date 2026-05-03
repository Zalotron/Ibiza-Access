"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { Input, Textarea, Label } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTripStore, useTripTotal, useTripDeposit } from "@/lib/store/trip-store";
import { tripService } from "@/lib/services/trip-service";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import type { Locale } from "@/i18n/routing";

const schema = z.object({
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function CheckoutForm({ locale }: { locale: Locale }) {
  const t = useTranslations("checkout");
  const tCta = useTranslations("cta");
  const router = useRouter();
  const items = useTripStore((s) => s.items);
  const clear = useTripStore((s) => s.clear);
  const total = useTripTotal();
  const deposit = useTripDeposit();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { contactName: "", email: "", phone: "", notes: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    const { inquiryId } = await tripService.submitInquiry({
      ...data,
      locale,
      items,
      totalCents: total,
      depositCents: deposit,
    });

    const { url } = await tripService.startDepositCheckout(inquiryId);
    clear();

    if (url.startsWith("?demo-payment=")) {
      router.push(`/trip/confirmation?id=${inquiryId}`);
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="container-tight grid gap-12 pt-32 pb-32 lg:grid-cols-[1fr_360px]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs uppercase tracking-[0.32em] text-accent">
          {t("eyebrow")}
        </p>
        <h1 className="font-display mt-4 text-5xl text-foreground sm:text-6xl">
          {t("title")}
        </h1>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 space-y-6"
        >
          <div>
            <Label htmlFor="contactName">{t("name")}</Label>
            <Input
              id="contactName"
              className="mt-2"
              {...form.register("contactName")}
            />
            {form.formState.errors.contactName && (
              <p className="mt-1 text-xs text-red-400">
                {form.formState.errors.contactName.message}
              </p>
            )}
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                className="mt-2"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                type="tel"
                className="mt-2"
                {...form.register("phone")}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="notes">{t("notes")}</Label>
            <Textarea
              id="notes"
              className="mt-2"
              placeholder={t("notesPlaceholder")}
              {...form.register("notes")}
            />
          </div>

          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={submitting || items.length === 0}
            className="w-full sm:w-auto"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("sending")}
              </>
            ) : (
              <>
                {tCta("submit")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </motion.div>

      <aside className="lg:sticky lg:top-32 lg:self-start">
        <div className="rounded-2xl border border-foreground/10 bg-card p-8">
          <p className="text-xs uppercase tracking-[0.28em] text-foreground/50">
            {t("summary")}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-3">
                <span className="truncate">{item.titleSnapshot}</span>
                {item.priceCents > 0 && (
                  <span className="flex-shrink-0 text-foreground/60">
                    {formatPrice(item.priceCents, locale)}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 border-t border-foreground/10 pt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/60">{t("estimatedTotal")}</span>
              <span className="font-display text-xl text-foreground">
                {formatPrice(total, locale)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/60">{t("depositLabel")}</span>
              <span className="font-display text-xl text-accent">
                {formatPrice(deposit, locale)}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
