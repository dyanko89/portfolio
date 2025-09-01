import { getAllBlogPosts } from "@/lib/mdx/content";
import { BlogClient } from "./blog-client";

export default async function BlogListPage() {
  const blogPosts = await getAllBlogPosts();
  return <BlogClient posts={blogPosts} />;
}
