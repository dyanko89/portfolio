# 🚀 Danny Yanko Portfolio – MVP Roadmap v1.2 (Final)

## 🧠 Directive for Cline

> This document is your **primary source of truth** for developing the portfolio. It is based on the existing **Next.js project** using a **custom CSS design system** defined in `app/globals.css`.

**Important Constraints:**

* ❌ Do **not** use Tailwind utility classes.
* ❌ Do **not** use external component libraries.
* ✅ Do **leverage** predefined global classes (e.g. `.grid-container`, `.grid-cell`, `.btn`, `.badge`).

---

## ⚙️ Stack Overview

| Area            | Technology                         | Notes                                 |
| --------------- | ---------------------------------- | ------------------------------------- |
| Framework       | Next.js 14 + App Router            | Current implementation is solid.      |
| Styling         | Custom CSS Design System           | Use classes from `globals.css`.       |
| UI Components   | Custom React Components            | Build in the `/components` folder.    |
| Forms           | `react-hook-form`, `zod`, `resend` | To be implemented for contact form.   |
| Content Layer   | `contentlayer`                     | Powers Projects, Blog, and CV.        |
| SEO             | `next/metadata`, `next-sitemap`    | `generateMetadata` per-page required. |
| Markdown Syntax | `rehype-pretty-code`, `shiki`      | For syntax-highlighted code blocks.   |
| Hosting         | Vercel                             | Standard.                             |

---

## 🗂️ Page Prioritization

| Page     | Priority  | Effort | Target Phase | Dependencies                       |
| -------- | --------- | ------ | ------------ | ---------------------------------- |
| Projects | 🔥 High   | Medium | Phase 1      | Contentlayer setup, Project MD     |
| Contact  | 🔥 High   | Low    | Phase 1      | Resend API, react-hook-form        |
| CV       | ⚠️ Medium | Low    | Phase 2      | Resume content (JSON or MD)        |
| Blog     | ⚠️ Medium | High   | Phase 3      | Contentlayer, Shiki, Blog Markdown |

---

## ✅ Phase 0: Pre-flight & Cleanup

### 🔧 Tasks

**1. Dependency Cleanup**

```bash
npm uninstall @geist-ui/core tailwindcss postcss autoprefixer
```

**2. Remove Obsolete Files**

* `tailwind.config.ts`
* `postcss.config.js`

**3. Asset Fixes**

* Create `public/assets/`
* Move logo to `public/assets/logo.png`

**4. Confirm Setup**
Run:

```bash
npm run dev
```

Ensure build runs clean.

---

## 🧩 Phase 1 – Core Pages

### 🔧 Projects Page MVP

**Goal:** Showcase work in a filterable grid and individual project pages.

#### 📁 File Structure

```
app/projects/
├── page.tsx              # Project listing grid
├── [slug]/page.tsx       # Dynamic detail page
├── loading.tsx           # Skeleton loader

content/projects/
├── ai-assistant.md
├── enterprise-lms.md
```

#### ✅ Implementation Plan

**1. Configure Contentlayer**

* Create `contentlayer.config.ts`
* Define `Project` type with:

  * `title`, `publishedAt`, `summary`, `tags`, `status`, `image`

**2. Project Markdown Example**

```md
---
title: "Custom AI Assistant for Project Management"
publishedAt: "2024-05-10"
summary: "An AI tool that syncs emails, extracts tasks, and drafts responses."
tags: ["AI", "Automation", "Node.js"]
status: "Completed"
image: "/assets/projects/ai-assistant.png"
---

## The Problem
...
## The Solution
...
```

**3. Build the UI**

* Use `.grid-container` + `.grid-cell.span-6`
* Use `.badge` for tags + status
* Fetch project data from Contentlayer
* Use `generateStaticParams` + `generateMetadata`

---

### ✉️ Contact Page MVP

**Goal:** Allow professional inquiries with validated form + API handling.

#### ✅ Implementation Plan

**1. Install Dependencies**

```bash
npm install react-hook-form @hookform/resolvers zod resend react-hot-toast
```

**2. Form Setup**

* Use `react-hook-form` + `zod`
* Add styles to `globals.css` or reuse `.btn`, `.form-field`

**3. API Handler**

* Create `app/api/contact/route.ts`
* Validate payload → use Resend to send email

**4. Accessibility**

* Each input must have `<label for="">`
* Use `aria-describedby` and role attributes

---

## 📄 Phase 2 – CV Page

**Goal:** Render an interactive resume w/ PDF and timeline.

#### ✅ Implementation Plan

* Create `content/cv.json` for:

  * work history, education, skills
* Render with `.timeline`, `.grid-cell`
* Add `.btn.btn-primary` to download `/public/docs/danny-yanko-cv.pdf`

---

## 📝 Phase 3 – Blog System

**Goal:** Markdown-based publishing with categories, rich formatting, and code highlighting.

#### ✅ Implementation Plan

**1. Configure Contentlayer**

* Define `Post` type
* Use `rehype-pretty-code` with Shiki for syntax

**2. UI & Routing**

* Render `/blog/page.tsx` for listing
* Use `/blog/[slug]/page.tsx` for posts
* Add SEO via `generateMetadata`

**3. Example Blog MDX Frontmatter**

```md
---
title: "AI Automation That Actually Works"
description: "5 business cases proving practical AI."
slug: "ai-automation-guide"
date: "2025-06-15"
category: "AI"
readingTime: "4 min"
---
```

---

## 📈 Phase 4 – Polish & Metrics

| Feature              | Goal                                                          |
| -------------------- | ------------------------------------------------------------- |
| 404 & Loading States | Implement `not-found.tsx` and ensure every route has fallback |
| Lighthouse Audit     | 95+ across all categories                                     |
| Accessibility (a11y) | WCAG AA compliant + keyboard navigable                        |
| Sitemap              | Use `next-sitemap` to generate `sitemap.xml` + `robots.txt`   |

---

## 🧭 Final Directive for Cline

* ✅ **First:** Complete **Phase 0: Pre-flight & Cleanup**
* 🚀 **Then:** Begin work on **Phase 1 – Projects Page**