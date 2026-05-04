import type { Locale } from "@/i18n/routing";

export type ServiceCategory = "stay" | "transport" | "experience" | "wellness";

export type Service = {
  slug: string;
  category: ServiceCategory;
  basePriceCents: number;
  depositCents: number;
  currency: "EUR";
  image: string;
  gallery?: string[];
  durationLabel?: Record<Locale, string>;
  unitLabel?: Record<Locale, string>;
  /** Localized title + summary, used in cards and meta */
  title: Record<Locale, string>;
  tagline: Record<Locale, string>;
};

export type TripItem = {
  id: string;
  serviceSlug: string;
  /** id of the service-item picked (e.g. "can-retreat") — empty string for service-level entries without options */
  itemId?: string;
  startDate?: string;
  endDate?: string;
  guests?: number;
  options?: Record<string, string | number | boolean>;
  priceCents: number;
  /** snapshot of the title at add-time for resilience */
  titleSnapshot: string;
  imageSnapshot: string;
};

export type InquiryInput = {
  contactName: string;
  email: string;
  phone?: string;
  notes?: string;
  locale: Locale;
  items: TripItem[];
  totalCents: number;
  depositCents: number;
};

export type Inquiry = InquiryInput & {
  id: string;
  status: "submitted" | "deposit_paid" | "confirmed" | "cancelled";
  createdAt: string;
};

export type ItemSpec = {
  /** translation key under items.specs.{key} (e.g. "guests", "bedrooms"). Receives `{value}` for interpolation. */
  key?: string;
  /** numeric or text value */
  value?: string | number;
  /** optional fallback label if no key is provided (rendered as-is, untranslated) */
  label?: string;
};

export type ServiceItem = {
  id: string;
  name: string;
  image: string;
  location?: string;
  /** lowest price for the price range, in cents */
  priceFromCents?: number;
  /** highest price for the price range, in cents */
  priceToCents?: number;
  /** translation key for the unit (week, day, leg, session, table, hour, group) — under items.units.{unit} */
  unit?: string;
  specs?: ItemSpec[];
};

