import { getProject } from '@/lib/mdx/content'
import { ogCard, OG_SIZE } from '@/lib/og/og-card'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Project by Danny Yanko'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  return ogCard({
    title: project?.title ?? 'Projects',
    subtitle: project?.summary,
    tag: project?.status ?? 'Project',
  })
}
