import { createClient } from '@/utils/supabase/server';
import { getSubcategorias } from "../../utils/supabase/queries";
import Subcategorias from "./Subcategorias";

type Params = Promise<{ id: string }>;

export default async function Page({ params } : { params: Params }) {
    const supabase = await createClient();
    const subcategorias = await getSubcategorias(supabase);


  return <Subcategorias subcategorias={subcategorias} />;
};