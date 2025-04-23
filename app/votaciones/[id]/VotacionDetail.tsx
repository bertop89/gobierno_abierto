// app/votaciones/[id]/VotacionDetail.tsx

'use client';

import { DataTable } from "../../../components/data-table"
import { columns } from "./columns"

const VotacionDetail = ({ votacion }: { votacion: any }) => {

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
        <div className="overflow-x-auto">
          <DataTable columns={columns} data={votacion.votos} />
        </div>
    </div>
  );
};

export default VotacionDetail;
