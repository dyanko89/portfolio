// components/services-section.tsx  
export default function ServicesSection() {
  return (
    <section id="services" className="section">
      {
         <div className="grid-container">
      <h2 className="text-heading-32 fade-in-on-scroll" style={{ marginBottom: '48px' }}>Services</h2>
      
      <div className="feature-grid">
        <div className="feature-card fade-in-on-scroll">
          <div className="icon">◦</div>
          <h3 className="text-heading-20" style={{ marginBottom: '12px' }}>AI Automation & Consulting</h3>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px' }}>
            Transform your workflows with intelligent automation and custom AI solutions that actually work.
          </p>
          <ul style={{ listStyle: 'none', color: 'rgba(255, 255, 255, 0.7)' }}>
            <li style={{ marginBottom: '8px' }}>→ Custom GPTs and multi-agent systems</li>
            <li style={{ marginBottom: '8px' }}>→ Email/task workflows and smart data pipelines</li>
            <li style={{ marginBottom: '8px' }}>→ Prompt design and AI strategy consulting</li>
          </ul>
        </div>

        <div className="feature-card fade-in-on-scroll">
          <div className="icon">◉</div>
          <h3 className="text-heading-20" style={{ marginBottom: '12px' }}>Technical Project Management</h3>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px' }}>
            Fractional PM or solutions lead for high-output teams that need results, not meetings.
          </p>
          <ul style={{ listStyle: 'none', color: 'rgba(255, 255, 255, 0.7)' }}>
            <li style={{ marginBottom: '8px' }}>→ Project rescue and team accountability frameworks</li>
            <li style={{ marginBottom: '8px' }}>→ Scope mapping and workflow optimization</li>
            <li style={{ marginBottom: '8px' }}>→ Chaos-to-clarity transformations</li>
          </ul>
        </div>

        <div className="feature-card fade-in-on-scroll">
          <div className="icon">◈</div>
          <h3 className="text-heading-20" style={{ marginBottom: '12px' }}>Full-Stack Development</h3>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px' }}>
            Modern web applications built for performance, scalability, and the real world.
          </p>
          <ul style={{ listStyle: 'none', color: 'rgba(255, 255, 255, 0.7)' }}>
            <li style={{ marginBottom: '8px' }}>→ React, Next.js, and WordPress solutions</li>
            <li style={{ marginBottom: '8px' }}>→ Custom APIs and data models</li>
            <li style={{ marginBottom: '8px' }}>→ DevOps setup and infrastructure optimization</li>
          </ul>
        </div>

        <div className="feature-card fade-in-on-scroll">
          <div className="icon">◎</div>
          <h3 className="text-heading-20" style={{ marginBottom: '12px' }}>Digital Strategy & Experience</h3>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '16px' }}>
            Conversion-optimized campaigns and user experiences that drive measurable results.
          </p>
          <ul style={{ listStyle: 'none', color: 'rgba(255, 255, 255, 0.7)' }}>
            <li style={{ marginBottom: '8px' }}>→ Site architecture and funnel optimization</li>
            <li style={{ marginBottom: '8px' }}>→ SEO/analytics integration</li>
            <li style={{ marginBottom: '8px' }}>→ Brand positioning and messaging frameworks</li>
          </ul>
        </div>
      </div>
    </div>
      }
    </section>
  );
}