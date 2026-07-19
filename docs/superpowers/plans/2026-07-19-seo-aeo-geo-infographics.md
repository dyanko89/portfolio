# SEO/AEO/GEO + Infographic Content System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the missing social/AI-facing layer to djy89.net (Open Graph + Twitter metadata, dynamic OG images, JSON-LD structured data, FAQ/freshness signals, RSS, llms.txt) and a reusable infographic MDX component library for blog posts.

**Architecture:** Metadata is layered: site-wide defaults in `app/layout.tsx` (title template, OG/Twitter), per-route `generateMetadata` overrides, and Next's `opengraph-image.tsx` file convention for generated card images. Structured data is centralized in `lib/structured-data.ts` with one canonical `Person` node (`@id: https://djy89.net/#person`) referenced by every other graph, emitted via a tiny `JsonLd` component. Infographics are prop-driven server components registered in `mdxComponents` so they can be used directly in `.mdx` files.

**Tech Stack:** Next.js 16.0.10 (App Router), React 19, TypeScript, Tailwind v4 (`@theme` tokens in `app/globals.css`), MDX via `next-mdx-remote/rsc`, `next/og` `ImageResponse`.

## Global Constraints

- Site URL is `https://djy89.net`. Operator identity: **Danny Yanko**, "Systems Architect & Automation Consultant". Social profiles: `https://linkedin.com/in/dyanko89`, `https://github.com/dyanko89`.
- Palette (from `app/globals.css`): background `#0a0f12`, background-elevated `#111a1f`, surface `#1a2329`, border `#2a3942`, foreground `#e8edef`, foreground-secondary `#a8b5bd`, muted-foreground `#6b7a85`, accent `#ff5722`.
- Tailwind utility classes `bg-background-elevated`, `bg-surface`, `border-border`, `text-foreground`, `text-foreground-secondary`, `text-muted-foreground`, `text-accent` all exist via `@theme` mapping — use them, do not hardcode hex in components (inline styles with hex are acceptable only inside `ImageResponse` JSX, which cannot use Tailwind).
- **No test framework exists in this repo and none is being added.** The test cycle for every task is: `npm run build` must pass, plus the curl/script verification steps given in the task. Run the dev server for curl checks with `npm run dev` (background), verify, then stop it.
- In `page.tsx` route params are a Promise (`params: Promise<{ slug: string }>`) — always `await params`.
- Copy style: use `--` (double dash), never em-dashes, in any user-visible copy.
- Work on branch `seo-aeo-infographics` off `main`. Commit at the end of every task with the message given in the task.
- Do not modify `content/projects/international-trading-platform.mdx.bak` (orphaned backup, out of scope) or any wireframe/card-display components.

---

## Phase 1 — Social metadata + OG images

### Task 1: Site-wide metadata defaults, title template, and head cleanup

**Files:**
- Modify: `app/layout.tsx:23-45`
- Delete: `app/head.tsx`
- Modify (title only): `app/services/page.tsx`, `app/about/page.tsx`, `app/blog/page.tsx`, `app/projects/page.tsx`, `app/cv/page.tsx`, `app/contact/layout.tsx`, `app/blog/[slug]/page.tsx:26-37`, `app/projects/[slug]/page.tsx:25-42`

**Interfaces:**
- Consumes: nothing.
- Produces: root metadata with `title.template: '%s | Danny Yanko'`, `openGraph` and `twitter` defaults that all child routes inherit. Every child page must now export a **plain** title (no `| Danny Yanko` suffix).

- [ ] **Step 1: Replace the metadata and viewport exports in `app/layout.tsx`**

