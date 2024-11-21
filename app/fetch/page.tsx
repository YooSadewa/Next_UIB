export default async function Date() {
    const getDate = async () => {
        const res = await fetch('https://dayoffapi.vercel.app/api');
        return res.json();
    };

    const formatDate = (dateString: string): string => {
        const [year, month, day] = dateString.split('-');

        // Daftar nama bulan dalam bahasa Indonesia
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];

        // Convert month (angka) ke nama bulan
        const monthName = monthNames[parseInt(month, 10) - 1];

        // Format menjadi dd NamaBulan yyyy
        return `${day} ${monthName} ${year}`;
    };

    const data = await getDate();

    return (
        <div className="p-[20px]">
            <h1 className="text-[26px] font-[800] text-center">Tanggal <span className="text-red-500">Spesial</span> Indonesia 2024</h1>
            <p className="text-center mb-3 font-semibold">Warna <span className="text-red-500">Merah</span>: Libur, Warna Hitam: Cuti</p>
            <ul className="flex flex-col gap-5">
                {data?.map((item: { tanggal: string; keterangan: string; is_cuti : string }, index: number) => (
                    <li key={index}>
                        <h1 className="flex flex-col font-bold text-[20px]">{formatDate(item.tanggal)}<span className={`ps-[20px] text-[12px] font-normal ${item.is_cuti ? 'text-black' : 'text-red-500'}`}>{item.keterangan}</span></h1>
                    </li>
                ))}
            </ul>
        </div>
    );
}
