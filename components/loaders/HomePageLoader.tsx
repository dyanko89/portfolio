'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HomePageLoaderProps {
  onComplete?: () => void
}

export function HomePageLoader({ onComplete }: HomePageLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isExiting, setIsExiting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [glitchSlices, setGlitchSlices] = useState<Array<{
    id: number
    top: number
    height: number
    xOffset: number
    opacity: number
  }>>([])
  const [glitchFrame, setGlitchFrame] = useState(0)

  // Hardcoded settings for homepage
  const settings = {
    pathDrawSpeed: 1,
    fillDelay: 0.5,
    logoSize: 260,
    phosphorGlow: 70,
    glowDuration: 1.2,
    glowStrength: 55,
    glowColor: '#ffffff',
    chromaticAberration: 0,
    chromaticAberrationX: 95,
    chromaticAberrationY: 95,
    caColorA: '#ffdab7',
    caColorB: '#c9eaff',
    scanLineOpacity: 40,
    scanLineGap: 3,
    screenNoise: 50,
    vignetteStrength: 10,
    warmth: 35,
    backgroundColor: '#001f1a',
    glitchIntensity: 100,
    glitchStyle: 'crt-poweroff' as const,
  }

  // Logo SVG path data
  const LOGO_ORIG_W = 638.6
  const LOGO_ORIG_H = 764.9
  const mainPath = "M476.9,288.4c-6.2-6.2-12.7-12-19.5-17.4c6.8-5.4,13.3-11.2,19.5-17.4c20.4-20.4,36.5-44.3,47.7-70.8c11.6-27.5,17.6-56.7,17.6-86.8h-96c0,70.1-56.8,126.9-126.9,126.9c-70.1,0-126.9-56.8-126.9-126.9h-96c0,30,5.9,59.2,17.6,86.8c11.2,26.6,27.3,50.4,47.7,70.8c6.2,6.2,12.7,12,19.5,17.4c-6.8,5.4-13.3,11.2-19.5,17.4c-20.4,20.4-36.5,44.3-47.7,70.8C102.3,386.8,96.4,416,96.4,446h96c0-70.1,56.8-126.9,126.9-126.9c70.1,0,126.9,56.8,126.9,126.9s-56.8,126.9-126.9,126.9H96.4v96h222.9c30,0,59.2-5.9,86.8-17.6c26.6-11.2,50.4-27.3,70.8-47.7c20.4-20.4,36.5-44.3,47.7-70.8c11.6-27.5,17.6-56.7,17.6-86.8s-5.9-59.2-17.6-86.8C513.4,332.7,497.3,308.8,476.9,288.4z"

  // Timing calculations
  const rectDrawDuration = 0.8 / settings.pathDrawSpeed
  const pathDrawDuration = 3.2 / settings.pathDrawSpeed
  const pathDrawDelay = rectDrawDuration + 0.1
  const strokeCompletionTime = pathDrawDelay + pathDrawDuration
  const fillStartTime = strokeCompletionTime + settings.fillDelay
  const glowPulseDuration = settings.glowDuration
  const glowPulseEndTime = fillStartTime + 0.1 + (glowPulseDuration * 0.4)
  const glitchDuration = 0.4 + (settings.glitchIntensity / 100) * 0.6
  const glitchSteps = Math.floor(5 + (settings.glitchIntensity / 100) * 15)

  // Visual effect calculations
  const viewBoxSize = 1000
  const targetHeight = (settings.logoSize / 400) * viewBoxSize
  const scale = targetHeight / LOGO_ORIG_H
  const scaledW = LOGO_ORIG_W * scale
  const scaledH = LOGO_ORIG_H * scale
  const centerX = (viewBoxSize - scaledW) / 2
  const centerY = (viewBoxSize - scaledH) / 2
  const aberrationAmount = (settings.chromaticAberration / 100) * 12
  const aberrationXNorm = (settings.chromaticAberrationX - 50) / 50
  const aberrationYNorm = (settings.chromaticAberrationY - 50) / 50
  const aberrationXPx = aberrationXNorm * aberrationAmount
  const aberrationYPx = aberrationYNorm * aberrationAmount
  const glowAmount = (settings.phosphorGlow / 100) * 25
  const glowPx = glowAmount

  // Animation completion handler
  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, glowPulseEndTime * 1000)
    
    const completeTimer = setTimeout(() => {
      setIsComplete(true)
      onComplete?.()
    }, glowPulseEndTime * 1000 + glitchDuration * 1000 + 100)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(completeTimer)
    }
  }, [glowPulseEndTime, glitchDuration, onComplete])

  // Glitch slice generator
  useEffect(() => {
    if (!isExiting) return
    
    const intensity = settings.glitchIntensity / 100
    let frameCount = 0
    const frameTime = 30 + Math.random() * 20
    
    const glitchInterval = setInterval(() => {
      frameCount++
      setGlitchFrame(frameCount)
      
      const numSlices = Math.floor(3 + intensity * 8)
      const newSlices = []
      
      for (let i = 0; i < numSlices; i++) {
        if (Math.random() > 0.7) continue
        
        newSlices.push({
          id: Math.random(),
          top: Math.random() * 100,
          height: 1 + Math.random() * (5 + intensity * 15),
          xOffset: (Math.random() - 0.5) * intensity * 150,
          opacity: 0.3 + Math.random() * 0.7,
        })
      }
      setGlitchSlices(newSlices)
      
      if (frameCount > glitchSteps * 2) {
        clearInterval(glitchInterval)
        setGlitchSlices([])
      }
    }, frameTime)
    
    return () => {
      clearInterval(glitchInterval)
      setGlitchSlices([])
    }
  }, [isExiting, settings.glitchIntensity, glitchSteps])

  // Canvas noise animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationId: number

    const drawNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const intensity = settings.screenNoise / 100

      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = Math.random() * 255 * intensity
        imageData.data[i] = noise
        imageData.data[i + 1] = noise
        imageData.data[i + 2] = noise
        imageData.data[i + 3] = noise * 0.15
      }

      ctx.putImageData(imageData, 0, 0)
      animationId = requestAnimationFrame(drawNoise)
    }

    drawNoise()
    return () => cancelAnimationFrame(animationId)
  }, [settings.screenNoise])

  return (
    <motion.div
      className="fixed inset-0 z-50"
      style={{ backgroundColor: settings.backgroundColor }}
      initial={{ opacity: 1 }}
      animate={isExiting ? {
        opacity: [1, 1, 1, 1, 0.8, 1, 0],
        scaleY: [1, 0.8, 0.02, 0.15, 0.01, 0.005, 0],
        scaleX: [1, 1.05, 1.8, 1.2, 2.5, 3, 0],
        filter: [
          'brightness(1)',
          'brightness(1.5)',
          'brightness(3)',
          'brightness(2)',
          'brightness(4)',
          'brightness(6)',
          'brightness(0)',
        ],
        y: [0, 0, 0, 0, 0, 0, 0],
      } : {
        opacity: isComplete ? 0 : 1,
      }}
      transition={{ 
        duration: isExiting ? glitchDuration * 0.7 : 0.3,
        ease: isExiting ? [0.95, 0.05, 0.8, 0.04] : 'easeOut',
        times: isExiting ? [0, 0.08, 0.2, 0.4, 0.6, 0.8, 1] : undefined,
      }}
    >
      {/* Canvas noise */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 opacity-50"
      />

      {/* Main logo SVG with all layers */}
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="phosphor-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={glowAmount} />
          </filter>
        </defs>

        {/* Layer 1: Phosphor glow (blurred background) - only appears after fill */}
        <motion.g
          filter="url(#phosphor-glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: settings.phosphorGlow / 150 }}
          transition={{ duration: 0.4, delay: fillStartTime }}
        >
          <g transform={`translate(${centerX}, ${centerY}) scale(${scale})`}>
            <rect x="96.4" y="485.9" width="96" height="48" fill="#ffffff" stroke="#ffffff" strokeWidth={8 / scale} />
            <path d={mainPath} fill="#ffffff" stroke="#ffffff" strokeWidth={8 / scale} />
          </g>
        </motion.g>

        {/* Layer 2: Chromatic Aberration Channel A */}
        <g 
          transform={`translate(${centerX - aberrationXPx * 3}, ${centerY - aberrationYPx * 3}) scale(${scale})`}
          opacity={0.7}
          style={{ mixBlendMode: 'screen' }}
        >
          <motion.rect
            x="96.4" y="485.9" width="96" height="48"
            fill="none" stroke={settings.caColorA} strokeWidth={2 / scale}
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: rectDrawDuration, ease: 'easeInOut' },
              opacity: { duration: 0.1 },
            }}
          />
          <motion.path
            d={mainPath}
            fill="none" stroke={settings.caColorA} strokeWidth={2 / scale}
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: pathDrawDuration, ease: 'easeInOut', delay: pathDrawDelay },
              opacity: { duration: 0.1, delay: pathDrawDelay },
            }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: fillStartTime }}
          >
            <rect x="96.4" y="485.9" width="96" height="48" fill={settings.caColorA} />
            <path d={mainPath} fill={settings.caColorA} />
          </motion.g>
        </g>

        {/* Layer 3: Chromatic Aberration Channel B */}
        <g 
          transform={`translate(${centerX + aberrationXPx * 3}, ${centerY + aberrationYPx * 3}) scale(${scale})`}
          opacity={0.7}
          style={{ mixBlendMode: 'screen' }}
        >
          <motion.rect
            x="96.4" y="485.9" width="96" height="48"
            fill="none" stroke={settings.caColorB} strokeWidth={2 / scale}
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: rectDrawDuration, ease: 'easeInOut' },
              opacity: { duration: 0.1 },
            }}
          />
          <motion.path
            d={mainPath}
            fill="none" stroke={settings.caColorB} strokeWidth={2 / scale}
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: pathDrawDuration, ease: 'easeInOut', delay: pathDrawDelay },
              opacity: { duration: 0.1, delay: pathDrawDelay },
            }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: fillStartTime }}
          >
            <rect x="96.4" y="485.9" width="96" height="48" fill={settings.caColorB} />
            <path d={mainPath} fill={settings.caColorB} />
          </motion.g>
        </g>

        {/* Layer 4: Main white logo */}
        <g 
          transform={`translate(${centerX}, ${centerY}) scale(${scale})`}
          filter={`drop-shadow(0 0 ${glowAmount * 0.5}px rgba(255, 255, 255, 0.9))`}
        >
          <motion.rect
            x="96.4" y="485.9" width="96" height="48"
            fill="none" stroke="#ffffff" strokeWidth={3 / scale}
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: rectDrawDuration, ease: 'easeInOut' },
              opacity: { duration: 0.1 },
            }}
          />
          <motion.path
            d={mainPath}
            fill="none" stroke="#ffffff" strokeWidth={3 / scale}
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: pathDrawDuration, ease: 'easeInOut', delay: pathDrawDelay },
              opacity: { duration: 0.1, delay: pathDrawDelay },
            }}
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: fillStartTime }}
          >
            <rect x="96.4" y="485.9" width="96" height="48" fill="#ffffff" />
            <path d={mainPath} fill="#ffffff" />
          </motion.g>
        </g>

        {/* Layer 5: Completion glow pulse */}
        <motion.circle
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={settings.logoSize * 3}
          fill="url(#pulse-gradient)"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ 
            opacity: [0, settings.glowStrength / 100, (settings.glowStrength / 100) * 0.7, 0], 
            scale: [0.3, 1, 1.5, 2.5] 
          }}
          transition={{ duration: glowPulseDuration, delay: fillStartTime + 0.1, ease: 'easeOut' }}
        />
        <defs>
          <radialGradient id="pulse-gradient">
            <stop offset="0%" stopColor={settings.glowColor} stopOpacity={settings.glowStrength / 100} />
            <stop offset="50%" stopColor={settings.glowColor} stopOpacity={(settings.glowStrength / 100) * 0.4} />
            <stop offset="100%" stopColor={settings.glowColor} stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* INITIALIZING text */}
      <div
        className="absolute left-6 top-6 font-mono text-xs tracking-widest"
        style={{ 
          color: '#ffffff',
          filter: `blur(0px) drop-shadow(0 0 ${glowPx * 0.5}px rgba(255,255,255,${settings.phosphorGlow / 150})) drop-shadow(0 0 ${glowPx}px rgba(255,255,255,${settings.phosphorGlow / 200}))`,
        }}
      >
        <span>INITIALIZING</span>
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
        >.</motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.33, 0.66, 1] }}
        >.</motion.span>
        <motion.span
          animate={{ opacity: [0, 0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.75, 1] }}
        >.</motion.span>
      </div>

      {/* Scan lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent ${settings.scanLineGap - 1}px,
            rgba(0, 0, 0, ${(settings.scanLineOpacity / 100) * 0.8}) ${settings.scanLineGap - 1}px,
            rgba(0, 0, 0, ${(settings.scanLineOpacity / 100) * 0.8}) ${settings.scanLineGap}px
          )`,
          backgroundSize: `100% ${settings.scanLineGap}px`,
        }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle, transparent 0%, rgba(0,0,0,${settings.vignetteStrength / 100}) 100%)`,
        }}
      />

      {/* Warmth overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: `rgba(255, 140, 50, ${settings.warmth / 500})`,
          mixBlendMode: 'multiply',
        }}
      />

      {/* Glitch slice tears */}
      {isExiting && glitchSlices.map(slice => (
        <div
          key={slice.id}
          className="pointer-events-none absolute left-0 right-0 overflow-hidden"
          style={{
            top: `${slice.top}%`,
            height: `${slice.height}%`,
            transform: `translateX(${slice.xOffset}px)`,
            opacity: slice.opacity,
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(255,255,255,0.1) ${Math.random() * 30}%, 
              rgba(${Math.random() > 0.5 ? '255,100,100' : '100,100,255'},0.3) ${50 + Math.random() * 20}%, 
              rgba(255,255,255,0.1) ${80 + Math.random() * 15}%, 
              transparent 100%)`,
            mixBlendMode: 'screen',
          }}
        />
      ))}

      {/* Horizontal noise bands */}
      {isExiting && (
        <div className="pointer-events-none absolute inset-0">
          {[...Array(Math.floor(settings.glitchIntensity / 10))].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: `${(glitchFrame * 7 + i * 13) % 100}%`,
                height: `${2 + Math.random() * 5}%`,
                background: `repeating-linear-gradient(90deg, 
                  transparent, 
                  transparent 2px, 
                  rgba(255,255,255,${0.1 + Math.random() * 0.2}) 2px, 
                  rgba(255,255,255,${0.1 + Math.random() * 0.2}) 4px)`,
                opacity: glitchFrame % 3 === 0 ? 0.8 : 0.3,
                transform: `translateX(${(Math.random() - 0.5) * settings.glitchIntensity}px)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Blackout flashes */}
      {isExiting && glitchFrame % 4 < 2 && (
        <div 
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundColor: glitchFrame % 6 < 2 ? 'black' : 'white',
            opacity: glitchFrame % 6 < 2 ? 0.8 : 0.15,
            mixBlendMode: glitchFrame % 6 < 2 ? 'normal' : 'overlay',
          }}
        />
      )}
    </motion.div>
  )
}
