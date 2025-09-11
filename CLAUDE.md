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

# Business Domain Architecture

This is a **web design service business application** with the following core entities:

## Authentication & Users
- Multi-provider authentication (Google, Facebook, Email/Password)
- Role-based access (ADMIN, USER)
- Two-factor authentication support
- Email verification workflow

## Service Business Models
- **ServicePackage**: Defines service tiers (basic, premium, enterprise) with pricing
- **Project**: Client projects linked to service packages with status tracking
- **Milestone**: Project breakdown with due dates and completion tracking
- **Payment**: Stripe-integrated payment processing
- **Inquiry**: Lead management for potential clients
- **Testimonial**: Client feedback and rating system

## Key Integrations
- **Stripe**: Payment processing with subscription plans
- **ImageKit**: Image optimization and delivery
- **Prisma**: Type-safe database operations
- **NextAuth**: Session management with multiple providers

# Code Style Guidelines

- Use TypeScript with strict typing
- Components should be "use client" when using React hooks (useTheme, useState, etc.)
- Use ES modules (import/export) syntax, not CommonJS
- Destructure imports when possible: `import { foo } from 'bar'`
- Use Tailwind CSS for styling with conditional classes for theme support
- Follow component patterns established in `src/components/`
- Authentication components are in `src/components/auth/`
- Marketing components are in `src/components/marketing/`
- Template/layout components are in `src/components/template/`

# File Structure

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components organized by feature
│   ├── auth/      # Authentication components with validation
│   ├── marketing/ # Marketing/landing page components (about, pricing, service)
│   ├── template/  # Layout and template components
│   ├── ui/        # Reusable UI components
│   └── atom/      # Atomic design components
├── lib/           # Utility functions and configurations
│   ├── dictionaries/ # Internationalization files (en.json, ar.json)
│   ├── db.ts      # Prisma client setup
│   └── utils.ts   # Common utility functions
├── styles/        # Global CSS files for animations and effects
├── env.mjs        # Environment variable validation with Zod
└── next-auth.d.ts # NextAuth type definitions
```

# Database & Environment

- **Database**: PostgreSQL via Neon with Prisma ORM
- **Environment**: Variables validated with `@t3-oss/env-nextjs` and Zod schemas
- **Schema**: Comprehensive business models for web design services
- Run `prisma generate` after schema changes (automatically runs on build and postinstall)

# Authentication Flow

- NextAuth v5 with Prisma adapter
- Multiple providers: Google, Facebook, Credentials
- Role-based access with User/Admin roles
- Two-factor authentication with email tokens
- Password reset functionality
- Email verification required for new accounts

# Development Workflow

- Use `pnpm dev` for development with hot reloading
- Components support both light and dark themes
- Always check TypeScript errors before committing
- Test authentication flows in development mode
- ESLint configured with Next.js rules and TypeScript support

# Theme Support

- Components should use `useTheme()` hook for theme-aware styling
- Use conditional Tailwind classes based on `resolvedTheme === "dark"`
- Follow the pattern: `className={isCurrentlyDark ? "dark-classes" : "light-classes"}`

# Important Configuration Notes

- Next.js config ignores ESLint and TypeScript errors during builds
- Image optimization configured for external domains (Unsplash, Pravatar, etc.)
- Turbopack enabled for faster development builds
- Strict TypeScript configuration with path aliases (`@/*` → `./src/*`)