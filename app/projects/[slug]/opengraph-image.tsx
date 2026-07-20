import { notFound } from 'next/navigation'
import { getProject } from '@/lib/mdx/content'
import { ogCard, OG_SIZE } from '@/lib/og/og-card'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Project by Danny Yanko'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!/^[A-Za-z0-9-]+$/.test(slug)) notFound()
  const project = await getProject(slug)
  if (!project) notFound()
  return ogCard({
    title: project.title,
    subtitle: project.summary,
    tag: project.status ?? 'Project',
  })
}
