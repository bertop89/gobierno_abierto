// app/votaciones/[id]/VotacionDetail.tsx

'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface GrupoParlamentario {
    id_grupo: number;
    nombre: string;
  }
  
  interface Diputado {
    id_diputado: number;
    nombre: string;
    grupos_parlamentarios: GrupoParlamentario;
  }
  
  interface Voto {
    id_voto: number;
    id_votacion: number;
    asiento: string;
    voto: string;
    diputados: Diputado;
  }
  
  interface Votacion {
    titulo: string;
    texto_expediente: string;
    presentes: number;
    a_favor: number;
    en_contra: number;
    abstenciones: number;
    no_votan: number;
    votos: Voto[];
  }

const VotacionDetail = ({ id }: { id: string }) => {
  const [votacion, setVotacion] = useState<Votacion>();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from('votaciones')
        .select(`
            titulo,
            texto_expediente,
            presentes,
            a_favor,
            en_contra,
            abstenciones,
            no_votan,
            votos (
                id_voto,
                id_votacion,
                asiento,
                voto,
                diputados(
                    id_diputado,
                    nombre,
                    grupos_parlamentarios(
                        id_grupo,
                        nombre
                    )
                )
            )
        `)
        .eq('id_votacion', id)
        .single(); // Use .single() to get a single object instead of an array

      if (error) {
        console.error('Error fetching votaciones:', error);
      } else {
        console.log('Fetched votacion:', data);
        setVotacion(data ? {
          ...data,
          votos: data.votos.map((voto: any) => ({
            ...voto,
            diputados: Array.isArray(voto.diputados) ? voto.diputados[0] : voto.diputados,
          })),
        } : undefined);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page whenever the search term changes
  };

  const filteredVotos = votacion?.votos?.filter((voto) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      voto.asiento.toLowerCase().includes(searchLower) ||
      voto.diputados.nombre.toLowerCase().includes(searchLower) ||
      voto.diputados.grupos_parlamentarios.nombre.toLowerCase().includes(searchLower)
    );
  });

  const paginatedVotos = filteredVotos?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  if (loading) return <p>Cargando votaciones...</p>;

  return (
    <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">{votacion?.titulo}</h2>
        <p className="text-muted-foreground mb-4">
          {votacion?.texto_expediente}
        </p>
        <div className="mb-6">
          <h3 className="font-semibold">Resultados de la votación</h3>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <p>Sí: {votacion?.a_favor}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <p>No: {votacion?.en_contra}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-gray-500"></span>
            <p>Abstenciones: {votacion?.abstenciones}</p>
          </div>
          <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden relative">
            <div
                className="absolute top-0 left-0 h-full bg-green-500"
                style={{ width: `${((votacion?.a_favor ?? 0) / (votacion?.presentes ?? 1)) * 100}%` }}
            ></div>
            <div
                className="absolute top-0 left-0 h-full bg-red-500"
                style={{ width: `${((votacion?.en_contra ?? 0) / (votacion?.presentes ?? 1)) * 100}%`, left: `${((votacion?.a_favor ?? 0) / (votacion?.presentes ?? 1)) * 100}%` }}
            ></div>
            <div
                className="absolute top-0 left-0 h-full bg-gray-500"
                style={{ width: `${((votacion?.abstenciones ?? 0) / (votacion?.presentes ?? 1)) * 100}%`, left: `${(((votacion?.a_favor ?? 0) + (votacion?.en_contra ?? 0)) / (votacion?.presentes ?? 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar por Asiento, Diputado o Grupo Parlamentario"
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left">Asiento</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Diputado</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Grupo</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Voto</th>
            </tr>
          </thead>
          <tbody>
            {paginatedVotos?.map((voto) => (
                <tr key={voto.id_voto} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border border-gray-300 px-4 py-2">{voto.asiento}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link href={`/diputados/${voto.diputados.id_diputado}`} className="text-blue-500 hover:underline">
                      {voto.diputados.nombre}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    
                    <Link href={`/grupos_parlamentarios/${voto.diputados.grupos_parlamentarios.id_grupo}`} className="text-blue-500 hover:underline">
                    {voto.diputados.grupos_parlamentarios.nombre}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                        className={`px-2 py-1 rounded text-white ${
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
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700"
          >
            Anterior
          </button>
          <span>Página {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => (filteredVotos && prev * rowsPerPage < filteredVotos.length ? prev + 1 : prev))}
            disabled={filteredVotos && currentPage * rowsPerPage >= filteredVotos.length}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700"
          >
            Siguiente
          </button>
        </div>
    </div>
  );
};

export default VotacionDetail;
