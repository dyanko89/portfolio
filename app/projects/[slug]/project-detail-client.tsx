'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getProjectBackgroundImage } from '@/lib/project-utils';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Target,
  ArrowLeft,
  ExternalLink,
  Code2,
  Database,
  Zap,
  Shield
} from 'lucide-react';

interface Project {
  title: string;
  publishedAt: string;
  summary: string;
  tags?: string[];
  status?: string;
  content: string;
  slug: string;
}

interface ProjectDetailClientProps {
  project: Project;
  renderedContent: React.ReactNode;
}

// Enhanced Stats Component adapted for project metrics
function ProjectStats({ project }: { project: Project }) {
  const getProjectMetrics = (slug: string) => {
    // This could be enhanced with real metrics from your data
    const metrics: Record<string, any[]> = {
      'ai-assistant': [
        { 
          icon: Code2, 
          value: '3', 
          change: 'components', 
          description: 'Core modules developed',
          positive: true 
        },
        { 
          icon: TrendingUp, 
          value: '85%', 
          change: 'extraction', 
          description: 'Task identification accuracy',
          positive: true 
        },
        { 
          icon: Target, 
          value: '1.5-2hrs', 
          change: 'projected', 
          description: 'Daily time savings (estimated)',
          positive: true 
        },
        { 
          icon: Zap, 
          value: 'MVP', 
          change: 'status', 
          description: 'Prototype validation complete',
          positive: true 
        }
      ],
      'ai-development-toolkit': [
        { 
          icon: Code2, 
          value: '15+', 
          change: 'modules', 
          description: 'Pre-built components',
          positive: true 
        },
        { 
          icon: Zap, 
          value: '75%', 
          change: 'faster', 
          description: 'Development speed',
          positive: true 
        },
        { 
          icon: Database, 
          value: '50+', 
          change: 'templates', 
          description: 'Ready-to-use patterns',
          positive: true 
        },
        { 
          icon: Users, 
          value: '8', 
          change: 'integrations', 
          description: 'Third-party services',
          positive: true 
        }
      ],
      default: [
        { 
          icon: TrendingUp, 
          value: '100%', 
          change: 'completion', 
          description: 'Project delivered on time',
          positive: true 
        },
        { 
          icon: Users, 
          value: '5+', 
          change: 'stakeholders', 
          description: 'Engaged throughout process',
          positive: true 
        },
        { 
          icon: Target, 
          value: '95%', 
          change: 'accuracy', 
          description: 'Requirements met',
          positive: true 
        },
        { 
          icon: Shield, 
          value: '100%', 
          change: 'security', 
          description: 'Best practices implemented',
          positive: true 
        }
      ]
    };

    return metrics[slug] || metrics.default;
  };

  const metrics = getProjectMetrics(project.slug);

  return (
    <div className="project-stats-grid">
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <div 
            key={index} 
            className={`project-stat-card fade-in-on-scroll stagger-${index + 1}`}
          >
            <div className="stat-icon-container">
              <IconComponent className="stat-icon" />
            </div>
            <div className="stat-content">
              <div className="stat-value">
                {metric.value}
                <span className="stat-change">
                  {metric.change}
                </span>
              </div>
              <p className="stat-description">
                {metric.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Enhanced Project Progress Component (adapted from agent-plan)
function ProjectProgress({ project }: { project: Project }) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['phase-0']); // First phase expanded by default

  const togglePhaseExpansion = (phaseId: string) => {
    setExpandedPhases(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getProjectTasks = (slug: string) => {
    const taskSets: Record<string, any[]> = {
      'ai-assistant': [
        {
          id: 'phase-0',
          phase: 'Discovery & Analysis',
          status: 'completed',
          tasks: [
            { title: 'Stakeholder interviews', completed: true },
            { title: 'Email workflow analysis', completed: true },
            { title: 'Technical requirements gathering', completed: true }
          ]
        },
        {
          id: 'phase-1',
          phase: 'System Design',
          status: 'completed', 
          tasks: [
            { title: 'API integration planning', completed: true },
            { title: 'Data flow architecture', completed: true },
            { title: 'Security framework design', completed: true }
          ]
        },
        {
          id: 'phase-2',
          phase: 'Development',
          status: 'completed',
          tasks: [
            { title: 'Email processing engine', completed: true },
            { title: 'Task extraction logic', completed: true },
            { title: 'Asana integration', completed: true },
            { title: 'Response automation', completed: true }
          ]
        },
        {
          id: 'phase-3',
          phase: 'Testing & Deployment',
          status: 'completed',
          tasks: [
            { title: 'Unit testing', completed: true },
            { title: 'Integration testing', completed: true },
            { title: 'User acceptance testing', completed: true },
            { title: 'Production deployment', completed: true }
          ]
        }
      ],
      default: [
        {
          id: 'phase-0',
          phase: 'Planning & Research',
          status: 'completed',
          tasks: [
            { title: 'Requirements analysis', completed: true },
            { title: 'Technical research', completed: true },
            { title: 'Architecture planning', completed: true }
          ]
        },
        {
          id: 'phase-1',
          phase: 'Development',
          status: 'completed',
          tasks: [
            { title: 'Core implementation', completed: true },
            { title: 'Feature development', completed: true },
            { title: 'Integration work', completed: true }
          ]
        },
        {
          id: 'phase-2',
          phase: 'Delivery',
          status: 'completed',
          tasks: [
            { title: 'Testing & QA', completed: true },
            { title: 'Documentation', completed: true },
            { title: 'Deployment', completed: true }
          ]
        }
      ]
    };

    return taskSets[slug] || taskSets.default;
  };

  const phases = getProjectTasks(project.slug);

  return (
    <div className="project-progress-container fade-in-on-scroll stagger-3">
      <h3 className="section-title text-heading-24">Project Timeline</h3>
      <div className="timeline-phases">
        {phases.map((phase, index) => {
          const isExpanded = expandedPhases.includes(phase.id);
          
          return (
            <div key={phase.id} className="timeline-phase">
              <div 
                className="timeline-phase-header"
                onClick={() => togglePhaseExpansion(phase.id)}
              >
                <div className="timeline-phase-icon">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                </div>
                
                <div className="timeline-phase-content">
                  <span className="timeline-phase-title">{phase.phase}</span>
                </div>

                <div className="timeline-phase-status">
                  <span className="timeline-status-badge">
                    {phase.status}
                  </span>
                </div>
              </div>

              {isExpanded && (
                <div className="timeline-subtasks">
                  {phase.tasks.map((task: any, taskIndex: number) => (
                    <div key={taskIndex} className="timeline-subtask">
                      <div className="subtask-icon">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 opacity-60" />
                      </div>
                      <span className="subtask-title">{task.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectDetailClient({ project, renderedContent }: ProjectDetailClientProps) {

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

    document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'status-completed';
      case 'live': return 'status-live';
      case 'beta': return 'status-beta';
      case 'updated': return 'status-updated';
      default: return 'status-default';
    }
  };

  const backgroundImage = getProjectBackgroundImage(project.slug);

  return (
    <div className="grid-container">
      {/* Back Navigation */}
      <div className="project-back-nav fade-in-on-scroll">
        <Link href="/projects" className="back-link">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <header 
        className="project-detail-header fade-in-on-scroll"
        style={backgroundImage ? { '--project-bg-image': `url(${backgroundImage})` } as React.CSSProperties : {}}
      >
        <div className="project-header-content">
          {/* Top Row: Title on left, Date & Status on right */}
          <div className="project-header-top">
            <h1 className="project-detail-title text-heading-48">
              {project.title}
            </h1>
            
            <div className="project-header-meta">
              <div className="meta-item">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(project.publishedAt).toLocaleDateString("en-US", { 
                    year: "numeric", 
                    month: "long", 
                    day: "numeric" 
                  })}
                </span>
              </div>
              
              {project.status && (
                <div className={`project-status-badge ${getStatusColor(project.status)}`}>
                  <div className="status-indicator"></div>
                  <span>{project.status}</span>
                </div>
              )}
            </div>
          </div>

          {/* Left-aligned content below title */}
          <div className="project-header-details">
            <div className="project-tech-stack">
              {project.tags?.map((tag) => (
                <span key={tag} className="tech-tag-enhanced">
                  {tag}
                </span>
              ))}
            </div>

            <p className="project-summary text-copy-18">
              {project.summary}
            </p>
          </div>
        </div>
      </header>

      {/* Project Stats */}
      <section className="project-section">
        <h2 className="section-title text-heading-32 fade-in-on-scroll">
          Impact & Results
        </h2>
        <ProjectStats project={project} />
      </section>

      {/* Project Progress/Timeline */}
      <section className="project-section">
        <ProjectProgress project={project} />
      </section>

      {/* Main Content */}
      <section className="project-content-section fade-in-on-scroll stagger-4">
        <div className="project-content-wrapper">
          <div className="prose-enhanced">
            {renderedContent}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="project-cta-section fade-in-on-scroll stagger-5">
        <div className="project-cta-card">
          <div className="cta-content">
            <h3 className="cta-title text-heading-24">
              Interested in similar solutions?
            </h3>
            <p className="cta-description text-copy-16">
              Let's discuss how I can help automate and optimize your workflows with custom AI solutions.
            </p>
          </div>
          <div className="cta-actions">
            <Link href="/contact" className="cta-button-primary">
              Get in touch
              <ExternalLink className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="cta-button-secondary">
              View more projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
