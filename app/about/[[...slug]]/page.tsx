// app/facility/[...slug]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function NestedFacilityPage() {
  const params = useParams();
  const slug = params.slug as string[];

  if (!slug || slug.length === 0) {
    return (
      <div>
        <h1>Facility Overview</h1>
        <p>Welcome to the overview of all facilities!</p>
        <Link className="p-5" href={'/about/1'}>Button 1</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Facility: {slug.join(" / ")}</h1>
      <p>You are viewing details for: {slug.join(" -> ")}</p>
    </div>
  );
}
