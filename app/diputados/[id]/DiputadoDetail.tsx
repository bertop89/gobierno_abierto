'use client';

import Link from 'next/link';

const DiputadoDetail = ({ diputado }: { diputado: any }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left break-words">{diputado?.nombre}</h2>
      <p className="text-sm text-muted-foreground mb-4 text-center md:text-left break-words">
        Grupo Parlamentario:
        <Link
          href={`/grupos_parlamentarios/${diputado?.grupos_parlamentarios?.id_grupo}`}
          className="text-blue-500 hover:underline"
        >
          {diputado?.grupos_parlamentarios?.nombre}
        </Link>
      </p>
      <h3 className="font-semibold mb-2 text-center md:text-left">Votos Anteriores</h3>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <th className="border border-gray-300 px-2 py-1 text-left">Fecha</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Sesion</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Votación</th>
              <th className="border border-gray-300 px-2 py-1 text-left w-20">Voto</th>
            </tr>
          </thead>
          <tbody>
            {diputado?.votos
              ?.sort((a: any, b: any) => new Date(b.votaciones.sesiones.fecha).getTime() - new Date(a.votaciones.sesiones.fecha).getTime())
              .map((voto: any, index: number) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="border border-gray-300 px-2 py-1 whitespace-nowrap text-xs md:text-sm">{voto.votaciones.sesiones.fecha}</td>
                  <td className="border border-gray-300 px-2 py-1 whitespace-nowrap text-xs md:text-sm">{voto.votaciones.id_sesion}</td>
                  <td className="border border-gray-300 px-2 py-1 whitespace-nowrap text-xs md:text-sm">
                    <Link
                      href={`/votaciones/${voto.votaciones?.id_votacion}`}
                      className="text-blue-500 hover:underline"
                    >
                      {voto.votaciones?.titulo.length > 20
                        ? `${voto.votaciones?.titulo.slice(0, 20)}...`
                        : voto.votaciones?.titulo}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-2 py-1 whitespace-nowrap text-xs md:text-sm w-20">
                    <span
                      className={`px-2 py-1 rounded text-white text-center block text-xs md:text-sm ${
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
