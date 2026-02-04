import Link from "next/link"
import Image from "next/image"

const footerLinks = [
  { href: "/projects", label: "Projects" },
  // { href: "/blog", label: "Blog" }, // Temporarily disabled
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
          {/* Brand with Logo */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-block mb-4 hover:opacity-80 transition-opacity duration-150"
            >
              <Image
                src="/assets/djy89.svg"
                alt="DJY89"
                width={64}
                height={64}
                className="h-16 w-auto"
              />
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

          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h4 className="label-uppercase text-muted-foreground mb-4 tracking-widest">
              Contact
            </h4>
            <a
              href="mailto:danny@djy89.net"
              className="text-foreground-secondary hover:text-accent transition-colors duration-150"
            >
              danny@djy89.net
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {currentYear} DJY89. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            From Chaos to Clarity.
          </p>
        </div>
      </div>
    </footer>
  )
}
