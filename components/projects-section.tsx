// components/projects-section.tsx
import Link from 'next/link';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      {
        /* This section will contain your projects */
        /* You can use a grid or flexbox to layout the projects */
        /* Each project can be a card with an image, title, description, and link */

         <div className="grid-container">
      <h2 className="text-heading-32 fade-in-on-scroll" style={{ marginBottom: '48px' }}>Featured Projects</h2>
      <div className="grid">
        <div className="grid-cell span-6 fade-in-on-scroll">
          <div className="icon">◦</div>
          <h3 className="text-heading-20" style={{ marginBottom: '8px' }}>Custom AI Assistant</h3>
          <p className="text-copy-14" style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '16px', fontStyle: 'italic' }}>Project Management Automation</p>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
            Built an AI-powered tool that syncs emails, extracts tasks, and drafts responses across Outlook and Asana. Features natural language summaries, smart scheduling, and automated task assignment designed for operational teams handling daily chaos.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <span className="badge">OpenAI API</span>
            <span className="badge">Microsoft Graph</span>
            <span className="badge">Asana API</span>
            <span className="badge">Node.js</span>
          </div>
          <Link href="/projects/ai-assistant" className="btn btn-subtle">View Details</Link>
        </div>
        
        <div className="grid-cell span-6 fade-in-on-scroll">
          <div className="icon">◉</div>
          <h3 className="text-heading-20" style={{ marginBottom: '8px' }}>Enterprise LMS Pipeline</h3>
          <p className="text-copy-14" style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '16px', fontStyle: 'italic' }}>SCORM-Compliant Learning</p>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
            Built complete pipeline from script generation to final SCORM packaging. Integrated ElevenLabs narration, animation workflows, and version-controlled updates delivering high-volume branded training modules for retail onboarding programs.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <span className="badge">Python</span>
            <span className="badge">ElevenLabs API</span>
            <span className="badge">SCORM</span>
            <span className="badge">AWS S3</span>
          </div>
          <Link href="/projects/enterprise-lms" className="btn btn-subtle">View Details</Link>
        </div>

        <div className="grid-cell span-6 fade-in-on-scroll">
          <div className="icon">◈</div>
          <h3 className="text-heading-20" style={{ marginBottom: '8px' }}>AI Development Toolkit</h3>
          <p className="text-copy-14" style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '16px', fontStyle: 'italic' }}>Project Scaffolding System</p>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
            Smart project onboarding with memory-aware prompts and CLI utilities. Includes OpenAI/Claude integration, semantic versioning SOPs, and developer workflows designed for consultants, development teams, and product builders.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <span className="badge">Node.js CLI</span>
            <span className="badge">OpenAI/Claude APIs</span>
            <span className="badge">Git Hooks</span>
            <span className="badge">Templates</span>
          </div>
          <Link href="/projects/ai-development-toolkit" className="btn btn-subtle">View Details</Link>
        </div>

        <div className="grid-cell span-6 fade-in-on-scroll">
          <div className="icon">◎</div>
          <h3 className="text-heading-20" style={{ marginBottom: '8px' }}>B2B Marketing Infrastructure</h3>
          <p className="text-copy-14" style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '16px', fontStyle: 'italic' }}>Regulated Industry Platform</p>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px' }}>
            Led strategy, design, and technical implementation across compliance-heavy campaigns. Built dynamic WordPress storefronts, SEO-optimized funnels, and internal dashboards with repeatable campaign templates and real-time performance analytics.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            <span className="badge">WordPress</span>
            <span className="badge">PHP</span>
            <span className="badge">AWS</span>
            <span className="badge">Analytics</span>
          </div>
          <Link href="/projects/b2b-marketing-infrastructure" className="btn btn-subtle">View Details</Link>
        </div>
      </div>
    </div>
      }
    </section>
  );
}
