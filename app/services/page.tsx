// app/services/page.tsx
import { FeatureCard } from '@/components/FeatureCard';

export default function ServicesPage() {
  return (
    <>
      <section className="section text-center">
        <div className="grid-container">
          <h1 className="text-heading-48">Services</h1>
          <p className="text-copy-18 text-neutral-400" style={{ maxWidth: '600px', margin: '16px auto' }}>
            From AI integrations to automation pipelines, I design and build the systems that power modern business.
          </p>
        </div>
      </section>
      <section className="section" style={{paddingTop: 0}}>
        <div className="grid-container">
          <div className="feature-grid">
            <FeatureCard 
              icon="◦" 
              title="AI Automation & Consulting" 
              description="Custom GPTs, smart data pipelines, and prompt engineering to replace repetitive tasks and unlock efficiency." 
            />
            <FeatureCard 
              icon="◉" 
              title="Technical Project Management" 
              description="Fractional PM/solutions lead for high-output teams. I manage scope, unblock developers, and turn chaos into clarity." 
            />
            <FeatureCard 
              icon="◈" 
              title="Full-Stack Development" 
              description="Modern web apps (Next.js, WordPress) and APIs built for performance and scale." 
            />
          </div>
        </div>
      </section>
    </>
  );
}
