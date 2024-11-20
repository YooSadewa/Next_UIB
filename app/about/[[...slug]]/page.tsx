// src/app/facility/[[...slug]]/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function OverviewPage() {
  const params = useParams();
  
  const slugArray = Array.isArray(params.slug) 
    ? params.slug 
    : params.slug?.split('/') || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Detail About</h1>
      <p>Path yang dibuka: {slugArray.join(" / ")}</p>
    </div>
  );
}