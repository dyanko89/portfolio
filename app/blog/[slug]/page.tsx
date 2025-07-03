import { allBlogs } from 'contentlayer/generated';
import { notFound } from 'next/navigation';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = allBlogs.find((p) => p.slug === params.slug);
  if (!blog) return {};
  return {
    title: `${blog.title} – Danny Yanko`,
    description: blog.summary,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = allBlogs.find((p) => p.slug === params.slug);
  if (!blog) notFound();

  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <div className="section">
      <div className="grid-container">
        <div className="grid-cell span-8" style={{ gridColumnStart: 3 }}>
          <h1 className="text-heading-48" style={{ marginBottom: '16px' }}>{blog.title}</h1>
          <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.5)', marginBottom: '32px' }}>
            Published on {new Date(blog.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="prose">
            <MDXContent />
          </div>
        </div>
      </div>
    </div>
  );
}
