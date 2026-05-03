import type { Inquiry, InquiryInput } from "@/lib/types";
import { generateId } from "@/lib/utils";
import type { TripService } from "./trip-service";

const STORAGE_KEY = "ibiza-inquiries-v1";

function readAll(): Record<string, Inquiry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(inquiries: Record<string, Inquiry>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
}

export const mockTripService: TripService = {
  async submitInquiry(payload: InquiryInput) {
    const id = generateId();
    const inquiry: Inquiry = {
      ...payload,
      id,
      status: "submitted",
      createdAt: new Date().toISOString(),
    };

    const all = readAll();
    all[id] = inquiry;
    writeAll(all);

    if (process.env.NEXT_PUBLIC_INQUIRY_WEBHOOK_URL) {
      try {
        await fetch(process.env.NEXT_PUBLIC_INQUIRY_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inquiry),
        });
      } catch {
        /* webhook errors don't block the demo flow */
      }
    }

    return { inquiryId: id };
  },

  async startDepositCheckout(inquiryId: string) {
    const paymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
    if (paymentLink) {
      const url = new URL(paymentLink);
      url.searchParams.set("client_reference_id", inquiryId);
      return { url: url.toString() };
    }
    return {
      url: `?demo-payment=${encodeURIComponent(inquiryId)}`,
    };
  },

  async getInquiry(id: string) {
    return readAll()[id] ?? null;
  },
};
