"use client"

import { useEffect, useRef, useState, useId } from "react"
import mermaid from "mermaid"

let mermaidInitialized = false

interface MermaidDiagramProps {
  chart: string
  title?: string
}

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const id = useId().replace(/:/g, "_")

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        securityLevel: "loose",
        flowchart: {
          useMaxWidth: false,
          padding: 20,
          nodeSpacing: 30,
          rankSpacing: 40,
        },
        themeVariables: {
          primaryColor: "#1a2329",
          primaryBorderColor: "#3d4f5c",
          primaryTextColor: "#e8edef",
          lineColor: "#3d4f5c",
          secondaryColor: "#111a1f",
          tertiaryColor: "#2a3942",
          background: "#0a0f12",
          mainBkg: "#1a2329",
          textColor: "#e8edef",
          fontSize: "16px",
          fontFamily: "'Ubuntu Sans', sans-serif",
        },
      })
      mermaidInitialized = true
    }

    if (!chart) return

    const renderDiagram = async () => {
      try {
        const { svg: renderedSvg } = await mermaid.render(`mermaid_${id}`, chart)
        setSvg(renderedSvg)
        setError(null)
      } catch (err) {
        console.error("Mermaid render error:", err)
        setError(err instanceof Error ? err.message : String(err))
      }
    }

    renderDiagram()
  }, [chart, id])

  if (error) {
    return (
      <div className="p-4 bg-[#1a2329] border border-[#3d4f5c] rounded-none text-[#ff5722]">
        Error rendering diagram: {error}
      </div>
    )
  }

  return (
    <div className="mermaid-wrapper my-8">
      {title && (
        <h4 className="text-sm font-medium text-[#8fa3b0] mb-2">{title}</h4>
      )}
      <div
        ref={containerRef}
        className="mermaid"
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
    </div>
  )
}

export default MermaidDiagram
