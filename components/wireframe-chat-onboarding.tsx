'use client'

interface WireframeChatOnboardingProps {
  className?: string
}

const c = {
  bg: '#0a0f12',
  border: '#252d33',
  borderLight: '#1c2328',
  textDim: '#3a4248',
  text: '#5a6368',
  textBright: '#7a8288',
  surface: '#0e1418',
}

export function WireframeChatOnboarding({ className = '' }: WireframeChatOnboardingProps) {
  return (
    <div className={`w-full h-full flex overflow-hidden font-mono ${className}`} style={{ background: c.bg }}>
      {/* Sidebar */}
      <div className="flex flex-col overflow-hidden" style={{ width: '22%', borderRight: `1px solid ${c.border}` }}>
        {/* Sidebar header */}
        <div className="flex items-center px-2 shrink-0" style={{ height: '14%', borderBottom: `1px solid ${c.border}` }}>
          <div className="w-full h-2.5 rounded-sm" style={{ background: c.border }} />
        </div>
        {/* Project list */}
        <div className="flex-1 flex flex-col gap-0.5 p-1.5 overflow-hidden">
          {sidebarItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-1 px-1.5 py-1 rounded-sm"
              style={{ background: item.active ? c.surface : 'transparent' }}
            >
              <div className="w-1 h-1 rounded-full shrink-0" style={{ background: item.active ? c.textBright : c.border }} />
              <div className="text-[4.5px] truncate" style={{ color: item.active ? c.textBright : c.textDim }}>{item.label}</div>
            </div>
          ))}
          <div className="mt-auto flex items-center gap-1 px-1.5 py-1">
            <div className="text-[5px]" style={{ color: c.textDim }}>+ New project</div>
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="flex items-center justify-between px-3 shrink-0" style={{ height: '14%', borderBottom: `1px solid ${c.border}` }}>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ border: `1px solid ${c.border}` }} />
            <div className="text-[6px]" style={{ color: c.textBright }}>Intelligence Setup</div>
          </div>
          <div className="flex gap-1">
            <div className="w-8 h-2.5 rounded-sm" style={{ border: `1px solid ${c.border}` }} />
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 flex flex-col gap-1.5 p-2 overflow-hidden" style={{ minHeight: 0 }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className="rounded-sm px-2 py-1 max-w-[80%]"
                style={{
                  background: msg.from === 'user' ? c.border : c.surface,
                  border: msg.from === 'ai' ? `1px solid ${c.borderLight}` : 'none',
                }}
              >
                <div className="text-[5.5px] leading-relaxed" style={{ color: msg.from === 'user' ? c.textBright : c.text }}>
                  {msg.text}
                </div>
                {msg.chips && (
                  <div className="flex flex-wrap gap-0.5 mt-1">
                    {msg.chips.map((chip, j) => (
                      <span
                        key={j}
                        className="px-1 py-px rounded-sm text-[4.5px]"
                        style={{
                          border: `1px solid ${c.border}`,
                          color: chip.selected ? c.textBright : c.textDim,
                          background: chip.selected ? c.border : 'transparent',
                        }}
                      >
                        {chip.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          <div className="flex justify-start">
            <div className="rounded-sm px-2 py-1" style={{ background: c.surface, border: `1px solid ${c.borderLight}` }}>
              <div className="flex gap-0.5 items-center">
                <div className="w-0.5 h-0.5 rounded-full" style={{ background: c.text, opacity: 0.8 }} />
                <div className="w-0.5 h-0.5 rounded-full" style={{ background: c.text, opacity: 0.5 }} />
                <div className="w-0.5 h-0.5 rounded-full" style={{ background: c.text, opacity: 0.3 }} />
                <div className="text-[4.5px] ml-1" style={{ color: c.textDim }}>Discovering subreddits...</div>
              </div>
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="shrink-0 flex items-center gap-1.5 px-2 mx-2 mb-2 rounded-sm" style={{ height: '10%', minHeight: 0, border: `1px solid ${c.border}`, background: c.surface }}>
          <div className="text-[5px] flex-1" style={{ color: c.textDim }}>Describe your business...</div>
          <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ background: c.border }}>
            <div className="text-[5px]" style={{ color: c.textBright }}>↑</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const sidebarItems = [
  { label: 'Real Estate Intel', active: true },
  { label: 'SaaS Competitors', active: false },
  { label: 'Fitness Industry', active: false },
]

const messages: Array<{ from: 'ai' | 'user'; text: string; chips?: Array<{ label: string; selected: boolean }> }> = [
  {
    from: 'ai',
    text: "What industry are you focused on? I'll find the communities where your audience is talking.",
  },
  {
    from: 'user',
    text: 'Commercial real estate — looking for tenant pain points and emerging market trends.',
  },
  {
    from: 'ai',
    text: "Found 8 relevant communities. Here are the top matches:",
    chips: [
      { label: 'r/CommercialRE', selected: true },
      { label: 'r/realestateinvesting', selected: true },
      { label: 'r/CRE', selected: true },
      { label: 'r/PropertyManagement', selected: false },
      { label: 'r/RealEstate', selected: false },
    ],
  },
  {
    from: 'user',
    text: 'Top 3 look good. What analysis can you run?',
  },
  {
    from: 'ai',
    text: 'I can generate 5 report types — pain points, opportunities, trends, comprehensive, or dual-perspective. Which profile fits you?',
    chips: [
      { label: 'Content Creator', selected: false },
      { label: 'Consultant', selected: true },
    ],
  },
]
