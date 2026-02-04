import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ArrowRight, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Services | Danny Yanko",
  description: "From AI integrations to automation pipelines, I design and build the systems that power modern business.",
}

const services = [
  {
    number: "01",
    title: "AI Automation & Consulting",
    description: "Custom GPTs, smart data pipelines, and prompt engineering to replace repetitive tasks and unlock efficiency.",
    features: [
      "Custom GPT and AI agent development",
      "Prompt engineering and optimization",
      "Intelligent data extraction pipelines",
      "Email-to-task automation systems",
      "AI workflow design and integration",
      "Process automation consulting",
    ],
  },
  {
    number: "02",
    title: "Technical Project Management",
    description: "Fractional PM/solutions lead for high-output teams. I manage scope, unblock developers, and turn chaos into clarity.",
    features: [
      "Technical requirements gathering",
      "Sprint planning and execution",
      "Stakeholder communication",
      "Risk assessment and mitigation",
      "Developer unblocking and support",
      "Documentation and handoff",
    ],
  },
  {
    number: "03",
    title: "Full-Stack Development",
    description: "Modern web apps (Next.js, WordPress) and APIs built for performance and scale.",
    features: [
      "Next.js and React applications",
      "WordPress custom development",
      "API design and development",
      "Database architecture",
      "Cloud deployment and DevOps",
      "Performance optimization",
    ],
  },
]

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "Understanding your goals, constraints, and existing systems through in-depth conversations.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "Defining the approach, architecture, and deliverables that align with your objectives.",
  },
  {
    step: "03",
    title: "Build",
    description: "Executing with modern technologies, clean code practices, and continuous delivery.",
  },
  {
    step: "04",
    title: "Iterate",
    description: "Deploying, monitoring performance, and iterating based on real-world feedback.",
  },
]

const faqs = [
  {
    question: "What kinds of AI automation do you build?",
    answer: "I specialize in practical AI applications: email triage systems, data extraction pipelines, custom GPTs for specific workflows, and integrations between AI services and business tools like Asana, Notion, or Slack.",
  },
  {
    question: "What is your typical project engagement?",
    answer: "Project timelines vary based on scope. A focused automation might take 2-4 weeks, while larger systems can take 2-3 months. I also offer ongoing retainer arrangements for technical PM work.",
  },
  {
    question: "Do you work with international clients?",
    answer: "Yes, I work with clients globally. I'm flexible with meeting times and use asynchronous communication effectively to collaborate across time zones.",
  },
  {
    question: "Can you work with my existing team?",
    answer: "Absolutely. I often embed with existing development teams as a technical PM or solutions architect, helping bridge the gap between business requirements and technical execution.",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          label="Services"
          title="How I Can Help"
          description="From AI integrations to automation pipelines, I design and build the systems that power modern business."
        />

        {/* Services List */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl">
            {services.map((service) => (
              <div
                key={service.title}
                className="border-b border-border"
              >
                <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                    {/* Left Column */}
                    <div className="lg:col-span-5">
                      <span className="text-sm text-accent font-mono mb-4 block">
                        {service.number}
                      </span>
                      <h2 className="text-h2 text-foreground mb-6">
                        {service.title}
                      </h2>
                      <p className="text-foreground-secondary text-lg leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-6 lg:col-start-7">
                      <h3 className="label-uppercase text-muted-foreground mb-6 tracking-widest">
                        What&apos;s Included
                      </h3>
                      <ul className="space-y-4">
                        {service.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-4 text-foreground-secondary"
                          >
                            <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="py-20 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="mb-16 md:mb-24">
              <h2 className="text-h2 text-foreground mb-6">
                Process
              </h2>
              <p className="text-foreground-secondary text-lg max-w-2xl">
                A structured approach that ensures clarity, collaboration, and
                successful outcomes for every project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={item.step} className="relative">
                  {/* Connector Line */}
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-px bg-border" />
                  )}
                  <div className="flex md:flex-col gap-4 md:gap-0">
                    <span className="w-12 h-12 flex items-center justify-center border border-accent text-accent font-mono text-sm flex-shrink-0">
                      {item.step}
                    </span>
                    <div className="md:mt-6">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <h2 className="text-h2 text-foreground mb-6">
                  FAQ
                </h2>
                <p className="text-foreground-secondary">
                  Common questions about working together. Don&apos;t see your question?
                  Feel free to reach out.
                </p>
              </div>

              <div className="lg:col-span-7 lg:col-start-6">
                <div className="space-y-0">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="py-8 border-t border-border last:border-b"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        {faq.question}
                      </h3>
                      <p className="text-foreground-secondary leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-accent">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="text-h2 text-background mb-4">
                  Ready to Start?
                </h2>
                <p className="text-background/80 text-lg">
                  Let&apos;s discuss your project and explore how we can work together.
                </p>
              </div>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-between gap-6 px-8 py-5 bg-background text-accent text-sm font-medium tracking-wide hover:bg-background/90 transition-colors duration-150 min-h-[56px]"
              >
                <span>START A CONVERSATION</span>
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
