'use client'

interface TerminalLine {
  text: string
  type?: 'default' | 'success' | 'error' | 'warning' | 'muted' | 'accent'
}

interface TerminalDisplayProps {
  lines: TerminalLine[]
  title?: string
  className?: string
}

const lineColors = {
  default: 'text-[#e8edef]',
  success: 'text-[#00e676]',
  error: 'text-[#ff5252]',
  warning: 'text-[#ffab40]',
  muted: 'text-[#6b7a85]',
  accent: 'text-[#ff5722]',
}

export function TerminalDisplay({ lines, title = 'terminal', className = '' }: TerminalDisplayProps) {
  return (
    <div className={`w-full h-full flex flex-col bg-[#0a0f12] overflow-hidden ${className}`}>
      {/* Terminal Window Chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#1a2329] border-b border-[#2a3942]/50">
        {/* Traffic Light Dots */}
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        {/* Title */}
        <span className="ml-2 text-[10px] font-mono text-[#6b7a85] uppercase tracking-wider">
          {title}
        </span>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 overflow-hidden px-4 py-3 font-mono text-xs leading-relaxed">
        {lines.map((line, index) => (
          <div
            key={index}
            className={`${lineColors[line.type || 'default']} whitespace-pre-wrap`}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  )
}

// Helper to parse simple terminal markup
// Supports: [success], [error], [warning], [muted], [accent] prefixes
export function parseTerminalContent(content: string): TerminalLine[] {
  return content.trim().split('\n').map(line => {
    // Check for type prefixes
    const prefixMatch = line.match(/^\[(success|error|warning|muted|accent)\](.*)/)
    if (prefixMatch) {
      return {
        text: prefixMatch[2],
        type: prefixMatch[1] as TerminalLine['type']
      }
    }

    // Auto-detect common patterns
    if (line.startsWith('✓') || line.startsWith('[OK]') || line.includes('created') || line.includes('Complete')) {
      return { text: line, type: 'success' }
    }
    if (line.startsWith('✗') || line.startsWith('[ERROR]') || line.includes('failed') || line.includes('Error')) {
      return { text: line, type: 'error' }
    }
    if (line.startsWith('⚠') || line.startsWith('[WARN]')) {
      return { text: line, type: 'warning' }
    }
    if (line.startsWith('[') && line.includes(']')) {
      // Timestamps like [2025-02-08 09:15:22]
      return { text: line, type: 'muted' }
    }

    return { text: line, type: 'default' }
  })
}
