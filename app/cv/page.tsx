import { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageHeader } from "@/components/page-header"
import { ArrowUpRight, Download } from "lucide-react"
import { experience, systems, skills } from "@/lib/cv-data"

export const metadata: Metadata = {
  title: "CV | Danny Yanko",
  description: "14+ years building marketing systems and AI-powered automation. Solutions architect who ships production infrastructure.",
}

export default function CVPage() {
  return (
    <>
      <Navigation />
      <main>
        <PageHeader
          label="Curriculum Vitae"
          title="14 Years of Building Systems That Ship"
          description="Marketing operations architect turned AI-first systems builder. I don't just use tools—I build the infrastructure."
        />

        {/* Experience Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <h2 className="text-h2 text-foreground mb-16">
              Work Experience
            </h2>
            <div className="space-y-0">
              {experience.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-border last:border-b"
                >
                  <div className="md:col-span-3">
                    <span className="text-sm text-muted-foreground font-mono">{item.period}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-lg font-semibold text-foreground">{item.role}</h3>
                    <p className="text-foreground-secondary">{item.company}</p>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-foreground-secondary">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Systems Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <h2 className="text-h2 text-foreground mb-6">
              Systems I&apos;ve Built
            </h2>
            <p className="text-foreground-secondary text-lg mb-16 max-w-3xl">
              Production systems I&apos;ve architected. Not tutorials or toy projects—real infrastructure handling real transactions.
            </p>
            <div className="space-y-0">
              {systems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-border last:border-b"
                >
                  <div className="md:col-span-4">
                    <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  </div>
                  <div className="md:col-span-5">
                    <p className="text-foreground-secondary">{item.description}</p>
                  </div>
                  <div className="md:col-span-3">
                    <div className="flex flex-wrap gap-2">
                      {item.tech.map((t) => (
                        <span key={t} className="text-xs font-mono text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              <div className="lg:col-span-4">
                <h2 className="text-h2 text-foreground mb-6">
                  Technical Skills
                </h2>
                <p className="text-foreground-secondary text-lg leading-relaxed">
                  Core technologies and tools I use to build modern systems.
                </p>
              </div>
              <div className="lg:col-span-7 lg:col-start-6">
                <div className="space-y-8">
                  {skills.map((skillGroup, index) => (
                    <div key={index}>
                      <h3 className="label-uppercase text-muted-foreground mb-4 tracking-widest">
                        {skillGroup.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-4 py-2 border border-border text-foreground-secondary text-sm font-mono hover:border-border-hover hover:text-foreground transition-colors duration-150"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <h2 className="text-h2 text-foreground mb-4">
                  Full CV
                </h2>
                <p className="text-foreground-secondary text-lg">
                  Download my complete curriculum vitae in PDF format.
                </p>
              </div>
              <a
                href="/api/cv"
                className="group inline-flex items-center justify-between gap-4 px-8 py-5 border border-border text-foreground text-sm font-medium tracking-wide hover:border-border-hover hover:bg-surface/50 transition-all duration-150 min-h-[56px]"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PDF</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
