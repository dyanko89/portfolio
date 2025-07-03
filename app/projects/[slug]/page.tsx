import { allProjects } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} – Danny Yanko`,
    description: project.summary,
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = allProjects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const MDXContent = useMDXComponent(project.body.code);

  return (
    <div className="section">
      <div className="grid-container">
        <div className="grid-cell span-8" style={{ gridColumnStart: 3 }}>
          <h1 className="text-heading-48" style={{ marginBottom: '16px' }}>{project.title}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Published on {new Date(project.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <span className="badge">
              <span className="status-dot"></span>
              {project.status}
            </span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {project.tags?.map((tag) => (
              <span key={tag} className="badge">{tag}</span>
            ))}
          </div>
          <div className="prose">
            <MDXContent />
          </div>
        </div>
      </div>
    </div>
  );
}
