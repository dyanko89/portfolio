import { ogCard, OG_SIZE } from '@/lib/og/og-card'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = 'Danny Yanko -- Systems Architect & Automation Consultant'

export default function Image() {
  return ogCard({
    title: 'Systems Architect & Automation Consultant',
    subtitle: 'Automation for businesses tired of wasting time on work that shouldn\'t exist.',
  })
}
