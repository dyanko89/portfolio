// components/project-card.tsx
'use client';

import Link from "next/link";
import type { Project } from '@/lib/mdx/types';
import { getProjectBackgroundImage, hasProjectImage } from '@/lib/project-utils';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Truncate description to ~180 characters for 3-line display
  const truncateDescription = (text: string, maxLength: number = 180): string => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).replace(/\s+\S*$/, '') + '...';
  };

  // Get icon SVG for each project type
  const getProjectIcon = (slug: string) => {
    const icons: Record<string, JSX.Element> = {
      'ai-assistant': (
        <svg viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      'enterprise-lms': (
        <svg viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      'ai-development-toolkit': (
        <svg viewBox="0 0 24 24">
          <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
        </svg>
      ),
      'b2b-marketing-infrastructure': (
        <svg viewBox="0 0 24 24">
          <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
        </svg>
      )
    };
    return icons[slug] || icons['ai-assistant'];
  };

  // Get version info for each project
  const getVersionInfo = (slug: string): string => {
    const versions: Record<string, string> = {
      'ai-assistant': 'v2.1.3',
      'enterprise-lms': '15 modules',
      'ai-development-toolkit': '50+ templates',
      'b2b-marketing-infrastructure': '6 campaigns'
    };
    return versions[slug] || 'v1.0.0';
  };

  return (
    <Link 
      href={project.url} 
      className={`enhanced-project-card fade-in-on-scroll stagger-${index + 1}`}
    >
      <div className="project-card-header">
        <div 
          className="project-image-placeholder"
          style={hasProjectImage(project.slug) ? {
            backgroundImage: `url(${getProjectBackgroundImage(project.slug)})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : {}}
        >
          <div className="project-icon-corner">
            {getProjectIcon(project.slug)}
          </div>
          {!hasProjectImage(project.slug) && (
            <span className="image-placeholder-text">IMAGE</span>
          )}
        </div>
        <div className="project-status-badge">
          <span className="status-dot"></span>
          {project.status}
        </div>
      </div>
      
      <div className="project-title-section">
        <h2 className="project-title-with-version text-heading-20">
          {project.title}
          <span className="project-version-info">{getVersionInfo(project.slug)}</span>
        </h2>
      </div>
      
      <p className="project-description-limited text-copy-14">
        {truncateDescription(project.summary)}
      </p>
      
      <div className="project-tech-tags">
        {project.tags?.map((tag) => (
          <span key={tag} className="tech-tag-small">#{tag}</span>
        ))}
      </div>
      
      <span className="project-view-link">View Project</span>
    </Link>
  );
}