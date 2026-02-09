# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 14 (App Router), TypeScript, and MDX for content management. Features blog posts and project showcases with server-side rendering and static generation.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

### Content Management System

The site uses a custom MDX-based content system located in `lib/mdx/`:

- **Content Storage**: MDX files stored in `content/blog/` and `content/projects/`
- **Frontmatter Schema** (required fields):
  - `title`: string
  - `publishedAt`: ISO date string
  - `summary`: string
  - `image`: string (optional)
  - `tags`: string array (optional, projects only)
  - `status`: string (projects only)

- **Content API** (`lib/mdx/content.ts`):
  - `getAllBlogPosts()`: Returns sorted blog posts (newest first)
  - `getBlogPost(slug)`: Returns single blog post or null
  - `getAllProjects()`: Returns sorted projects (newest first)
  - `getProject(slug)`: Returns single project or null

- **MDX Rendering** (`lib/mdx/mdx.tsx`):
  - Uses `next-mdx-remote/rsc` for server-side rendering
  - Syntax highlighting via `rehype-pretty-code` with `github-dark` theme
  - `renderMDX(content)`: Server component function for rendering MDX

### Routing Structure

```
app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout with Navigation/Footer
├── blog/
│   ├── page.tsx               # Blog listing
│   ├── blog-client.tsx        # Client component for blog list
│   └── [slug]/page.tsx        # Dynamic blog post page
├── projects/
│   ├── page.tsx               # Projects listing
│   ├── projects-client.tsx    # Client component for projects grid
│   └── [slug]/
│       ├── page.tsx           # Dynamic project page (SSG)
│       └── project-detail-client.tsx
├── contact/page.tsx           # Contact form
├── cv/page.tsx               # CV/Resume page
├── services/page.tsx         # Services page
└── api/
    └── contact/route.ts      # Contact form API endpoint
```

### Static Generation Strategy

Both blog posts and projects use `generateStaticParams()` for static site generation at build time:

