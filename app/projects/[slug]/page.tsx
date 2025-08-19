import { getProject, getAllProjects } from "@/lib/mdx/content";
import { renderMDX } from "@/lib/mdx/mdx";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ProjectDetailClient } from "./project-detail-client";

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
      <ProjectDetailClient project={project} renderedContent={content} />
    </div>
  );
}