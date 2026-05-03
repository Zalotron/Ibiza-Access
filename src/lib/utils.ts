import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(cents: number, locale: string, currency = "EUR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatDateRange(
  start: string | undefined,
  end: string | undefined,
  locale: string,
) {
  if (!start) return "";
  const formatter = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
  });
  if (!end || end === start) return formatter.format(new Date(start));
  return `${formatter.format(new Date(start))} – ${formatter.format(new Date(end))}`;
}

export function generateId() {
  return (
    Date.now().toString(36) + Math.random().toString(36).slice(2, 10)
  ).toUpperCase();
}

export function withBase(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
