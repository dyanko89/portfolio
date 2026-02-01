import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowUpRight, Clock } from "lucide-react"
import { getAllBlogPosts } from "@/lib/mdx/content"

export const metadata: Metadata = {
  title: "Blog | Dyanko89",
  description: "Thoughts on AI, systems architecture, and the craft of building digital products.",
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function estimateReadTime(content: string): string {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  // First post is featured (since they're sorted by date)
  const featuredPost = posts[0]
  const regularPosts = posts.slice(1)

  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="pt-32 md:pt-48 pb-20 md:pb-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <span className="label-uppercase text-accent mb-6 block tracking-widest">
              Blog
            </span>
            <h1 className="text-h1 text-foreground max-w-4xl mb-8">
              Thoughts & Writing
            </h1>
            <p className="text-xl text-foreground-secondary max-w-2xl leading-relaxed">
              On AI, systems architecture, and the craft of building digital products.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="border-t border-border">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 md:py-24">
              <span className="label-uppercase text-accent mb-8 block tracking-widest">
                Featured
              </span>
              <Link
                href={`/blog/${featuredPost.slug}`}
                className="group block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                  {/* Image Placeholder */}
                  <div className="lg:col-span-6">
                    <div className="relative aspect-[16/10] bg-surface border border-border overflow-hidden group-hover:border-border-hover transition-colors">
                      <div className="absolute inset-0 grid-pattern opacity-50" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                      <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {estimateReadTime(featuredPost.content)}
                      </span>
                    </div>
                    <h2 className="text-h2 text-foreground mb-4 group-hover:text-accent transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-foreground-secondary text-lg leading-relaxed mb-6">
                      {featuredPost.summary}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Posts Grid */}
        {regularPosts.length > 0 && (
          <section className="py-12 md:py-20 border-t border-border">
            <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <article className="h-full flex flex-col">
                      {/* Image Placeholder */}
                      <div className="relative aspect-[16/10] bg-surface border border-border overflow-hidden group-hover:border-border-hover transition-colors mb-6">
                        <div className="absolute inset-0 grid-pattern opacity-50" />
                      </div>

                      {/* Content */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span>{formatDate(post.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {estimateReadTime(post.content)}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-foreground-secondary text-sm leading-relaxed mb-4 flex-1">
                        {post.summary}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-accent">
                        <span>Read more</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
