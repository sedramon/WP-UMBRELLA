"use client";
import { getColorByTag } from "helpers/getColorByTag";
// LINK IMPORT IS UNUSED — remove it
// import Link from "next/link";

export function Tag({ tag }: { tag: string }) {
  const color = getColorByTag(tag);

  return (
    // Review: Use a <span> here instead of <div> for inline text elements
    <span
      className="rounded inline-flex text-white px-2"
      // Review :  consider moving style into a CSS module or dynamically-generated Tailwind class
      style={{
        backgroundColor: color,
      }}
      // Review :  add aria-label or title if the tag conveys extra meaning
    >
      {tag}
    </span>
  );
}
