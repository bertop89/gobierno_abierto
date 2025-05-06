import { createClient } from '@/utils/supabase/server';
import { getSubcategorias, getProponentesCategorias } from "../../utils/supabase/queries";
import Subcategorias from "./Subcategorias";

type Params = Promise<{ id: string }>;

export default async function Page({ params } : { params: Params }) {
    const supabase = await createClient();
    const subcategorias = await getSubcategorias(supabase);
    const proponentes = await getProponentesCategorias(supabase);


  return <Subcategorias subcategorias={subcategorias} proponentes={proponentes} />;
};