// app/votaciones/[id]/VotacionDetail.tsx

'use client';

import { DataTable } from "../../../components/data-table"
import { columns } from "./columns"
import BarChart from "../../../components/BarChart";

const VotacionDetail = ({ votacion }: { votacion: any }) => {
  const groupedData = votacion.votos.reduce((acc: any, voto: any) => {
    const grupo = voto.diputados.grupos_parlamentarios.nombre;
    const order = voto.diputados.grupos_parlamentarios.order;
    if (!acc[grupo]) {
      acc[grupo] = { si: 0, no: 0, abstenciones: 0, order };
    }
    if (voto.voto === 'Sí') acc[grupo].si++;
    if (voto.voto === 'No') acc[grupo].no++;
    if (voto.voto === 'Abstención') acc[grupo].abstenciones++;
    return acc;
  }, {});

  // Convert groupedData to an array, sort by order, and then convert back to an object
  const sortedGroupedData = Object.entries(groupedData)
    .sort(([, a]: any, [, b]: any) => a.order - b.order)
    .reduce((acc: any, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{votacion?.titulo}</h2>
      <p className="text-sm text-gray-500 mb-4">{new Date(votacion?.sesiones.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {votacion?.votaciones_subcategorias?.map((subcategoria: { subcategorias: { nombre_subcategoria: string }, id_subcategoria: number }, index: number) => (
          <a
            key={index}
            href={`/subcategorias/${subcategoria.id_subcategoria}`}
            className="px-2 py-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {subcategoria.subcategorias.nombre_subcategoria}
          </a>
        ))}
      </div>
      <p className="text-muted-foreground mb-4">
        {votacion?.texto_expediente}
      </p>
      <div className="mb-4">
        <h3 className="font-semibold">Proponentes</h3>
        <ul className="list-disc list-inside">
          {votacion?.proponentes?.map((proponente: { nombre: string; grupos_parlamentarios?: { id_grupo: number; nombre: string } }, index: number) => (
            <li key={index} className="text-gray-700">
              {proponente.grupos_parlamentarios ? (
                <a href={`/grupos_parlamentarios/${proponente.grupos_parlamentarios.id_grupo}`} className="text-blue-500 hover:underline">
                  {proponente.grupos_parlamentarios.nombre}
                </a>
              ) : (
                <span>{proponente.nombre}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
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
      <div className="mb-6">
        <BarChart groupedData={sortedGroupedData} />
      </div>
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={votacion.votos} />
      </div>
    </div>
  );
};

export default VotacionDetail;
