'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockMinimalProps {
  code?: string
  language?: string
  children?: React.ReactNode
}

export function CodeBlockMinimal({ code, language, children }: CodeBlockMinimalProps) {
  const [copied, setCopied] = useState(false)

  // Extract code text from children if not provided directly
  const codeText = code || (typeof children === 'string' ? children : '')

  const handleCopy = async () => {
    // Get text content from the pre element or use provided code
    const textToCopy = codeText || (document.querySelector('.code-block-minimal code')?.textContent || '')
    await navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="not-prose group relative w-full rounded-[2px] bg-[#1a2329] border border-[#2a3942]/50 hover:border-[#3d4f5c] transition-all duration-300 overflow-hidden code-block-minimal">
      {/* Minimal Header */}
      <div className="flex items-center justify-between gap-2 px-2 py-2 border-b border-[#2a3942]/50 bg-[#1a2329]">
        {/* Language Badge */}
        {language && (
          <div className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] bg-[#0a0f12]/80 backdrop-blur-sm border border-[#2a3942] text-[9px] uppercase tracking-[0.1em] font-mono text-[#6b7a85] font-semibold">
            {language}
          </div>
        )}
        {!language && <div />}

        {/* Copy Button - Always visible */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-1.5 py-1 rounded-[2px] bg-[#0a0f12]/90 backdrop-blur-sm border border-[#2a3942] hover:border-[#ff5722] hover:bg-[#ff5722]/10 transition-all duration-200 text-[10px] font-mono"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[#00e676]" />
              <span className="text-[#00e676] font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-[#6b7a85]" />
              <span className="text-[#6b7a85]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content - Maximum Focus */}
      <div className="code-block-content overflow-x-auto px-3 py-3 text-xs font-mono font-normal text-[#e8edef] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#2a3942] hover:scrollbar-thumb-[#ff5722] transition-colors bg-[#0f1519]">
        <pre className="m-0 p-0 bg-transparent">
          {children}
        </pre>
      </div>
    </div>
  )
}

// Inline code component for consistency
export function MinimalInlineCode({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <code className={`px-1.5 py-0.5 rounded-[2px] bg-[#1a2329] border border-[#2a3942]/50 text-[#e8edef] text-sm font-mono ${className || ''}`}>
      {children}
    </code>
  )
}

// Code element for inside pre blocks
export function MinimalCode({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <code className={`block ${className || ''}`}>
      {children}
    </code>
  )
}
