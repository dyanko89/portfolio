# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website built with Next.js 16 (App Router), React 19, TypeScript, and MDX for content management. Styling uses Tailwind v4 (`@theme` tokens in `app/globals.css`). Features blog posts and project showcases with server-side rendering and static generation.

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
  - `tags`: string array (optional; used by both blog posts and projects)
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

## SEO & Structured Data

- **Metadata**: Root `app/layout.tsx` sets `title.template: '%s | Danny Yanko'`. Child pages export plain titles (no manual `| Danny Yanko` suffix) and the template appends it automatically.
- **OG images**: Generated via `lib/og/og-card.tsx` (`ogCard({title, subtitle?, tag?})`) through `opengraph-image.tsx` file-convention routes at root, `app/blog/[slug]/`, and `app/projects/[slug]/`. Never set `openGraph.images` manually on those routes; the file convention handles it.
- **JSON-LD**: `components/json-ld.tsx` + `lib/structured-data.ts`. Every graph references the canonical Person node (`@id: https://djy89.net/#person`). Validate with `node scripts/validate-jsonld.mjs` against a running dev server.
- **Feeds & AI files**: `/feed.xml` (RSS, generated from blog content), `/llms.txt` (generated) are routes. `public/services.md` is manual; update it when the services page copy changes.

## Content Standards (SEO/AEO/GEO)

Every piece of content (blog posts, project pages) follows these rules. They are the publishing bar, not optional polish.

### Punctuation (hard rule)
- No em-dashes. No double hyphens ("--"). Use commas, colons, periods, or parentheses instead.
- Applies to ALL user-visible copy: MDX bodies, frontmatter (titles, summaries, FAQ answers, captions), OG card text, alt text, feed/llms/services files. Use `|` only as a title separator (matching the site title pattern), never as prose punctuation.

### Blog post checklist
- `summary`: self-contained, roughly 150-160 characters, with concrete numbers when the post has them (it becomes the meta description and og:description).
- `tags`: 3-5, specific.
- `faq`: 2-3 entries. Questions phrased the way people search; each answer self-contained, 40-60 words, accurate to the post body, readable with zero surrounding context.
- `updatedAt`: add on any substantive edit (feeds the visible "Updated" date, og modifiedTime, schema dateModified, and sitemap lastModified).
- Structure: open each section with the direct answer, then the detail. Phrase headings as queries where natural. Tables for comparisons, numbered lists for processes, specific numbers with dates.
- Include at least one infographic component where the content supports it: `StatRow` for metrics, `BeforeAfter` for comparisons, `FlowStack` for pipelines, `Timeline` for chronology, `KeyTakeaways` to close.

### Project page checklist
- `results`: concrete values with labels (rendered as stat cards; extracted by AI engines).
- `summary`: states the outcome, not just the topic.

### After any content change
- `npm run build` must pass.
- If schema-relevant fields changed, run `node scripts/validate-jsonld.mjs` against a running dev server.
- If services page copy changed, mirror it in `public/services.md`.

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
updatedAt: "2026-07-19"        # Optional: shows "Updated" date, feeds og modifiedTime + schema dateModified
faq:                            # Optional: renders visible FAQ section + FAQPage JSON-LD
  - q: "Question phrased how people search?"
    a: "Self-contained 40-60 word answer that works out of context."
---
```
3. Write content in MDX format
4. Build will automatically generate static page

### Infographic Components (MDX)

Server components in `components/mdx/infographics.tsx`, registered in `components/mdx-components.tsx`. Use them directly in MDX with no imports:

- `StatRow`: big-number stat tiles (`stats: {value, label, detail?}[]`)
- `BeforeAfter`: two-panel comparison (`before`/`after`: `{title, items: string[]}`)
- `FlowStack`: vertical narrowing flow/funnel (`steps: {title, detail?}[]`)
- `KeyTakeaways`: boxed summary list, doubles as an AEO answer block (`items: string[]`)
- `Timeline`: vertical chronology (`events: {marker, title, detail?}[]`)

Example (from `content/blog/four-kilobyte-reads.mdx`):
```mdx
<StatRow
  caption="Two fixes, two benchmarks: the MFT reader and the per-file syscalls"
  stats={[
    { value: "144.8s", label: "Before", detail: "Direct MFT scan, 4 KB per syscall" },
  ]}
/>
```

Note: `renderMDX()` in `lib/mdx/mdx.tsx` sets `blockJS: false` because next-mdx-remote v6 otherwise strips JSX-expression props (like `stats={[...]}`) from MDX, which the infographic components need to work. `blockDangerousJS` stays on. Content is repo-authored only; never render user-supplied MDX through this path.

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
publishedAt: "2025-01-15"        # Controls sort order within each group (newest first)
summary: "Brief description"
tags: ["Next.js", "TypeScript"]
status: "Live"                    # Live | In Progress | QA Testing | Archived
featured: true                    # Optional — explicitly pins this project into the Featured section
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

`app/projects/page.tsx` splits projects by the `featured` frontmatter flag:
- **Featured** (`featured: true`) → `FeaturedProjectCard` — large horizontal layout
- **Standard** (everything else) → `ProjectCard` — grid cards

If no project has `featured: true` set, the page falls back to the newest 2 by `publishedAt` so it never renders an empty Featured section. To make a project featured, set `featured: true` on it directly — `publishedAt` no longer controls Featured placement, only sort order within each section.

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
