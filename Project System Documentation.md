---
title: "Project System Documentation - dyanko89-ca"
created: 2025-01-02
updated: 2025-01-02
status: active
type: documentation
tags: [dyanko89-ca, projects, mdx, nextjs, portfolio, documentation]
---
# Project System Documentation - dyanko89-ca

## Overview

The dyanko89-ca portfolio website features a sophisticated MDX-based project showcase system that combines dynamic content management with a polished, interactive user experience. This document explains how the project system operates and how to use it effectively.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [File Structure](#file-structure)
3. [How to Create a Project](#how-to-create-a-project)
4. [Project Features](#project-features)
5. [Project Page Components](#project-page-components)
6. [Technical Implementation](#technical-implementation)
7. [Styling and Design](#styling-and-design)
8. [Project Customization](#project-customization)
9. [Common Tasks](#common-tasks)
10. [Troubleshooting](#troubleshooting)
11. [Enhancement Opportunities](#enhancement-opportunities)

## System Architecture

### Technology Stack

- **Content Format**: MDX (Markdown + JSX)
- **Framework**: Next.js 14 with App Router
- **Rendering**: Server-side rendering (SSR) with client-side interactions
- **UI Components**: Custom components with Lucide React icons
- **Content Processing**: gray-matter for frontmatter parsing
- **MDX Processing**: Custom MDX rendering with syntax highlighting
- **Animations**: CSS animations with Intersection Observer

### Data Flow

```
content/projects/*.mdx → gray-matter → getAllProjects() → Projects Grid Page
                                    ↓
                              getProject() → Project Detail Page → Enhanced UI
                                                              ↓
                                                    Dynamic Stats & Timeline
```

## File Structure

```
dyanko89-ca/
├── app/
│   └── projects/
│       ├── page.tsx                      # Projects list (server component)
│       ├── projects-client.tsx           # Client-side grid with animations
│       └── [slug]/
│           ├── page.tsx                  # Project detail (server component)
│           └── project-detail-client.tsx # Enhanced client component
├── content/
│   └── projects/                         # All project MDX files
│       ├── ai-assistant.mdx
│       ├── ai-development-toolkit.mdx
│       ├── b2b-marketing-infrastructure.mdx
│       └── enterprise-lms.mdx
├── lib/
│   ├── mdx/
│   │   ├── content.ts                    # Project fetching functions
│   │   ├── mdx.tsx                       # MDX rendering config
│   │   └── types.ts                      # TypeScript interfaces
│   └── project-utils.ts                  # Project-specific utilities
```

## How to Create a Project

### Step 1: Create the MDX File

Create a new `.mdx` file in the `content/projects/` directory:

```bash
# Example: content/projects/my-awesome-project.mdx
```

**Important**: The filename becomes the URL slug. For example:
- `ai-assistant.mdx` → `/projects/ai-assistant`
- `new-saas-platform.mdx` → `/projects/new-saas-platform`

### Step 2: Add Frontmatter

Every project must start with frontmatter containing metadata:

```yaml
---
title: "Project Title Here"
publishedAt: YYYY-MM-DD
summary: "Compelling 1-2 sentence summary describing the project's impact and technology."
tags: ["Technology 1", "Technology 2", "Framework", "API"]
status: Live | Completed | Beta | Updated
---
```

**Required Fields:**

- `title` (string): The display title of your project
- `publishedAt` (string): Project completion/publication date in YYYY-MM-DD format
- `summary` (string): Brief description shown on project cards and detail header
- `tags` (array): Technologies and frameworks used (displayed as tech stack)
- `status` (string): Current project status (affects visual indicators)

### Step 3: Structure Your Content

After the frontmatter, structure your project content for maximum impact:

```markdown
# Project Title
*Tagline or brief descriptor*

## The Problem

Describe the challenge or opportunity that led to this project. Make it relatable and clear why this project matters.

## The Solution

Explain your approach and what makes it unique. Focus on the value delivered rather than just technical implementation.

### Core Architecture

Describe the technical approach with code examples:

```typescript
// Show key implementation details
interface ProjectStructure {
  feature: string;
  implementation: string;
}
```

### Key Features

Break down the main capabilities:

**Feature Name**
- What it does
- Why it matters
- Technical approach

### Results & Impact

Quantify the success with metrics and outcomes.

## Technical Deep Dive

Provide more detailed technical information for fellow developers.

## Future Enhancements

List planned improvements or next phases.
```

### Step 4: Configure Project-Specific Data

The project system automatically generates dynamic content based on the project slug. To customize:

1. **Background Images** - Add to `/lib/project-utils.ts`:
```typescript
const backgroundImages: Record<string, string> = {
  'your-project-slug': '/images/projects/your-project-bg.jpg',
};
```

2. **Project Metrics** - Update in `project-detail-client.tsx`:
```typescript
const metrics: Record<string, any[]> = {
  'your-project-slug': [
    { 
      icon: Clock, 
      value: '50%', 
      change: 'faster', 
      description: 'Performance improvement',
    },
    // Add more metrics
  ],
};
```

3. **Timeline Phases** - Add to the timeline configuration:
```typescript
const taskSets: Record<string, any[]> = {
  'your-project-slug': [
    {
      id: 'phase-0',
      phase: 'Research & Planning',
      status: 'completed',
      tasks: [
        { title: 'Market research', completed: true },
        { title: 'Technical feasibility', completed: true },
      ]
    },
    // Add more phases
  ],
};
```

## Project Features

### Projects Grid Page (`/projects`)

**Visual Features:**
- **Enhanced Card Design**: 360px height with sophisticated styling
- **Image Placeholders**: 96x96px areas ready for project screenshots
- **Status Badges**: Visual indicators for Live, Beta, Completed, Updated
- **Tech Tags**: Hashtag-style technology indicators
- **Hover Effects**: Fine dot grid pattern, card lift, border brightening
- **Scroll Animations**: Staggered fade-in as cards enter viewport
- **"View Project" Links**: Diagonal arrows (↗) appear on hover

### Project Detail Pages (`/projects/[slug]`)

**Page Components:**

1. **Enhanced Header**
   - Left-aligned title with gradient text effect
   - Right-aligned date and status badge
   - Tech stack tags below title
   - Summary text with optimal typography
   - Optional background image with opacity overlay

2. **Impact & Results Section**
   - Dynamic stat cards with icons
   - Project-specific metrics
   - Hover animations on cards
   - Responsive grid layout

3. **Project Timeline**
   - Collapsible phase system
   - Visual progress indicators
   - Sub-task listings
   - Status badges (completed/active/upcoming)
   - Smooth expand/collapse animations

4. **Content Section**
   - Enhanced prose styling
   - Syntax-highlighted code blocks
   - Responsive images (when added)
   - Optimal reading typography

5. **Call-to-Action**
   - Professional CTA card
   - Primary and secondary actions
   - Contact and portfolio navigation

## Technical Implementation

### Content Fetching Functions

**`getAllProjects()`** - Fetches all projects
```typescript
// Returns: Project[] sorted by date (newest first)
const projects = await getAllProjects();
```

**`getProject(slug)`** - Fetches a single project
```typescript
// Returns: Project | null
const project = await getProject("ai-assistant");
```

### Project Interface

```typescript
interface Project {
  slug: string;         // URL slug (from filename)
  title: string;        // Project title
  publishedAt: string;  // YYYY-MM-DD format
  summary: string;      // Brief description
  tags: string[];       // Technology stack
  status: string;       // Live | Completed | Beta | Updated
  content: string;      // Raw MDX content
  url: string;          // Full URL path (/projects/[slug])
}
```

### Component Architecture

**Server Components:**
- `/projects/page.tsx` - Fetches project data
- `/projects/[slug]/page.tsx` - Fetches individual project

**Client Components:**
- `/projects/projects-client.tsx` - Grid animations and interactions
- `/projects/[slug]/project-detail-client.tsx` - Interactive timeline, stats

### Animation System

**Scroll Animations:**
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
```

**Stagger Classes:**
- `.stagger-1` through `.stagger-5` for sequential animations
- `.fade-in-on-scroll` base class for all animated elements

## Styling and Design

### Design Principles

1. **Minimal Black/White Aesthetic**: Pure black (#000) background, white text
2. **Subtle Interactions**: Hover effects enhance without overwhelming
3. **Typography Hierarchy**: Clear visual hierarchy with opacity variations
4. **Professional Polish**: Attention to detail in spacing, animations, borders

### Key CSS Classes

**Grid Layout:**
- `.projects-page-grid`: Auto-fit grid with 380px minimum
- `.enhanced-project-card`: Fixed 360px height cards
- `.projects-page-container`: Top spacing for navigation

**Project Details:**
- `.project-detail-header`: Enhanced header with background support
- `.project-stats-grid`: Responsive metrics grid
- `.project-progress-container`: Timeline wrapper
- `.project-cta-card`: Call-to-action styling

**Interactive Elements:**
- Hover states with `rgba(255, 255, 255, 0.04)` overlays
- Border transitions from `0.1` to `0.15` opacity
- Transform effects with `translateY(-2px)` on hover
- Cubic-bezier easing: `cubic-bezier(0.4, 0, 0.2, 1)`

### Responsive Design

**Breakpoints:**
- Desktop: Full grid layout with hover effects
- Tablet (768px): 2-column stat grids, adjusted spacing
- Mobile (480px): Single column, optimized touch targets

## Project Customization

### Adding Custom Project Types

1. **Define Icon** - Add to project icons:
```typescript
const icons: Record<string, JSX.Element> = {
  'your-project-type': (
    <svg viewBox="0 0 24 24" fill="#000">
      {/* Your SVG path */}
    </svg>
  ),
};
```

2. **Create Metrics** - Define success indicators:
```typescript
'your-project-type': [
  { 
    icon: YourIcon, 
    value: 'Metric', 
    change: 'improvement', 
    description: 'What this measures',
  },
],
```

3. **Design Timeline** - Structure project phases:
```typescript
'your-project-type': [
  {
    id: 'phase-0',
    phase: 'Phase Name',
    status: 'completed',
    tasks: [
      { title: 'Task description', completed: true },
    ]
  },
],
```

### Customizing Status Indicators

**Available Statuses:**
- `Live`: Blue indicator (#0070f3)
- `Completed`: Green indicator (#10b981)
- `Beta`: Orange indicator (#ff6b35)
- `Updated`: Purple indicator (#7c3aed)

**Adding New Status:**
```css
.status-custom .status-indicator { 
  background: #your-color; 
}
```

## Common Tasks

### Adding Multiple Related Projects

For project series or related work:

```bash
# Create related projects with consistent naming
content/projects/platform-v1.mdx
content/projects/platform-v2.mdx
content/projects/platform-v3.mdx
```

### Updating Project Status

1. Edit the MDX file's frontmatter
2. Change `status: Beta` to `status: Live`
3. Optionally update `publishedAt` date
4. Changes reflect immediately in dev

### Featuring a Project

To highlight specific projects:

1. Adjust `publishedAt` to a more recent date
2. Or implement a `featured: true` field in frontmatter
3. Sort by featured status in `getAllProjects()`

### Adding Project Screenshots

1. Create image placeholder in `/public/images/projects/`
2. Update background image mapping in `project-utils.ts`
3. Reference in MDX content:
```markdown
![Project Screenshot](/images/projects/screenshot.png)
```

### Creating Project Categories

Extend the system with categories:

```yaml
---
title: "Project Name"
category: "AI Solutions" | "Web Development" | "Infrastructure"
# ... other frontmatter
---
```

Then filter in your fetching function:
```typescript
const aiProjects = projects.filter(p => p.category === 'AI Solutions');
```

## Troubleshooting

### Common Issues and Solutions

**Project not appearing in grid:**
- Verify MDX file is in `content/projects/`
- Check frontmatter syntax (valid YAML)
- Ensure all required fields present
- Look for build/console errors

**Timeline not expanding:**
- Check JavaScript console for errors
- Verify unique phase IDs
- Ensure click handlers attached

**Styling issues:**
- Clear browser cache
- Check CSS class names match
- Verify globals.css loaded
- Test in incognito mode

**Build errors:**
- Validate MDX syntax
- Check for unclosed tags
- Ensure proper TypeScript types
- Verify import paths

### Debug Checklist

```bash
# 1. Check file exists
ls content/projects/

# 2. Validate MDX syntax
npx mdx content/projects/your-project.mdx

# 3. Test build
npm run build

# 4. Check TypeScript
npm run type-check

# 5. View in browser
open http://localhost:3000/projects/your-project
```

## Enhancement Opportunities

### Quick Wins

1. **Real Project Images**: Replace placeholders with actual screenshots
2. **Live Demos**: Add demo links to project cards
3. **GitHub Links**: Include repository links
4. **Tech Stack Icons**: Use actual technology logos

### Medium Enhancements

1. **Filtering System**: Filter by technology, status, or category
2. **Search Function**: Full-text search across projects
3. **Related Projects**: Show similar projects on detail pages
4. **Project Gallery**: Image carousel for screenshots

### Advanced Features

1. **Case Study Mode**: Detailed long-form project stories
2. **Interactive Demos**: Embedded project demos
3. **Client Testimonials**: Add social proof sections
4. **Performance Metrics**: Real-time project statistics
5. **Version History**: Show project evolution

### SEO Enhancements

1. **Structured Data**: Add Project schema markup
2. **Social Cards**: Generate OG images per project
3. **Sitemap**: Include all projects
4. **Rich Snippets**: Enhance search appearance

## Quick Reference

### Create New Project Checklist

- [ ] Create `.mdx` file in `content/projects/`
- [ ] Add complete frontmatter
- [ ] Choose appropriate status
- [ ] List all technologies in tags
- [ ] Write compelling summary
- [ ] Structure content sections
- [ ] Add code examples
- [ ] Configure project metrics
- [ ] Design timeline phases
- [ ] Test locally
- [ ] Verify responsive design
- [ ] Check animations
- [ ] Build and deploy

### Project Naming Conventions

✅ **Good filenames:**
- `ai-assistant.mdx`
- `ecommerce-platform.mdx`
- `data-pipeline-v2.mdx`

❌ **Avoid:**
- Spaces in filenames
- Special characters (except hyphens)
- Generic names like `project1.mdx`
- Overly long filenames

### Content Guidelines

**Do:**
- Start with the problem/challenge
- Explain your unique approach
- Include technical details
- Show code snippets
- Quantify results
- Mention technologies used

**Don't:**
- Use excessive jargon
- Skip the "why" behind decisions
- Forget to proofread
- Leave placeholder content
- Ignore mobile experience

---

_This documentation reflects the enhanced project system implementation as of January 2025. Update as new features are added._
