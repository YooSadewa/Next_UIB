// src/app/facility/[[...slug]]/page.tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">Overview Page</h1>
        <p>Halaman utama overview fasilitas</p>
        <br />
        <p><Link href={'/about/1'}>About Us</Link></p>

      </div>
    );

}