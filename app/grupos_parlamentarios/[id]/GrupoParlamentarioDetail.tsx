"use client";

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from "react";
import Link from "next/link";

const GrupoParlamentarioDetail = ({ id }: { id: string }) => {
  const [grupo, setGrupo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrupoData = async () => {
      const supabase = await createClient();
      const { data: grupoData, error: grupoError } = await supabase
        .from("grupos_parlamentarios")
        .select(`
          id_grupo,
          nombre,
          diputados(
            id_diputado,
            nombre
          )
        `)
        .eq("id_grupo", id)
        .single();

      if (grupoError) {
        console.error("Error fetching grupo parlamentario:", grupoError);
      } else {
        setGrupo(grupoData);
      }

      setLoading(false);
    };

    fetchGrupoData();
  }, [id]);

  if (loading) return <p>Cargando datos del grupo parlamentario...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{grupo?.nombre}</h2>
      <h3 className="font-semibold mb-2">Diputados</h3>
      <ul className="list-disc pl-5">
        {grupo?.diputados?.map((diputado: any) => (
          <li key={diputado.id_diputado}>
            <Link href={`/diputados/${diputado.id_diputado}`} className="text-blue-500 hover:underline">
              {diputado.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrupoParlamentarioDetail;