import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects } from "@/lib/mdx/content"

export const metadata: Metadata = {
  title: "Projects | Dyanko89",
  description: "A collection of selected work spanning AI automation, web development, and digital experiences.",
}

function mapStatus(status: string): "live" | "in-progress" | "archived" {
  const normalized = status.toLowerCase()
  if (normalized.includes("progress") || normalized.includes("beta")) return "in-progress"
  if (normalized.includes("archived") || normalized.includes("deprecated")) return "archived"
  return "live"
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="pt-32 md:pt-48 pb-20 md:pb-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <span className="label-uppercase text-accent mb-6 block tracking-widest">
              Projects
            </span>
            <h1 className="text-h1 text-foreground max-w-4xl mb-8">
              Selected Work
            </h1>
            <p className="text-xl text-foreground-secondary max-w-2xl leading-relaxed">
              A collection of projects spanning AI automation, web development,
              and digital experiences.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-12 md:py-20 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  title={project.title}
                  description={project.summary}
                  tags={project.tags || []}
                  image={project.image}
                  href={`/projects/${project.slug}`}
                  status={mapStatus(project.status)}
                  featured={index === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 text-center">
            <h2 className="text-h2 text-foreground mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-foreground-secondary text-lg mb-8">
              Let&apos;s discuss how we can work together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-accent text-accent-foreground text-sm font-medium tracking-wide hover:bg-accent-hover transition-colors duration-150"
            >
              Start a Conversation
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
