import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function Page() {
  const supabase = await createClient();

  const { data: diputados, error } = await supabase.rpc('votos_por_diputado')

  if (error) {
    console.error(error);
    return <div>Error loading data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Estadísticas de Diputados</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Grupo Parlamentario</th>
            <th className="border border-gray-300 px-4 py-2 text-left">% Sí</th>
            <th className="border border-gray-300 px-4 py-2 text-left">% No</th>
            <th className="border border-gray-300 px-4 py-2 text-left">% Abstenciones</th>
          </tr>
        </thead>
        <tbody>
          {diputados.map((diputado: any) => (
            <tr key={diputado.id_diputado} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/diputados/${diputado.id_diputado}`} className="text-blue-500 hover:underline">
                  {diputado.diputado}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link href={`/grupos_parlamentarios/${diputado.id_grupo}`} className="text-blue-500 hover:underline">
                  {diputado.grupo_parlamentario}
                </Link>
              </td>
              <td className="border border-gray-300 px-4 py-2 text-right" style={{ backgroundColor: `rgba(40, 167, 69, ${diputado.porcentaje_si / 100})` }}>{diputado.porcentaje_si}%</td>
              <td className="border border-gray-300 px-4 py-2 text-right" style={{ backgroundColor: `rgba(220, 53, 69, ${diputado.porcentaje_no / 100})` }}>{diputado.porcentaje_no}%</td>
              <td className="border border-gray-300 px-4 py-2 text-right" style={{ backgroundColor: `rgba(108, 117, 125, ${diputado.porcentaje_abstencion / 100})` }}>{diputado.porcentaje_abstencion}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}