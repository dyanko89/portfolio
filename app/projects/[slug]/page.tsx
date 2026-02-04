import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ResultsCards } from "@/components/results-cards"
import { TechStackIcons } from "@/components/tech-stack-icons"
import { RelatedProjects } from "@/components/related-projects"
import { ArrowLeft, Calendar } from "lucide-react"
import { getProject, getAllProjects } from "@/lib/mdx/content"
import { renderMDX } from "@/lib/mdx/mdx"
import { Project } from "@/lib/mdx/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: "Project Not Found | Danny Yanko",
    }
  }

  return {
    title: `${project.title} | Projects | Danny Yanko`,
    description: project.summary,
  }
}

// Map MDX status to display badge styling
function getStatusStyles(status: string): { bg: string; text: string; label: string } {
  const normalized = status.toLowerCase()
  if (normalized === "completed" || normalized === "live") {
    return { bg: "bg-accent/10", text: "text-accent", label: "Live" }
  }
  if (normalized === "beta" || normalized === "in progress" || normalized === "in-progress") {
    return { bg: "bg-yellow-500/10", text: "text-yellow-500", label: "In Progress" }
  }
  return { bg: "bg-muted", text: "text-muted-foreground", label: status }
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-h2 text-foreground mb-4">Project Not Found</h1>
            <p className="text-foreground-secondary mb-8">
              The project you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Get status styling
  const statusStyles = getStatusStyles(project.status || "")

  // Extract year from publishedAt
  const year = project.publishedAt
    ? new Date(project.publishedAt).getFullYear().toString()
    : ""

  // Render MDX content
  const content = await renderMDX(project.content)

  // Fetch related projects if specified
  let relatedProjectsData: Project[] = []
  if (project.relatedProjects && project.relatedProjects.length > 0) {
    const relatedPromises = project.relatedProjects.map((relatedSlug) =>
      getProject(relatedSlug)
    )
    const results = await Promise.all(relatedPromises)
    relatedProjectsData = results.filter((p): p is Project => p !== null)
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Header with Background Image */}
        <section className="relative min-h-[70vh] flex flex-col justify-end overflow-hidden">
          {/* Background Image */}
          {project.image && (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              quality={85}
            />
          )}

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />

          {/* Content */}
          <div className="relative z-10 mx-auto max-w-7xl w-full px-6 md:px-12 lg:px-16 pb-12 md:pb-16 pt-32">
            {/* Back Link */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors mb-8 md:mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>

            {/* Title - Responsive sizing */}
            <h1 className="text-3xl sm:text-4xl md:text-h1 lg:text-display text-foreground mb-6">{project.title}</h1>

            {/* Summary/Description */}
            <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl leading-relaxed mb-8">
              {project.summary}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4">
              {project.client && (
                <span className="px-4 py-2 text-sm font-medium text-accent bg-accent/10 border border-accent/30 backdrop-blur-sm">
                  {project.client}
                </span>
              )}
              {year && (
                <span className="px-4 py-2 text-sm font-medium text-foreground bg-surface/80 border border-border backdrop-blur-sm">
                  {year}
                </span>
              )}
              {project.status && (
                <span
                  className={`px-4 py-2 text-sm font-medium tracking-wider uppercase bg-surface/80 border backdrop-blur-sm ${statusStyles.text} ${statusStyles.bg.replace('bg-', 'border-')}`}
                >
                  {statusStyles.label}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Results Cards (if project has results) */}
        {project.results && project.results.length > 0 && (
          <ResultsCards results={project.results} />
        )}

        {/* Project Content */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-32 space-y-8">
                  {/* Use TechStackIcons if available, otherwise fall back to tags */}
                  {project.techStack && project.techStack.length > 0 ? (
                    <div>
                      <h3 className="label-uppercase text-muted-foreground mb-4 tracking-widest">
                        Technologies
                      </h3>
                      <TechStackIcons techStack={project.techStack} />
                    </div>
                  ) : project.tags && project.tags.length > 0 ? (
                    <div>
                      <h3 className="label-uppercase text-muted-foreground mb-3 tracking-widest">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 border border-border text-sm text-foreground-secondary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {project.status && (
                    <div>
                      <h3 className="label-uppercase text-muted-foreground mb-3 tracking-widest">
                        Status
                      </h3>
                      <p className="text-foreground">{project.status}</p>
                    </div>
                  )}
                  {year && (
                    <div>
                      <h3 className="label-uppercase text-muted-foreground mb-3 tracking-widest">
                        Year
                      </h3>
                      <p className="text-foreground">{year}</p>
                    </div>
                  )}
                </div>
              </aside>

              {/* MDX Content */}
              <div className="lg:col-span-7 lg:col-start-6">
                <article className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:text-accent-hover prose-strong:text-foreground prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-ul:text-foreground-secondary prose-ol:text-foreground-secondary prose-li:marker:text-accent">
                  {content}
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects (if available) or fallback to Explore More */}
        {relatedProjectsData.length > 0 ? (
          <RelatedProjects projects={relatedProjectsData} />
        ) : (
          <section className="py-20 md:py-32 border-t border-border">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div>
                  <h2 className="text-h2 text-foreground mb-4">Explore More</h2>
                  <p className="text-foreground-secondary">
                    Continue exploring my work
                  </p>
                </div>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground text-sm font-medium tracking-wide hover:border-border-hover hover:bg-surface/50 transition-all duration-150"
                >
                  VIEW ALL PROJECTS
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
