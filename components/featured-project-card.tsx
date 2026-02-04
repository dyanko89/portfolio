"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

interface FeaturedProjectCardProps {
  title: string
  description: string
  tags: string[]
  image?: string
  href: string
  status: "live" | "in-progress" | "archived"
  category?: string
}

const statusConfig = {
  live: {
    label: "Live",
    className: "bg-success/10 text-success border-success/30",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-warning/10 text-warning border-warning/30",
  },
  archived: {
    label: "Archived",
    className: "bg-muted-foreground/10 text-muted-foreground border-muted-foreground/30",
  },
}

export function FeaturedProjectCard({
  title,
  description,
  tags,
  image,
  href,
  status,
  category,
}: FeaturedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const displayTags = tags.slice(0, 5)

  return (
    <Link
      href={href}
      className="group block w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article
        className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-background-elevated border border-border overflow-hidden transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-border-hover"
        style={{ borderRadius: "2px" }}
      >
        {/* Image Container */}
        <div className="relative lg:col-span-5 aspect-[16/10] lg:aspect-auto lg:min-h-[280px] bg-surface overflow-hidden">
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 grid-pattern opacity-50" />

          {/* Project Image */}
          {image ? (
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border-2 border-border flex items-center justify-center text-muted-foreground text-sm font-mono">
                IMG
              </div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={`inline-flex items-center px-3 py-1 text-xs font-medium border backdrop-blur-sm ${statusConfig[status].className}`}
              style={{ borderRadius: "2px" }}
            >
              {statusConfig[status].label}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 lg:p-10">
          <div className="space-y-4">
            {/* Category */}
            {category && (
              <div className="label-uppercase text-accent">
                {category}
              </div>
            )}

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground transition-colors duration-200 group-hover:text-accent leading-tight">
              {title}
            </h3>

            {/* Description */}
            <p className="text-base text-foreground-secondary leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-2">
              {displayTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 text-xs font-mono text-foreground-secondary bg-surface border border-border"
                  style={{ borderRadius: "2px" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Link */}
            <div className="flex items-center gap-1.5 text-accent font-medium text-sm">
              <span>View Project</span>
              <ArrowUpRight
                className={`w-4 h-4 transition-transform duration-200 ${
                  isHovered ? "translate-x-0.5 -translate-y-0.5" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
