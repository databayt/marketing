# Marketing — databayt.org

Public landing site for [databayt](https://databayt.org). Bilingual (English / Arabic with full RTL), bills via Stripe, hosts the AI consult chatbot, and lets visitors report issues directly into GitHub.

Part of the [databayt](https://github.com/databayt) family. See sibling repos: [hogwarts](https://github.com/databayt/hogwarts), [souq](https://github.com/databayt/souq), [mkan](https://github.com/databayt/mkan), [shifa](https://github.com/databayt/shifa), [kun](https://github.com/databayt/kun).

## Stack

- Next.js 16.1 (App Router, Turbopack dev)
- React 19, TypeScript 5
- Tailwind CSS 4 + shadcn/ui (Radix primitives)
- Prisma 7 + Neon serverless Postgres
- Auth.js v5 (Google + Facebook OAuth, credentials, 2FA)
- Stripe + Resend + Groq (Llama 3.1 chatbot)
- ImageKit CDN

## Quickstart

```bash
pnpm install
cp .env.example .env.local      # fill in values
pnpm dev                         # http://localhost:3000
```

The dev server uses Turbopack and supports HMR. Routes are prefixed with the locale (`/en/...`, `/ar/...`); the proxy in `proxy.ts` handles locale detection from the `NEXT_LOCALE` cookie + `Accept-Language` header.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server on :3000 |
| `pnpm build` | Production build (runs `prisma generate` first) |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |

## Architecture

```
src/
  app/[lang]/           # locale-segmented routes
    (marketing)/        # public pages with SiteHeader/Footer
    (auth)/             # login, join, reset, new-password, verification
    chatbot/            # standalone chatbot page
    wizard/             # multi-step onboarding wizard
  components/
    marketing/          # landing-page sections
    auth/               # auth flows + server actions
    chatbot/            # AI chat widget
    template/           # site shell (header, footer, wizard chrome)
    ui/                 # shadcn primitives
    internationalization/  # en.json, ar.json, dictionaries.ts
  lib/
    actions/            # cross-cutting server actions
    use-translations.ts # client-side translation hook
  env.mjs               # zod-validated env schema (t3-oss)
  routes.ts             # public/auth route lists, default redirect
proxy.ts                # Next 16 middleware-equivalent (locale detection)
prisma/schema.prisma    # User, ServicePackage, Project, Payment, Inquiry, …
```

## Internationalization

Dictionaries live at `src/components/internationalization/{en,ar}.json`. Both files mirror the same key shape — adding a key in one means adding it in the other.

Server components: `getDictionary(locale)` (`dictionaries.ts`).
Client components: `useTranslations()` returns `{ t, locale, isRTL, localeConfig }`.

The locale-aware `Rubik` font auto-applies on RTL routes; LTR uses `GeistSans`. Use logical Tailwind utilities (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`, `text-end`) instead of physical ones — they flip automatically under `dir=rtl`.

## Report-an-issue

A floating Bug-icon button is mounted globally in `[lang]/layout.tsx`. It opens a dialog, posts to the `reportIssue` server action, and creates a GitHub issue in `databayt/marketing` with `report` label, page URL, browser, viewport, and direction metadata.

Requires `GITHUB_PERSONAL_ACCESS_TOKEN` (repo scope) in env. Without it, the action returns an error and the toast shows the localized failure message — the UI degrades gracefully.

## Deployment

Vercel auto-deploys on push to `main`. Preview deploys on PR. Mirror new `.env.example` keys into Vercel project env (Production + Preview). Never set per-deploy overrides via the dashboard — `.env.local` is the source of truth locally and Vercel env mirrors it.

## Contributing

See `CLAUDE.md` for AI-coding-agent conventions, and follow the GitHub workflow:

```
issue → branch (feat|fix|chore/<slug>) → atomic commits → PR (Closes #N) → squash merge
```

Conventional Commits, present tense, body explains the *why*.
