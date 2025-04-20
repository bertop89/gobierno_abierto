// app/votaciones/[id]/page.tsx

import VotacionDetail from './VotacionDetail';


export default async function Page({ params }: any) {
    const { id } = await params
    return <VotacionDetail id={id} />;
}
