"use client";

import { useEffect, type RefObject } from "react";
import { registerFade, unregisterFade } from "@/lib/scroll-fade";

export function useScrollFade(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerFade(el);
    return () => unregisterFade(el);
  }, [ref]);
}
