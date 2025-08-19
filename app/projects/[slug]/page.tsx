// app/projects/[slug]/page.tsx
import { getProject, getAllProjects } from "@/lib/mdx/content";
import { renderMDX } from "@/lib/mdx/mdx";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} – Danny Yanko`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  // Render MDX content on the server
  const content = await renderMDX(project.content);

  return (
    <div className="projects-page-container">
      <div className="grid-container">
        <div className="project-back-nav">
          <Link href="/projects" className="back-link">
            ← Back to Projects
          </Link>
        </div>
        
        <article className="project-content">
          <h1 className="text-heading-48" style={{ marginBottom: '16px' }}>
            {project.title}
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '48px' }}>
            {project.summary}
          </p>
          
          <div 
            className="mdx-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </div>
  );
}