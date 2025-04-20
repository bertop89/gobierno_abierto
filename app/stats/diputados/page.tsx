import { createClient } from '@/utils/supabase/server';
import {
  getVotosPorDiputado
} from '@/utils/supabase/queries';
import DiputadosStats from './DiputadosStats';

export default async function Page() {
  const supabase = await createClient();

  const diputados_stats = await getVotosPorDiputado(supabase);

  return <DiputadosStats diputados_stats={diputados_stats} />;
}