export interface Project {
  id: number;
  name: string;
  url: string;
  tags: string[];
  description: string;        // ← we need this, since you do `project.tags.map(...)`
  // …any other fields your API returns
}