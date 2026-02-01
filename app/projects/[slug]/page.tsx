import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Calendar } from "lucide-react"
import { getProject, getAllProjects } from "@/lib/mdx/content"
import { renderMDX } from "@/lib/mdx/mdx"

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

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="pt-32 md:pt-48 pb-12 md:pb-20">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            {/* Back Link */}
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </Link>

            {/* Title */}
            <h1 className="text-h1 text-foreground mb-6">{project.title}</h1>

            {/* Summary/Description */}
            <p className="text-xl md:text-2xl text-foreground-secondary max-w-3xl leading-relaxed mb-12">
              {project.summary}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              {year && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{year}</span>
                </div>
              )}
              {project.status && (
                <span
                  className={`px-3 py-1 text-xs font-medium tracking-wider uppercase ${statusStyles.bg} ${statusStyles.text}`}
                >
                  {statusStyles.label}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        {project.image && (
          <section className="pb-20 md:pb-32">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
              <div className="relative aspect-[16/9] bg-surface border border-border overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* Project Content */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              {/* Sidebar */}
              <aside className="lg:col-span-4">
                <div className="lg:sticky lg:top-32 space-y-8">
                  {project.tags && project.tags.length > 0 && (
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
                  )}
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

        {/* Navigation */}
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
      </main>
      <Footer />
    </>
  )
}
