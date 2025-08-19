// lib/project-utils.ts
// Shared utilities for project-related functionality

export function getProjectBackgroundImage(slug: string): string | null {
  // Map project slugs to background images
  const backgroundImages: Record<string, string> = {
    'ai-assistant': '/images/projects/ai-assistant-bg.jpg',
    'ai-development-toolkit': '/images/projects/dev-toolkit-bg.jpg', 
    'b2b-marketing-infrastructure': '/images/projects/b2b-marketing-bg.jpg',
    'enterprise-lms': '/images/projects/enterprise-lms-bg.jpg',
  };
  
  return backgroundImages[slug] || null;
}

export function getProjectThemeColor(slug: string): string {
  // Optional: Define theme colors for each project
  const themeColors: Record<string, string> = {
    'ai-assistant': '#0070f3',
    'ai-development-toolkit': '#7c3aed',
    'b2b-marketing-infrastructure': '#ff6b35', 
    'enterprise-lms': '#10b981',
  };
  
  return themeColors[slug] || '#ffffff';
}

export function hasProjectImage(slug: string): boolean {
  return getProjectBackgroundImage(slug) !== null;
}
