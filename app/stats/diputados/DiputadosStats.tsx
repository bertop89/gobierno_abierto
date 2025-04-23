"use client";

import { columns } from "./columns"
import { DataTable } from "../../../components/data-table"

const DiputadosStats = ({ diputados_stats }: { diputados_stats: any }) => {
    return (
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Estadísticas de Diputados</h2>
          <div className="overflow-x-auto">
            <DataTable columns={columns} data={diputados_stats} />
          </div>
        </div>
    );
};

export default DiputadosStats;