interface PageHeaderProps {
  label: string
  title: string
  description?: string
  count?: number
  countLabel?: string
}

export function PageHeader({
  label,
  title,
  description,
  count,
  countLabel = "items",
}: PageHeaderProps) {
  return (
    <section className="pt-24 md:pt-32 pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-8">
          <div>
            <span className="label-uppercase text-accent mb-4 block tracking-widest">
              {label}
            </span>
            <h1 className="text-h2 text-foreground max-w-4xl">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-foreground-secondary max-w-2xl leading-relaxed mt-4">
                {description}
              </p>
            )}
          </div>
          {count !== undefined && (
            <div className="text-foreground-secondary text-sm md:text-right shrink-0">
              <span className="text-foreground font-medium">{count}</span>{" "}
              {countLabel}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
