import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { BlogPost } from "@/lib/mdx/types"

interface RelatedArticlesProps {
  posts: BlogPost[]
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function estimateReadTime(content: string): string {
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null

  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <h2 className="text-h3 text-foreground mb-8">
          Related Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={post.url}
              className="group block border border-border bg-transparent p-6 transition-all duration-300 hover:border-border-hover"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>{formatDate(post.publishedAt)}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{estimateReadTime(post.content)}</span>
              </div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent pr-2 leading-tight">
                  {post.title}
                </h3>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground flex-shrink-0 transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
