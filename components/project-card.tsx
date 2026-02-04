"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image?: string
  href: string
  status?: "live" | "in-progress" | "archived"
}

const statusColors = {
  live: "bg-success/20 text-success border-success/30",
  "in-progress": "bg-warning/20 text-warning border-warning/30",
  archived: "bg-muted text-muted-foreground border-border",
}

const statusLabels = {
  live: "Live",
  "in-progress": "In Progress",
  archived: "Archived",
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  href,
  status = "live",
}: ProjectCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col bg-background-elevated border border-border rounded-sm overflow-hidden hover:border-border-hover hover:translate-y-[-2px] transition-all duration-250"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-surface aspect-[16/9]">
        {image ? (
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 grid-pattern opacity-50" />
        )}
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={cn(
              "px-2 py-1 text-xs border rounded-sm",
              statusColors[status]
            )}
          >
            {statusLabels[status]}
          </span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-250" />
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Title */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-150 text-lg">
            {title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 flex-shrink-0" />
        </div>

        {/* Description */}
        <p className="text-foreground-secondary mb-4 line-clamp-2 text-sm">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-surface text-xs text-muted-foreground rounded-sm"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
