import React from "react"
import { CodeBlockBlueprint, BlueprintCode, BlueprintInlineCode } from "@/components/code-block-blueprint"

// MDX components override for use with MDX content
// Usage: import { mdxComponents } from '@/components/mdx-components'
// Then pass to MDXRemote: <MDXRemote components={mdxComponents} />

export const mdxComponents = {
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) => {
    // Extract language from data-language attribute (set by rehype-pretty-code)
    // or from className as fallback
    const dataLanguage = props["data-language"]
    const childElement = children as React.ReactElement<{ className?: string }>
    const className = childElement?.props?.className || ""
    const match = className.match(/language-(\w+)/)
    const language = dataLanguage || (match ? match[1] : undefined)

    return (
      <CodeBlockBlueprint language={language}>
        {children}
      </CodeBlockBlueprint>
    )
  },
  code: ({ children, className, ...props }: React.ComponentPropsWithoutRef<"code">) => {
    // If it's inline code (no className with language- prefix)
    const isInline = !className?.includes("language-")

    if (isInline) {
      return <BlueprintInlineCode className={className}>{children}</BlueprintInlineCode>
    }

    // Block code (handled by pre wrapper)
    return <BlueprintCode className={className}>{children}</BlueprintCode>
  },
}
