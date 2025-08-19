import { getAllProjects } from "@/lib/mdx/content";
import Link from "next/link";
import { ProjectsClient } from "./projects-client";

export default async function ProjectsPage() {
  const sortedProjects = await getAllProjects();

  return <ProjectsClient projects={sortedProjects} />;
}
