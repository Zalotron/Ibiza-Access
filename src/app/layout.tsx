import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zalotron.github.io/Ibiza-Access/"),
  title: {
    default: "Ibiza Access - Tailored Holidays",
    template: "%s · Ibiza Access",
  },
  description:
    "Design your perfect Ibiza trip. Villas, yachts, private jets, chefs and VIP experiences — all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground min-h-screen">
        {children}
      </body>
    </html>
  );
}
