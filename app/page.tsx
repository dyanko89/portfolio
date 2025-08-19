// app/page.tsx
import { getAllProjects } from '@/lib/mdx/content';
import { HomeClient } from './home-client';

export default async function HomePage() {
  const projects = await getAllProjects();
  // Get only the first 4 projects for the home page
  const featuredProjects = projects.slice(0, 4);

  return <HomeClient projects={featuredProjects} />;
}