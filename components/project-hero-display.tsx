'use client'

import { CardDisplay } from '@/lib/mdx/types'
import { TerminalDisplay, parseTerminalContent } from './terminal-display'
import { WireframeTradingPlatform } from './wireframe-trading-platform'
import { WireframeAnalyticsDashboard } from './wireframe-analytics-dashboard'
import { WireframeChatOnboarding } from './wireframe-chat-onboarding'
import { WireframeServerStatus } from './wireframe-server-status'

const wireframes: Record<string, React.ComponentType<{ className?: string }>> = {
  'trading-platform': WireframeTradingPlatform,
  'analytics-dashboard': WireframeAnalyticsDashboard,
  'chat-onboarding': WireframeChatOnboarding,
  'server-status': WireframeServerStatus,
}

interface ProjectHeroDisplayProps {
  cardDisplay: CardDisplay
  className?: string
}

export function ProjectHeroDisplay({ cardDisplay, className = '' }: ProjectHeroDisplayProps) {
  if (cardDisplay.type === 'terminal' && cardDisplay.content) {
    const lines = parseTerminalContent(cardDisplay.content)
    return (
      <div className={`aspect-[16/10] overflow-hidden border border-[#252d33] rounded-sm ${className}`}>
        <TerminalDisplay lines={lines} title={cardDisplay.title} />
      </div>
    )
  }

  if (cardDisplay.type === 'wireframe' && cardDisplay.component) {
    const WireframeComponent = wireframes[cardDisplay.component]
    if (!WireframeComponent) return null
    return (
      <div className={`aspect-[16/10] overflow-hidden border border-[#252d33] rounded-sm ${className}`}>
        <WireframeComponent className="w-full h-full" />
      </div>
    )
  }

  return null
}
