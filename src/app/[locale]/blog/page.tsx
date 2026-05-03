import { setRequestLocale, getTranslations } from "next-intl/server";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <article className="container-tight pt-40 pb-32">
      <p className="text-xs uppercase tracking-[0.32em] text-accent">
        {t("eyebrow")}
      </p>
      <h1 className="font-display mt-4 max-w-3xl text-balance text-5xl text-foreground sm:text-7xl">
        {t("title")}
      </h1>
      <p className="mt-12 text-foreground/60">{t("comingSoon")}</p>
    </article>
  );
}
