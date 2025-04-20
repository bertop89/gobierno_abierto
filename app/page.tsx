import ListVotaciones from "@/app/votaciones/ListVotaciones";
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
        <ListVotaciones votaciones={votaciones} />
      </main>
    </>
  );
}
