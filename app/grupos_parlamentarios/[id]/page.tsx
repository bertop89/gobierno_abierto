// app/votaciones/[id]/page.tsx

import GrupoParlamentarioDetail from "./GrupoParlamentarioDetail";


export default async function Page({ params }: any) {
  const { id } = await params
  return <GrupoParlamentarioDetail id={id} />;
};