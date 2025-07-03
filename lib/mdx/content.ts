import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogPost, Project, FrontMatter } from "./types";

const CONTENT_PATH = path.join(process.cwd(), "content");

// Generic content reader
async function getContentFiles(contentType: "blog" | "projects"): Promise<string[]> {
  const dir = path.join(CONTENT_PATH, contentType);
  const files = await fs.promises.readdir(dir);
  return files.filter((file) => file.endsWith(".mdx"));
}

// Parse MDX file with error handling
async function parseMDXFile<T extends FrontMatter>(
  filePath: string
): Promise<{ data: T; content: string; slug: string } | null> {
  try {
    const source = await fs.promises.readFile(filePath, "utf8");
    const { data, content } = matter(source);
    const slug = path.basename(filePath, ".mdx");

    // Validate required fields
    if (!data.title || !data.publishedAt || !data.summary) {
      console.error(`Invalid frontmatter in ${filePath}`);
      return null;
    }

    return { data: data as T, content, slug };
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = await getContentFiles("blog");
  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(CONTENT_PATH, "blog", file);
      const parsed = await parseMDXFile<FrontMatter>(filePath);
      if (!parsed) return null;

      return {
        ...parsed.data,
        slug: parsed.slug,
        content: parsed.content,
        url: `/blog/${parsed.slug}`,
      } as BlogPost;
    })
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

// Get single blog post
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(CONTENT_PATH, "blog", `${slug}.mdx`);
    const parsed = await parseMDXFile<FrontMatter>(filePath);
    if (!parsed) return null;

    return {
      ...parsed.data,
      slug: parsed.slug,
      content: parsed.content,
      url: `/blog/${parsed.slug}`,
    } as BlogPost;
  } catch (error) {
    console.error(`Error getting blog post ${slug}:`, error);
    return null;
  }
}

// Get all projects
export async function getAllProjects(): Promise<Project[]> {
  const files = await getContentFiles("projects");
  const projects = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(CONTENT_PATH, "projects", file);
      const parsed = await parseMDXFile<FrontMatter>(filePath);
      if (!parsed) return null;

      return {
        ...parsed.data,
        slug: parsed.slug,
        content: parsed.content,
        url: `/projects/${parsed.slug}`,
      } as Project;
    })
  );

  return projects
    .filter((project): project is Project => project !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

// Get single project
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(CONTENT_PATH, "projects", `${slug}.mdx`);
    const parsed = await parseMDXFile<FrontMatter>(filePath);
    if (!parsed) return null;

    return {
      ...parsed.data,
      slug: parsed.slug,
      content: parsed.content,
      url: `/projects/${parsed.slug}`,
    } as Project;
  } catch (error) {
    console.error(`Error getting project ${slug}:`, error);
    return null;
  }
}
