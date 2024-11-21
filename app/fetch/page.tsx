export default async function Date() {
    const getDate = async () => {
        const res = await fetch('https://dayoffapi.vercel.app/api')
        return res.json()
    }

    const data = await getDate()
    return (
        <>
            <h1>Tanggal Merah</h1>
                <ul>
                    {data?.dayoff?.map((item: any, index: number) => (
                        <li key={index}>
                            <div>
                                {item.tanggal} <span>{item.keterangan}</span>
                            </div>
                        </li>
                    ))}
                </ul>
        </>
    );
}