// /app/about/[[...slug]]/page.tsx
"use client";

import { useParams } from "next/navigation";

export default function AboutSlugPage() {
  const params = useParams();
  
  // Mengambil slug dan memastikan ini adalah array atau string yang bisa diproses
  const slugArray = Array.isArray(params?.slug) 
    ? params.slug 
    : params.slug?.split('/') || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Detail About</h1>
      <p>Path yang dibuka: {slugArray.join(' / ') || 'Halaman utama'}</p>
    </div>
  );
}
