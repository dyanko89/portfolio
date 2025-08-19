# Code Style and Conventions

## TypeScript
- Strict TypeScript configuration enabled
- Interface-based typing for props and data structures
- Async/await preferred over Promises
- Named exports preferred over default exports (except for page components)

## React/Next.js
- Functional components with hooks
- App Router structure (/app directory)
- Server components by default, 'use client' for client-side features
- Component files use PascalCase naming

## CSS
- Custom CSS variables in globals.css for consistent theming
- Utility classes for typography (.text-heading-48, .text-copy-16, etc.)
- CSS Grid system with span classes (.span-6, .span-12, etc.)
- Mobile-first responsive design
- CSS custom properties for colors and spacing

## File Structure
- `/app` - Next.js app router pages and layouts
- `/components` - Reusable React components
- `/content` - MDX content files for blog and projects
- `/lib` - Utility functions and data fetching
- `/public` - Static assets

## Naming Conventions
- Files: kebab-case for pages, PascalCase for components
- Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- CSS classes: kebab-case