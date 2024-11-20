export default async function Laboratorium({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
    return (
      <div>
          <h1>Facility : {slug}</h1>
      </div>
    );
  }
