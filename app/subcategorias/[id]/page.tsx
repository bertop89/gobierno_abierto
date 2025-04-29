import { createClient } from '@/utils/supabase/server';
import { getVotacionesSubcategoria } from "../../../utils/supabase/queries";
import SubcategoriaDetail from "./SubcategoriaDetail";

type Params = Promise<{ id: string }>;

export default async function Page({ params } : { params: Params }) {
    const {id} = await params;
    const supabase = await createClient();
    const subcategoria = await getVotacionesSubcategoria(supabase, id);


  return <SubcategoriaDetail subcategoria={subcategoria} />;
};