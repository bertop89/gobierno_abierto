// app/diputados/[id]/page.tsx

import { createClient } from '@/utils/supabase/server';
import DiputadoDetail from './DiputadoDetail';
import { getDiputado } from '@/utils/supabase/queries';

type Params = Promise<{ id: string }>;

export default async function Page({ params } : { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  
  const diputado = await getDiputado(supabase, id);

  return <DiputadoDetail diputado={diputado} />;
}