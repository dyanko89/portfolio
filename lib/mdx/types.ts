export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  content: string;
  url: string;
}

// Result metric for project outcomes
export interface ProjectResult {
  value: string;
  label: string;
  description?: string;
}

// Categorized tech stack item
export interface TechStackCategory {
  category: string;
  items: string[];
}

// Card display configuration for project cards
export interface CardDisplay {
  type: 'image' | 'terminal';
  // For terminal type - multiline content with auto-coloring
  content?: string;
  title?: string;
  // For image type - overrides default image
  src?: string;
}

export interface Project {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  tags?: string[];
  status: string;
  image?: string;
  icon?: string;
  content: string;
  url: string;
  // New fields for enhanced project pages
  results?: ProjectResult[];
  techStack?: TechStackCategory[];
  relatedProjects?: string[];
  client?: string;
  // Card display configuration (terminal, diagram, etc.)
  cardDisplay?: CardDisplay;
}

export interface FrontMatter {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  icon?: string;
  tags?: string[];
  status?: string;
  // New fields
  results?: ProjectResult[];
  techStack?: TechStackCategory[];
  relatedProjects?: string[];
  client?: string;
  // Card display configuration
  cardDisplay?: CardDisplay;
}
