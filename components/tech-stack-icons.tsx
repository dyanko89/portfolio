import { TechStackCategory } from "@/lib/mdx/types"

interface TechStackIconsProps {
  techStack: TechStackCategory[]
}

export function TechStackIcons({ techStack }: TechStackIconsProps) {
  return (
    <div className="flex flex-col gap-6">
      {techStack.map((group, groupIndex) => (
        <div key={groupIndex} className="flex flex-col gap-3">
          {/* Category Label */}
          <h3 className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            {group.category}
          </h3>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2">
            {group.items.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="inline-flex items-center border border-border px-2.5 py-1 text-xs font-mono text-foreground-secondary transition-colors duration-200 hover:border-border-hover hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
