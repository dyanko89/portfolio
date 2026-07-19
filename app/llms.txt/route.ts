import { getAllBlogPosts, getAllProjects } from "@/lib/mdx/content";

export const dynamic = "force-static";

const SITE_URL = "https://djy89.net";

export async function GET() {
  const posts = await getAllBlogPosts();
  const projects = await getAllProjects();

  const body = `# Danny Yanko -- djy89.net

> Systems architect and automation consultant. Builds automation for businesses tired of wasting time on work that shouldn't exist -- AI agent systems, business process automation, and full-stack development.

## Services

- [Services](${SITE_URL}/services): AI Automation & Consulting, Technical Project Management, Full-Stack Development. Machine-readable summary: ${SITE_URL}/services.md
- [Contact](${SITE_URL}/contact): Project inquiries and consultations

## Projects

${projects
  .map(
    (p) => `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.summary}`
  )
  .join("\n")}

## Blog

${posts
  .map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.summary}`)
  .join("\n")}

## Optional

- [About](${SITE_URL}/about)
- [CV](${SITE_URL}/cv)
- [RSS feed](${SITE_URL}/feed.xml)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
