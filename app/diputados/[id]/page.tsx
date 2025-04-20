// app/votaciones/[id]/page.tsx

import { createClient } from '@/utils/supabase/server';
import DiputadoDetail from './DiputadoDetail';
import {
    getDiputado
  } from '@/utils/supabase/queries';

export default async function Page({ params }: { params: { id: string } }) {
  const {id} = await params;
  const supabase = await createClient();

  const diputado = await getDiputado(supabase, id);

  return <DiputadoDetail diputado={diputado} />;
}
