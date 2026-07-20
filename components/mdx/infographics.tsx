import { ReactNode } from "react"

// Shared wrapper: bordered figure that escapes prose styling, with an
// uppercase tracked caption bar (ported from the Aspen Figure pattern,
// restyled to this site's dark palette).
function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="not-prose my-10 border border-border bg-background-elevated">
      <div className="p-6 md:p-8">{children}</div>
      {caption && (
        <figcaption className="border-t border-border px-6 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export interface Stat {
  value: string
  label: string
  detail?: string
}

// Big-number stat tiles: <StatRow stats={[{value:"144.8s → 11.8s", label:"Scan time"}]} />
export function StatRow({ stats, caption }: { stats: Stat[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "1px",
        }}
        className="bg-border"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background-elevated p-5">
            <div className="font-mono text-2xl md:text-3xl text-accent">{stat.value}</div>
            <div className="mt-2 text-sm font-medium text-foreground">{stat.label}</div>
            {stat.detail && (
              <div className="mt-1 text-xs text-muted-foreground">{stat.detail}</div>
            )}
          </div>
        ))}
      </div>
    </Figure>
  )
}

export interface Panel {
  title: string
  items: string[]
}

// Two-panel comparison: <BeforeAfter before={{title, items}} after={{title, items}} />
export function BeforeAfter({
  before,
  after,
  caption,
}: {
  before: Panel
  after: Panel
  caption?: string
}) {
  return (
    <Figure caption={caption}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-border bg-surface p-5">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {before.title}
          </div>
          <ul className="space-y-2">
            {before.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground-secondary">
                <span className="text-muted-foreground" aria-hidden>&minus;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-accent/30 bg-surface p-5">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-accent">
            {after.title}
          </div>
          <ul className="space-y-2">
            {after.items.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground">
                <span className="text-accent" aria-hidden>+</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Figure>
  )
}

export interface FlowStep {
  title: string
  detail?: string
}

// Vertical narrowing flow (funnel/pipeline): <FlowStack steps={[{title, detail}]} />
export function FlowStack({ steps, caption }: { steps: FlowStep[]; caption?: string }) {
  const minWidth = 55
  return (
    <Figure caption={caption}>
      <div className="flex flex-col items-center gap-1">
        {steps.map((step, i) => {
          const width =
            steps.length === 1
              ? 100
              : 100 - ((100 - minWidth) / (steps.length - 1)) * i
          return (
            <div key={step.title} className="flex w-full flex-col items-center gap-1">
              {i > 0 && <div className="text-muted-foreground" aria-hidden>&darr;</div>}
              <div
                className="border border-border bg-surface p-4 text-center"
                style={{ width: `${width}%`, minWidth: "240px" }}
              >
                <div className="text-sm font-medium text-foreground">{step.title}</div>
                {step.detail && (
                  <div className="mt-1 text-xs text-foreground-secondary">{step.detail}</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </Figure>
  )
}

// Boxed summary list; doubles as an AEO answer block:
// <KeyTakeaways items={["...", "..."]} />
export function KeyTakeaways({ items, caption }: { items: string[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <div className="border-l-2 border-accent pl-5">
        <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Key takeaways
        </div>
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground-secondary">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Figure>
  )
}

export interface TimelineEvent {
  marker: string
  title: string
  detail?: string
}

// Vertical chronology: <Timeline events={[{marker:"09:15", title, detail}]} />
export function Timeline({ events, caption }: { events: TimelineEvent[]; caption?: string }) {
  return (
    <Figure caption={caption}>
      <ol className="relative space-y-6 border-l border-border pl-6">
        {events.map((event) => (
          <li key={`${event.marker}-${event.title}`} className="relative">
            <span
              className="absolute -left-[27px] top-1.5 h-2 w-2 bg-accent"
              aria-hidden
            />
            <div className="font-mono text-xs text-muted-foreground">{event.marker}</div>
            <div className="mt-1 text-sm font-medium text-foreground">{event.title}</div>
            {event.detail && (
              <div className="mt-1 text-sm text-foreground-secondary">{event.detail}</div>
            )}
          </li>
        ))}
      </ol>
    </Figure>
  )
}
