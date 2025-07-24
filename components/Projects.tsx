"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tag } from "./Tag";
import { Project } from "types/project";
// Review : You should import or define a `Project` type instead of using `any`


export function Projects() {
  // Review : Tighten your state typing
  const [projects, setProjects] = useState<Project[]>([]);
  // Review : Add loading & error state for better UX
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Review : Turn this into an `async` function and use try/catch
  const getProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      // Review : Base URL should come from an env var (e.g. NEXT_PUBLIC_API_URL)
      const res = await fetch("/api/projects"); 
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data: Project[] = await res.json();
      setProjects(data);
    } catch (err: any) {
      console.error("Failed to fetch projects:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  if (loading) {
    return <p>Loading projects…</p>;              // Review :  Loading indicator
  }
  if (error) {
    return <p className="text-red-500">Error: {error}</p>; // Review :  Error state
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <div
          key={project.id}                     // Review :  Use a stable key
          className="rounded p-4 bg-white shadow"
        >
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tags.map((tag) => (
              <Tag tag={tag} key={`${project.id}-${tag}`} />
            ))}
          </div>
          <p>
            <strong>#{project.id}</strong> {project.name}
          </p>
          <Link
            href={`/projects/${project.id}`}
            className="underline text-blue-600 hover:text-blue-800 mt-2 inline-block"
          >
            View project detail
          </Link>
        </div>
      ))}
      {projects.length === 0 && (
        <p>No projects found for this user.</p>   // Review :  Empty‑state handling
      )}
    </div>
  );
}
