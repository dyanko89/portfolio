// components/project-card.tsx
'use client';

import Link from "next/link";
import type { Project } from '@/lib/mdx/types';
import { ArrowUpRight } from 'lucide-react';

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

  return (
    <Link 
      href={project.url} 
      className={`enhanced-project-card fade-in-on-scroll stagger-${index + 1}`}
    >
      <div className="project-card-header">
        <div
          className="project-image-placeholder"
          style={project.image ? {
            backgroundImage: `url(${project.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : {}}
        >
          {project.icon && (
            <div className="project-icon-corner">
              <img src={project.icon} alt="" className="project-icon-img" />
            </div>
          )}
          {!project.image && (
            <span className="image-placeholder-text">IMAGE</span>
          )}
        </div>
        <div className="project-status-badge">
          <span className="status-dot"></span>
          {project.status}
        </div>
      </div>

      <div className="project-title-section">
        <h2 className="project-title text-heading-20">
          {project.title}
        </h2>
      </div>

      <div className="project-tech-tags">
        {project.tags?.map((tag) => (
          <span key={tag} className="tech-tag-small">#{tag}</span>
        ))}
      </div>

      <p className="project-description-limited text-copy-14">
        {truncateDescription(project.summary)}
      </p>
      
      <span className="project-view-link">
        View Project
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </Link>
  );
}