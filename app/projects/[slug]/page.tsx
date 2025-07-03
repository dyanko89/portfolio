import { getProject, getAllProjects } from "@/lib/mdx/content";
import { renderMDX } from "@/lib/mdx/mdx";
import { notFound } from "next/navigation";
import { Metadata } from "next";

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

  const content = await renderMDX(project.content);

  return (
    <div className="section">
      <div className="grid-container">
        <div className="grid-cell span-8" style={{ gridColumnStart: 3 }}>
          <h1 className="text-heading-48" style={{ marginBottom: "16px" }}>{project.title}</h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
            {project.tags?.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
          <p className="text-copy-16" style={{ color: "rgba(255, 255, 255, 0.5)", marginBottom: "32px" }}>
            Published on {new Date(project.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <div className="prose">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
