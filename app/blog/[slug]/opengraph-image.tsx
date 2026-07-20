import { notFound } from 'next/navigation'
import { getBlogPost } from '@/lib/mdx/content'
import { ogCard, OG_SIZE } from '@/lib/og/og-card'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Blog post by Danny Yanko'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!/^[A-Za-z0-9-]+$/.test(slug)) notFound()
  const post = await getBlogPost(slug)
  if (!post) notFound()
  return ogCard({
    title: post.title,
    subtitle: post.summary,
    tag: post.tags?.[0] ?? 'Blog',
  })
}
