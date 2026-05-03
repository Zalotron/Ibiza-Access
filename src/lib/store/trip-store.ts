"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TripItem } from "@/lib/types";
import { generateId } from "@/lib/utils";

type TripState = {
  items: TripItem[];
  hydrated: boolean;
  add: (item: Omit<TripItem, "id">) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<TripItem>) => void;
  clear: () => void;
  setHydrated: () => void;
};

export const useTripStore = create<TripState>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,
      add: (item) =>
        set((state) => ({
          items: [...state.items, { ...item, id: generateId() }],
        })),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      update: (id, patch) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...patch } : i,
          ),
        })),
      clear: () => set({ items: [] }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "ibiza-trip-v1",
      onRehydrateStorage: () => (state) => state?.setHydrated(),
    },
  ),
);

export function useTripTotal() {
  return useTripStore((s) => s.items.reduce((sum, i) => sum + i.priceCents, 0));
}

export function useTripDeposit() {
  return useTripStore((s) =>
    s.items.reduce((sum, i) => sum + Math.round(i.priceCents * 0.15), 0),
  );
}

export function useTripCount() {
  return useTripStore((s) => s.items.length);
}

export function useIsInTrip(serviceSlug: string) {
  return useTripStore((s) =>
    s.items.some((i) => i.serviceSlug === serviceSlug),
  );
}

/** Is a specific service-item (by its itemId under a serviceSlug) already in the trip? */
export function useIsItemInTrip(serviceSlug: string, itemId: string) {
  return useTripStore((s) =>
    s.items.some(
      (i) => i.serviceSlug === serviceSlug && i.itemId === itemId,
    ),
  );
}
