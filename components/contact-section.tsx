"use client"

import React from "react"
import { useState } from "react"
import { ArrowUpRight, Send } from "lucide-react"

const contactMethods = [
  {
    label: "Email",
    value: "danny@djy89.net",
    href: "mailto:danny@djy89.net",
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: "https://linkedin.com/in/dyanko89",
    external: true,
  },
]

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setFormState({ name: "", email: "", message: "" })
  }

  return (
    <section id="contact" className="relative py-32 md:py-48 bg-background-elevated">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Large Headline */}
        <div className="mb-20 md:mb-32">
          <span className="label-uppercase text-accent mb-6 block tracking-widest">
            Contact
          </span>
          <h2 className="text-h1 text-foreground max-w-5xl">
            Let&apos;s Build Something Great Together
          </h2>
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left - Contact Methods */}
          <div className="lg:col-span-4">
            <p className="text-foreground-secondary text-lg leading-relaxed mb-12">
              Have a project in mind? I&apos;d love to hear about it. Send me a message 
              and let&apos;s explore the possibilities.
            </p>
            
            <div className="space-y-6">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target={method.external ? "_blank" : undefined}
                  rel={method.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between py-4 border-b border-border hover:border-foreground-secondary transition-colors duration-150"
                >
                  <div>
                    <span className="label-uppercase text-muted-foreground block mb-1 tracking-widest">
                      {method.label}
                    </span>
                    <span className="text-foreground group-hover:text-accent transition-colors duration-150">
                      {method.value}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors duration-150" />
                </a>
              ))}
            </div>
            
            {/* Availability Status */}
            <div className="mt-12 p-6 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="label-uppercase text-success tracking-widest">Available</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Currently accepting new projects for Q1 2026
              </p>
            </div>
          </div>
          
          {/* Right - Form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="label-uppercase text-foreground-secondary block mb-3 tracking-widest"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-150 text-base"
                    placeholder="Your name"
                  />
                </div>
                
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="label-uppercase text-foreground-secondary block mb-3 tracking-widest"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-150 text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="label-uppercase text-foreground-secondary block mb-3 tracking-widest"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors duration-150 resize-none text-base"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex items-center justify-between gap-6 px-8 py-5 bg-accent text-accent-foreground text-sm font-medium tracking-wide hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 min-h-[56px]"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
