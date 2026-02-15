import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { FeaturedProjectCard } from "@/components/featured-project-card"
import { ProjectCard } from "@/components/project-card"
import { getAllProjects } from "@/lib/mdx/content"

export const metadata: Metadata = {
  title: "Projects | Danny Yanko",
  description: "A collection of selected work spanning AI automation, web & app development, and digital experiences.",
  alternates: {
    canonical: '/projects',
  },
}

function mapStatus(status: string): "live" | "in-progress" | "archived" | "qa" {
  const normalized = status.toLowerCase()
  if (normalized.includes("qa") || normalized.includes("testing")) return "qa"
  if (normalized.includes("progress") || normalized.includes("beta") || normalized.includes("development")) return "in-progress"
  if (normalized.includes("archived") || normalized.includes("deprecated")) return "archived"
  return "live"
}

export default async function ProjectsPage() {
  const projects = await getAllProjects()

  // Split into featured (first 2) and regular projects
  const featuredProjects = projects.slice(0, 2)
  const regularProjects = projects.slice(2)

  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          label="Projects"
          title="Selected Work"
          description="A collection of projects spanning AI automation, infrastructure, and full-stack development."
          count={projects.length}
          countLabel="Projects"
        />

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="pb-12 md:pb-16">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
              <span className="label-uppercase text-accent mb-8 block tracking-widest">
                Featured
              </span>
              <div className="space-y-8">
                {featuredProjects.map((project) => (
                  <FeaturedProjectCard
                    key={project.slug}
                    title={project.title}
                    description={project.summary}
                    tags={project.tags || []}
                    image={project.image}
                    cardDisplay={project.cardDisplay}
                    href={`/projects/${project.slug}`}
                    status={mapStatus(project.status)}
                    category={project.tags?.[0]}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Grid */}
        {regularProjects.length > 0 && (
          <section className="py-12 md:py-20 border-t border-border">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {regularProjects.map((project) => (
                  <ProjectCard
                    key={project.slug}
                    title={project.title}
                    description={project.summary}
                    tags={project.tags || []}
                    image={project.image}
                    cardDisplay={project.cardDisplay}
                    href={`/projects/${project.slug}`}
                    status={mapStatus(project.status)}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

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
