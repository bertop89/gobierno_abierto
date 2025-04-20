// app/votaciones/[id]/page.tsx

import { createClient } from '@/utils/supabase/server';
import GrupoParlamentarioDetail from './GrupoParlamentarioDetail';
import {
    getGrupoParlamentario
  } from '@/utils/supabase/queries';

export default async function Page({ params }: { params: { id: string } }) {
  const {id} = await params;
  const supabase = await createClient();

  const grupo_parlamentario = await getGrupoParlamentario(supabase, id);

  return <GrupoParlamentarioDetail grupo_parlamentario={grupo_parlamentario} />;
}