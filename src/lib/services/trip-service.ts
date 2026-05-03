import type { Inquiry, InquiryInput } from "@/lib/types";

export interface TripService {
  submitInquiry(payload: InquiryInput): Promise<{ inquiryId: string }>;
  startDepositCheckout(inquiryId: string): Promise<{ url: string }>;
  getInquiry(id: string): Promise<Inquiry | null>;
}

import { mockTripService } from "./trip-service.mock";

export const tripService: TripService = mockTripService;
