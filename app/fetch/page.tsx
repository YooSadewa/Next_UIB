export default async function Date() {
    const getDate = async () => {
        const res = await fetch('https://dayoffapi.vercel.app/api')
        return res.json()
    }

    const data = await getDate()
    return (
        <>
            <h1>Tanggal Merah</h1>
            <ul className="grid grid-cols-4 gap-4 items-center">
                {
                    data?.dayoff?.map( (item : any, index : any) => {
                        <li className="w-52 mx-4" key={index}>
                            <div className="p-2 text-sm text-black bg-gray-400">
                                {item.tanggal} <span className="rounded-lg p-1 px-1 ml-2 bg-gray-200">${item.keterangan}</span>
                            </div>
                        </li>
                    } )
                }
            </ul>
        </>
    );
}