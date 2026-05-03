import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <article className="container-tight pt-40 pb-32">
      <p className="text-xs uppercase tracking-[0.32em] text-accent">
        {t("eyebrow")}
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-balance text-5xl text-foreground sm:text-7xl">
        {t("title")}
      </h1>
      <div className="mx-auto mt-16 max-w-2xl space-y-6 text-base leading-relaxed text-foreground/80 sm:text-lg">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p>{t("p3")}</p>
      </div>
    </article>
  );
}
