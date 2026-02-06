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
        fixed bottom-6 right-6 z-50
        flex items-center gap-4
        bg-[#ff5722] transition-all duration-200
        px-4 py-3 min-w-[300px] max-w-[400px]
        shadow-2xl
        ${isExiting ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
      `}
      style={{ borderRadius: '2px' }}
    >
      {/* Icon - white on orange */}
      <div className="flex-shrink-0">
        <div
          className="w-8 h-8 flex items-center justify-center bg-white/10"
          style={{ borderRadius: '2px' }}
        >
          <Send className="w-4 h-4 text-white" strokeWidth={2} />
        </div>
      </div>

      {/* Content - white text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="text-[11px] uppercase tracking-[0.15em] font-medium text-white/90">
            SENT
          </div>
          <div className="w-1 h-1 bg-white/80" style={{ borderRadius: '2px' }} />
          <div className="text-[11px] text-white/70">
            NOW
          </div>
        </div>
        <div className="text-sm text-white font-normal">
          {message}
        </div>
      </div>

      {/* Close button - white */}
      <button
        onClick={handleDismiss}
        className="flex-shrink-0 w-7 h-7 flex items-center justify-center
          text-white/70 hover:text-white hover:bg-white/10
          transition-all duration-150"
        style={{ borderRadius: '2px' }}
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  )
}
