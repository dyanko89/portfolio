# 🛠️ Site Page Upgrade Blueprint

## /projects – 🔧 Grid + Hero Refresh

### ✅ Improvements

**Hero Section**

```tsx
<section className="section hero">
  <div className="grid-container text-center">
    <h1 className="text-heading-48">Projects</h1>
    <p className="text-copy-20 text-neutral-400">
      Systems I’ve built, shipped, and optimized — from AI assistants to marketing infrastructure.
    </p>
  </div>
</section>
```

**Grid Layout**
*   Switch to 2-column asymmetric layout (3-9 or 4-8 split)
*   Cards feature:
    *   Hover effects (scale, dim background)
    *   Tag-based filtering (`.badge`)
    *   Optional featured flag for key projects

---

## /projects/{slug} – ⚡ Case Study Glow-Up

### ❌ Current Pain Points
*   Content slides under nav
*   Layout too basic for portfolio-grade storytelling

### ✅ Layout Recommendations
*   **Inspired by:** [Agent Plan – 21st.dev](https://21st.dev/projects/agent-plan)
*   **Sticky Breadcrumb + Hero**
    ```tsx
    <div className="breadcrumb">Projects / AI Assistant</div>
    <h1 className="text-heading-48">AI Assistant for PM</h1>
    <p className="text-copy-20 text-neutral-400">Email parsing, task extraction, and smart scheduling.</p>
    ```
*   **Structured Sections**
    ```md
    ## The Problem  
    What was broken or inefficient?

    ## The Solution  
    Technical/strategic breakdown with visuals if possible

    ## Architecture  
    Tools used, stack diagram (optional image)

    ## Outcomes  
    Stats, impact, metrics if available
    ```

---

## /services – ✨ New Page Build

### ✅ Section Layout

**Intro**
```tsx
<h1 className="text-heading-48">Services</h1>
<p className="text-copy-20 text-neutral-400">From AI integrations to automation pipelines, I build systems that scale.</p>
```

**Service Cards**
```tsx
<div className="grid gap-6">
  <div className="grid-cell span-6 card">
    <h2 className="text-heading-20">AI Integration</h2>
    <p className="text-copy-16 text-neutral-400">
      Custom assistants, automation workflows, and AI-first toolchains.
    </p>
  </div>
  <!-- Repeat for other services -->
</div>
```

**Future Enhancement**
*   Filter by industry or outcome
*   CTA buttons on each service

---

## /blog – 🧠 Stronger Index Design

### ❌ Issues
*   Weak visual hierarchy
*   Minimalism → emptiness

### ✅ Upgrade Strategy
*   **Inspiration:**
    *   V0.dev AI Blog Layout
    *   Tommy Jepsen Blog Cards
*   **Enhanced Previews:**
    *   Featured image
    *   Title, summary, tags, reading time
    *   On hover: zoom-in effect, shadow glow, CTA

---

## /blog/{slug} – 📝 Richer Post Experience

### ✅ Upgrades
*   **Sticky TOC (on large screens)**
    *   Use `.prose` sidebar or scrollspy plugin
*   **Hero Section**
    ```tsx
    <img src={post.image} className="hero-image" alt="" />
    <h1 className="text-heading-48">{post.title}</h1>
    <p className="text-copy-16 text-neutral-400">{post.summary}</p>
    ```
*   **Footer CTA**
    *   Share buttons: Twitter, LinkedIn
    *   Button: Back to Blog

---

## /contact – 💬 High-Conversion Form

### ✅ Minimalist Form
*   **Layout Idea:**
    *   Split screen
    *   Left: Invite / copy / credentials
    *   Right: `react-hook-form` powered contact form
*   **Code Example:**
    ```tsx
    <form className="grid gap-4">
      <input className="form-field" placeholder="Name" />
      <input className="form-field" placeholder="Email" />
      <textarea className="form-field" placeholder="Your message" />
      <button className="btn btn-primary">Send</button>
    </form>
    ```
*   **Enhancements:**
    *   Toast on submit
    *   Loading spinner or "sending..." indicator
    *   Accessibility and ARIA labels

---

## /cv – 📄 Resume Interface (MVP Plan)

### ✅ Timeline Layout
*   Use `.timeline` + `.grid-cell`
*   **Sections:**
    *   Work Experience
    *   Education
    *   Tools & Skills
*   **Code Example:**
    ```tsx
    <div className="timeline-item">
      <div className="timeline-date">2022–2025</div>
      <div className="timeline-title">Marketing Manager – Mixed Sweet Media</div>
      <div className="timeline-content">Led automation initiatives and delivered over 200 educational videos.</div>
    </div>
    ```
*   Add download button for PDF CV