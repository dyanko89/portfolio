# 🚀 Portfolio Upgrade: Comprehensive Implementation Plan

## 🧠 I. Directive for Claude (or Assigned Dev)

Your role is to act as a **senior front-end developer** working within an existing codebase. The goal is to complete a full-site layout upgrade in the phased roadmap below.

### 🔒 Critical Constraints

- **Design System:**  
  Use only the global classes defined in `app/globals.css`.  
  (e.g., `.grid-container`, `.grid-cell`, `.btn`, `.text-heading-48`)

- **❌ No Tailwind CSS or Utility Classes**  
  Do not use Tailwind or any atomic class replacements.

- **❌ No New Dependencies**  
  Do not install new libraries unless explicitly instructed.

- **📦 Contentlayer Required**  
  Blog and project content are sourced via Contentlayer. Maintain that pipeline.

---

## 🔭 II. Site Audit Summary

### `/projects` & `/projects/{slug}`
- Needs a minimal **hero section**.
- `/projects/{slug}` lacks visual storytelling and slides beneath the nav.
- ➕ **Inspiration:** [21st.dev / Agent Plan](https://21st.dev/isaiahbjork/agent-plan/default)

### `/services`
- No page exists. Requires full layout and content.

### `/blog` & `/blog/{slug}`
- Blog index needs visual polish and post previews.
- Detail view lacks structure and breathing room.
- ➕ **Inspiration:** [V0.dev Blog](https://v0.dev/community/ai-blog-1fwaS3xF7MM) and [21st.dev / Tommy Jepsen](https://21st.dev/tommyjepsen/blog-section-with-rich-preview/default)

### `/contact`
- Current form works but lacks visual strength.
- Opportunity for a split-screen layout and more engaging copy.

### `/cv`
- Page stub exists. Needs timeline layout and CV download option.

---

## 🔧 III. Phase-Based Execution Plan

### ✅ Phase 0: Build `/services` & `/cv`

#### **🛠️ Part A: Create the Services Page**

**Goal:** Build a new, dedicated page to showcase your service offerings using a reusable card component.

**1. Create the Reusable Component:**
**Path:** `components/FeatureCard.tsx`
```tsx
// components/FeatureCard.tsx
export function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string; }) {
  return (
    <div className="feature-card">
      <div className="icon">{icon}</div>
      <h3 className="text-heading-20" style={{ marginBottom: '12px' }}>{title}</h3>
      <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{description}</p>
    </div>
  );
}
```

**2. Implement the Services Page:**
**Path:** `app/services/page.tsx`
```tsx
// app/services/page.tsx
import { FeatureCard } from '@/components/FeatureCard'; // <-- Import the new component

export default function ServicesPage() {
  return (
    <>
      <section className="section text-center">
        <div className="grid-container">
          <h1 className="text-heading-48">Services</h1>
          <p className="text-copy-18 text-neutral-400" style={{ maxWidth: '600px', margin: '16px auto' }}>
            From AI integrations to automation pipelines, I design and build the systems that power modern business.
          </p>
        </div>
      </section>
      <section className="section" style={{paddingTop: 0}}>
        <div className="grid-container">
          <div className="feature-grid">
            <FeatureCard 
              icon="◦" 
              title="AI Automation & Consulting" 
              description="Custom GPTs, smart data pipelines, and prompt engineering to replace repetitive tasks and unlock efficiency." 
            />
            <FeatureCard 
              icon="◉" 
              title="Technical Project Management" 
              description="Fractional PM/solutions lead for high-output teams. I manage scope, unblock developers, and turn chaos into clarity." 
            />
            <FeatureCard 
              icon="◈" 
              title="Full-Stack Development" 
              description="Modern web apps (Next.js, WordPress) and APIs built for performance and scale." 
            />
          </div>
        </div>
      </section>
    </>
  );
}
```

#### **🛠️ Part B: Create the CV Page**

**Goal:** Build a simple, elegant CV page using the existing timeline component style.

**1. Update the CV Page:**
**Path:** `app/cv/page.tsx`
```tsx
// app/cv/page.tsx
export default function CVPage() {
  return (
    <div className="section">
      <div className="grid-container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 className="text-heading-48">Curriculum Vitae</h1>
          <p className="text-copy-18" style={{ color: 'rgba(255, 255, 255, 0.7)', margin: '16px auto 0' }}>
            A summary of my professional experience and technical skills.
          </p>
        </div>
        <div className="grid">
          <div className="grid-cell span-8" style={{gridColumnStart: 3}}>
            <h2 className="text-heading-32" style={{ marginBottom: '32px' }}>Work Experience</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2022 – Present</div>
                <div className="timeline-title">Systems Architect & AI Consultant</div>
                <div className="timeline-content">Designed and deployed AI automation pipelines, built full-stack applications, and provided strategic consulting for startups and established businesses.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-date">2018 – 2022</div>
                <div className="timeline-title">Digital Marketing & Web Development Lead</div>
                <div className="timeline-content">Led strategy and execution for digital campaigns, including building conversion-focused websites, funnels, and analytics dashboards.</div>
              </div>
            </div>
            {/* Note: More sections for Education, Skills etc. can be added here following the same timeline pattern. */}
            <div style={{textAlign: 'center', marginTop: '48px'}}>
               <a href="/danny-yanko-cv.pdf" download className="btn btn-primary">Download Full CV (PDF)</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**2. Add the CV File:**
*   Place a file named `danny-yanko-cv.pdf` inside the `/public` directory.

---

### ✅ Phase 1: Refine the Contact Page
**Goal:** Upgrade `app/contact/page.tsx` to a split-screen layout.

**Implementation:**
*   **Restructure the JSX in `app/contact/page.tsx`** to create a two-column grid. The left column will contain new contextual text and the code block component. The right column will contain the existing form.

```tsx
// app/contact/page.tsx
'use client';
// ... existing imports

export default function ContactPage() {
  // ... existing form logic (useForm, onSubmit, etc.)

  return (
    <div className="section">
      <Toaster position="top-center" />
      <div className="grid-container">
        <div className="grid">
          {/* Left Column */}
          <div className="grid-cell span-5" style={{ background: 'transparent', border: 'none', padding: '16px' }}>
            <h2 className="text-heading-32" style={{ marginBottom: '32px' }}>Let's Build.</h2>
            <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px' }}>
              Have a project in mind, a complex problem, or a bottleneck that needs a system-driven solution? I'm available for new opportunities.
            </p>
            <div className="code-block">
              <div className="code-header">
                <span className="code-title">Current Status</span>
                <div className="code-dots"><div className="code-dot"></div><div className="code-dot"></div><div className="code-dot"></div></div>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                const danny = &#123;<br />
                &nbsp;&nbsp;status: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>"available"</span>,<br />
                &nbsp;&nbsp;focus: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>"AI & Automation"</span>,<br />
                &nbsp;&nbsp;location: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>"Calgary, AB"</span>,<br />
                &#125;;
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="grid-cell span-7">
            <h1 className="text-heading-32" style={{ marginBottom: '24px' }}>Get In Touch</h1>
            {/* The existing <form>...</form> goes here, unchanged. */}
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px', margin: '0 auto' }}>
              {/*...all form fields...*/}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

### ✅ Phase 2: Upgrade Project Pages
**Goal:** Refresh the `/projects` list and `/projects/[slug]` detail pages.

**Implementation:** Follow the detailed instructions from the previous prompt to:
1.  **`/projects`:** Add the dynamic hero section and implement the asymmetric grid.
2.  **`/projects/[slug]`:** Rebuild the layout into a case study format with breadcrumbs and a structured header.

---

### ✅ Phase 3: Enhance Blog Pages
**Goal:** Improve the `/blog` list and `/blog/[slug]` article pages.

**Implementation:** Follow the detailed instructions from the previous prompt to:
1.  **`/blog`:** Implement the featured post layout and enhance the standard post cards.
2.  **`/blog/[slug]`:** Add the hero image above the article title.

---

### ✅ Phase 4: Final Polish & Review
**Goal:** Ensure site-wide consistency and quality.

**Checklist:**
- [ ] **Responsiveness:** Verify that all new and updated layouts look correct on mobile, tablet, and desktop screens. Pay close attention to the new grid layouts and the split-screen contact page.
- [ ] **Navigation:** Confirm all new pages (`/services`, `/cv`) are linked in `components/navigation.tsx` and the site footer if applicable.
- [ ] **Hover/Focus States:** Ensure all new interactive elements (links, buttons, cards) have appropriate hover and focus states consistent with the existing design system.
- [ ] **Code Cleanup:** Remove any commented-out old code and ensure formatting is consistent across all modified files.

---

This final, comprehensive document provides the vision, constraints, and a step-by-step technical plan to successfully complete the portfolio upgrade.