// app/projects/[slug]/project-detail-client.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import type { Project } from '@/lib/mdx/types';
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

interface ProjectDetailClientProps {
  project: Project;
  content: React.ReactNode;
}

export function ProjectDetailClient({ project, content }: ProjectDetailClientProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>(['phase-0']); // First phase expanded by default

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

  const getProjectBackgroundImage = (slug: string) => {
    // Map project slugs to background images
    const backgroundImages: Record<string, string> = {
      'ai-assistant': '/images/projects/ai-assistant-bg.jpg',
      'ai-development-toolkit': '/images/projects/dev-toolkit-bg.jpg',
      'b2b-marketing-infrastructure': '/images/projects/b2b-marketing-bg.jpg',
      'enterprise-lms': '/images/projects/enterprise-lms-bg.jpg',
    };
    
    return backgroundImages[slug] || null;
  };

  const backgroundImage = getProjectBackgroundImage(project.slug);

  return (
    <div className="projects-page-container">
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
          <ProjectProgress project={project} expandedPhases={expandedPhases} setExpandedPhases={setExpandedPhases} />
        </section>

        {/* Main Content */}
        <section className="project-content-section fade-in-on-scroll stagger-4">
          <div className="project-content-wrapper">
            <div className="prose-enhanced">
              {content}
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
                Let&apos;s discuss how I can help automate and optimize your workflows with custom AI solutions.
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
    </div>
  );
}

// Enhanced Stats Component adapted for project metrics
function ProjectStats({ project }: { project: Project }) {
  const getProjectMetrics = (slug: string) => {
    // This could be enhanced with real metrics from your data
    const metrics: Record<string, any[]> = {
      'ai-assistant': [
        { 
          icon: Clock, 
          value: '2hrs', 
          change: 'saved daily', 
          description: 'Per team member efficiency gain',
          positive: true 
        },
        { 
          icon: TrendingUp, 
          value: '90%', 
          change: 'reduction', 
          description: 'In manual task creation time',
          positive: true 
        },
        { 
          icon: Target, 
          value: '95%', 
          change: 'accuracy', 
          description: 'Task extraction precision',
          positive: true 
        },
        { 
          icon: CheckCircle2, 
          value: '30%', 
          change: 'increase', 
          description: 'Completed tasks per sprint',
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
      'b2b-marketing-infrastructure': [
        { 
          icon: TrendingUp, 
          value: '6', 
          change: 'campaigns', 
          description: 'Active marketing campaigns',
          positive: true 
        },
        { 
          icon: Users, 
          value: '2.5K', 
          change: 'leads', 
          description: 'Generated this quarter',
          positive: true 
        },
        { 
          icon: Target, 
          value: '320%', 
          change: 'ROI', 
          description: 'Return on investment',
          positive: true 
        },
        { 
          icon: Zap, 
          value: '45%', 
          change: 'conversion', 
          description: 'Lead-to-customer rate',
          positive: true 
        }
      ],
      'enterprise-lms': [
        { 
          icon: Database, 
          value: '15', 
          change: 'modules', 
          description: 'Learning modules created',
          positive: true 
        },
        { 
          icon: Users, 
          value: '1000+', 
          change: 'users', 
          description: 'Active learners',
          positive: true 
        },
        { 
          icon: Target, 
          value: '89%', 
          change: 'completion', 
          description: 'Course completion rate',
          positive: true 
        },
        { 
          icon: Shield, 
          value: '100%', 
          change: 'secure', 
          description: 'Data protection compliance',
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
function ProjectProgress({ project, expandedPhases, setExpandedPhases }: { 
  project: Project; 
  expandedPhases: string[]; 
  setExpandedPhases: React.Dispatch<React.SetStateAction<string[]>>; 
}) {
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
      'ai-development-toolkit': [
        {
          id: 'phase-0',
          phase: 'Framework Architecture',
          status: 'completed',
          tasks: [
            { title: 'Core module structure', completed: true },
            { title: 'Plugin system design', completed: true },
            { title: 'Template engine development', completed: true }
          ]
        },
        {
          id: 'phase-1',
          phase: 'Component Library',
          status: 'completed',
          tasks: [
            { title: 'Authentication modules', completed: true },
            { title: 'Data processing components', completed: true },
            { title: 'API integration templates', completed: true },
            { title: 'Testing framework', completed: true }
          ]
        },
        {
          id: 'phase-2',
          phase: 'Documentation & Examples',
          status: 'completed',
          tasks: [
            { title: 'API documentation', completed: true },
            { title: 'Code examples', completed: true },
            { title: 'Video tutorials', completed: true }
          ]
        }
      ],
      'b2b-marketing-infrastructure': [
        {
          id: 'phase-0',
          phase: 'Platform Selection',
          status: 'completed',
          tasks: [
            { title: 'Marketing automation evaluation', completed: true },
            { title: 'CRM integration planning', completed: true },
            { title: 'Analytics setup', completed: true }
          ]
        },
        {
          id: 'phase-1',
          phase: 'Campaign Infrastructure',
          status: 'completed',
          tasks: [
            { title: 'Lead scoring model', completed: true },
            { title: 'Email automation workflows', completed: true },
            { title: 'Landing page templates', completed: true },
            { title: 'Conversion tracking', completed: true }
          ]
        },
        {
          id: 'phase-2',
          phase: 'Optimization & Scaling',
          status: 'active',
          tasks: [
            { title: 'A/B testing framework', completed: true },
            { title: 'Performance monitoring', completed: true },
            { title: 'ROI dashboards', completed: false }
          ]
        }
      ],
      'enterprise-lms': [
        {
          id: 'phase-0',
          phase: 'Requirements & Design',
          status: 'completed',
          tasks: [
            { title: 'Learning path architecture', completed: true },
            { title: 'User role definitions', completed: true },
            { title: 'Content management system', completed: true }
          ]
        },
        {
          id: 'phase-1',
          phase: 'Core Development',
          status: 'completed',
          tasks: [
            { title: 'User authentication system', completed: true },
            { title: 'Course creation tools', completed: true },
            { title: 'Progress tracking engine', completed: true },
            { title: 'Reporting dashboard', completed: true }
          ]
        },
        {
          id: 'phase-2',
          phase: 'Content & Launch',
          status: 'completed',
          tasks: [
            { title: 'Initial course development', completed: true },
            { title: 'User training materials', completed: true },
            { title: 'System deployment', completed: true }
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
                  <span className={`timeline-status-badge status-${phase.status}`}>
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
