import { ProjectResult } from "@/lib/mdx/types"

interface ResultsCardsProps {
  results: ProjectResult[]
}

export function ResultsCards({ results }: ResultsCardsProps) {
  return (
    <section className="py-16 md:py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <h2 className="label-uppercase text-muted-foreground mb-8 tracking-widest">
          Results
        </h2>

        {/* Grid of Result Cards */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {results.map((result, index) => (
            <div
              key={index}
              className="border border-border p-6 transition-colors hover:border-border-hover"
            >
              {/* Large Value - Accent Color */}
              <div className="mb-2 text-3xl md:text-4xl font-bold text-accent">
                {result.value}
              </div>

              {/* Label */}
              <div className="mb-1 text-sm font-medium text-foreground">
                {result.label}
              </div>

              {/* Optional Description */}
              {result.description && (
                <div className="text-xs text-muted-foreground">
                  {result.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
