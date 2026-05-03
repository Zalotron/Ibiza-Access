import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SITE_URL, SITE_NAME, SEO_KEYWORDS } from "@/lib/seo";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0e14" },
    { media: "(prefers-color-scheme: light)", color: "#0a0e14" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const DEFAULT_TITLE = "Ibiza Access - Tailored Holidays";
const DEFAULT_DESCRIPTION =
  "Design your perfect Ibiza trip in one place. Private villas, yachts, jets, chefs, VIP tables and bespoke experiences — booked through a single luxury concierge.";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_URL}/`),
  title: { default: DEFAULT_TITLE, template: "%s · Ibiza Access" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "travel",
  formatDetection: { telephone: false, email: false, address: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    locale: "en_GB",
    alternateLocale: ["es_ES", "de_DE", "fr_FR", "it_IT"],
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ibiza Access — luxury concierge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og.jpg"],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: `${SITE_URL}/en/`,
    languages: {
      en: `${SITE_URL}/en/`,
      es: `${SITE_URL}/es/`,
      de: `${SITE_URL}/de/`,
      fr: `${SITE_URL}/fr/`,
      it: `${SITE_URL}/it/`,
      "x-default": `${SITE_URL}/en/`,
    },
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  image: `${SITE_URL}/og.jpg`,
  description: DEFAULT_DESCRIPTION,
  email: "hello@ibizaaccess.com",
  telephone: "+34666812575",
  priceRange: "€€€€",
  areaServed: {
    "@type": "Place",
    name: "Ibiza",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Eivissa",
    addressRegion: "Illes Balears",
    addressCountry: "ES",
  },
  sameAs: [
    "https://www.instagram.com/ibizaaccess",
    "https://www.facebook.com/ibizaaccess",
    "https://www.linkedin.com/company/ibizaaccess",
  ],
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
      <head>
        <link
          rel="preconnect"
          href="https://images.unsplash.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
      </head>
      <body className="bg-background text-foreground min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