Replace the existing `export const metadata` (lines 23-38) and `export const viewport` (lines 40-45) with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://djy89.net'),
  title: {
    default: 'Danny Yanko | Systems Architect & Automation Consultant',
    template: '%s | Danny Yanko',
  },
  description: 'Automation for businesses tired of wasting time on work that shouldn\'t exist.',
  authors: [{ name: 'Danny Yanko', url: 'https://djy89.net' }],
  creator: 'Danny Yanko',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://djy89.net',
    siteName: 'Danny Yanko',
    title: 'Danny Yanko | Systems Architect & Automation Consultant',
    description: 'Automation for businesses tired of wasting time on work that shouldn\'t exist.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danny Yanko | Systems Architect & Automation Consultant',
    description: 'Automation for businesses tired of wasting time on work that shouldn\'t exist.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-dark.png', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon-light.png', media: '(prefers-color-scheme: light)' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0f12',
}
```

(Changes: `title` becomes default+template object; `authors`/`creator` added; `alternates.types` added — the `/feed.xml` route arrives in Task 8, a dangling link until then is harmless; `openGraph` and `twitter` blocks added; `maximumScale: 1` removed from viewport — it blocks pinch-zoom, an accessibility failure.)

- [ ] **Step 2: Delete `app/head.tsx`**

```bash
git rm app/head.tsx
```

It is dead code — the App Router ignores `head.tsx` when the metadata API is in use, and it references a different favicon (`/assets/djy89.svg`) than `layout.tsx` does.

- [ ] **Step 3: De-suffix every child page title**

The template now appends `| Danny Yanko`; leaving the manual suffix would render "Services | Danny Yanko | Danny Yanko". Edit each file's metadata title:

| File | Old title | New title |
|---|---|---|
| `app/services/page.tsx` | `"Services \| Danny Yanko"` | `"Services"` |
| `app/about/page.tsx` | `"About \| Danny Yanko"` (or similar) | `"About"` |
| `app/blog/page.tsx` | `"Blog \| Danny Yanko"` (or similar) | `"Blog"` |
| `app/projects/page.tsx` | `"Projects \| Danny Yanko"` (or similar) | `"Projects"` |
| `app/cv/page.tsx` | `"CV \| Danny Yanko"` (or similar) | `"CV"` |
| `app/contact/layout.tsx` | `"Contact \| Danny Yanko"` (or similar) | `"Contact"` |

Read each file first — the exact old strings may differ slightly; the rule is: strip everything from `" | "` onward. In `app/blog/[slug]/page.tsx` `generateMetadata`, change `` title: `${blog.title} | Danny Yanko` `` to `title: blog.title`. In `app/projects/[slug]/page.tsx` `generateMetadata`, change `` title: `${project.title} | Projects | Danny Yanko` `` to `title: project.title` and the not-found branch `"Project Not Found | Danny Yanko"` to `"Project Not Found"`.

- [ ] **Step 4: Build and verify**

```bash
npm run build
```
Expected: build succeeds, no type errors.

```bash
npm run dev   # background
curl -s http://localhost:3000/services | grep -o '<title>[^<]*</title>'
curl -s http://localhost:3000 | grep -o 'property="og:site_name" content="[^"]*"'
```
Expected: `<title>Services | Danny Yanko</title>` (suffix applied once) and `property="og:site_name" content="Danny Yanko"`. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(seo): site-wide OG/Twitter defaults, title template, remove dead head.tsx"
```

---

### Task 2: Dynamic OG image pipeline

**Files:**
- Create: `assets/fonts/Ubuntu-Bold.ttf` (downloaded)
- Create: `lib/og/og-card.tsx`
- Create: `app/opengraph-image.tsx`
- Create: `app/blog/[slug]/opengraph-image.tsx`
- Create: `app/projects/[slug]/opengraph-image.tsx`

