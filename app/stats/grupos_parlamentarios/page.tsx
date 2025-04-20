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
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Estadísticas de Grupos Parlamentarios</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Grupo</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Diputados</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">% Sí</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">% No</th>
              <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">% Abstenciones</th>
            </tr>
          </thead>
          <tbody>
            {grupos.map((grupo: any) => (
              <tr key={grupo.id_grupo} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-300 px-2 md:px-4 py-2">
                  <Link href={`/grupos_parlamentarios/${grupo.id_grupo}`} className="text-blue-500 hover:underline">
                      {grupo.grupo_parlamentario}
                  </Link>
                </td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-right">{grupo.diputados}</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-right" style={{ backgroundColor: `rgba(40, 167, 69, ${grupo.porcentaje_si / 100})` }}>{grupo.porcentaje_si}%</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-right" style={{ backgroundColor: `rgba(220, 53, 69, ${grupo.porcentaje_no / 100})` }}>{grupo.porcentaje_no}%</td>
                <td className="border border-gray-300 px-2 md:px-4 py-2 text-right" style={{ backgroundColor: `rgba(108, 117, 125, ${grupo.porcentaje_abstencion / 100})` }}>{grupo.porcentaje_abstencion}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}