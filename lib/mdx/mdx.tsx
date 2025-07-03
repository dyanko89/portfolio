import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";

// For server components (App Router)
export async function renderMDX(content: string) {
  return (
    <MDXRemote
      source={content}
      options={{
        mdxOptions: {
          rehypePlugins: [
            [rehypePrettyCode, { theme: "github-dark" }]
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
        [rehypePrettyCode, { theme: "github-dark" }]
      ],
    },
  };
}
