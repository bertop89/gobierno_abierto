import { createClient } from '@/utils/supabase/server';
import { getVotacionesCategoria, getProponentesCategoria } from "../../../utils/supabase/queries";
import CategoriaDetail from "./CategoriaDetail";

type Params = Promise<{ id: string }>;

export default async function Page({ params } : { params: Params }) {
    const {id} = await params;
    const supabase = await createClient();
    const subcategoria = await getVotacionesCategoria(supabase, id);
    const proponentes = await getProponentesCategoria(supabase, id);


  return <CategoriaDetail categoria={subcategoria} proponentes={proponentes} />;
};