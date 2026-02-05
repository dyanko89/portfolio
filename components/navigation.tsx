"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about", label: "ABOUT" },
  { href: "/projects", label: "WORK" },
  { href: "/services", label: "SERVICES" },
  // { href: "/blog", label: "BLOG" }, // Temporarily disabled
  { href: "/contact", label: "CONTACT" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    // Check initial scroll position on mount
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-250",
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16">
          {/* Logo */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity duration-150"
          >
            <Image
              src="/assets/djy89.svg"
              alt="DJY89"
              width={64}
              height={64}
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white hover:text-accent transition-colors duration-150 tracking-widest font-[300]"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2.5 bg-accent text-accent-foreground text-sm font-medium tracking-wide hover:bg-accent-hover transition-colors duration-150"
            >
              GET IN TOUCH
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground hover:text-accent transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background transition-all duration-300 md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full pt-24 px-6">
          {/* Navigation Links */}
          <div className="flex-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block py-4 border-b border-border text-h2 text-white font-[300] tracking-widest hover:text-accent transition-colors duration-150",
                  isOpen && "animate-fade-in-up",
                )}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="py-8 border-t border-border">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={cn(
                "block w-full py-5 bg-accent text-accent-foreground text-center font-medium tracking-wide hover:bg-accent-hover transition-colors duration-150",
                isOpen && "animate-fade-in-up"
              )}
              style={{ animationDelay: "300ms" }}
            >
              GET IN TOUCH
            </Link>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Available for new projects
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
