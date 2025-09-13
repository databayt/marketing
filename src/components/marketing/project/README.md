# Project Component

This directory contains the project showcase components with animated hover effects.

## File Structure

- `content.tsx` - Main content wrapper for the project section
- `featured.tsx` - Featured projects component with tab filtering
- `card.tsx` - Project card component using hover effect from atom
- `constant.ts` - Project data and configuration
- `type.ts` - TypeScript interfaces and types
- `README.md` - Documentation

## Components

### HoverEffect
The hover effect is imported from `@/components/atom/card-hover-effect.tsx` and provides:
- Smooth animated background on hover using Framer Motion
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- Border color transition on hover
- Z-index management for proper layering

### ProjectCard
Wrapper component that transforms project data to work with HoverEffect component.

### FeaturedProjects
Main component that:
- Displays project tabs for filtering by category
- Shows all projects when "Featured" is selected
- Filters by category (company, education, health, ecommerce)
- Responsive tab labels (shorter on mobile)

## Usage

```tsx
import FeaturedProjects from '@/components/marketing/project/featured';

<FeaturedProjects 
  projectsSection={dictionary.marketing.projectsSection}
  dictionary={dictionary}
  params={params}
/>
```

## Features

- **Animated Hover Effects**: Beautiful hover animations using Framer Motion
- **Category Filtering**: Filter projects by category with tabs
- **Responsive Design**: Adapts to mobile, tablet, and desktop
- **Internationalization**: Supports multiple languages (en/ar)
- **TypeScript**: Fully typed for better developer experience

## Dependencies

- `framer-motion`: For animations
- `@/components/atom/card-hover-effect`: Reusable hover effect component
- `@/lib/utils`: Utility functions
- `@/lib/use-translations`: Translation hook