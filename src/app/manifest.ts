import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ibiza Access",
    short_name: "Ibiza Access",
    description:
      "Luxury concierge in Ibiza. Design your perfect trip — villas, yachts, jets, chefs, VIP tables — in one place.",
    start_url: `${BASE}/en/`,
    scope: `${BASE}/`,
    display: "standalone",
    orientation: "portrait",
    background_color: "#0a0e14",
    theme_color: "#0a0e14",
    lang: "en",
    categories: ["travel", "lifestyle"],
    icons: [
      {
        src: `${BASE}/icon.png`,
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
