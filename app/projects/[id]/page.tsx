"use client";

import { Tag } from "components/Tag";
import { useEffect, useState } from "react";
import { Project } from "types/project";

export default function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      setError(null);
      try {
        // Review: Use a relative URL instead of hard‐coding the host.
        // Review: Consider moving base API path to `NEXT_PUBLIC_API_URL`.
        const res = await fetch(`/api/projects/${params.id}`);
        // Review: Handle unexpected status codes (e.g., 404 → show 'Not Found').
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Project not found");
          }
          throw new Error(`API error: ${res.status}`);
        }
        const data: Project = await res.json();
        setProject(data);
      } catch (err: any) {
        console.error("Failed to fetch project:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [params.id]);

  if (loading) {
    return <p>Loading project…</p>;  // Review: Consider a spinner or skeleton for better UX.
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error: {error}
      </p> // Review: Could route to a custom Error Boundary (app/error.tsx).
    );
  }

  if (!project) {
    return (
      <p className="text-gray-600">
        No project found.
      </p> // Review: Could use `app/not-found.tsx` for 404 page instead.
    );
  }

  return (
    <div className="bg-slate-50 p-4 w-full h-full">
      <h1 className="text-3xl font-bold mb-4">
        {project.name}
      </h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <Tag
            tag={tag}
            key={`${project.id}-${tag}`}
          /> // Review: Ensure `tag` values are unique or include index if duplicates.
        ))}
      </div>
      <p className="mb-2">
        <strong>ID:</strong> {project.id}
      </p>
      <p>{project.description}</p>
      {/* Review: Consider adding a link/button to navigate back to the projects list */}
    </div>
  );
}
