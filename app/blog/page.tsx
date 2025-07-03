import { allBlogs } from 'contentlayer/generated';
import Link from 'next/link';

export default function BlogListPage() {
  const sortedBlogs = allBlogs.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="section">
      <div className="grid-container">
        <h1 className="text-heading-48" style={{ marginBottom: '48px' }}>From the Blog</h1>
        <div className="grid">
          {sortedBlogs.map((post) => (
            <Link key={post.slug} href={post.url} className="grid-cell span-6" style={{ textDecoration: 'none' }}>
              <h2 className="text-heading-20" style={{ marginBottom: '12px' }}>{post.title}</h2>
              <p className="text-copy-16" style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '24px' }}>{post.summary}</p>
              <span className="text-label-14" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
