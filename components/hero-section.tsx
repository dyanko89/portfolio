"use client"

import Link from "next/link"
import { ArrowDownRight } from "lucide-react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] // Custom easing for smooth motion
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const headlineStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const buttonStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.6
    }
  }
}

const scrollIndicator = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.8,
      ease: "easeOut"
    }
  }
}

const scrollLine = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.2,
      delay: 1,
      ease: "easeOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
      repeatDelay: 0.5
    }
  }
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)

  // Use InView for triggering animations when section enters viewport
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3
  })

  // Parallax effect for headline
  const { scrollYProgress } = useScroll({
    target: headlineRef,
    offset: ["start end", "end start"]
  })

  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.3])

  return (
    <motion.section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-accent"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-6 md:px-12 lg:px-16 py-24 md:py-32">
        {/* Top Section */}
        <motion.div
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-8"
          variants={staggerContainer}
        >
          {/* Label */}
          <motion.div variants={fadeInUp}>
            <span className="label-uppercase text-background/70 tracking-widest">
              Systems Architect & Automation Consultant
            </span>
          </motion.div>

          {/* Year/Status */}
          <motion.div
            className="flex items-center gap-4"
            variants={fadeInUp}
          >
            <span className="font-mono text-sm text-background/60">Available 2026</span>
            <motion.span
              className="w-2 h-2 rounded-full bg-background"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>

        {/* Center - Main Headline with Parallax */}
        <div className="flex-1 flex flex-col justify-center py-12 md:py-16">
          <motion.h1
            ref={headlineRef}
            className="text-display text-background leading-none"
            variants={headlineStagger}
            style={{ y: headlineY, opacity: headlineOpacity }}
          >
            <motion.span
              className="block"
              variants={fadeInUp}
            >
              Creating Systems
            </motion.span>
            <motion.span
              className="block"
              variants={fadeInUp}
            >
              That Run Themselves
            </motion.span>
          </motion.h1>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16"
          variants={staggerContainer}
        >
          {/* Description */}
          <motion.div
            className="max-w-md"
            variants={fadeInUp}
          >
            <p className="text-base md:text-lg text-background/80 leading-relaxed text-pretty">
              Production automation for businesses tired of wasting time on work that shouldn&apos;t exist.
            </p>
          </motion.div>

          {/* CTAs with Stagger */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={buttonStagger}
          >
            <motion.div variants={fadeInUp}>
              <Link
                href="#projects"
                className="group inline-flex items-center justify-between gap-6 px-6 py-4 bg-background text-accent text-sm font-medium tracking-wide hover:bg-background/90 transition-colors duration-150 min-h-[56px]"
              >
                <span>View Projects</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                href="#contact"
                className="inline-flex items-center justify-between gap-6 px-6 py-4 border-2 border-background/30 text-background text-sm font-medium tracking-wide hover:border-background hover:bg-background/10 transition-all duration-150 min-h-[56px]"
              >
                <span>Get in Touch</span>
                <span className="font-mono text-xs text-background/50">01</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator with Animation */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        variants={scrollIndicator}
        initial="hidden"
        animate="visible"
      >
        <span className="label-uppercase text-background/50 text-[10px]">Scroll</span>
        <motion.div
          className="w-px h-8 bg-background/30 origin-top"
          variants={scrollLine}
        />
      </motion.div>
    </motion.section>
  )
}
