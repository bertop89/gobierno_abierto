"use client";

import { columns } from "./columns"
import { DataTable } from "../../../components/data-table"
import { ResponsiveHeatMap } from '@nivo/heatmap'

const GrupoParlamentariosStats = ({ grupos_stats, votos_cruzados }: { grupos_stats: any, votos_cruzados:any }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">Estadísticas de Grupos Parlamentarios</h2>
            <div className="overflow-x-auto">
                <DataTable columns={columns} data={grupos_stats} />
            </div>
            <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Votos Cruzados</h3>
                <div style={{ height: '500px', width: '100%' }}>
                    <ResponsiveHeatMap
                        data={votos_cruzados}
                        axisTop={{ tickSize: 5, tickPadding: 5, tickRotation: -45, legend: 'Grupo Votante', legendPosition: 'middle', legendOffset: -50 }}
                        axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: -45, legend: 'Grupo Proponente', legendPosition: 'middle', legendOffset: -60 }}
                        margin={{ top: 100, right: 20, bottom: 60, left: 90 }}
                        colors={{
                          type: 'sequential',
                          scheme: 'red_yellow_green',
                          minValue: 0,
                          maxValue: 100
                        }}
                        label={(d) => `${d.value}%`}
                        labelTextColor={{ from: 'color', modifiers: [['darker', 3.0]] }}
                        isInteractive={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default GrupoParlamentariosStats;