**Interfaces:**
- Consumes: `getBlogPost`, `getProject` from `@/lib/mdx/content`.
- Produces: `ogCard({ title, subtitle?, tag? }): Promise<ImageResponse>` and `OG_SIZE = { width: 1200, height: 630 }` from `@/lib/og/og-card`. Route URLs `/opengraph-image`, `/blog/<slug>/opengraph-image`, `/projects/<slug>/opengraph-image` (used by Task 5's schema as image fallbacks). The file convention auto-injects `og:image` and `twitter:image` tags — later tasks must NOT set `openGraph.images` manually on these routes.

- [ ] **Step 1: Download the Ubuntu Bold font**

```bash
mkdir -p assets/fonts
curl -L -o assets/fonts/Ubuntu-Bold.ttf "https://github.com/google/fonts/raw/main/ufl/ubuntu/Ubuntu-Bold.ttf"
ls -la assets/fonts/Ubuntu-Bold.ttf
```
Expected: file exists and is >100 KB. (Ubuntu is UFL-licensed; bundling the TTF is fine.)

- [ ] **Step 2: Create `lib/og/og-card.tsx`**

```tsx
import { ImageResponse } from 'next/og'
import fs from 'fs/promises'
import path from 'path'

export const OG_SIZE = { width: 1200, height: 630 }

interface OgCardProps {
  title: string
  subtitle?: string
  tag?: string
}

export async function ogCard({ title, subtitle, tag }: OgCardProps) {
  const fontData = await fs.readFile(
    path.join(process.cwd(), 'assets', 'fonts', 'Ubuntu-Bold.ttf')
  )

  const clippedSubtitle =
    subtitle && subtitle.length > 160 ? `${subtitle.slice(0, 157)}...` : subtitle

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0f12',
          padding: 64,
          fontFamily: 'Ubuntu',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 30, color: '#ff5722' }}>djy89.net</div>
          {tag ? (
            <div
              style={{
                fontSize: 24,
                color: '#6b7a85',
                border: '1px solid #2a3942',
                padding: '8px 20px',
              }}
            >
              {tag}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: title.length > 60 ? 52 : 64,
              color: '#e8edef',
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          {clippedSubtitle ? (
            <div style={{ fontSize: 28, color: '#a8b5bd', lineHeight: 1.4 }}>
              {clippedSubtitle}
            </div>
          ) : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 6, backgroundColor: '#ff5722' }} />
          <div style={{ fontSize: 24, color: '#6b7a85' }}>
            Danny Yanko -- Systems Architect &amp; Automation Consultant
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [{ name: 'Ubuntu', data: fontData, weight: 700 }],
    }
  )
}
```

- [ ] **Step 3: Create the three route files**

`app/opengraph-image.tsx`:

```tsx
import { ogCard, OG_SIZE } from '@/lib/og/og-card'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Danny Yanko -- Systems Architect & Automation Consultant'

export default function Image() {
  return ogCard({
    title: 'Systems Architect & Automation Consultant',
    subtitle: 'Automation for businesses tired of wasting time on work that shouldn\'t exist.',
  })
}
```

`app/blog/[slug]/opengraph-image.tsx`:

```tsx
import { getBlogPost } from '@/lib/mdx/content'
import { ogCard, OG_SIZE } from '@/lib/og/og-card'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Blog post by Danny Yanko'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  return ogCard({
    title: post?.title ?? 'Blog',
    subtitle: post?.summary,
    tag: post?.tags?.[0] ?? 'Blog',
  })
}
```

`app/projects/[slug]/opengraph-image.tsx`:

```tsx
import { getProject } from '@/lib/mdx/content'
import { ogCard, OG_SIZE } from '@/lib/og/og-card'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Project by Danny Yanko'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  return ogCard({
    title: project?.title ?? 'Projects',
    subtitle: project?.summary,
    tag: project?.status ?? 'Project',
  })
}
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```
Expected: success.

```bash
npm run dev   # background
curl -s -o /tmp/og.png -w "%{http_code} %{content_type}" http://localhost:3000/blog/four-kilobyte-reads/opengraph-image
curl -s http://localhost:3000/blog/four-kilobyte-reads | grep -o 'property="og:image" content="[^"]*"'
```
Expected: `200 image/png`, and an `og:image` tag pointing at the opengraph-image URL. Open `/tmp/og.png` (or the URL in a browser) and visually confirm: dark card, orange `djy89.net`, post title, tag chip. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add assets/fonts/Ubuntu-Bold.ttf lib/og/og-card.tsx app/opengraph-image.tsx "app/blog/[slug]/opengraph-image.tsx" "app/projects/[slug]/opengraph-image.tsx"
git commit -m "feat(seo): dynamic OG card images for site, blog posts, and projects"
```

---

### Task 3: Article-level Open Graph metadata

**Files:**
- Modify: `app/blog/[slug]/page.tsx:26-37` (`generateMetadata`)
- Modify: `app/projects/[slug]/page.tsx:25-42` (`generateMetadata`)

**Interfaces:**
- Consumes: Task 1's inherited `twitter` defaults (do not redefine `twitter` here); Task 2's auto-injected images (do not set `openGraph.images`).
- Produces: `og:type=article` + `article:published_time` + `article:tag` on posts and projects.

- [ ] **Step 1: Update blog `generateMetadata`**

In `app/blog/[slug]/page.tsx`, replace the return of `generateMetadata` with:

```tsx
  return {
    title: blog.title,
    description: blog.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/blog/${slug}`,
      siteName: 'Danny Yanko',
      title: blog.title,
      description: blog.summary,
      publishedTime: blog.publishedAt,
      authors: ['Danny Yanko'],
      tags: blog.tags,
    },
  }
```

(Note: `openGraph` replaces the parent's whole `openGraph` object — Next merges metadata shallowly — so `siteName`/`title`/`description` must be restated here.)

- [ ] **Step 2: Update project `generateMetadata`**

In `app/projects/[slug]/page.tsx`, replace the success-path return with:

```tsx
  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: 'article',
      url: `/projects/${slug}`,
      siteName: 'Danny Yanko',
      title: project.title,
      description: project.summary,
      publishedTime: project.publishedAt,
      authors: ['Danny Yanko'],
      tags: project.tags,
    },
  }
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
npm run dev   # background
curl -s http://localhost:3000/blog/four-kilobyte-reads | grep -oE 'property="(og:type|article:published_time|og:title)" content="[^"]*"'
```
Expected: `og:type` = `article`, `article:published_time` = `2026-07-12`, `og:title` = the post title. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add "app/blog/[slug]/page.tsx" "app/projects/[slug]/page.tsx"
git commit -m "feat(seo): article-level Open Graph metadata on posts and projects"
```

---

## Phase 2 — Structured data (JSON-LD)

### Task 4: JSON-LD foundation — Person + WebSite on the homepage

**Files:**
- Create: `components/json-ld.tsx`
- Create: `lib/structured-data.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `BlogPost`, `Project` types from `@/lib/mdx/types`.
- Produces: `JsonLd({ data }: { data: object | object[] })` component; from `lib/structured-data.ts`: `SITE_URL: string`, `PERSON_ID: string`, `personJsonLd: object`, `websiteJsonLd: object`, `blogPostingJsonLd(post: BlogPost): object`, `projectJsonLd(project: Project): object`, `breadcrumbJsonLd(items: { name: string; path: string }[]): object`, `servicesJsonLd: object[]`, `faqPageJsonLd(faq: { q: string; a: string }[], url: string): object`. Tasks 5 and 7 import these exact names.

- [ ] **Step 1: Create `components/json-ld.tsx`**

```tsx
export function JsonLd({ data }: { data: object | object[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
```

- [ ] **Step 2: Create `lib/structured-data.ts`**

```ts
import { BlogPost, Project } from "@/lib/mdx/types";

export const SITE_URL = "https://djy89.net";
export const PERSON_ID = `${SITE_URL}/#person`;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Danny Yanko",
  url: SITE_URL,
  jobTitle: "Systems Architect & Automation Consultant",
  description:
    "Systems architect and automation consultant. Builds automation for businesses tired of wasting time on work that shouldn't exist.",
  sameAs: [
    "https://linkedin.com/in/dyanko89",
    "https://github.com/dyanko89",
  ],
  knowsAbout: [
    "Business process automation",
    "AI agent systems",
    "Multi-agent orchestration",
    "Next.js",
    "TypeScript",
    "Technical project management",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Danny Yanko",
  publisher: { "@id": PERSON_ID },
};

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.image
      ? `${SITE_URL}${post.image}`
      : `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    keywords: post.tags?.join(", "),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}/projects/${project.slug}`,
    datePublished: project.publishedAt,
    image: project.image
      ? `${SITE_URL}${project.image}`
      : `${SITE_URL}/projects/${project.slug}/opengraph-image`,
    keywords: project.tags?.join(", "),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export const servicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Automation & Consulting",
    serviceType: "Business process automation consulting",
    provider: { "@id": PERSON_ID },
    url: `${SITE_URL}/services`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technical Project Management",
    serviceType: "Technical project management",
    provider: { "@id": PERSON_ID },
    url: `${SITE_URL}/services`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Full-Stack Development",
    serviceType: "Full-stack web application development",
    provider: { "@id": PERSON_ID },
    url: `${SITE_URL}/services`,
  },
];

export function faqPageJsonLd(faq: { q: string; a: string }[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
```

- [ ] **Step 3: Inject Person + WebSite on the homepage**

In `app/page.tsx`, add imports and render `JsonLd` as the first child of the returned `<main>`:

```tsx
import { JsonLd } from "@/components/json-ld"
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data"
```

```tsx
    <main className="min-h-screen">
      <JsonLd data={[personJsonLd, websiteJsonLd]} />
      <Navigation />
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
npm run dev   # background
curl -s http://localhost:3000 | grep -c 'application/ld+json'
curl -s http://localhost:3000 | grep -o '"@type":"Person"'
```
Expected: count >= 2, and `"@type":"Person"` present. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add components/json-ld.tsx lib/structured-data.ts app/page.tsx
git commit -m "feat(seo): JSON-LD foundation -- Person and WebSite schema on homepage"
```

---

### Task 5: Content-page schemas + validation script

**Files:**
- Modify: `app/blog/[slug]/page.tsx`
- Modify: `app/projects/[slug]/page.tsx`
- Modify: `app/services/page.tsx`
- Create: `scripts/validate-jsonld.mjs`

**Interfaces:**
- Consumes: `JsonLd`, `blogPostingJsonLd`, `projectJsonLd`, `breadcrumbJsonLd`, `servicesJsonLd` from Task 4 (exact names).
- Produces: every blog post page emits `BlogPosting` + `BreadcrumbList`; every project page emits `CreativeWork` + `BreadcrumbList`; services page emits three `Service` graphs. `scripts/validate-jsonld.mjs` exits 0 when all pages carry parseable JSON-LD.

- [ ] **Step 1: Inject schema on blog post pages**

In `app/blog/[slug]/page.tsx` add imports:

```tsx
import { JsonLd } from "@/components/json-ld"
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/structured-data"
```

In the component's return, immediately after the opening `<>` (before `<Navigation />`):

```tsx
      <JsonLd
        data={[
          blogPostingJsonLd(blog),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: blog.title, path: `/blog/${slug}` },
          ]),
        ]}
      />
```

- [ ] **Step 2: Inject schema on project pages**

In `app/projects/[slug]/page.tsx` add imports:

```tsx
import { JsonLd } from "@/components/json-ld"
import { projectJsonLd, breadcrumbJsonLd } from "@/lib/structured-data"
```

Read the file to find the component's top-level return; insert as its first child (same pattern as Step 1):

```tsx
      <JsonLd
        data={[
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: project.title, path: `/projects/${slug}` },
          ]),
        ]}
      />
```

- [ ] **Step 3: Inject schema on the services page**

In `app/services/page.tsx` add:

```tsx
import { JsonLd } from "@/components/json-ld"
import { servicesJsonLd, breadcrumbJsonLd } from "@/lib/structured-data"
```

First child of the page's top-level returned element:

```tsx
      <JsonLd
        data={[
          ...servicesJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
```

- [ ] **Step 4: Create `scripts/validate-jsonld.mjs`**

```js
// Validates that key pages emit parseable JSON-LD.
// Usage: node scripts/validate-jsonld.mjs [baseUrl]  (default http://localhost:3000)
const base = process.argv[2] ?? "http://localhost:3000";
const pages = [
  "/",
  "/blog/four-kilobyte-reads",
  "/projects/kopeng-self-curating-memory",
  "/services",
];

let failed = false;
for (const page of pages) {
  const res = await fetch(base + page);
  if (!res.ok) {
    console.error(`FAIL ${page}: HTTP ${res.status}`);
    failed = true;
    continue;
  }
  const html = await res.text();
  const blocks = [
    ...html.matchAll(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
    ),
  ].map((m) => m[1]);
  if (blocks.length === 0) {
    console.error(`FAIL ${page}: no JSON-LD found`);
    failed = true;
    continue;
  }
  for (const block of blocks) {
    try {
      const data = JSON.parse(block);
      console.log(`OK   ${page}: ${data["@type"] ?? "(untyped)"}`);
    } catch {
      console.error(`FAIL ${page}: unparseable JSON-LD`);
      failed = true;
    }
  }
}
process.exit(failed ? 1 : 0);
```

- [ ] **Step 5: Build and verify**

```bash
npm run build
npm run dev   # background
node scripts/validate-jsonld.mjs
```
Expected: `OK` lines for all four pages including types `Person`, `WebSite`, `BlogPosting`, `BreadcrumbList`, `CreativeWork`, `Service`; exit code 0. Optionally paste one page's HTML into https://validator.schema.org for a manual spot check. Stop the dev server.

- [ ] **Step 6: Commit**

```bash
git add "app/blog/[slug]/page.tsx" "app/projects/[slug]/page.tsx" app/services/page.tsx scripts/validate-jsonld.mjs
git commit -m "feat(seo): BlogPosting, CreativeWork, Service and breadcrumb JSON-LD"
```

---

## Phase 3 — Content pipeline: freshness, FAQ, RSS, llms.txt

### Task 6: `updatedAt` freshness field

**Files:**
- Modify: `lib/mdx/types.ts`
- Modify: `app/blog/[slug]/page.tsx` (header + `generateMetadata`)
- Modify: `lib/structured-data.ts` (`blogPostingJsonLd`)

**Interfaces:**
- Consumes: Task 4's `blogPostingJsonLd`.
- Produces: optional `updatedAt?: string` (ISO date) on `BlogPost` and `FrontMatter`; visible "Updated <date>" in post headers; `og:article:modified_time`; `dateModified` in schema.

- [ ] **Step 1: Add the field to types**

In `lib/mdx/types.ts`, add `updatedAt?: string;` directly after `publishedAt: string;` in **both** the `BlogPost` interface and the `FrontMatter` interface.

- [ ] **Step 2: Render it in the post header**

In `app/blog/[slug]/page.tsx`, inside the header's date row (after the read-time `<span>`), add:

```tsx
              {blog.updatedAt && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                  <span>Updated {formatDate(blog.updatedAt)}</span>
                </>
              )}
```

- [ ] **Step 3: Add `modifiedTime` to metadata**

In the same file's `generateMetadata`, inside the `openGraph` object after `publishedTime`, add:

```tsx
      modifiedTime: blog.updatedAt ?? blog.publishedAt,
```

- [ ] **Step 4: Use it in the schema**

In `lib/structured-data.ts` `blogPostingJsonLd`, change:

```ts
    dateModified: post.publishedAt,
```
to:
```ts
    dateModified: post.updatedAt ?? post.publishedAt,
```

- [ ] **Step 5: Build, verify, commit**

Temporarily add `updatedAt: "2026-07-19"` to `content/blog/four-kilobyte-reads.mdx` frontmatter, then:

```bash
npm run build
npm run dev   # background
curl -s http://localhost:3000/blog/four-kilobyte-reads | grep -o 'Updated July 19, 2026'
curl -s http://localhost:3000/blog/four-kilobyte-reads | grep -o '"dateModified":"2026-07-19"'
```
Expected: both matches found. **Revert the temporary frontmatter change**, stop the dev server, then:

```bash
git add lib/mdx/types.ts "app/blog/[slug]/page.tsx" lib/structured-data.ts
git commit -m "feat(content): optional updatedAt freshness field wired to UI, OG, and schema"
```

---

### Task 7: FAQ layer

**Files:**
- Modify: `lib/mdx/types.ts`
- Create: `components/blog/faq-section.tsx`
- Modify: `app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `JsonLd`, `faqPageJsonLd` from Task 4; `SITE_URL` from `lib/structured-data.ts`.
- Produces: `FaqItem { q: string; a: string }` type; optional `faq?: FaqItem[]` frontmatter; `FaqSection({ faq, slug })` component that renders a visible FAQ block AND emits `FAQPage` JSON-LD from the same data.

- [ ] **Step 1: Add the type**

In `lib/mdx/types.ts`, add at the top of the file:

```ts
export interface FaqItem {
  q: string;
  a: string;
}
```

Then add `faq?: FaqItem[];` to **both** `BlogPost` and `FrontMatter` (after `seriesOrder`).

- [ ] **Step 2: Create `components/blog/faq-section.tsx`**

```tsx
import { JsonLd } from "@/components/json-ld"
import { faqPageJsonLd, SITE_URL } from "@/lib/structured-data"
import { FaqItem } from "@/lib/mdx/types"

export function FaqSection({ faq, slug }: { faq: FaqItem[]; slug: string }) {
  return (
    <section className="mt-16 border-t border-border pt-10">
      <JsonLd data={faqPageJsonLd(faq, `${SITE_URL}/blog/${slug}`)} />
      <h2 className="text-2xl font-semibold text-foreground mb-6">FAQ</h2>
      <dl className="space-y-6">
        {faq.map((item) => (
          <div key={item.q}>
            <dt className="text-foreground font-medium mb-2">{item.q}</dt>
            <dd className="text-foreground-secondary leading-relaxed">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
```

- [ ] **Step 3: Render it on post pages**

In `app/blog/[slug]/page.tsx`, import:

```tsx
import { FaqSection } from "@/components/blog/faq-section"
```

Inside the two-column grid, directly after `{content}` inside the `<article>` element's closing tag — i.e. immediately after `</article>` is wrong; place it INSIDE the left column by wrapping: put it after the `<article>...</article>` block but still inside the grid's first column. The grid's first column is the `<article>` itself, so instead place it after the closing `</div>` of the grid, constrained to prose width:

```tsx
        {blog.faq && blog.faq.length > 0 && (
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div className="max-w-3xl">
              <FaqSection faq={blog.faq} slug={slug} />
            </div>
          </div>
        )}
```

Insert this between the closing `</div>` of the `max-w-7xl` container and the `{relatedPosts.length > 0 && ...}` block.

- [ ] **Step 4: Build, verify, commit**

Temporarily add to `content/blog/four-kilobyte-reads.mdx` frontmatter:

```yaml
faq:
  - q: "Why was the Rust disk scanner slow?"
    a: "Three compounding causes -- the parallel walk serialized on a shared arena, every file cost three kernel round-trips, and the NTFS fast path read 4 KB per syscall. Fixing all three took the same scan from 144.8 seconds to 11.8."
```

```bash
npm run build
npm run dev   # background
curl -s http://localhost:3000/blog/four-kilobyte-reads | grep -o '"@type":"FAQPage"'
curl -s http://localhost:3000/blog/four-kilobyte-reads | grep -o 'Why was the Rust disk scanner slow?' | head -2
```
Expected: `FAQPage` found; question appears twice (visible + schema). Decide whether to keep this FAQ permanently (recommended -- it is a genuine AEO asset) or revert; if kept, it stays in the Task 11 commit scope. Stop the dev server.

```bash
git add lib/mdx/types.ts components/blog/faq-section.tsx "app/blog/[slug]/page.tsx"
git commit -m "feat(content): per-post FAQ frontmatter with visible section and FAQPage schema"
```

---

### Task 8: RSS feed

**Files:**
- Create: `app/feed.xml/route.ts`

**Interfaces:**
- Consumes: `getAllBlogPosts` from `@/lib/mdx/content`. The `alternates.types` link was already added in Task 1.
- Produces: RSS 2.0 document at `/feed.xml`, statically generated at build.

- [ ] **Step 1: Create `app/feed.xml/route.ts`**

```ts
import { getAllBlogPosts } from "@/lib/mdx/content";

export const dynamic = "force-static";

const SITE_URL = "https://djy89.net";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getAllBlogPosts();

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <description>${escapeXml(post.summary)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Danny Yanko -- Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Systems architecture, automation, and AI agent systems -- essays from the field.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
npm run dev   # background
curl -s -w "\n%{content_type}\n" http://localhost:3000/feed.xml | head -20
```
Expected: valid RSS XML listing all posts (newest first), content type `application/rss+xml`. Optionally validate at https://validator.w3.org/feed/. Stop the dev server.

- [ ] **Step 3: Commit**

```bash
git add app/feed.xml/route.ts
git commit -m "feat(content): RSS 2.0 feed at /feed.xml"
```

---

### Task 9: llms.txt + services.md

**Files:**
- Create: `app/llms.txt/route.ts`
- Create: `public/services.md`

**Interfaces:**
- Consumes: `getAllBlogPosts`, `getAllProjects` from `@/lib/mdx/content`.
- Produces: `/llms.txt` (generated from content at build, per llmstxt.org format) and `/services.md` (static, machine-readable service catalog for AI agents).

- [ ] **Step 1: Create `app/llms.txt/route.ts`**

```ts
import { getAllBlogPosts, getAllProjects } from "@/lib/mdx/content";

export const dynamic = "force-static";

const SITE_URL = "https://djy89.net";

export async function GET() {
  const posts = await getAllBlogPosts();
  const projects = await getAllProjects();

  const body = `# Danny Yanko -- djy89.net

> Systems architect and automation consultant. Builds automation for businesses tired of wasting time on work that shouldn't exist -- AI agent systems, business process automation, and full-stack development.

## Services

- [Services](${SITE_URL}/services): AI Automation & Consulting, Technical Project Management, Full-Stack Development. Machine-readable summary: ${SITE_URL}/services.md
- [Contact](${SITE_URL}/contact): Project inquiries and consultations

## Projects

${projects
  .map(
    (p) => `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.summary}`
  )
  .join("\n")}

## Blog

${posts
  .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.summary}`)
  .join("\n")}

## Optional

- [About](${SITE_URL}/about)
- [CV](${SITE_URL}/cv)
- [RSS feed](${SITE_URL}/feed.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

- [ ] **Step 2: Create `public/services.md`**

First read `app/services/page.tsx` and copy its actual service descriptions and process-step copy so this file matches the live page. Structure:

```markdown
# Services -- Danny Yanko (djy89.net)

Systems architect and automation consultant. Engagements are project-based; pricing is scoped per project after a discovery call.

## AI Automation & Consulting
<one-paragraph description copied from the services page>

## Technical Project Management
<one-paragraph description copied from the services page>

## Full-Stack Development
<one-paragraph description copied from the services page>

## Process
1. Discovery -- <copy from page>
2. Strategy -- <copy from page>
3. Build -- <copy from page>
4. Iterate -- <copy from page>

## Contact
- Form: https://djy89.net/contact
```

(The `<...>` placeholders above are instructions to the implementer, not literal text — fill each from the real copy in `app/services/page.tsx` before committing. Do not invent pricing figures; the site publishes none.)

- [ ] **Step 3: Build and verify**

```bash
npm run build
npm run dev   # background
curl -s http://localhost:3000/llms.txt | head -15
curl -s http://localhost:3000/services.md | head -10
```
Expected: llms.txt starts with `# Danny Yanko -- djy89.net` and lists all projects and posts; services.md returns the markdown with no unfilled `<...>` placeholders. Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add app/llms.txt/route.ts public/services.md
git commit -m "feat(aeo): llms.txt generated from content and machine-readable services.md"
```

---

## Phase 4 — Infographic MDX components

### Task 10: Infographic component library

**Files:**
- Create: `components/mdx/infographics.tsx`
- Modify: `components/mdx-components.tsx`

**Interfaces:**
- Consumes: existing Tailwind theme utility classes only. No client JS, no new dependencies.
- Produces: five server components usable directly in `.mdx` files: `StatRow`, `BeforeAfter`, `FlowStack`, `KeyTakeaways`, `Timeline` (prop signatures below). Registered into `mdxComponents` so MDX resolves them by name.

- [ ] **Step 1: Create `components/mdx/infographics.tsx`**

```tsx
import { ReactNode } from "react"

// Shared wrapper: bordered figure that escapes prose styling, with an
// uppercase tracked caption bar -- ported from the Aspen Figure pattern,
// restyled to this site's dark palette.
function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="not-prose my-10 border border-border bg-background-elevated">
      <div className="p-6 md:p-8">{children}</div>
      {caption && (
        <figcaption className="border-t border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export interface Stat {
  value: string
  label: string
  detail?: string
}

// Big-number stat tiles: <StatRow stats={[{value:"144.8s → 11.8s", label:"Scan time"}]} />
export function StatRow({ stats, caption }: { stats: Stat[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px",
        }}
        className="bg-border"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background-elevated p-5">
            <div className="font-mono text-2xl md:text-3xl text-accent">{stat.value}</div>
            <div className="mt-2 text-sm font-medium text-foreground">{stat.label}</div>
            {stat.detail && (
              <div className="mt-1 text-xs text-muted-foreground">{stat.detail}</div>
            )}
          </div>
        ))}
      </div>
    </Figure>
  )
}

export interface Panel {
  title: string
  items: string[]
}

// Two-panel comparison: <BeforeAfter before={{title, items}} after={{title, items}} />
export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: Panel
  after: Panel
  caption?: string
}) {
  return (
    <Figure caption={caption}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-border bg-surface p-5">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {before.title}
          </div>
          <ul className="space-y-2">
            {before.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground-secondary">
                <span className="text-muted-foreground" aria-hidden>&minus;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-accent/30 bg-surface p-5">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
            {after.title}
          </div>
          <ul className="space-y-2">
            {after.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground">
                <span className="text-accent" aria-hidden>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Figure>
  )
}

export interface FlowStep {
  title: string
  detail?: string
}

// Vertical narrowing flow (funnel/pipeline): <FlowStack steps={[{title, detail}]} />
export function FlowStack({ steps, caption }: { steps: FlowStep[]; caption?: string }) {
  const minWidth = 55
  return (
    <Figure caption={caption}>
      <div className="flex flex-col items-center gap-1">
        {steps.map((step, i) => {
          const width =
            steps.length === 1
              ? 100
              : 100 - ((100 - minWidth) / (steps.length - 1)) * i
          return (
            <div key={step.title} className="flex w-full flex-col items-center gap-1">
              {i > 0 && <div className="text-muted-foreground" aria-hidden>&darr;</div>}
              <div
                className="border border-border bg-surface p-4 text-center"
                style={{ width: `${width}%`, minWidth: "240px" }}
              >
                <div className="text-sm font-medium text-foreground">{step.title}</div>
                {step.detail && (
                  <div className="mt-1 text-xs text-foreground-secondary">{step.detail}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Figure>
  )
}

// Boxed summary list -- doubles as an AEO answer block:
// <KeyTakeaways items={["...", "..."]} />
export function KeyTakeaways({ items, caption }: { items: string[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <div className="border-l-2 border-accent pl-5">
        <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Key takeaways
        </div>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground-secondary">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Figure>
  )
}

export interface TimelineEvent {
  marker: string
  title: string
  detail?: string
}

// Vertical chronology: <Timeline events={[{marker:"09:15", title, detail}]} />
export function Timeline({ events, caption }: { events: TimelineEvent[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <ol className="relative space-y-6 border-l border-border pl-6">
        {events.map((event) => (
          <li key={`${event.marker}-${event.title}`} className="relative">
            <span
              className="absolute -left-[27px] top-1.5 h-2 w-2 bg-accent"
              aria-hidden
            />
            <div className="font-mono text-xs text-muted-foreground">{event.marker}</div>
            <div className="mt-1 text-sm font-medium text-foreground">{event.title}</div>
            {event.detail && (
              <div className="mt-1 text-sm text-foreground-secondary">{event.detail}</div>
            )}
          </li>
        ))}
      </ol>
    </Figure>
  )
}
```

- [ ] **Step 2: Register in `components/mdx-components.tsx`**

Add the import at the top:

```tsx
import { StatRow, BeforeAfter, FlowStack, KeyTakeaways, Timeline } from "@/components/mdx/infographics"
```

Add the components to the `mdxComponents` object (after the `code` entry):

```tsx
  StatRow,
  BeforeAfter,
  FlowStack,
  KeyTakeaways,
  Timeline,
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```
Expected: success (components compile; nothing uses them yet — that is Task 11).

- [ ] **Step 4: Commit**

```bash
git add components/mdx/infographics.tsx components/mdx-components.tsx
git commit -m "feat(blog): infographic MDX component library (StatRow, BeforeAfter, FlowStack, KeyTakeaways, Timeline)"
```

---

### Task 11: Retrofit one post as end-to-end proof

**Files:**
- Modify: `content/blog/four-kilobyte-reads.mdx`

**Interfaces:**
- Consumes: `StatRow`, `KeyTakeaways` from Task 10 (via MDX name resolution — no imports in MDX files).

- [ ] **Step 1: Add a StatRow after the intro section**

In `content/blog/four-kilobyte-reads.mdx`, after the last paragraph of the `## "It Feels Pretty Slow"` section (after "The findings ranked themselves."), insert:

```mdx
<StatRow
  caption="Same volume, same totals -- before and after the sweep"
  stats={[
    { value: "144.8s", label: "Before", detail: "Full-volume scan, cold cache" },
    { value: "11.8s", label: "After", detail: "All three fixes landed" },
    { value: "2M", label: "Nodes", detail: "Test tree size" },
    { value: "0", label: "Syscalls per file", detail: "Directory-level enumeration" },
  ]}
/>
```

- [ ] **Step 2: Add KeyTakeaways at the end of the post**

Read the post to find its final section; append after the last paragraph:

```mdx
<KeyTakeaways
  items={[
    "A rayon pool over a shared &mut arena is sequential in disguise -- profile the structure, not the API.",
    "Per-file syscalls are the enemy on Windows; one directory-level FileIdExtdDirectoryInfo query replaces three calls per file.",
    "Wrapper crates can throttle a fast path invisibly -- the MFT reader was capped at 4 KB per read by its default buffer.",
    "Multi-agent review found all three independently; ranking the findings against each other is what made the fix order obvious.",
  ]}
/>
```

(Adjust wording against the post's actual closing content if it reads redundantly — the takeaways must stay factually consistent with the essay.)

- [ ] **Step 3: Build and verify visually**

```bash
npm run build
npm run dev   # background
curl -s http://localhost:3000/blog/four-kilobyte-reads | grep -o 'Key takeaways'
```
Expected: match found. Then open `http://localhost:3000/blog/four-kilobyte-reads` in a browser and confirm: stat tiles render full-width outside prose styling, monospace accent numerals, takeaways box with accent left border, both look correct at mobile width (devtools, 375px). Stop the dev server.

- [ ] **Step 4: Commit**

```bash
git add content/blog/four-kilobyte-reads.mdx
git commit -m "content(blog): add StatRow and KeyTakeaways infographics to four-kilobyte-reads"
```

---

## Phase 5 — Documentation

### Task 12: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Correct the stack description**

In the Project Overview section, change "Next.js 14 (App Router)" to "Next.js 16 (App Router)" and note React 19 + Tailwind v4 (`@theme` tokens in `app/globals.css`).

- [ ] **Step 2: Document the new SEO layer**

Add a new `## SEO & Structured Data` section covering, briefly:

- Root metadata in `app/layout.tsx` uses `title.template` — child pages export plain titles without the `| Danny Yanko` suffix.
- OG images: `lib/og/og-card.tsx` + `opengraph-image.tsx` file convention (root, blog, projects). Do not set `openGraph.images` manually on those routes.
- JSON-LD: `components/json-ld.tsx` + `lib/structured-data.ts`; every graph references the canonical `@id: https://djy89.net/#person` node. Validation: `node scripts/validate-jsonld.mjs` against a running dev server.
- `/feed.xml` (RSS, generated from blog content), `/llms.txt` (generated), `public/services.md` (manual — update when the services page changes).

- [ ] **Step 3: Document the new frontmatter fields and infographic components**

In the existing "Adding Content / New Blog Post" section, extend the frontmatter example with the optional fields:

```yaml
updatedAt: "2026-07-19"        # Optional -- shows "Updated" date, feeds dateModified schema
faq:                            # Optional -- renders FAQ section + FAQPage JSON-LD
  - q: "Question phrased how people search?"
    a: "Self-contained 40-60 word answer that works out of context."
```

Add a `### Infographic Components (MDX)` subsection listing the five components with one-line prop summaries and one usage example (the `StatRow` from Task 11). Note: server components in `components/mdx/infographics.tsx`, registered in `components/mdx-components.tsx`, no imports needed inside MDX files.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: document SEO layer, new frontmatter fields, and infographic components"
```

---

## Completion checklist

After all tasks: `npm run build` passes; `node scripts/validate-jsonld.mjs` passes against a running server; a shared blog URL previews correctly in an OG debugger (e.g. opengraph.xyz); `/feed.xml`, `/llms.txt`, `/services.md` all resolve. Merge `seo-aeo-infographics` into `main` only after Danny reviews the rendered infographics and OG cards -- both are brand-visible surfaces.
