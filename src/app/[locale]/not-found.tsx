import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <div className="container-tight grid min-h-[80svh] place-items-center text-center">
      <div>
        <p className="font-display text-9xl text-accent">404</p>
        <p className="font-display mt-6 text-3xl text-foreground sm:text-5xl">
          {t("title")}
        </p>
        <Link
          href="/"
          className={`${buttonVariants({ variant: "outline" })} mt-10`}
        >
          {t("back")}
        </Link>
      </div>
    </div>
  );
}
