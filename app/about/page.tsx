import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "About | Danny Yanko",
  description: "Systems architect and AI orchestration specialist. Making complexity invisible so creativity can flourish.",
  alternates: {
    canonical: '/about',
  },
}

const capabilities = [
  {
    number: "01",
    title: "AI Orchestration",
    description: "Designing AI as infrastructure, not automation. Systems that make decisions invisible.",
  },
  {
    number: "02",
    title: "Systems Architecture",
    description: "Pattern recognition at scale. Finding the 20% of work that generates 80% of friction.",
  },
  {
    number: "03",
    title: "Process Optimization",
    description: "Energy economics applied to workflows. Eliminating decision fatigue through design.",
  },
  {
    number: "04",
    title: "Framework Design",
    description: "Teaching systems that scale. Build once, leverage forever.",
  },
]

const techStack = {
  "AI & Orchestration": ["Claude AI", "OpenAI API", "LangChain", "Prompt Engineering"],
  "Languages": ["TypeScript", "Python", "SQL"],
  "Infrastructure": ["Next.js", "Node.js", "PostgreSQL", "AWS", "Vercel"],
  "Integration": ["Microsoft Graph", "Asana API", "REST APIs", "systemd"],
}

const values = [
  {
    title: "High-Signal, Low-Noise",
    description: "Communication should be direct and frameworks-over-details. If it can be a decision tree, it should be.",
  },
  {
    title: "Energy Economics",
    description: "Every system has friction costs. The best solutions eliminate decisions, not just automate tasks.",
  },
  {
    title: "Intentional Adoption",
    description: "True AI mastery means knowing when NOT to use it. The goal is invisible infrastructure, not visible tools.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <PageHeader
          label="About"
          title="Make Complexity Invisible"
          description="Systems architect and AI orchestration specialist building infrastructure that lets creativity flourish."
        />

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
                    I treat AI as orchestration, not automation. Where others see chatbots and
                    assistants, I see infrastructure: the invisible layer that transforms how
                    work gets done.
                  </p>
                  <p>
                    My approach is evidence-based and precision-focused: build once, leverage
                    forever. I design frameworks that eliminate repetitive decisions, letting
                    teams focus on work that actually requires human judgment.
                  </p>
                  <p>
                    As an INTJ-T, I thrive on pattern recognition and systems thinking. I&apos;ve
                    spent years mapping how information flows through organizations, identifying
                    friction points, and designing solutions that make complexity invisible.
                  </p>
                </div>
              </div>

              {/* Right Column - Stats */}
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="grid grid-cols-2 gap-8 mb-16">
                  <div className="p-8 border border-border">
                    <span className="text-h2 text-accent block">0.1%</span>
                    <p className="text-sm text-muted-foreground mt-2">AI Early Adopter Tier</p>
                  </div>
                  <div className="p-8 border border-border">
                    <span className="text-h2 text-foreground block">10+</span>
                    <p className="text-sm text-muted-foreground mt-2">Production AI Systems</p>
                  </div>
                  <div className="p-8 border border-border">
                    <span className="text-h2 text-foreground block">24/7</span>
                    <p className="text-sm text-muted-foreground mt-2">Infrastructure Uptime</p>
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
                  From identifying patterns to building frameworks that scale, turning
                  complexity into leverage.
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
            <h2 className="label-uppercase text-muted-foreground mb-12 tracking-widest">
              Technologies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {Object.entries(techStack).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-foreground mb-4">{category}</h3>
                  <div className="flex flex-col gap-2">
                    {items.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 border border-border text-foreground-secondary font-mono text-sm hover:border-border-hover hover:text-foreground transition-colors duration-150"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
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
