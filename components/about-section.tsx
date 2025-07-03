// components/about-section.tsx
'use client';
import { useState } from 'react';

const SkillItem = ({ title, level, progress, description }: {
  title: string;
  level: string;
  progress: number;
  description: string;
}) => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div 
      className={`skill-item ${isActive ? 'active' : ''}`}
      onClick={() => setIsActive(!isActive)}
    >
      <div className="skill-content-wrapper">
        <div className="skill-default-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="text-label-14">{title}</span>
            <span className="badge">
              <div className="status-dot"></div>
              {level}
            </span>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="skill-description-content">
          <p className="skill-description-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="grid-container">
        <div className="grid">
          <div className="grid-cell span-8 fade-in-on-scroll">
            <h2 className="text-heading-32" style={{ marginBottom: '32px' }}>Who I Am</h2>
            <p className="text-copy-18" style={{ marginBottom: '24px' }}>
              Hi, I'm <strong>Danny Yanko</strong>—a multi-disciplinary force operating at the intersection of strategy, technology, and execution. I help businesses, teams, and founders move faster, work smarter, and scale sustainably.
            </p>
            <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '32px' }}>
              From deploying AI-first automation pipelines to building conversion-optimized web experiences, I specialize in creating future-proof systems that don't just function—they <em>flow</em>. I've worn every hat: marketing manager, developer, strategist, project rescuer, system architect. And I'm done playing small.
            </p>
            
            <h3 className="text-heading-20" style={{ marginBottom: '32px' }}>What Sets Me Apart</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <SkillItem 
                title="AI Systems & Automation"
                level="Expert"
                progress={95}
                description="I design automation pipelines that combine AI tools, APIs, and scripting to replace repetitive tasks, reduce error, and move faster with less manual input."
              />
              <SkillItem 
                title="Systems Architecture"
                level="Advanced"
                progress={90}
                description="I map out how tools, data, and workflows connect — then build systems that are modular, scalable, and easy to maintain, whether it's for websites, dashboards, or internal tools."
              />
              <SkillItem 
                title="Strategic Design"
                level="Advanced"
                progress={90}
                description="I bring structure to chaos — aligning business goals with system flows, making sure the way we work supports what we're building and who we're building it for."
              />
              <SkillItem 
                title="Creative Development"
                level="Specialist"
                progress={85}
                description="I blend design, storytelling, and front-end development to create user-facing experiences that are sharp, on-brand, and interactive without being overbuilt."
              />
            </div>
          </div>
          
          <div className="grid-cell span-4 fade-in-on-scroll">
            <div className="code-block" style={{ marginBottom: '48px' }}>
              <div className="code-header">
                <span className="code-title">Current Status</span>
                <div className="code-dots">
                  <div className="code-dot"></div>
                  <div className="code-dot"></div>
                  <div className="code-dot"></div>
                </div>
              </div>
              <div style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                const danny = &#123;<br />
                &nbsp;&nbsp;status: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>"available"</span>,<br />
                &nbsp;&nbsp;location: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>"Calgary, AB"</span>,<br />
                &nbsp;&nbsp;focus: <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>"AI automation + full-stack"</span>,<br />
                &#125;;
              </div>
            </div>

            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-date">2022–Now</div>
                <div className="timeline-title">Systems Architect & Creative Technologist</div>
                <div className="timeline-content">Automation, AI, and ops — wrapped around design, dev, and execution.</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-date">2018–2022</div>
                <div className="timeline-title">Digital Marketing & Web Dev</div>
                <div className="timeline-content">Strategy, content, and code — leading and building across campaigns and platforms.</div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-date">2015–2018</div>
                <div className="timeline-title">Creative Generalist</div>
                <div className="timeline-content">Design, video, branding, and web — shipping full-stack for early brands and agencies.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}