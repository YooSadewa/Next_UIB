// "use client";

import Link from "next/link";

// import { useParams } from "next/navigation";

export default function Kontak() {
  // const params = useParams();
  // const slug = params.slug as string[]; // Paksa tipe sebagai string[]

  return (
    <div className="p-[20px] text-center flex flex-col justify-center">
      {/* <h1>Nama Admin: {slug.join(" / ")}</h1> */}
      <p className="font-bold text-[24px] mb-5">List Kontak</p>
      <div className="flex gap-[50px] justify-center">
        <p className="p-5 bg-red-700 text-white font-bold rounded-[24px]"><Link href={'/contact/ara'}>Kontak 1</Link></p>
        <p className="p-5 bg-red-700 text-white font-bold rounded-[24px]"><Link href={'/contact/ari'}>Kontak 2</Link></p>
        <p className="p-5 bg-red-700 text-white font-bold rounded-[24px]"><Link href={'/contact/aru'}>Kontak 3</Link></p>
        <p className="p-5 bg-red-700 text-white font-bold rounded-[24px]"><Link href={'/contact/are'}>Kontak 4</Link></p>
        <p className="p-5 bg-red-700 text-white font-bold rounded-[24px]"><Link href={'/contact/aro'}>Kontak 5</Link></p>
        <p className="p-5 bg-red-700 text-white font-bold rounded-[24px]"><Link href={'/contact/araio'}>Kontak 6</Link></p>
      </div>
    </div>
  );
}
