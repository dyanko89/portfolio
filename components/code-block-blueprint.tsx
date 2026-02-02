'use client'

import { useState, useRef } from 'react'
import { Copy, Check, FileCode } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockBlueprintProps {
  children: React.ReactNode
  language?: string
  filePath?: string
  className?: string
}

export function CodeBlockBlueprint({ children, language, filePath, className }: CodeBlockBlueprintProps) {
  const [copied, setCopied] = useState(false)
  const codeRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    // Extract text content from the code element
    const codeElement = codeRef.current?.querySelector('code')
    const text = codeElement?.textContent || ''
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn(
      "group relative w-full rounded-[2px] bg-surface border border-border",
      "hover:border-border-hover transition-colors duration-200 overflow-hidden my-6",
      className
    )}>
      {/* Grid Pattern Background - Subtle */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-2.5 border-b border-border bg-background/50">
        <div className="flex items-center gap-3">
          <FileCode className="w-4 h-4 text-accent" />
          <div className="flex flex-col">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {language || 'code'} document
            </span>
            {filePath && (
              <span className="text-[10px] font-mono text-muted-foreground/60 mt-0.5">
                {filePath}
              </span>
            )}
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-[2px] border border-border hover:border-border-hover bg-surface hover:bg-background transition-all text-xs font-mono uppercase tracking-wider"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success" />
              <span className="text-success font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Content - Let rehype-pretty-code handle the structure */}
      <div ref={codeRef} className="relative code-block-content overflow-x-auto">
        {children}
      </div>

      {/* Footer */}
      <div className="relative flex items-center justify-between px-4 py-1.5 border-t border-border bg-background/50 text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Source Code
        </span>
        <span className="tabular-nums">{language || 'txt'}</span>
      </div>
    </div>
  )
}

// Pre component for MDX integration - passes through rehype-pretty-code output
interface PreProps {
  children: React.ReactNode
  className?: string
}

export function BlueprintPre({ children, className }: PreProps) {
  return (
    <pre className={cn(
      "font-mono text-sm leading-relaxed m-0 p-4 bg-transparent overflow-x-auto",
      "[counter-reset:line]",
      className
    )}>
      {children}
    </pre>
  )
}

// Code component for MDX integration
interface CodeProps {
  children: React.ReactNode
  className?: string
}

export function BlueprintCode({ children, className }: CodeProps) {
  return (
    <code className={cn("font-mono text-sm text-foreground block", className)}>
      {children}
    </code>
  )
}

// Inline code component
export function BlueprintInlineCode({ children, className }: CodeProps) {
  return (
    <code
      className={cn(
        "font-mono text-sm",
        "rounded-sm",
        "bg-surface",
        "border border-border",
        "px-1.5 py-0.5",
        "text-accent",
        className
      )}
    >
      {children}
    </code>
  )
}
