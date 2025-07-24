import type { NextApiRequest, NextApiResponse } from "next";
import { PROJECTS } from "data/projects";

// Review: Define a proper Project type (instead of a narrow `{ name: string }`) 
// and use it for the response.
type Project = {
  id: number;
  name: string;
  url: string;
  // …other fields
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Project | { message: string }>
) {
  // Review: Restrict to GET and return 405 for other methods.
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { id } = req.query;
  // Review: `req.query.id` can be string|string[], handle both and parse with radix.
  const projectId = Array.isArray(id) 
    ? parseInt(id[0], 10) 
    : parseInt(id as string, 10);

  if (isNaN(projectId)) {
    return res.status(400).json({ message: "Invalid project ID" });
  }

  // Review: For large datasets (20k projects), a Map lookup would be O(1) instead of .find’s O(n).
  const project = PROJECTS.find((p) => p.id === projectId);

  if (!project) {
    // Review: Return 404 when not found.
    return res.status(404).json({ message: "Project not found" });
  }

  // Review: Return the full object, typed correctly.
  return res.status(200).json(project);
}
