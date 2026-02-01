import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getAllProjects } from "@/lib/mdx/content"

export default async function HomePage() {
  const projects = await getAllProjects()
  // Get only the first 4 projects for the home page
  const featuredProjects = projects.slice(0, 4)

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection projects={featuredProjects} />
      <ServicesSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