```typescript
export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

### Component Architecture

- **Server Components by Default**: All pages are server components unless explicitly marked with `"use client"`
- **Client Components**: Suffixed with `-client.tsx` for components requiring client-side interactivity
- **Shared Components**: Located in `components/` directory:
  - `navigation.tsx`: Site navigation
  - `footer.tsx`: Site footer
  - `hero-section.tsx`, `about-section.tsx`, etc.: Homepage sections
  - `project-card.tsx`: Standard project card (grid) with cardDisplay support
  - `featured-project-card.tsx`: Featured project card (horizontal) with cardDisplay support
  - `terminal-display.tsx`: Reusable terminal component with auto-coloring
  - `wireframe-*.tsx`: Monochrome wireframe components for project cards

### Styling

- **CSS**: Global styles in `app/globals.css`
- **Font**: Ubuntu from Google Fonts (weights: 300, 400, 500, 700)
- **Approach**: Utility classes with inline styles for component-specific styling

### API Routes

**Contact Form** (`app/api/contact/route.ts`):
- POST endpoint for form submissions
- Uses AWS SES for email delivery (us-east-1)
- Sends notification to danny@djy89.net
- Sends auto-reply confirmation to form submitter
- All submissions logged to Vercel logs as backup
- Input validation for name, email, message fields

### Path Aliases

TypeScript paths configured in `tsconfig.json`:
- `@/*` → Project root
- `contentlayer/generated` → `.contentlayer/generated` (legacy reference)

## Adding Content

### New Blog Post

1. Create `content/blog/your-slug.mdx`
2. Add frontmatter:
```yaml
---
title: "Your Title"
publishedAt: "2025-01-15"
summary: "Brief description"
image: "/images/optional-image.jpg"
---
```
3. Write content in MDX format
4. Build will automatically generate static page

### New Project

1. Create `content/projects/your-slug.mdx`
2. Add frontmatter (see full schema below)
3. Choose a card display type (terminal, wireframe, or image)
4. If wireframe: create component, register in both card files
5. Write MDX content
6. Build will automatically generate static page

#### Project Frontmatter Schema

```yaml
---
title: "Project Name"
publishedAt: "2025-01-15"        # Controls sort order — top 2 become Featured
summary: "Brief description"
tags: ["Next.js", "TypeScript"]
status: "Live"                    # Live | In Progress | QA Testing | Archived
image: "/images/projects/slug.png"  # Fallback if no cardDisplay
cardDisplay:                      # Optional — overrides image on project cards
  type: terminal                  # terminal | wireframe | image
  title: my-service               # Terminal title bar text (terminal type only)
  content: |                      # Terminal content with auto-coloring (terminal type only)
    [09:15:22] Starting service...
    ✓ Connected
  component: trading-platform     # Wireframe component key (wireframe type only)
  src: /images/custom.png         # Custom image path (image type only)
results:                          # Stats displayed on project detail page
  - value: "99%"
    label: "Uptime"
    description: "6 months"
techStack:                        # Grouped tech tags for detail page
  - category: "Frontend"
    items: ["React", "TypeScript"]
relatedProjects: ["other-slug"]   # Links to related project pages
---
```

#### Status Badges

| Status Value | Badge Label | Color |
|---|---|---|
| `Live` | Live | Green |
| `In Progress` / `In Development` | In Progress | Warning/orange |
| `QA Testing` | QA Testing | Accent/blue |
| `Archived` | Archived | Muted |

Status mapping is in `app/projects/page.tsx` → `mapStatus()`.

#### Featured vs Standard Projects

`app/projects/page.tsx` splits projects by sort position:
- **Featured** (top 2 by `publishedAt` desc) → `FeaturedProjectCard` — large horizontal layout
- **Standard** (remaining) → `ProjectCard` — grid cards

To make a project featured, give it a newer `publishedAt` date than other projects.

#### Card Display System

Three display types replace generic AI-generated project card images:

**Terminal** — for pipeline/automation/CLI projects. Content is inline in MDX frontmatter.

Auto-coloring rules (in `parseTerminalContent`):
- `✓` / `[OK]` / contains `created`/`Complete` → green
- `✗` / `[ERROR]` / contains `failed`/`Error` → red
- `⚠` / `[WARN]` → warning/orange
- Lines starting with `[` + `]` (timestamps) → muted gray
- Prefix overrides: `[success]`, `[error]`, `[warning]`, `[muted]`, `[accent]`

**Wireframe** — for web apps/dashboards/platforms. Each wireframe is a React component.

Existing wireframe components:
- `trading-platform` → `components/wireframe-trading-platform.tsx`
- `analytics-dashboard` → `components/wireframe-analytics-dashboard.tsx`
- `chat-onboarding` → `components/wireframe-chat-onboarding.tsx`
- `server-status` → `components/wireframe-server-status.tsx`

To add a new wireframe:
1. Create `components/wireframe-{name}.tsx` (must accept `className?: string` prop)
2. Register in BOTH `components/project-card.tsx` AND `components/featured-project-card.tsx`:
   - Add import
   - Add entry to the `wireframes` registry object inside `renderCardDisplay()`
3. Reference in MDX: `component: {name}`

Wireframe design rules:
- Monochrome only — use the shared palette: `bg: '#0a0f12'`, `border: '#252d33'`, `text: '#5a6368'`, `textBright: '#7a8288'`, `textDim: '#3a4248'`
- All layout must be percentage-based or flex — no fixed pixel heights
- Every container needs `overflow-hidden` and `minHeight: 0`
- Must work at any card aspect ratio (16/9 standard, variable featured)

**Image** — override the default `image` field with a custom card-specific image.

#### Content Guidelines

- No real emails, company names, or personal data in card displays
- No personal identifiers (name, usernames, server names) in terminal content
- Terminal content should tell a story (pipeline flow, not just stats)
- Each project should use the cardDisplay type that best represents what the project IS

## Environment Variables

Required for contact form functionality (AWS SES):
- `AWS_ACCESS_KEY_ID`: AWS access key for SES
- `AWS_SECRET_ACCESS_KEY`: AWS secret key for SES
- `AWS_REGION`: `us-east-1`

Legacy (deprecated):
- `RESEND_API_KEY`: Resend API key (being replaced by SES)

## AWS Configuration

**CLI Profile:** `admin-cli` is configured for AWS operations.

```bash
aws <command> --profile admin-cli
```

**SES Status:** Production access approved (50K emails/day, us-east-1)

## Important Patterns

### MDX Content Rendering Flow

1. Content read from file system via `lib/mdx/content.ts`
2. Gray-matter parses frontmatter and content
3. Validation ensures required fields exist
4. `renderMDX()` transforms content using MDX Remote
5. Server component renders final HTML

### Error Handling in Content System

- Invalid frontmatter logs error and returns null
- Missing content files return null
- Pages call `notFound()` when content not found
- Filters out null entries before rendering lists

### Client/Server Boundary

- Data fetching happens in server components (page.tsx)
- MDX rendering occurs server-side via `renderMDX()`
- Interactive elements isolated in `-client.tsx` components
- Content passed as props across boundary

## Future Enhancements

### Card-Based Contact Page (Saved for Later)
v0 chat `https://v0.app/chat/q04zcB2OhHh` contains alternative contact page designs:
- **Card-Based Layout**: Multiple action cards (Schedule Call, Send Email, Quick Question)
- **Focused Form Layout**: Centered minimal design
- **ContactModal Component**: Reusable popup modal for CTAs

These can be implemented later if the current split-screen contact page needs redesign.
