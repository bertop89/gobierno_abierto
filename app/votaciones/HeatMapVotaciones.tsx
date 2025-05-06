"use client";

import { ResponsiveHeatMapCanvas } from '@nivo/heatmap';
import { getWeek } from '../../lib/utils';
import { useTheme } from 'next-themes'

const HeatMapVotaciones = ({ votaciones }: { votaciones: any[] }) => {
    const { theme, setTheme } = useTheme()
    
    const generateHeatmapData = () => {
        const days = ["L", "M", "X", "J", "V", "S", "D"];
        const groupedData: { [key: string]: { [key: string]: number } } = {};

        votaciones.forEach((votacion) => {
            const fecha = new Date(votacion.sesiones.fecha);
            if (fecha.getFullYear() !== 2025) return; // Only include data for 2025

            const day = days[fecha.getDay()-1];
            const week = getWeek(fecha);

            if (!groupedData[day]) {
                groupedData[day] = {};
            }

            const weekKey = `S${week}`;
            groupedData[day][weekKey] = (groupedData[day][weekKey] || 0) + 1;
        });

        const data = days.map((day) => ({
            id: day,
            data: Array.from({ length: 52 }, (_, week) => {
                const weekKey = `S${week + 1}`;
                return {
                    x: weekKey,
                    y: groupedData[day]?.[weekKey] || 0,
                    date: new Date(new Date().getFullYear(), 0, 1 + (week * 7) + days.indexOf(day)-2).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }),
                };
            }),
        }));

        return data;
    };

    const heatmapData = generateHeatmapData();

    return (
        <div style={{ width: '100%', overflowX: 'auto' }}>
            <div style={{ height: '200px', minWidth: '600px' }}>
                <ResponsiveHeatMapCanvas
                    data={heatmapData}
                    margin={{ top: 40, right: 30, bottom: 40, left: 30 }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={null}
                    colors={{ type: 'sequential', scheme: 'greens', maxValue: 10 }}
                    emptyColor="#fffff"
                    hoverTarget="cell"
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 4.0]] }}
                    enableLabels={false}
                    tooltip={(e) => {
                        const count = e.cell.data.y;
                        const date = e.cell.data.date; // Get the date from the cell data
                        return (
                            <div style={{ padding: '5px', backgroundColor: 'white', borderRadius: '5px', color: 'black' }}>
                                <strong>{date}</strong><br />
                                {count} votaciones
                            </div>
                        );
                    }}
                    theme={{
                        text: {
                            fill: theme === 'dark' ? '#ffffff' : '#000000'
                        }
                    }}
                />
            </div>
        </div>
    );
};


export default HeatMapVotaciones;
