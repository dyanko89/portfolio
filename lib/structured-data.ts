import { BlogPost, Project } from "@/lib/mdx/types";

export const SITE_URL = "https://djy89.net";
export const PERSON_ID = `${SITE_URL}/#person`;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Danny Yanko",
  url: SITE_URL,
  jobTitle: "Systems Architect & Automation Consultant",
  description:
    "Systems architect and automation consultant. Builds automation for businesses tired of wasting time on work that shouldn't exist.",
  sameAs: [
    "https://linkedin.com/in/dyanko89",
    "https://github.com/dyanko89",
  ],
  knowsAbout: [
    "Business process automation",
    "AI agent systems",
    "Multi-agent orchestration",
    "Next.js",
    "TypeScript",
    "Technical project management",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Danny Yanko",
  publisher: { "@id": PERSON_ID },
};

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: post.image
      ? `${SITE_URL}${post.image}`
      : `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    keywords: post.tags?.join(", "),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export function projectJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${SITE_URL}/projects/${project.slug}`,
    datePublished: project.publishedAt,
    image: project.image
      ? `${SITE_URL}${project.image}`
      : `${SITE_URL}/projects/${project.slug}/opengraph-image`,
    keywords: project.tags?.join(", "),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export const servicesJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Automation & Consulting",
    serviceType: "Business process automation consulting",
    provider: { "@id": PERSON_ID },
    url: `${SITE_URL}/services`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technical Project Management",
    serviceType: "Technical project management",
    provider: { "@id": PERSON_ID },
    url: `${SITE_URL}/services`,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Full-Stack Development",
    serviceType: "Full-stack web application development",
    provider: { "@id": PERSON_ID },
    url: `${SITE_URL}/services`,
  },
];

export function faqPageJsonLd(faq: { q: string; a: string }[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
