// components/hero-section.tsx
export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-grid"></div>
      <div className="hero-geometric">
        <div className="hero-triangle"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="text-heading-72 hero-title animate-fade-in-up">
          <strong>From Chaos to Clarity</strong><br />
          <span className="text-heading-48">Optimize. Automate. Accelerate.</span>
        </h1>
        <p className="hero-subtitle animate-fade-in-up stagger-1">
          AI Consultant. Full-Stack Architect. Digital Strategist.<br />
          I build systems that scale, strategies that stick, and solutions that transform mess into momentum.
        </p>
        <div className="cta-buttons animate-fade-in-up stagger-2">
          <a href="#projects" className="btn btn-primary">Explore My Work</a>
          <a href="#contact" className="btn btn-secondary">Let's Build Something</a>
        </div>
      </div>
    </section>
  );
}