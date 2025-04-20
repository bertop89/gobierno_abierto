// app/votaciones/[id]/page.tsx
import { createClient } from '@/utils/supabase/server';
import VotacionDetail from './VotacionDetail';
import {
    getVotacion
  } from '@/utils/supabase/queries';

type Params = Promise<{ id: string }>;

export default async function Page({ params } : { params: Params }) {
    const {id} = await params;
    const supabase = await createClient();
  
    const votacion = await getVotacion(supabase, id);
  
    return <VotacionDetail votacion={votacion} />;
}
