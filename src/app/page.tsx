"use client";

import { useEffect } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const SUPPORTED = ["en", "es", "de", "fr", "it"] as const;
const DEFAULT = "en";

export default function RootRedirect() {
  useEffect(() => {
    const userLang = navigator.language.toLowerCase().slice(0, 2);
    const target = (SUPPORTED as readonly string[]).includes(userLang)
      ? userLang
      : DEFAULT;
    window.location.replace(`${BASE}/${target}/`);
  }, []);

  return (
    <>
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${BASE}/${DEFAULT}/`} />
      </noscript>
      <div className="grid min-h-screen place-items-center">
        <p className="text-muted-foreground text-sm">Loading…</p>
      </div>
    </>
  );
}
