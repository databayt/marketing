# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Project Commands

- `pnpm dev`: Start development server with Next.js Turbopack
- `pnpm build`: Build the project (runs Prisma generate first)
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint for code quality checks

# Tech Stack & Architecture

- **Framework**: Next.js 15 with App Router
- **Package Manager**: pnpm
- **Database**: Prisma ORM with Neon serverless PostgreSQL
- **Authentication**: NextAuth v5 (beta) with Google, Facebook, and Credentials providers
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React + React Icons
- **Forms**: React Hook Form with Zod validation
- **Theme**: next-themes for dark/light mode support
- **Email**: Resend for transactional emails
- **Payments**: Stripe integration for service packages
- **Animations**: Framer Motion
- **Carousel**: Embla Carousel React
- **AI Chat**: Groq API with Llama 3.1 for chatbot functionality

# Core Architecture Patterns

## Route Organization
The app uses Next.js 15 App Router with specific route groupings:
- `src/app/[lang]/(marketing)/*` - Public marketing pages with SiteHeader/Footer layout
- `src/app/[lang]/(auth)/*` - Authentication pages (login, register, reset)
- `src/app/[lang]/chatbot` - Standalone chat page without marketing layout
- `src/app/[lang]/about` - Standalone about page
- Protected routes require authentication via middleware

## Internationalization Strategy
- Dictionaries at `src/components/internationalization/{en,ar}.json`
- `useTranslations()` hook provides `t`, `locale`, `isRTL` throughout the app
- All routes prefixed with `[lang]` parameter (en/ar)
- RTL support built into components with conditional styling

## Authentication Flow
- NextAuth v5 with Prisma adapter
- Providers: Google, Facebook, Credentials
- Role-based access (ADMIN, USER)
- Two-factor authentication with email tokens
- Middleware protects routes based on `publicRoutes` and `authRoutes` arrays in `src/routes.ts`

## Chat System Architecture
Two chat implementations:
1. **Desktop Modal**: `src/components/chatbot/*` - Floating widget with AI integration
2. **Mobile Page**: `src/app/[lang]/chatbot/page.tsx` - Full-screen dedicated page

Both use the same backend: `src/components/chatbot/actions.ts` with Groq API

## Component Patterns
- **Marketing Components**: `src/components/marketing/*` - Landing page sections
- **Template Components**: `src/components/template/*` - Layout components (header, footer)
- **UI Components**: `src/components/ui/*` - Reusable primitives
- **Auth Components**: `src/components/auth/*` - Authentication forms and flows

## State Management
- Client components use React hooks (useState, useEffect)
- Server components fetch data directly in component
- Theme state via next-themes ThemeProvider
- No global state management library - components are self-contained

## Styling Approach
- Tailwind CSS with custom OKLCH color system
- Theme variables in `src/app/globals.css`
- Component-specific animations in `src/styles/*`
- `cn()` utility for conditional class names
- Mobile-first responsive design

# Business Domain Architecture

This is a **web design service business application** with the following core entities:

## Service Business Models
- **ServicePackage**: Service tiers with pricing (basic, premium, enterprise)
- **Project**: Client projects linked to service packages
- **Milestone**: Project breakdown with due dates
- **Payment**: Stripe-integrated payment processing
- **Inquiry**: Lead management system
- **Testimonial**: Client feedback and ratings

## Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Application URL
- `NEXTAUTH_SECRET`: Auth secret key
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Google OAuth
- `FACEBOOK_CLIENT_ID` & `FACEBOOK_CLIENT_SECRET`: Facebook OAuth
- `GROQ_API_KEY`: AI chatbot responses
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`: Payment processing
- `RESEND_API_KEY`: Email service
- `IMAGEKIT_PUBLIC_KEY`, `IMAGEKIT_PRIVATE_KEY`, `IMAGEKIT_URL_ENDPOINT`: Image CDN

# Development Workflow

- **Auto-push**: Always automatically push changes to GitHub after completing tasks
- Components support both light and dark themes
- Use `useTheme()` hook for theme-aware styling
- Always check TypeScript errors before committing
- Test authentication flows in development mode

# Mobile-Specific Considerations

- Chat icon in mobile header navigates to `/[lang]/chatbot` page
- Mobile layouts use Visual Viewport API for keyboard detection
- Input fields set to `font-size: 16px` to prevent iOS zoom
- Safe area padding for devices with notches/gestures
- Touch-optimized with larger tap targets (min 44px)

# Important Configuration Notes

- Next.js config ignores ESLint and TypeScript errors during builds
- Image optimization configured for external domains (Unsplash, Pravatar, etc.)
- Turbopack enabled for faster development builds
- Strict TypeScript configuration with path aliases (`@/*` → `./src/*`)