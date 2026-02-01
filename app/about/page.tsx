import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Danny Yanko",
  description: "Learn more about my background, experience, and approach to AI automation and systems architecture.",
}

const capabilities = [
  { number: "01", title: "AI Automation", description: "Custom GPTs, intelligent pipelines, and AI-powered workflows" },
  { number: "02", title: "Technical PM", description: "Scope management, team coordination, and project delivery" },
  { number: "03", title: "Full-Stack Development", description: "Modern web apps with Next.js, React, and TypeScript" },
  { number: "04", title: "Systems Architecture", description: "Scalable infrastructure and integration design" },
]

const techStack = [
  "TypeScript", "Python", "Next.js", "React",
  "Node.js", "OpenAI API", "PostgreSQL", "AWS",
  "Vercel", "Docker", "Microsoft Graph", "Asana API",
]

const values = [
  {
    title: "Systems Thinking",
    description: "I approach problems holistically, understanding how components connect and affect each other to build solutions that actually work in the real world.",
  },
  {
    title: "Pragmatic Automation",
    description: "Not everything needs AI. I focus on practical automation that delivers real value, keeping humans in control of decisions that matter.",
  },
  {
    title: "Continuous Learning",
    description: "The AI landscape evolves weekly. Staying current with the latest tools and techniques is essential to delivering cutting-edge solutions.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-32 md:pt-48 pb-20 md:pb-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <span className="label-uppercase text-accent mb-6 block tracking-widest">
              About
            </span>
            <h1 className="text-h1 text-foreground max-w-5xl mb-8">
              Building Systems That Work
            </h1>
            <p className="text-xl md:text-2xl text-foreground-secondary max-w-3xl leading-relaxed">
              Systems architect and AI consultant helping businesses automate the tedious
              and focus on what matters.
            </p>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Left Column */}
              <div className="lg:col-span-5">
                <h2 className="label-uppercase text-muted-foreground mb-8 tracking-widest">
                  Background
                </h2>
                <div className="space-y-6 text-foreground-secondary leading-relaxed text-lg">
                  <p>
                    I started my career in technical project management, learning how to
                    coordinate teams and deliver software on time. Over the years, that
                    evolved into a deeper focus on systems design and automation.
                  </p>
                  <p>
                    Today, I work at the intersection of AI and practical business
                    operations. I build systems that extract insights from emails, automate
                    repetitive workflows, and help teams focus on work that actually
                    requires human judgment.
                  </p>
                  <p>
                    Based in Calgary, I work with clients globally on projects ranging
                    from email triage automation to full-scale platform development.
                  </p>
                </div>
              </div>

              {/* Right Column - Stats */}
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="grid grid-cols-2 gap-8 mb-16">
                  <div className="p-8 border border-border">
                    <span className="text-h2 text-foreground block">10+</span>
                    <p className="text-sm text-muted-foreground mt-2">Years in Tech</p>
                  </div>
                  <div className="p-8 border border-border">
                    <span className="text-h2 text-foreground block">50+</span>
                    <p className="text-sm text-muted-foreground mt-2">Projects Delivered</p>
                  </div>
                  <div className="p-8 border border-border">
                    <span className="text-h2 text-foreground block">AI</span>
                    <p className="text-sm text-muted-foreground mt-2">Current Focus</p>
                  </div>
                  <div className="p-8 border border-border">
                    <span className="text-h2 text-foreground block">YYC</span>
                    <p className="text-sm text-muted-foreground mt-2">Based In Calgary</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-5">
                <h2 className="text-h2 text-foreground mb-6">
                  Capabilities
                </h2>
                <p className="text-foreground-secondary text-lg leading-relaxed">
                  A blend of technical expertise and project management experience
                  to deliver end-to-end solutions.
                </p>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                {capabilities.map((item) => (
                  <div
                    key={item.title}
                    className="py-6 border-t border-border last:border-b flex items-baseline gap-6"
                  >
                    <span className="text-sm text-accent font-mono">{item.number}</span>
                    <div>
                      <h3 className="text-xl text-foreground mb-1 font-medium">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <h2 className="label-uppercase text-muted-foreground mb-8 tracking-widest">
              Technologies
            </h2>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-6 py-3 border border-border text-foreground-secondary font-mono text-sm hover:border-border-hover hover:text-foreground transition-colors duration-150"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <h2 className="text-h2 text-foreground mb-16">
              Approach
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
              {values.map((value, index) => (
                <div key={index} className="bg-background p-8 md:p-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="text-h2 text-foreground mb-4">
                  Let&apos;s Work Together
                </h2>
                <p className="text-foreground-secondary text-lg">
                  Have a project in mind? I&apos;d love to hear about it.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between gap-6 px-8 py-5 bg-accent text-accent-foreground text-sm font-medium tracking-wide hover:bg-accent-hover transition-colors duration-150 min-h-[56px]"
              >
                <span>GET IN TOUCH</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
