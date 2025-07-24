import type { NextApiRequest, NextApiResponse } from "next";
import { PROJECTS } from "data/projects";

// Review: Define a full Project type instead of `{ name: string }`.
type Project = {
  id: number;
  name: string;
  url: string;
  // …other fields as needed
};

// Review: For a list endpoint, our response type is an array—or an error payload.
type ResponsePayload = Project[] | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponsePayload>
) {
  // Review: Restrict to GET and return 405 on other methods.
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  // Review: In a real DB you’d want pagination; sending 20k records in one go can kill memory/network.
  // Consider query params like ?page=1&limit=100 or cursor-based paging.
  const projects = PROJECTS;

  // Review: Simulating `await prisma.project.findMany()`—make sure in prod you handle DB errors:
  // try {
  //   const projects = await prisma.project.findMany({ take: limit, skip: (page-1)*limit });
  // } catch (err) {
  //   return res.status(500).json({ message: "Database error" });
  // }

  return res.status(200).json(projects);
}
