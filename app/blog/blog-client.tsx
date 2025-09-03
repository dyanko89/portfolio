'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/mdx/types';

interface BlogClientProps {
  posts: BlogPost[];
}

// Utility function to truncate excerpts to 210 characters
function truncateExcerpt(text: string, maxLength: number = 210): string {
  if (text.length <= maxLength) return text;
  
  // Find the last complete word before the limit
  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  
  // If we found a space near the end, cut there; otherwise use the full limit
  const finalText = lastSpaceIndex > maxLength * 0.8 
    ? truncated.slice(0, lastSpaceIndex)
    : truncated;
    
  return finalText + '...';
}

// Format date for blog posts
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Get blog category icons - for now using simple categories based on content
function getBlogCategory(title: string, summary: string): string {
  const text = (title + ' ' + summary).toLowerCase();
  
  if (text.includes('ai') || text.includes('automation')) return 'AI';
  if (text.includes('development') || text.includes('code') || text.includes('typescript') || text.includes('next.js')) return 'Tech';
  if (text.includes('guide') || text.includes('tutorial') || text.includes('how to')) return 'Tutorial';
  
  return 'Blog';
}

// Get reading time estimate
function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

// Get tech tags from content
function getTechTags(title: string, summary: string, content: string): string[] {
  const text = (title + ' ' + summary + ' ' + content).toLowerCase();
  const possibleTags = [
    'ai', 'automation', 'typescript', 'nextjs', 'react', 'javascript',
    'python', 'node', 'api', 'webdev', 'frontend', 'backend', 'fullstack',
    'tutorial', 'guide', 'tips', 'best-practices', 'architecture'
  ];
  
  const foundTags = possibleTags
    .filter(tag => text.includes(tag.toLowerCase()))
    .slice(0, 3); // Limit to 3 tags
    
  return foundTags.length > 0 ? foundTags : ['blog'];
}

// Get blog icon SVG
function getBlogIcon(category: string): JSX.Element {
  const iconProps = { width: "16", height: "16", fill: "currentColor" };
  
  switch (category.toLowerCase()) {
    case 'ai':
      return (
        <svg {...iconProps} viewBox="0 0 16 16">
          <path d="M8 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zM2 8a6 6 0 1 1 12 0 6 6 0 0 1-12 0z"/>
          <path d="M6.5 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5zM6.5 7.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H7a.5.5 0 0 1-.5-.5zM6 10a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 0-1h-3a.5.5 0 0 0-.5.5z"/>
        </svg>
      );
    case 'tech':
      return (
        <svg {...iconProps} viewBox="0 0 16 16">
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/>
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/>
        </svg>
      );
    case 'tutorial':
      return (
        <svg {...iconProps} viewBox="0 0 16 16">
          <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
          <path d="M6.5 13.5v-5h3v5h-3Z"/>
        </svg>
      );
    default:
      return (
        <svg {...iconProps} viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        </svg>
      );
  }
}

export function BlogClient({ posts }: BlogClientProps) {
  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '20px' }
    );

    const cards = document.querySelectorAll('.fade-in-on-scroll');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="section blog-page-container">
      <div className="grid-container">
        {/* Page Header */}
        <div className="blog-header">
          <h1 className="text-heading-48">Blog</h1>
          <p className="blog-subtitle">Insights on AI automation, development, and technology</p>
        </div>

        {/* Blog Grid - reusing project grid */}
        <div className="projects-page-grid">
          {posts.map((post, index) => {
            const category = getBlogCategory(post.title, post.summary);
            const readingTime = getReadingTime(post.content);
            const techTags = getTechTags(post.title, post.summary, post.content);
            
            return (
              <Link 
                key={post.slug}
                href={post.url}
                className={`enhanced-project-card fade-in-on-scroll stagger-${(index % 4) + 1}`}
              >
                {/* Header Section - Match Project Card Structure */}
                <div className="project-card-header">
                  <div className="project-image-placeholder">
                    <div className="project-icon-corner">
                      {getBlogIcon(category)}
                    </div>
                    <span className="image-placeholder-text">IMAGE</span>
                  </div>
                  <div className="project-status-badge">
                    <span className="status-dot"></span>
                    {category}
                  </div>
                </div>

                {/* Title Section */}
                <div className="project-title-section">
                  <h3 className="project-title-with-version">{post.title}</h3>
                </div>

                {/* Reading Time & Tags Meta Section */}
                <div className="blog-meta-section">
                  <div className="blog-reading-time">{readingTime}</div>
                  <div className="blog-tech-tags">
                    {techTags.map((tag, tagIndex) => (
                      <span key={tag}>
                        <span className="tech-tag-small">#{tag}</span>
                        {tagIndex < techTags.length - 1 && (
                          <span className="tech-tag-separator"> {'//'} </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="project-description-limited">
                  {truncateExcerpt(post.summary, 210)}
                </p>

                {/* Author & Date */}
                <div className="blog-author-section">
                  <div className="blog-author-info">
                    <div className="blog-avatar">D</div>
                    <div className="blog-author-details">
                      <span className="blog-author-name">Danny Yanko</span>
                      <span className="blog-date">{formatDate(post.publishedAt)}</span>
                    </div>
                  </div>
                </div>

                {/* View Link - positioned absolutely in bottom-right corner */}
                <div className="project-view-link">
                  Read Article
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
