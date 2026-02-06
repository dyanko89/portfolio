"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const services = [
  {
    number: "01",
    title: "Systems Architecture",
    description: "I design and build production infrastructure that scales. Complex databases, API ecosystems, and intelligent automation for enterprises in regulated industries.",
    scope: ["Scalable Infrastructure", "Complex Databases", "API Ecosystems", "Enterprise Automation"],
  },
  {
    number: "02",
    title: "AI Systems Integration",
    description: "LLM-powered workflows that bring intelligence to your operations. Automated decision-making, content generation, and intelligent routing deployed on your infrastructure.",
    scope: ["LLM Integration", "Workflow Automation", "Decision Making", "Content Generation"],
  },
  {
    number: "03",
    title: "Marketing Automation",
    description: "Fractional CMO + technical implementation. Marketing platform expertise, campaign automation, and custom reporting for clients across energy, agriculture, and retail sectors.",
    scope: ["Platform Expertise", "Campaign Automation", "Custom Reporting", "Industry Focus"],
  },
  {
    number: "04",
    title: "Integration Engineering",
    description: "Connect your systems. Email platforms, project management tools, databases, CMS platforms, and spreadsheet applications. I build the pipelines that make your tools work together seamlessly.",
    scope: ["Email Platforms", "Project Management", "Databases", "CMS & Spreadsheets"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 md:mb-32">
          <div className="lg:col-span-5">
            <span className="label-uppercase text-accent mb-6 block tracking-widest">
              Services
            </span>
            <h2 className="text-h1 text-foreground">
              How I Can Help
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p className="text-foreground-secondary text-lg leading-relaxed">
              From concept to deployment, comprehensive services to bring 
              your digital vision to life with precision and care.
            </p>
          </div>
        </div>
        
        {/* Services Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-background p-8 md:p-12 hover:bg-surface/30 transition-colors duration-250"
            >
              {/* Number */}
              <span className="text-sm text-accent font-mono mb-8 block">{service.number}</span>
              
              {/* Title */}
              <h3 className="text-h3 text-foreground mb-4">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-foreground-secondary leading-relaxed mb-8">
                {service.description}
              </p>
              
              {/* Scope Tags */}
              <div className="flex flex-wrap gap-2">
                {service.scope.map((item) => (
                  <span
                    key={item}
                    className="text-xs text-muted-foreground border border-border px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="mt-20 md:mt-32 flex flex-col md:flex-row md:items-center md:justify-between gap-8 pt-12 border-t border-border">
          <div>
            <h3 className="text-h3 text-foreground mb-2">
              Ready to start?
            </h3>
            <p className="text-foreground-secondary">
              Let&apos;s discuss your project and explore possibilities.
            </p>
          </div>
          <Link
            href="#contact"
            className="group inline-flex items-center justify-between gap-6 px-8 py-5 bg-accent text-accent-foreground text-sm font-medium tracking-wide hover:bg-accent-hover transition-colors duration-150 min-h-[56px]"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
