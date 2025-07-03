# 🚀 Danny Yanko Portfolio – MVP Roadmap v2.0

## 🧠 Directive for Cline

> This document is your **primary source of truth** for developing the portfolio using the existing **Next.js project** and custom **CSS design system** defined in `app/globals.css`.

**⚠️ CRITICAL:**

* ❌ Do **NOT** use Tailwind CSS utility classes.
* ✅ Use the predefined global classes such as `.grid-container`, `.grid-cell`, `.btn`, `.badge`.

Your **first task** is to execute **Phase 0** in its entirety.

---

## ✅ Phase 0: Project Cleanup & Alignment

**Goal:** Prepare the codebase for new features by aligning it with the established design system.

### 🔧 Tasks

**1. Uninstall Unused Dependencies**

```bash
npm uninstall @geist-ui/core tailwindcss postcss autoprefixer
```

**2. Remove Configuration Files**

* `tailwind.config.ts`
* `postcss.config.js`

**3. Asset Management**

* Ensure logo used in `components/navigation.tsx` exists at `public/assets/logo.png`.
* Add a placeholder logo if missing.

**4. Confirm Operation**

```bash
npm run dev
```

Ensure the site still functions after cleanup.

---

## 📝 Phase 1: Blog System Implementation

**Goal:** Integrate a fully-featured, markdown-based blog system using the provided scaffold.

### 1. Install Dependencies

```bash
npm install contentlayer next-contentlayer rehype-pretty-code shiki
```

---

### 2. Create `contentlayer.config.ts`

```ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypePrettyCode from 'rehype-pretty-code';

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    summary: { type: 'string', required: true },
    image: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/', '')}`,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
  mdx: {
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
  },
});
```

---

### 3. Update `tsconfig.json`

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["./*"],
    "contentlayer/generated": ["./.contentlayer/generated"]
  }
},
"include": [
  "src",
  ".contentlayer/generated/**/*.ts"
]
```

---

### 4. Create Example Blog Post

**Path:** `content/blog/ai-automation-guide.mdx`

````mdx
---
title: "AI Automation That Actually Works"
publishedAt: "2024-05-15"
summary: "5 Real business cases that prove the power of practical, no-fluff AI integration."
image: "/assets/blog/hero-ai-automation.png"
---

## Why Most Automation Fails

Many automation efforts fail because they prioritize tools over outcomes. They chase the latest shiny object instead of identifying the core, repetitive task that is truly bottlenecking a workflow. To succeed, you must start with the pain point, not the platform.

### A Real-World Code Example

```ts
import { getTaskData } from './api/tasks';
import { summarizeWithAI } from './services/openai';

async function processDailyTasks() {
  const tasks = await getTaskData();
  const summary = await summarizeWithAI(tasks);
  return {
    processedAt: new Date().toISOString(),
    summary,
  };
}
````

````

---

### 5. Build Blog Listing Page: `app/blog/page.tsx`
```tsx
import { allBlogs } from 'contentlayer/generated';
import Link from 'next/link';

export default function BlogListPage() {
  const sortedBlogs = allBlogs.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="section">
      <div className="grid-container">
        <h1 className="text-heading-48" style={{ marginBottom: '48px' }}>From the Blog</h1>
        <div className="grid">
          {sortedBlogs.map((post) => (
            <Link key={post.slug} href={post.url} className="grid-cell span-6" style={{ textDecoration: 'none' }}>
              <h2 className="text-heading-20" style={{ marginBottom: '12px' }}>{post.title}</h2>
              <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>{post.summary}</p>
              <span className="text-label-14" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
````

---

### 6. Build Blog Detail Page: `app/blog/[slug]/page.tsx`

```tsx
import { allBlogs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const blog = allBlogs.find((p) => p.slug === params.slug);
  if (!blog) return {};
  return {
    title: `${blog.title} – Danny Yanko`,
    description: blog.summary,
  };
}

export default function BlogPostPage({ params }) {
  const blog = allBlogs.find((p) => p.slug === params.slug);
  if (!blog) notFound();

  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <div className="section">
      <div className="grid-container">
        <div className="grid-cell span-8 span-offset-2">
          <h1 className="text-heading-48 mb-4">{blog.title}</h1>
          <p className="text-copy-16 text-neutral-400 mb-8">
            Published on {new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="prose">
            <MDXContent />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 🚀 Phase 2: Next Steps

Once the Blog system is working:

### 🔹 Projects / Case Studies

* Create `Project` document type in Contentlayer
* Build `/projects` + `[slug]` pages
* This becomes the **core** of your portfolio

### 🔹 Contact Form

* Build form and `/api/contact` endpoint
* Use `react-hook-form`, `zod`, and `resend`

### 🔹 CV Page

* Create basic page for resume content (JSON or hardcoded)
* Include `.btn` to download a PDF

---

## ❓ Final Directive

Your **immediate and only goal** is to:

* ✅ Complete **Phase 0**
* ✅ Complete **Phase 1**

Once the blog is live and properly styled with the custom CSS, **report back** for the next set of directives.
