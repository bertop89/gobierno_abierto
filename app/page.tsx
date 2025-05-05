import ListVotaciones from "@/app/votaciones/ListVotaciones";
import HeatMapVotaciones from "@/app/votaciones/HeatMapVotaciones";
import { createClient } from '@/utils/supabase/server';
import {
  getVotaciones
  } from '@/utils/supabase/queries';

export default async function Home() {
      const supabase = await createClient();
    
      const votaciones = await getVotaciones(supabase);
  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Calendario Votaciones 2025</h1>
        <HeatMapVotaciones votaciones={votaciones}/>
        <ListVotaciones votaciones={votaciones} />
      </main>
    </>
  );
}
