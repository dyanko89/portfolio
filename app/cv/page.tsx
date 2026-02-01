import { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowUpRight, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "CV | Danny Yanko",
  description: "A summary of my professional experience, technical skills, and education.",
}

const experience = [
  {
    period: "2022 — Present",
    role: "Systems Architect & AI Consultant",
    company: "Independent",
    description: "Designed and deployed AI automation pipelines, built full-stack applications, and provided strategic consulting for startups and established businesses.",
  },
  {
    period: "2018 — 2022",
    role: "Digital Marketing & Web Development Lead",
    company: "Agency & Freelance",
    description: "Led strategy and execution for digital campaigns, including building conversion-focused websites, funnels, and analytics dashboards.",
  },
  {
    period: "2015 — 2018",
    role: "Technical Project Manager",
    company: "Enterprise",
    description: "Managed cross-functional teams, coordinated software development projects, and implemented process improvements that increased delivery efficiency by 40%.",
  },
]

const education = [
  {
    year: "2023",
    title: "AI & Machine Learning Specialization",
    institution: "Advanced Certification",
    description: "Advanced coursework in prompt engineering, model fine-tuning, and AI system architecture.",
  },
  {
    year: "2014",
    title: "Bachelor of Computer Science",
    institution: "University of Calgary",
    description: "Focus on software engineering and systems design.",
  },
]

const skills = [
  { category: "Languages", items: ["TypeScript", "Python", "JavaScript", "SQL"] },
  { category: "Frameworks", items: ["Next.js", "React", "Node.js", "FastAPI"] },
  { category: "AI/ML", items: ["OpenAI API", "Prompt Engineering", "LangChain", "RAG Systems"] },
  { category: "Infrastructure", items: ["AWS", "Vercel", "Docker", "PostgreSQL"] },
  { category: "Tools", items: ["Git", "Asana", "Figma", "Microsoft Graph"] },
]

export default function CVPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Header */}
        <section className="pt-32 md:pt-48 pb-20 md:pb-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <span className="label-uppercase text-accent mb-6 block tracking-widest">
              Curriculum Vitae
            </span>
            <h1 className="text-h1 text-foreground max-w-4xl mb-8">
              Experience & Background
            </h1>
            <p className="text-xl md:text-2xl text-foreground-secondary max-w-3xl leading-relaxed">
              A summary of my professional experience, technical skills, and education.
            </p>
          </div>
        </section>

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

        {/* Education Section */}
        <section className="py-20 md:py-32 border-t border-border">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
            <h2 className="text-h2 text-foreground mb-16">
              Education & Certifications
            </h2>
            <div className="space-y-0">
              {education.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-8 border-t border-border last:border-b"
                >
                  <div className="md:col-span-2">
                    <span className="text-sm text-accent font-mono">{item.year}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.institution}</p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-foreground-secondary">{item.description}</p>
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
              <Link
                href="/danny-yanko-cv.pdf"
                download
                className="group inline-flex items-center justify-between gap-4 px-8 py-5 border border-border text-foreground text-sm font-medium tracking-wide hover:border-border-hover hover:bg-surface/50 transition-all duration-150 min-h-[56px]"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PDF</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
