# Ibiza Access

Sales-demo trip-builder for a luxury Ibiza concierge concept. Next.js 16 (App Router) + Tailwind 4 + Lenis/Motion/GSAP, statically exported to GitHub Pages.

**Demo URL:** https://zalotron.github.io/Ibiza-Access/

## Stack

- **Framework**: Next.js 16 (App Router, RSC, static export)
- **Lang**: TypeScript strict
- **Styling**: Tailwind CSS 4
- **Animation**: Lenis (smooth scroll) + Motion v12 (scroll-linked) + GSAP ScrollTrigger (lazy)
- **Carousel**: Embla
- **Forms**: react-hook-form + Zod
- **State**: Zustand (`persist` → localStorage) for the trip cart
- **i18n**: next-intl in static mode (ES default + EN, `[locale]` segment)
- **Icons**: lucide-react
- **Mobile drawer**: vaul

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build        # static export → ./out
pnpm preview      # build + serve locally
```

## Deploy

Push to `main` → GitHub Action builds with `DEPLOY_TARGET=gh-pages` (sets `basePath=/Ibiza-Access`) and deploys `out/` to GitHub Pages.

## Architecture

### Trip-builder concept

Different from the reference site (https://ibiza-access.com/), this demo lets the user **assemble a full trip** (villa + yacht + chef + VIP table + transfer) without talking to anyone first. The cart persists in localStorage. Final submit creates an inquiry record (mocked in v1; real backend in v2).

### Demo↔Prod abstraction

`src/lib/services/trip-service.ts` exports a stable interface. v1 ships with `trip-service.mock.ts` (localStorage + optional Stripe Payment Link). v2 will add `trip-service.server.ts` with real server actions + Supabase + Stripe Checkout Session + webhook.

### Important paths

- `src/app/[locale]/` — all locale-prefixed routes
- `src/app/page.tsx` — root, redirects to `/es/` or `/en/` based on browser locale
- `src/components/marketing/` — hero, services-preview, process, testimonials, cta
- `src/components/trip/` — cart, checkout, confirmation
- `src/components/motion/` — Lenis provider + lang effect
- `src/lib/data/services.ts` — 16 services (ES + EN copy + Unsplash images)
- `src/lib/store/trip-store.ts` — Zustand persist store
- `src/i18n/routing.ts` — locales config
- `src/messages/{es,en}.json` — UI strings
- `next.config.ts` — static export, basePath, image config

### Env vars (optional, for richer demo)

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_INQUIRY_WEBHOOK_URL` — POST URL where inquiries are forwarded (e.g. Web3Forms, Formspree). Lets you receive demo submissions by email.
- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` — a Stripe Payment Link in test mode. When set, the checkout flow redirects there with `client_reference_id` set to the inquiry id. When unset, the flow goes straight to `/trip/confirmation?id=…`.

## Migration to Vercel (post-sale)

1. Remove `output`, `basePath`, `assetPrefix`, `trailingSlash` from `next.config.ts`.
2. Connect repo to Vercel.
3. Add Supabase + Drizzle migrations (`services`, `inquiries`, `trip_items`, `deposits`).
4. Implement `trip-service.server.ts` with server actions + Stripe Checkout Session + webhook.
5. Configure Resend for transactional emails.
6. Set `NEXT_PUBLIC_DEMO_MODE=false`.

~90% of the codebase (components, MDX, animations, i18n strings, validators, copy) doesn't need to change.
