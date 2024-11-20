export default async function DetailKontak({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const kontakData = {
    ara : {
      nama: "Ara Chan",
      telepon: "0987654",
      email: "ara@gmail.com"
    },
    ari : {
      nama: "Ari Chan",
      telepon: "0236478234",
      email: "ari@gmail.com"
    },
    aru : {
      nama: "Aru Chan",
      telepon: "34534534",
      email: "aru@gmail.com"
    },
    are : {
      nama: "Are Chan",
      telepon: "03242342344",
      email: "are@gmail.com"
    },
    aro : {
      nama: "Aro Chan",
      telepon: "098234234544",
      email: "aro@gmail.com"
    },
    araio : {
      nama: "Araio Chan",
      telepon: "0988967544",
      email: "araio@gmail.com"
    },
  }

  const kontakInfo = kontakData[slug as keyof typeof kontakData];
  return (
    <div>
      <h1>Nama Admin: {kontakInfo.nama}</h1>
      <p>No Telp Admin: {kontakInfo.telepon}</p>
      <p>Email Admin: {kontakInfo.email}</p>
    </div>
  );
}
