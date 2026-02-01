"use client"

import Link from "next/link"
import { ArrowDownRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-accent">
      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-between px-6 md:px-12 lg:px-16 py-24 md:py-32">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Label */}
          <div className="animate-fade-in-up">
            <span className="label-uppercase text-background/70 tracking-widest">
              Systems Architect & Automation Consultant
            </span>
          </div>
          
          {/* Year/Status */}
          <div className="flex items-center gap-4 animate-fade-in-up delay-100">
            <span className="font-mono text-sm text-background/60">Available 2026</span>
            <span className="w-2 h-2 rounded-full bg-background animate-pulse" />
          </div>
        </div>
        
        {/* Center - Main Headline */}
        <div className="flex-1 flex flex-col justify-center py-12 md:py-16">
          <h1 className="text-display text-background leading-none">
            <span className="block animate-fade-in-up delay-100">From</span>
            <span className="block animate-fade-in-up delay-200">Chaos to</span>
            <span className="block animate-fade-in-up delay-300">Clarity</span>
          </h1>
        </div>
        
        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          {/* Description */}
          <div className="max-w-md animate-fade-in-up delay-400">
            <p className="text-base md:text-lg text-background/80 leading-relaxed text-pretty">
              Crafting digital experiences that transform complexity into elegant, 
              intuitive solutions. Where design meets engineering.
            </p>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
            <Link
              href="#projects"
              className="group inline-flex items-center justify-between gap-6 px-6 py-4 bg-background text-accent text-sm font-medium tracking-wide hover:bg-background/90 transition-colors duration-150 min-h-[56px]"
            >
              <span>View Projects</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center justify-between gap-6 px-6 py-4 border-2 border-background/30 text-background text-sm font-medium tracking-wide hover:border-background hover:bg-background/10 transition-all duration-150 min-h-[56px]"
            >
              <span>Get in Touch</span>
              <span className="font-mono text-xs text-background/50">01</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in-up delay-500">
        <span className="label-uppercase text-background/50 text-[10px]">Scroll</span>
        <div className="w-px h-8 bg-background/30" />
      </div>
    </section>
  )
}
