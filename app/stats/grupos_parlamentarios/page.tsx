import { createClient } from '@/utils/supabase/server';
import {
  getVotosPorGrupo,
  getVotosCruzadosPorGrupo
} from '@/utils/supabase/queries';
import GrupoParlamentariosStats from './GrupoParlamentariosStats';

export default async function Page() {
  const supabase = await createClient();

  const grupos_stats = await getVotosPorGrupo(supabase);

  const votos_cruzados = await getVotosCruzadosPorGrupo(supabase);

  return <GrupoParlamentariosStats grupos_stats={grupos_stats} votos_cruzados={votos_cruzados} />;



}