"use client"

import React, { useState, useRef } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  children: React.ReactNode
  language?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  className?: string
}

export function CodeBlock({
  children,
  language,
  showLineNumbers = false,
  showCopyButton = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLDivElement>(null)

  const copyToClipboard = async () => {
    const codeElement = preRef.current?.querySelector("code")
    if (codeElement?.textContent) {
      await navigator.clipboard.writeText(codeElement.textContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div ref={preRef} className={cn("group relative my-6", className)}>
      <div className="relative overflow-hidden border border-border bg-surface rounded-sm">
        {/* Header with language label and copy button */}
        {(language || showCopyButton) && (
          <div className="flex items-center justify-between border-b border-border px-4 py-2 bg-background">
            {language && (
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {language}
              </span>
            )}
            <div className="flex-1" />
            {showCopyButton && (
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center h-7 px-2 text-xs text-muted-foreground hover:bg-surface hover:text-foreground rounded-sm transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-3 w-3 text-success" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Code content with horizontal scroll */}
        <div className="overflow-x-auto">
          <Pre showLineNumbers={showLineNumbers}>{children}</Pre>
        </div>
      </div>
    </div>
  )
}

interface PreProps {
  children: React.ReactNode
  showLineNumbers?: boolean
  className?: string
}

export function Pre({ children, showLineNumbers, className }: PreProps) {
  return (
    <pre
      className={cn(
        "font-mono text-sm leading-relaxed",
        "p-4",
        "text-foreground",
        "bg-surface",
        "m-0", // Remove default margins
        showLineNumbers && "grid",
        className
      )}
    >
      {children}
    </pre>
  )
}

interface CodeProps {
  children: React.ReactNode
  className?: string
}

export function Code({ children, className }: CodeProps) {
  return (
    <code
      className={cn(
        "font-mono text-sm",
        "text-foreground",
        className
      )}
    >
      {children}
    </code>
  )
}

// Inline code component for use within paragraphs
export function InlineCode({ children, className }: CodeProps) {
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
