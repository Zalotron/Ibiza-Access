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
  highlights: Record<Locale, string[]>;
};

export type TripItem = {
  id: string;
  serviceSlug: string;
  startDate?: string;
  endDate?: string;
  guests?: number;
  options?: Record<string, string | number | boolean>;
  priceCents: number;
  /** snapshot of the service title at add-time for resilience */
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

export type Testimonial = {
  id: string;
  name: string;
  origin: Record<Locale, string>;
  quote: Record<Locale, string>;
  rating: number;
};
