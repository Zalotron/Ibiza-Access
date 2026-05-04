import type { ServiceItem } from "@/lib/types";
import type { Locale } from "@/i18n/routing";
import { ServiceItemCard } from "./service-item-card";

export function ServiceItemsGrid({
  items,
  serviceSlug,
  locale,
}: {
  items: ServiceItem[];
  serviceSlug: string;
  locale: Locale;
}) {
  if (items.length === 0) return null;

  return (
    <section className="container-tight py-20 sm:py-28">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ServiceItemCard
            key={item.id}
            item={item}
            serviceSlug={serviceSlug}
            locale={locale}
          />
        ))}
      </ul>
    </section>
  );
}
