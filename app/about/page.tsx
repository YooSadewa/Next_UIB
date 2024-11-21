// /app/about/page.tsx
"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Overview About</h1>
      <p>Ini adalah halaman utama About.</p>
      <br />
      {/* Tombol untuk mengarahkan ke halaman dinamis */}
      <Link href="/about-slug/1">
        <button className="bg-blue-500 text-white p-2 rounded">Go to About Detail (slug 1)</button>
      </Link>
      <Link href="/about-slug/2">
        <button className="bg-blue-500 text-white p-2 rounded">Go to About Detail (slug 2)</button>
      </Link>
    </div>
  );
}
