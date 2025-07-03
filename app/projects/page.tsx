import { getAllProjects } from "@/lib/mdx/content";
import Link from "next/link";

export default async function ProjectsPage() {
  const sortedProjects = await getAllProjects();

  return (
    <div className="section">
      <div className="grid-container">
        <h1 className="text-heading-48" style={{ marginBottom: "48px" }}>Featured Projects</h1>
        <div className="grid">
          {sortedProjects.map((project) => (
            <Link key={project.slug} href={project.url} className="grid-cell span-6" style={{ textDecoration: "none" }}>
              <div className="icon">◦</div>
              <h2 className="text-heading-20" style={{ marginBottom: "8px" }}>{project.title}</h2>
              <p className="text-copy-16" style={{ color: "rgba(255, 255, 255, 0.7)", marginBottom: "20px" }}>
                {project.summary}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                {project.tags?.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="text-label-14" style={{ color: "rgba(255, 255, 255, 0.5)" }}>
                  {new Date(project.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="badge">
                  <span className="status-dot"></span>
                  {project.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
