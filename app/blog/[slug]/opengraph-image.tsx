import { getBlogPost } from '@/lib/mdx/content'
import { ogCard, OG_SIZE } from '@/lib/og/og-card'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Blog post by Danny Yanko'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  return ogCard({
    title: post?.title ?? 'Blog',
    subtitle: post?.summary,
    tag: post?.tags?.[0] ?? 'Blog',
  })
}
