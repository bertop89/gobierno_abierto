// app/votaciones/[id]/page.tsx

import DiputadoDetail from './DiputadoDetail';


export default async function Page({ params }: any) {
    const { id } = await params
    return <DiputadoDetail id={id} />;
}
