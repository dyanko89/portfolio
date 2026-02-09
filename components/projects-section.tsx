import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/mdx/types"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-32 md:py-48 bg-background-elevated">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-32">
          <div>
            <span className="label-uppercase text-accent mb-6 block tracking-widest">
              Work
            </span>
            <h2 className="text-h2 text-foreground">
              Selected Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-foreground-secondary hover:text-foreground transition-colors duration-150"
          >
            <span className="label-uppercase tracking-widest">View Archive</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Project List - Editorial Style */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block py-8 md:py-12 border-t border-border last:border-b hover:bg-surface/30 transition-colors duration-150 -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-16 lg:px-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="text-sm text-accent font-mono">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Title & Status */}
                <div className="lg:col-span-4">
                  <h3 className="text-h3 text-foreground group-hover:text-accent transition-colors duration-150">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{project.status}</p>
                </div>

                {/* Description - Hidden on mobile */}
                <div className="lg:col-span-4 hidden lg:block">
                  <p className="text-foreground-secondary text-sm leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Year & Arrow */}
                <div className="lg:col-span-3 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-mono">
                    {new Date(project.publishedAt).getFullYear()}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center border border-border group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-150">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
