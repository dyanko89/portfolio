import { getBlogPost, getAllBlogPosts } from "@/lib/mdx/content"
import { renderMDX } from "@/lib/mdx/mdx"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft, Clock } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogPost(slug)
  if (!blog) return {}
  return {
    title: `${blog.title} | Danny Yanko`,
    description: blog.summary,
  }
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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const blog = await getBlogPost(slug)
  if (!blog) notFound()

  const content = await renderMDX(blog.content)

  return (
    <>
      <Navigation />
      <main className="pt-32 md:pt-40 pb-20 md:pb-32">
        <article className="mx-auto max-w-3xl px-6 md:px-12">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>{formatDate(blog.publishedAt)}</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {estimateReadTime(blog.content)}
              </span>
            </div>
            <h1 className="text-h2 text-foreground mb-6">
              {blog.title}
            </h1>
            <p className="text-xl text-foreground-secondary leading-relaxed">
              {blog.summary}
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none
            prose-headings:text-foreground prose-headings:font-semibold
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-foreground-secondary prose-p:leading-relaxed
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground prose-strong:font-semibold
            prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-surface prose-pre:border prose-pre:border-border prose-pre:rounded-none
            prose-ul:text-foreground-secondary prose-ol:text-foreground-secondary
            prose-li:marker:text-accent
            prose-blockquote:border-l-accent prose-blockquote:text-foreground-secondary prose-blockquote:not-italic
            prose-hr:border-border
          ">
            {content}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
