'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface PageLoaderProps {
  onComplete?: () => void
  duration?: number
}

export function PageLoader({ onComplete, duration = 0.8 }: PageLoaderProps) {
  const [isComplete, setIsComplete] = useState(false)

  const logoSize = 120
  const backgroundColor = '#001f1a'

  // Logo SVG path data
  const mainPath = "M476.9,288.4c-6.2-6.2-12.7-12-19.5-17.4c6.8-5.4,13.3-11.2,19.5-17.4c20.4-20.4,36.5-44.3,47.7-70.8c11.6-27.5,17.6-56.7,17.6-86.8h-96c0,70.1-56.8,126.9-126.9,126.9c-70.1,0-126.9-56.8-126.9-126.9h-96c0,30,5.9,59.2,17.6,86.8c11.2,26.6,27.3,50.4,47.7,70.8c6.2,6.2,12.7,12,19.5,17.4c-6.8,5.4-13.3,11.2-19.5,17.4c-20.4,20.4-36.5,44.3-47.7,70.8C102.3,386.8,96.4,416,96.4,446h96c0-70.1,56.8-126.9,126.9-126.9c70.1,0,126.9,56.8,126.9,126.9s-56.8,126.9-126.9,126.9H96.4v96h222.9c30,0,59.2-5.9,86.8-17.6c26.6-11.2,50.4-27.3,70.8-47.7c20.4-20.4,36.5-44.3,47.7-70.8c11.6-27.5,17.6-56.7,17.6-86.8s-5.9-59.2-17.6-86.8C513.4,332.7,497.3,308.8,476.9,288.4z"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true)
      onComplete?.()
    }, duration * 1000)

    return () => clearTimeout(timer)
  }, [duration, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor }}
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.2, delay: isComplete ? 0.1 : 0 }}
    >
      {/* Subtle scan lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 3px
          )`,
        }}
      />

      {/* Logo with glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: [0, 1, 1, 0.8],
          scale: [0.9, 1, 1, 1.02],
        }}
        transition={{ 
          duration: duration,
          times: [0, 0.2, 0.7, 1],
          ease: 'easeOut'
        }}
        style={{
          filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.2))',
        }}
      >
        <svg
          viewBox="0 0 638.6 764.9"
          style={{
            width: logoSize,
            height: logoSize,
          }}
        >
          {/* Subtle glow layer */}
          <g opacity={0.3} filter="blur(8px)">
            <rect x="96.4" y="485.9" width="96" height="48" fill="#ffffff" />
            <path d={mainPath} fill="#ffffff" />
          </g>

          {/* Main logo */}
          <g>
            <rect x="96.4" y="485.9" width="96" height="48" fill="#ffffff" />
            <path d={mainPath} fill="#ffffff" />
          </g>
        </svg>
      </motion.div>

      {/* Subtle pulse effect */}
      <motion.div
        className="pointer-events-none absolute"
        style={{
          width: logoSize * 2,
          height: logoSize * 2,
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 60%)',
          borderRadius: '50%',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 0.5, 0],
          scale: [0.5, 1.5, 2],
        }}
        transition={{ 
          duration: duration * 0.8,
          delay: duration * 0.2,
          ease: 'easeOut'
        }}
      />
    </motion.div>
  )
}
