import Link from "next/link"
import type { BlogPost } from "@/lib/mdx/types"

interface SeriesNavigationProps {
  seriesName: string
  posts: BlogPost[]
  currentSlug: string
}

const seriesLabels: Record<string, string> = {
  "building-ai-systems-that-scale": "Building AI Systems That Scale",
}

export function SeriesNavigation({ seriesName, posts, currentSlug }: SeriesNavigationProps) {
  if (posts.length === 0) return null

  const currentIndex = posts.findIndex((p) => p.slug === currentSlug)
  const label = seriesLabels[seriesName] || seriesName

  return (
    <div className="bg-background-elevated border border-border p-6 mb-12">
      <div className="label-uppercase text-accent mb-4 tracking-widest">
        Series
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {label}
      </h3>
      <ol className="space-y-2">
        {posts.map((post, i) => {
          const isCurrent = post.slug === currentSlug
          return (
            <li key={post.slug} className="flex gap-3 text-sm">
              <span className="text-muted-foreground flex-shrink-0">
                {i + 1}.
              </span>
              {isCurrent ? (
                <span className="font-semibold text-accent">
                  {post.title}
                </span>
              ) : (
                <Link
                  href={post.url}
                  className="text-foreground-secondary hover:text-foreground transition-colors duration-150"
                >
                  {post.title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
      {currentIndex >= 0 && (
        <p className="text-sm text-muted-foreground mt-4">
          Part {currentIndex + 1} of {posts.length}
        </p>
      )}
    </div>
  )
}
