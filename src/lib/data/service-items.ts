import type { ServiceItem } from "@/lib/types";

import villas from "./items/villas.json";
import boatsYachts from "./items/boats-yachts.json";
import privateJet from "./items/private-jet.json";
import luxuryCars from "./items/luxury-cars.json";
import carRental from "./items/car-rental.json";
import privateChefs from "./items/private-chefs.json";
import beachClubs from "./items/beach-clubs.json";
import wellness from "./items/wellness.json";
import ivTherapy from "./items/iv-therapy.json";
import securityDrivers from "./items/security-drivers.json";
import tailoredHolidays from "./items/tailored-holidays.json";
import otherRequests from "./items/other-requests.json";

const ITEMS: Record<string, ServiceItem[]> = {
  villas: villas as ServiceItem[],
  "boats-yachts": boatsYachts as ServiceItem[],
  "private-jet": privateJet as ServiceItem[],
  "luxury-cars": luxuryCars as ServiceItem[],
  "car-rental": carRental as ServiceItem[],
  "private-chefs": privateChefs as ServiceItem[],
  "beach-clubs": beachClubs as ServiceItem[],
  wellness: wellness as ServiceItem[],
  "iv-therapy": ivTherapy as ServiceItem[],
  "security-drivers": securityDrivers as ServiceItem[],
  "tailored-holidays": tailoredHolidays as ServiceItem[],
  "other-requests": otherRequests as ServiceItem[],
};

export function getServiceItems(slug: string): ServiceItem[] {
  return ITEMS[slug] ?? [];
}
