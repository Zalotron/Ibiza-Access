import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";
const repoBasePath = "/Ibiza-Access";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? repoBasePath : "",
  assetPrefix: isGhPages ? repoBasePath : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "ibiza-access.com" },
    ],
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages ? repoBasePath : "",
    NEXT_PUBLIC_DEMO_MODE: "true",
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
