'use client'

import { X, Send } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StarforgeToastProps {
  message?: string
  onDismiss: () => void
  duration?: number
}

/**
 * Starforge Toast Design 3 V3: "Bold Orange"
 * - Solid orange background with white elements
 * - No border for clean, confident look
 * - Strong visual confirmation against dark backgrounds
 */
export function StarforgeToast({
  message = 'Chat soon.',
  onDismiss,
  duration = 7000
}: StarforgeToastProps) {
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDismiss()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleDismiss = () => {
    setIsExiting(true)
    setTimeout(() => {
      onDismiss()
    }, 200)
  }

  return (
    <div
      className={`
        fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50
        flex items-center gap-2 md:gap-4
        bg-[#ff5722] transition-all duration-200
        px-3 py-2 md:px-4 md:py-3 min-w-0 max-w-[calc(100vw-32px)] md:min-w-[300px] md:max-w-[400px]
        shadow-2xl
        ${isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
      `}
      style={{ borderRadius: '2px' }}
    >
      {/* Icon - white on orange */}
      <div className="flex-shrink-0">
        <div
          className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-white/10"
          style={{ borderRadius: '2px' }}
        >
          <Send className="w-3 h-3 md:w-4 md:h-4 text-white" strokeWidth={2} />
        </div>
      </div>

      {/* Content - white text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 md:gap-2 mb-0.5">
          <div className="text-[9px] md:text-[11px] uppercase tracking-[0.1em] md:tracking-[0.15em] font-medium text-white/90 whitespace-nowrap">
            SENT
          </div>
          <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/80" style={{ borderRadius: '2px' }} />
          <div className="text-[9px] md:text-[11px] text-white/70 whitespace-nowrap">
            NOW
          </div>
        </div>
        <div className="text-xs md:text-sm text-white font-normal break-words">
          {message}
        </div>
      </div>

      {/* Close button - white */}
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 w-5 h-5 md:w-7 md:h-7 flex items-center justify-center
          text-white/70 hover:text-white hover:bg-white/10
          transition-all duration-150"
        style={{ borderRadius: '2px' }}
        aria-label="Dismiss notification"
      >
        <X className="w-3 h-3 md:w-4 md:h-4" strokeWidth={2} />
      </button>
    </div>
  )
}
