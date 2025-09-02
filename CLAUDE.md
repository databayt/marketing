# Project Commands

- `pnpm dev`: Start development server with Next.js Turbopack
- `pnpm build`: Build the project (runs Prisma generate first)
- `pnpm start`: Start production server
- `pnpm lint`: Run ESLint for code quality checks

# Tech Stack & Architecture

- **Framework**: Next.js 15 with App Router
- **Package Manager**: pnpm
- **Database**: Prisma ORM with Neon serverless
- **Authentication**: NextAuth v5 (beta)
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React + React Icons
- **Forms**: React Hook Form with Zod validation
- **Theme**: next-themes for dark/light mode support

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
│   ├── auth/      # Authentication components
│   ├── marketing/ # Marketing/landing page components
│   ├── template/  # Layout and template components
│   ├── ui/        # Reusable UI components
│   └── atom/      # Atomic design components
├── lib/           # Utility functions and configurations
└── next-auth.d.ts # NextAuth type definitions
```

# Database & Environment

- Database operations use Prisma Client
- Environment variables managed with `@t3-oss/env-nextjs`
- Run `prisma generate` after schema changes (automatically runs on build)

# Development Workflow

- Use `pnpm dev` for development with hot reloading
- Components support both light and dark themes
- Always check TypeScript errors before committing
- Test authentication flows in development mode

# Theme Support

- Components should use `useTheme()` hook for theme-aware styling
- Use conditional Tailwind classes based on `resolvedTheme === "dark"`
- Follow the pattern: `className={isCurrentlyDark ? "dark-classes" : "light-classes"}`