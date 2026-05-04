import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import type { Locale } from "@/i18n/routing";

export function SiteFooter({ locale: _locale }: { locale: Locale }) {
  const t = useTranslations();

  return (
    <footer className="border-t border-foreground/5 bg-background mt-32">
      <div className="container-tight grid gap-12 py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-3xl text-foreground">Ibiza Access</p>
          <p className="mt-4 max-w-md text-sm text-foreground/60">
            {t("site.description")}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">
            {t("nav.services")}
          </p>
          <ul className="mt-4 space-y-3 text-sm text-foreground/70">
            <li>
              <Link href="/#services" className="hover:text-foreground">
                {t("nav.services")}
              </Link>
            </li>
            <li>
              <Link href="/trip" className="hover:text-foreground">
                {t("nav.trip")}
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                {t("nav.blog")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/40">
            {t("footer.language")}
          </p>
          <div className="mt-4">
            <LocaleSwitcher />
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-foreground/40">
            Contact
          </p>
          <p className="mt-2 text-sm text-foreground/70">
            +34 666.812.575
            <br />
            hello@ibizaaccess.com
          </p>
        </div>
      </div>
      <div className="border-t border-foreground/5">
        <div className="container-tight flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-foreground/40">
          <p>© {new Date().getFullYear()} Ibiza Access. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-foreground">
              {t("footer.terms")}
            </Link>
            <Link href="/about" className="hover:text-foreground">
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
