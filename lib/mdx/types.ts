export interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  content: string;
  url: string;
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
}

export interface FrontMatter {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  icon?: string;
  tags?: string[];
  status?: string;
}
