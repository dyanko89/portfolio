"use client"

import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"

interface MermaidDiagramProps {
  chart: string
  title?: string
}

export function MermaidDiagram({ chart, title }: MermaidDiagramProps) {
  const mermaidRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "dark",
      securityLevel: "loose",
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

    if (mermaidRef.current && chart) {
      mermaidRef.current.innerHTML = chart
      try {
        mermaid.contentLoaded()
        setError(null)
      } catch (err) {
        console.error("Mermaid error:", err)
        setError(err instanceof Error ? err.message : String(err))
      }
    }
  }, [chart])

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
      <div ref={mermaidRef} className="mermaid">
        {chart}
      </div>
    </div>
  )
}

export default MermaidDiagram
