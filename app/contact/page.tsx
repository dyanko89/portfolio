"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowRight, Mail, MapPin, Clock, ArrowUpRight, Loader2 } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "dyanko89@gmail.com",
    href: "mailto:dyanko89@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Calgary, AB",
    href: null,
  },
  {
    icon: Clock,
    label: "Availability",
    value: "Open to new projects",
    href: null,
  },
]

const socials = [
  { name: "LinkedIn", href: "https://linkedin.com/in/dyanko89" },
  { name: "GitHub", href: "https://github.com/dyanko89" },
]

// Reusable Contact Info Component
function ContactInfoBlock() {
  return (
    <>
      {/* Contact Info */}
      <div className="space-y-6">
        {contactInfo.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <item.icon className="w-5 h-5 text-accent mt-1" />
            <div>
              <span className="label-uppercase text-muted-foreground block mb-1 tracking-widest">
                {item.label}
              </span>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-foreground hover:text-accent transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <span className="text-foreground">{item.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Social Links */}
      <div>
        <span className="label-uppercase text-muted-foreground block mb-6 tracking-widest">
          Social
        </span>
        <div className="space-y-4">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group py-3 border-b border-border hover:border-border-hover transition-colors"
            >
              <span className="text-foreground-secondary group-hover:text-foreground transition-colors">
                {social.name}
              </span>
              <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setFormState("success")
        setFormData({ name: "", email: "", company: "", budget: "", message: "" })
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || "Failed to send message. Please try again.")
        setFormState("error")
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.")
      setFormState("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Main Contact Section - Single merged section */}
        <section className="pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              {/* Left Column - Header + Info (Desktop) */}
              <div className="lg:col-span-5 order-1 lg:order-none">
                {/* Header Copy */}
                <div className="mb-8 lg:mb-12">
                  <span className="label-uppercase text-accent mb-6 block tracking-widest">
                    Contact
                  </span>
                  <h1 className="text-h2 text-foreground max-w-4xl mb-6">
                    Let&apos;s Chat
                  </h1>
                  <p className="text-xl text-foreground-secondary leading-relaxed">
                    Have a project in mind, a complex problem, or a bottleneck that needs
                    a system-driven solution? I&apos;d love to hear about it.
                  </p>
                </div>

                {/* Contact Info - Desktop Only */}
                <div className="hidden lg:flex flex-col space-y-8">
                  <ContactInfoBlock />
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="lg:col-span-7 order-2 lg:order-none">
                {formState === "success" ? (
                  <div className="bg-surface border border-border p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 text-accent flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-h3 text-foreground mb-4">
                      Message Sent
                    </h2>
                    <p className="text-foreground-secondary mb-8">
                      Thanks for reaching out! I&apos;ll get back to you within 24-48 hours.
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="text-accent hover:text-accent-hover transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Error Message */}
                    {formState === "error" && errorMessage && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400">
                        {errorMessage}
                      </div>
                    )}

                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="label-uppercase text-muted-foreground block mb-3 tracking-widest">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-lg"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="label-uppercase text-muted-foreground block mb-3 tracking-widest">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-lg"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Company & Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="label-uppercase text-muted-foreground block mb-3 tracking-widest">
                          Company (Optional)
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-lg"
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label htmlFor="budget" className="label-uppercase text-muted-foreground block mb-3 tracking-widest">
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground focus:outline-none focus:border-accent transition-colors text-lg appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-background">Select a range</option>
                          <option value="$1,000 - $5,000" className="bg-background">$1,000 - $5,000</option>
                          <option value="$5,000 - $10,000" className="bg-background">$5,000 - $10,000</option>
                          <option value="$10,000 - $25,000" className="bg-background">$10,000 - $25,000</option>
                          <option value="$25,000+" className="bg-background">$25,000+</option>
                          <option value="Retainer" className="bg-background">Ongoing Retainer</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="label-uppercase text-muted-foreground block mb-3 tracking-widest">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-0 py-4 bg-transparent border-0 border-b border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent transition-colors text-lg resize-none"
                        placeholder="Tell me about your project, timeline, and any specific requirements..."
                      />
                    </div>

                    {/* Submit */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={formState === "submitting"}
                        className="group inline-flex items-center justify-between gap-6 px-8 py-5 bg-accent text-accent-foreground text-sm font-medium tracking-wide hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 min-h-[56px]"
                      >
                        {formState === "submitting" ? (
                          <>
                            <span>SENDING...</span>
                            <Loader2 className="w-4 h-4 animate-spin" />
                          </>
                        ) : (
                          <>
                            <span>SEND MESSAGE</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Mobile Contact Info - After Form */}
              <div className="lg:hidden order-3 space-y-8 pt-8 mt-4 border-t border-border">
                <ContactInfoBlock />
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="text-h2 text-foreground mb-4">
                  Common Questions
                </h2>
                <p className="text-foreground-secondary text-lg">
                  Find answers to frequently asked questions about working together.
                </p>
              </div>
              <Link
                href="/services#faq"
                className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground text-sm font-medium tracking-wide hover:border-border-hover hover:bg-surface/50 transition-all duration-150"
              >
                VIEW FAQ
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
