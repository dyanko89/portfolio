// components/projects-section-client.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/mdx/types';
import { ProjectCard } from '@/components/project-card';

interface ProjectsSectionClientProps {
  projects: Project[];
}

export function ProjectsSectionClient({ projects }: ProjectsSectionClientProps) {
  useEffect(() => {
    // Scroll animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observe elements after they're rendered
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="projects" className="section">
      <div className="grid-container">
        <div className="fade-in-on-scroll" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 
            className="text-heading-48" 
            style={{ 
              marginBottom: '16px',
              background: 'linear-gradient(135deg, var(--foreground) 0%, rgba(255, 255, 255, 0.7) 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Featured Projects
          </h2>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.6)', 
            fontSize: '1.125rem', 
            maxWidth: '600px', 
            margin: '0 auto' 
          }}>
            A collection of systems, tools, and solutions that transform complexity into clarity.
          </p>
        </div>

        {/* Enhanced Projects Grid */}
        <div className="projects-page-grid" style={{ marginBottom: '48px' }}>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects Link */}
        <div style={{ textAlign: 'center' }}>
          <Link 
            href="/projects" 
            className="btn btn-primary"
            style={{
              padding: '12px 32px',
              fontSize: '1rem',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--foreground)',
              textDecoration: 'none',
              borderRadius: '8px',
              display: 'inline-block',
              transition: 'all 0.2s ease'
            }}
          >
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}