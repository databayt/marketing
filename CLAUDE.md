# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Commands

- `pnpm dev`: Start development server with Next.js Turbopack
- `pnpm build`: Build the project (runs Prisma generate first)
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint for code quality checks

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Package Manager**: pnpm
- **Runtime**: React 19.2.3, TypeScript 5.9.3
- **Database**: Prisma 7.2.0 with Neon serverless PostgreSQL
- **Authentication**: NextAuth v5 (beta) with Google, Facebook, and Credentials providers
- **UI**: Radix UI primitives, Tailwind CSS v4, Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Payments**: Stripe integration
- **Email**: Resend
- **AI Chat**: Groq API with Llama 3.1

## Core Architecture

### Route Organization
- `src/app/[lang]/(marketing)/*` - Public marketing pages with SiteHeader/Footer layout
- `src/app/[lang]/(auth)/*` - Authentication pages (login, register, reset)
- `src/app/[lang]/chatbot` - Standalone chat page
- All routes prefixed with `[lang]` parameter (en/ar)

### Internationalization
- Dictionaries at `src/components/internationalization/{en,ar}.json`
- `useTranslations()` hook provides `t`, `locale`, `isRTL`
- RTL support built into components

### Authentication
- NextAuth v5 with Prisma adapter
- Role-based access (ADMIN, USER)
- Two-factor authentication with email tokens
- Route protection via `proxy.ts` (Next.js 16 replaces middleware.ts)
- Routes config in `src/routes.ts`

### Prisma 7 Configuration
Prisma 7 uses a new architecture with explicit adapters:

```typescript
// Server-side imports (PrismaClient)
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Client-side imports (types/enums only)
import { UserRole, User } from "@/generated/prisma/browser";
```

- Schema: `prisma/schema.prisma`
- Config: `prisma.config.ts`
- Generated client: `src/generated/prisma/` (gitignored)

### Component Structure
- `src/components/marketing/*` - Landing page sections
- `src/components/template/*` - Layout components (header, footer)
- `src/components/ui/*` - Reusable primitives
- `src/components/auth/*` - Authentication forms and flows
- `src/components/chatbot/*` - AI chat widget

### Styling
- Tailwind CSS with custom OKLCH color system
- Theme variables in `src/app/globals.css`
- `cn()` utility for conditional class names
- Mobile-first responsive design
- Dark/light mode via next-themes

## Business Domain

Web design service business with:
- **ServicePackage**: Service tiers with Stripe pricing
- **Project**: Client projects with milestones
- **Payment**: Stripe-integrated payments
- **Inquiry**: Lead management
- **Testimonial**: Client feedback

## Environment Variables

Required:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`, `NEXTAUTH_SECRET`: Auth configuration
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`: Google OAuth
- `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`: Facebook OAuth
- `GROQ_API_KEY`: AI chatbot
- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`: Payments
- `RESEND_API_KEY`: Email service
- `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT`: Image CDN

## Development Notes

- Auto-push changes to GitHub after completing tasks
- Next.js 16 uses `proxy.ts` instead of `middleware.ts` (named export required)
- Build ignores ESLint and TypeScript errors
- Path alias: `@/*` maps to `./src/*`
- Turbopack enabled for development
