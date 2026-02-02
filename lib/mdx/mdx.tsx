import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx-components";

// rehype-pretty-code configuration
const prettyCodeOptions = {
  theme: "github-dark",
  // Keep background from theme
  keepBackground: true,
  // Add line numbers via data attribute
  onVisitLine(node: { properties: Record<string, unknown>; children: unknown[] }) {
    // Prevent lines from collapsing in `display: grid` mode
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
    node.properties.className = node.properties.className || [];
    node.properties.className.push("highlighted");
  },
};

// For server components (App Router)
export async function renderMDX(content: string) {
  return (
    <MDXRemote
      source={content}
      components={mdxComponents}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [rehypePrettyCode, prettyCodeOptions]
          ],
        },
      }}
    />
  );
}

// For client components or pages that need serialized content
export async function getMDXOptions() {
  return {
    mdxOptions: {
      rehypePlugins: [
        [rehypePrettyCode, prettyCodeOptions]
      ],
    },
  };
}
