'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const DiputadoDetail = ({ id }: { id: string }) => {
  const [diputado, setDiputado] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiputadoData = async () => {
      const supabase = await createClient();
      const { data: diputadoData, error: diputadoError } = await supabase
        .from('diputados')
        .select(`
            id_diputado, 
            nombre, 
            id_grupo,
            grupos_parlamentarios(nombre, id_grupo),
            votos(
                asiento, 
                voto, 
                votaciones(
                    titulo, 
                    id_votacion, 
                    id_sesion,
                    sesiones(fecha)
                )
            )
        `)
        .eq('id_diputado', id)
        .single();

      if (diputadoError) {
        console.error('Error fetching diputado:', diputadoError);
      } else {
        setDiputado(diputadoData);
      }

      setLoading(false);
    };

    fetchDiputadoData();
  }, [id]);

  if (loading) return <p>Cargando datos del diputado...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">{diputado?.nombre}</h2>
      <p className="text-sm text-muted-foreground mb-4 text-center md:text-left">
        Grupo Parlamentario:
        <Link href={`/grupos_parlamentarios/${diputado?.grupos_parlamentarios?.id_grupo}`} className="text-blue-500 hover:underline">
          {diputado?.grupos_parlamentarios?.nombre}
        </Link>
      </p>
      <h3 className="font-semibold mb-2 text-center md:text-left">Votos Anteriores</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left">Fecha</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Sesion</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Asiento</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Votación</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Voto</th>
            </tr>
          </thead>
          <tbody>
            {diputado?.votos
              ?.sort((a: any, b: any) => new Date(b.votaciones.sesiones.fecha).getTime() - new Date(a.votaciones.sesiones.fecha).getTime())
              .map((voto: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{voto.votaciones.sesiones.fecha}</td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{voto.votaciones.id_sesion}</td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{voto.asiento}</td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    <Link href={`/votaciones/${voto.votaciones?.id_votacion}`} className="text-blue-500 hover:underline">
                      {voto.votaciones?.titulo.length > 20 ? `${voto.votaciones?.titulo.slice(0, 20)}...` : voto.votaciones?.titulo}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-white text-center block ${
                        voto.voto === 'Sí'
                          ? 'bg-green-500'
                          : voto.voto === 'No'
                          ? 'bg-red-500'
                          : 'bg-gray-500'
                      }`}
                    >
                      {voto.voto}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DiputadoDetail;