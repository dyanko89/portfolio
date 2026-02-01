import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"

const socialLinks = [
  { icon: Github, href: "https://github.com/dyanko89", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/dyanko89", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/in/dyanko89", label: "LinkedIn" },
]

const footerLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/services", label: "Services" },
  { href: "/cv", label: "CV" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-16 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block text-h3 text-foreground hover:text-accent transition-colors duration-150 mb-4"
            >
              Dyanko89
            </Link>
            <p className="text-foreground-secondary text-sm leading-relaxed max-w-xs">
              Systems Architect & AI Consultant crafting digital experiences that transform complexity into clarity.
            </p>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-3 lg:col-start-6">
            <h4 className="label-uppercase text-muted-foreground mb-4 tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-foreground-secondary hover:text-foreground transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="label-uppercase text-muted-foreground mb-4 tracking-widest">
              Connect
            </h4>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-foreground-secondary hover:text-accent border border-border hover:border-accent transition-all duration-150"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} Dyanko89. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            From Chaos to Clarity.
          </p>
        </div>
      </div>
    </footer>
  )
}
