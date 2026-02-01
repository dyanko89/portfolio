"use client"

const capabilities = [
  { number: "01", title: "Design Systems", description: "Scalable component libraries" },
  { number: "02", title: "Web Development", description: "Modern, performant applications" },
  { number: "03", title: "User Experience", description: "Research-driven interfaces" },
  { number: "04", title: "Brand Identity", description: "Visual language & strategy" },
]

const techStack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
  "Figma",
  "Framer",
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header - Wide */}
        <div className="mb-20 md:mb-32">
          <span className="label-uppercase text-accent mb-6 block tracking-widest">
            About
          </span>
          <h2 className="text-h1 text-foreground max-w-4xl">
            Turning Ideas Into Digital Reality
          </h2>
        </div>
        
        {/* Two Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Column - Bio */}
          <div className="lg:col-span-5">
            <div className="space-y-6 text-foreground-secondary leading-relaxed text-lg">
              <p>
                With over 5 years of experience spanning design and development, 
                I create digital products that balance visual refinement with 
                technical precision.
              </p>
              <p>
                I believe in the intersection of aesthetics and function. Every project 
                is an opportunity to craft solutions that resonate with users while 
                solving complex business challenges.
              </p>
            </div>
            
            {/* Tech Stack */}
            <div className="mt-16">
              <h3 className="label-uppercase text-muted-foreground mb-6 tracking-widest">
                Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 border border-border text-sm text-foreground-secondary font-mono hover:border-border-hover hover:text-foreground transition-colors duration-150"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Capabilities */}
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="label-uppercase text-muted-foreground mb-8 tracking-widest">
              Capabilities
            </h3>
            <div className="space-y-0">
              {capabilities.map((item) => (
                <div
                  key={item.title}
                  className="group py-6 border-t border-border last:border-b flex items-baseline gap-6 hover:bg-surface/50 transition-colors duration-150 -mx-4 px-4"
                >
                  <span className="text-sm text-accent font-mono">{item.number}</span>
                  <div className="flex-1">
                    <h4 className="text-xl text-foreground mb-1 font-medium">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Experience Stat */}
            <div className="mt-16 pt-16 border-t border-border">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-h2 text-foreground">5+</span>
                  <p className="text-sm text-muted-foreground mt-2">Years Experience</p>
                </div>
                <div>
                  <span className="text-h2 text-foreground">40+</span>
                  <p className="text-sm text-muted-foreground mt-2">Projects Completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
