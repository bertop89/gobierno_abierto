"use client";

import Link from "next/link";

const DiputadosStats = ({ diputados_stats }: { diputados_stats: any }) => {
    return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Estadísticas de Diputados</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                  <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Nombre</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">Grupo</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">% Sí</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">% No</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2 text-left">% Abstenciones</th>
                </tr>
              </thead>
              <tbody>
                {diputados_stats.map((diputado: any) => (
                  <tr key={diputado.id_diputado} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="border border-gray-300 px-2 md:px-4 py-2">
                      <Link href={`/diputados/${diputado.id_diputado}`} className="text-blue-500 hover:underline">
                        {diputado.diputado}
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">
                      <Link href={`/grupos_parlamentarios/${diputado.id_grupo}`} className="text-blue-500 hover:underline">
                        {diputado.grupo_parlamentario}
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2 text-right" style={{ backgroundColor: `rgba(40, 167, 69, ${diputado.porcentaje_si / 100})` }}>{diputado.porcentaje_si}%</td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2 text-right" style={{ backgroundColor: `rgba(220, 53, 69, ${diputado.porcentaje_no / 100})` }}>{diputado.porcentaje_no}%</td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2 text-right" style={{ backgroundColor: `rgba(108, 117, 125, ${diputado.porcentaje_abstencion / 100})` }}>{diputado.porcentaje_abstencion}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    );
};

export default DiputadosStats;