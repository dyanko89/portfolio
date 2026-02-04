import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Project } from "@/lib/mdx/types"

interface RelatedProjectsProps {
  projects: Project[]
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects.length) return null

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <h2 className="text-h3 text-foreground mb-8">
          Related Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <Link
              key={project.slug}
              href={project.url}
              className="group block border border-border bg-transparent p-6 transition-all duration-300 hover:border-border-hover"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent pr-2 leading-tight">
                  {project.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {project.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
