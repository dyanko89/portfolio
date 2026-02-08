import React from "react"
import { CodeBlockMinimal, MinimalCode, MinimalInlineCode } from "@/components/code-block-minimal"
import { MermaidDiagram } from "@/components/mermaid-diagram"

// Helper function to extract text from React element tree (used by rehype-pretty-code)
function extractTextFromElement(element: unknown): string {
  if (typeof element === "string") {
    return element
  }

  if (typeof element === "number") {
    return String(element)
  }

  if (Array.isArray(element)) {
    return element.map(extractTextFromElement).join("")
  }

  if (React.isValidElement(element)) {
    const props = element.props as Record<string, unknown>
    if (props.children) {
      return extractTextFromElement(props.children)
    }
    // Check for children in different prop names
    if (props.dangerouslySetInnerHTML) {
      return ""
    }
  }

  return ""
}

// MDX components override for use with MDX content
// Usage: import { mdxComponents } from '@/components/mdx-components'
// Then pass to MDXRemote: <MDXRemote components={mdxComponents} />

export const mdxComponents = {
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) => {
    // Extract language from data-language attribute (set by rehype-pretty-code)
    // or from className as fallback
    const dataLanguage = props["data-language"]
    const childElement = children as React.ReactElement<{ className?: string; children?: unknown }>
    const className = childElement?.props?.className || ""
    const match = className.match(/language-(\w+)/)
    const language = dataLanguage || (match ? match[1] : undefined)

    // If it's Mermaid, render as diagram instead of code block
    if (language === "mermaid") {
      const codeContent = childElement?.props?.children || ""
      // Extract text from potentially nested React elements
      const diagramText = extractTextFromElement(codeContent)
      return <MermaidDiagram chart={diagramText.trim()} />
    }

    return (
      <CodeBlockMinimal language={language}>
        {children}
      </CodeBlockMinimal>
    )
  },
  code: ({ children, className, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    // If it's inline code (no className with language- prefix)
    const isInline = !className?.includes("language-")

    if (isInline) {
      return <MinimalInlineCode className={className}>{children}</MinimalInlineCode>
    }

    // Block code (handled by pre wrapper)
    return <MinimalCode className={className}>{children}</MinimalCode>
  },
}
