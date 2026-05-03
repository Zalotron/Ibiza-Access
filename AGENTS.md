<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Ibiza Access — agent context

## What this is
A **sales-demo trip-builder** for a luxury Ibiza concierge. v1 is statically exported and hosted on GitHub Pages at `https://zalotron.github.io/Ibiza-Access/`. v2 will move to Vercel + Supabase + Stripe after the sale closes.

## Hard constraints (don't break)

- **Static export only**: `output: 'export'` in `next.config.ts`. No middleware, no server actions, no API routes, no `next/image` optimization. Anything requiring a server must go behind `src/lib/services/trip-service.ts` (mocked in v1).
- **basePath `/Ibiza-Access`** on GitHub Pages (set when `DEPLOY_TARGET=gh-pages`). Use `next/link` and `next/image` (which respect basePath); never hardcode `/foo` URLs in raw `<a>` or `<img>`.
- **`NEXT_PUBLIC_DEMO_MODE=true`** in v1 — gates real-server code paths.
- **i18n in static mode**: every locale-aware page lives under `[locale]`. There is no middleware. The default locale (es) is served with prefix `/es/`.

## Architecture

- `src/app/[locale]/...` — all locale-prefixed routes
- `src/app/page.tsx` — root, client redirect to `/es/` or `/en/`
- `src/components/marketing/` — hero, services, process, testimonials, cta, header, footer
- `src/components/trip/` — cart, checkout, confirmation
- `src/components/motion/` — Lenis provider + lang effect
- `src/lib/data/services.ts` — 16 services (single source of truth, ES + EN)
- `src/lib/store/trip-store.ts` — Zustand persist (localStorage key `ibiza-trip-v1`)
- `src/lib/services/trip-service.ts` — interface + factory (currently `mockTripService`)
- `src/i18n/{routing,request,navigation}.ts` — next-intl 4 setup

## When migrating to v2 (do NOT do this in v1)

Add `trip-service.server.ts` with server actions + Supabase + real Stripe Checkout Session + webhook. Drop `output/basePath/trailingSlash` from config. Components, MDX, validators, copy don't change.
