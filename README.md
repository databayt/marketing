# Databayt Marketing

Next.js marketing site for Databayt — landing page, services, pricing, AI chatbot, and Stripe-powered subscriptions. Bilingual (English / Arabic) with RTL support.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Runtime**: React 19, TypeScript 5
- **Database**: Prisma 7 + Neon serverless PostgreSQL
- **Auth**: NextAuth v5 (Google, Facebook, Credentials, 2FA)
- **UI**: shadcn/ui (new-york), Radix UI primitives, Tailwind CSS 4, lucide-react, framer-motion
- **Forms**: React Hook Form + Zod
- **Payments**: Stripe
- **Email**: Resend
- **CDN**: ImageKit
- **AI**: Groq + ai SDK

## Develop

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build (runs prisma generate first)
pnpm start
pnpm lint
```

## Routing

All public routes are locale-prefixed under `[lang]` (`/en`, `/ar`):

- `(marketing)/` — landing, pricing, service
- `(auth)/` — login, join, reset, new-password, error
- `chatbot/` — full-page AI chat
- `wizard/` — onboarding wizard
- `about/` — about page

Locale routing is handled by `proxy.ts` (Next 16's renamed middleware). See [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md).

## Environment

Required variables:

```
DATABASE_URL                   # Postgres / Neon
NEXTAUTH_URL, NEXTAUTH_SECRET
GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET
GROQ_API_KEY                   # AI chatbot
STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
RESEND_API_KEY                 # transactional email
IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT
NEXT_PUBLIC_BASE_URL           # used in metadata + sitemap
```

## Project Docs

- [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) — i18n + RTL setup
- [PERFORMANCE.md](./PERFORMANCE.md) — performance baseline & optimizations
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) — common dev-server issues (Windows EPERM, Turbopack)
- [imagekit.md](./imagekit.md) — ImageKit migration notes
- [CLAUDE.md](./CLAUDE.md) — Claude Code project guide
