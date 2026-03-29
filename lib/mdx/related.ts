import { BlogPost, Project } from "./types";

export function getRelatedBlogPosts(
  currentSlug: string,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  const current = allPosts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => {
      let score = 0;

      // Same series: +100
      if (current.series && post.series && current.series === post.series) {
        score += 100;
      }

      // Shared tags: +10 each
      if (current.tags && post.tags) {
        const shared = current.tags.filter((t) => post.tags!.includes(t));
        score += shared.length * 10;
      }

      // Recency tiebreaker: up to +5 (newer = higher)
      const daysDiff = Math.abs(
        new Date(current.publishedAt).getTime() -
          new Date(post.publishedAt).getTime()
      ) / (1000 * 60 * 60 * 24);
      score += Math.max(0, 5 - daysDiff * 0.01);

      return { post, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}

export function getRelatedProjects(
  currentSlug: string,
  allProjects: Project[],
  limit = 3
): Project[] {
  const current = allProjects.find((p) => p.slug === currentSlug);
  if (!current) return [];

  // Manual override: use frontmatter relatedProjects if specified
  if (current.relatedProjects && current.relatedProjects.length > 0) {
    return current.relatedProjects
      .map((slug) => allProjects.find((p) => p.slug === slug))
      .filter((p): p is Project => p !== null && p !== undefined)
      .slice(0, limit);
  }

  // Fallback: dynamic tag matching + recency
  const scored = allProjects
    .filter((p) => p.slug !== currentSlug)
    .map((project) => {
      let score = 0;

      if (current.tags && project.tags) {
        const shared = current.tags.filter((t) => project.tags!.includes(t));
        score += shared.length * 10;
      }

      // Recency tiebreaker
      const daysDiff = Math.abs(
        new Date(current.publishedAt).getTime() -
          new Date(project.publishedAt).getTime()
      ) / (1000 * 60 * 60 * 24);
      score += Math.max(0, 5 - daysDiff * 0.01);

      return { project, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.project);
}

export function getSeriesPosts(
  seriesName: string,
  allPosts: BlogPost[]
): BlogPost[] {
  return allPosts
    .filter((p) => p.series === seriesName)
    .sort((a, b) => {
      // Sort by seriesOrder first, then publishedAt fallback
      if (a.seriesOrder !== undefined && b.seriesOrder !== undefined) {
        return a.seriesOrder - b.seriesOrder;
      }
      if (a.seriesOrder !== undefined) return -1;
      if (b.seriesOrder !== undefined) return 1;
      return (
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      );
    });
}
