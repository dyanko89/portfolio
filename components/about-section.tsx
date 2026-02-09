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
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Figma",
  "Framer",
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

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
}

const statItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export function AboutSection() {
  const headerRef = useRef(null)
  const leftColumnRef = useRef(null)
  const rightColumnRef = useRef(null)
  const statsRef = useRef(null)

  const headerInView = useInView(headerRef, { once: true, margin: "-100px" })
  const leftColumnInView = useInView(leftColumnRef, { once: true, margin: "-100px" })
  const rightColumnInView = useInView(rightColumnRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })

  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header - Wide */}
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
          <h2 className="text-h1 text-foreground max-w-4xl">
            Enterprise Automation for Teams That Need to Scale
          </h2>
        </motion.div>

        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column - Bio */}
          <motion.div
            ref={leftColumnRef}
            initial="hidden"
            animate={leftColumnInView ? "visible" : "hidden"}
            variants={leftColumnVariants}
            className="lg:col-span-5"
          >
            <motion.div
              variants={leftColumnItemVariants}
              className="space-y-6 text-foreground-secondary leading-relaxed text-lg"
            >
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
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={leftColumnItemVariants} className="mt-16">
              <h3 className="label-uppercase text-muted-foreground mb-6 tracking-widest">
                Technologies
              </h3>
              <motion.div
                initial="hidden"
                animate={leftColumnInView ? "visible" : "hidden"}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="flex flex-wrap gap-3"
              >
                {techStack.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={techTagVariants}
                    className="px-4 py-2 border border-border text-sm text-foreground-secondary font-mono hover:border-border-hover hover:text-foreground transition-colors duration-150"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Capabilities */}
          <motion.div
            ref={rightColumnRef}
            initial="hidden"
            animate={rightColumnInView ? "visible" : "hidden"}
            variants={rightColumnVariants}
            className="lg:col-span-6 lg:col-start-7"
          >
            <motion.h3
              variants={capabilityItemVariants}
              className="label-uppercase text-muted-foreground mb-8 tracking-widest"
            >
              Capabilities
            </motion.h3>
            <div className="space-y-0">
              {capabilities.map((item) => (
                <motion.div
                  key={item.title}
                  variants={capabilityItemVariants}
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

            {/* Experience Stat */}
            <motion.div
              ref={statsRef}
              initial="hidden"
              animate={statsInView ? "visible" : "hidden"}
              variants={statsVariants}
              className="mt-16 pt-16 border-t border-border"
            >
              <div className="grid grid-cols-2 gap-8">
                <motion.div variants={statItemVariants}>
                  <span className="text-h2 text-foreground">10+</span>
                  <p className="text-sm text-muted-foreground mt-2">Years Experience</p>
                </motion.div>
                <motion.div variants={statItemVariants}>
                  <span className="text-h2 text-foreground">40+</span>
                  <p className="text-sm text-muted-foreground mt-2">Projects Completed</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
