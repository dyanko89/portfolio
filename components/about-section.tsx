"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const capabilities = [
  { number: "01", title: "Systems Architecture", description: "I design and build production infrastructure that scales. Complex databases, API ecosystems, and intelligent automation for enterprises in regulated industries." },
  { number: "02", title: "AI Systems Integration", description: "LLM-powered workflows that bring intelligence to your operations. Automated decision-making, content generation, and intelligent routing deployed on your infrastructure." },
  { number: "03", title: "Marketing Automation", description: "Fractional CMO + technical implementation. Marketing platform expertise, campaign automation, and custom reporting for clients across energy, agriculture, and retail sectors." },
  { number: "04", title: "Integration Engineering", description: "Connect your systems. Email platforms, project management tools, databases, CMS platforms, and spreadsheet applications. I build the pipelines that make your tools work together seamlessly." },
]

const techStack = [
  { category: "Languages", items: ["TypeScript", "Python", "PowerShell", "VBA Macros"] },
  { category: "Web & Frontend", items: ["React", "Next.js", "Node.js", "Tailwind CSS", "Framer"] },
  { category: "AI & LLM APIs", items: ["Claude / Anthropic API", "ChatGPT / OpenAI API", "Gemini / Google API"] },
  { category: "Cloud & Infrastructure", items: ["Amazon Web Services (AWS)", "Google Cloud Platform (GCP)", "systemd", "Debian"] },
  { category: "Data & APIs", items: ["PostgreSQL", "SQLite", "Microsoft Graph", "Asana API"] },
  { category: "Creative Tooling", items: ["Figma", "InDesign JSX", "python-pptx", "Pillow", "LAB Color Space"] },
]

// Animation variants
const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const leftColumnVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.2,
    },
  },
}

const leftColumnItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const rightColumnVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
    },
  },
}

const capabilityItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const techTagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function AboutSection() {
  const headerRef = useRef(null)
  const leftColumnRef = useRef(null)
  const rightColumnRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" })
  const leftColumnInView = useInView(leftColumnRef, { once: true, margin: "-100px" })
  const rightColumnInView = useInView(rightColumnRef, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header + Bio */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={sectionHeaderVariants}
          className="mb-20 md:mb-32"
        >
          <span className="label-uppercase text-accent mb-6 block tracking-widest">
            About
          </span>
          <h2 className="text-h2 text-foreground max-w-4xl">
            Enterprise Automation for Teams That Need to Scale
          </h2>
          <div className="mt-10 space-y-6 text-foreground-secondary leading-relaxed text-lg">
            <p>
              Over a decade spanning marketing, design, and development gave me a
              superpower: I recognize inefficiency instantly. I&apos;ve lived inside
              the manual workflows, disconnected tools, and repetitive tasks that
              drain momentum.
            </p>
            <p>
              Now I build the automation that eliminates them. Production infrastructure,
              AI-powered workflows, and intelligent integrations informed by years of
              understanding what slows businesses down and the technical depth to
              architect solutions that work.
            </p>
          </div>
        </motion.div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column - Capabilities */}
          <motion.div
            ref={leftColumnRef}
            initial="hidden"
            animate={leftColumnInView ? "visible" : "hidden"}
            variants={leftColumnVariants}
            className="lg:col-span-5"
          >
            <motion.h3
              variants={leftColumnItemVariants}
              className="label-uppercase text-muted-foreground mb-8 tracking-widest"
            >
              Capabilities
            </motion.h3>
            <div className="space-y-0">
              {capabilities.map((item) => (
                <motion.div
                  key={item.title}
                  variants={leftColumnItemVariants}
                  className="group py-6 border-t border-border last:border-b flex items-baseline gap-6 hover:bg-surface/50 transition-colors duration-150 -mx-4 px-4"
                >
                  <span className="text-sm text-accent font-mono">{item.number}</span>
                  <div className="flex-1">
                    <h4 className="text-xl text-foreground mb-1 font-medium">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Technologies */}
          <motion.div
            ref={rightColumnRef}
            initial="hidden"
            animate={rightColumnInView ? "visible" : "hidden"}
            variants={rightColumnVariants}
            className="lg:col-span-6 lg:col-start-7"
          >
            <motion.h3
              variants={capabilityItemVariants}
              className="label-uppercase text-muted-foreground mb-6 tracking-widest"
            >
              Technologies
            </motion.h3>
            <motion.div
              initial="hidden"
              animate={rightColumnInView ? "visible" : "hidden"}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="flex flex-col gap-5"
            >
              {techStack.map((group) => (
                <motion.div key={group.category} variants={techTagVariants}>
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2 block">
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 border border-border text-sm text-foreground-secondary font-mono hover:border-border-hover hover:text-foreground transition-colors duration-150"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
