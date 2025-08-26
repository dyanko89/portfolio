import { getBlogPost, getAllBlogPosts } from "@/lib/mdx/content";
import { renderMDX } from "@/lib/mdx/mdx";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await getBlogPost(params.slug);
  if (!blog) return {};
  return {
    title: `${blog.title} – Danny Yanko`,
    description: blog.summary,
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const blog = await getBlogPost(params.slug);
  if (!blog) notFound();

  const content = await renderMDX(blog.content);

  return (
    <div className="section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="grid-container">
        <div className="project-back-nav" style={{ marginBottom: '32px' }}>
          <Link href="/blog" className="back-link">
            ← Back to Blog
          </Link>
        </div>
        
        <article style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 className="text-heading-48" style={{ marginBottom: "16px" }}>{blog.title}</h1>
          <p className="text-copy-16" style={{ color: "rgba(255, 255, 255, 0.5)", marginBottom: "48px" }}>
            Published on {new Date(blog.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <div className="prose">
            {content}
          </div>
        </article>
      </div>
    </div>
  );
}