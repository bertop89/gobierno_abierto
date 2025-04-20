import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Page() {
  const supabase = await createClient();

  const { data: grupos, error } = await supabase.rpc('votos_por_grupo')

  if (error) {
    console.error(error);
    return <div>Error loading data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas de Grupos Parlamentarios</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Diputados</th>
            <th className="border border-gray-300 px-4 py-2 text-left">% Sí</th>
            <th className="border border-gray-300 px-4 py-2 text-left">% No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">% Abstenciones</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo: any) => (
            <tr key={grupo.id_grupo} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/grupos_parlamentarios/${grupo.id_grupo}`} className="text-blue-500 hover:underline">
                    {grupo.grupo_parlamentario}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right">{grupo.diputados}</td>
              <td className="border border-gray-300 px-4 py-2 text-right" style={{ backgroundColor: `rgba(40, 167, 69, ${grupo.porcentaje_si / 100})` }}>{grupo.porcentaje_si}%</td>
              <td className="border border-gray-300 px-4 py-2 text-right" style={{ backgroundColor: `rgba(220, 53, 69, ${grupo.porcentaje_no / 100})` }}>{grupo.porcentaje_no}%</td>
              <td className="border border-gray-300 px-4 py-2 text-right" style={{ backgroundColor: `rgba(108, 117, 125, ${grupo.porcentaje_abstencion / 100})` }}>{grupo.porcentaje_abstencion}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}