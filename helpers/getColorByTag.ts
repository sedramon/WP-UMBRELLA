// helpers/getColorByTag.ts

// Review: Expand the type to cover null/undefined, since tags may be missing:
export const getColorByTag = (tag: string | null | undefined): string => {
  // Early‑return on falsy tags (null, undefined, empty):
  if (!tag) {
    return "#6B7280"; // gray for “no tag”
  }

  // Review: Normalize once for case‑insensitivity:
  const key = tag.toLowerCase();

  // Review: Use a lookup map rather than a switch for easier extension:
  const COLORS: Record<string, string> = {
    blue:   "#3B82F6",
    red:    "#EF4444",
    yellow: "#F59E0B",
  };

  // Review: Default per spec is gray (#6B7280), not blue:
  return COLORS[key] ?? "#6B7280";
};
