"use client";

import { DataTable } from "../../components/data-table";
import { columns } from "./columns";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const Subcategorias = ({ subcategorias, proponentes }: { subcategorias: any, proponentes: any }) => {

  const categorias: string[] = Array.from(new Set(proponentes.map((p: any) => p.nombre_categoria)));
  const maxPropuestas = Math.max(...proponentes.map((p: any) => p.total_proposiciones));

  const barOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: false,
      },
      y: {
        stacked: false,
        max: maxPropuestas + 1,
      },
    },
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Categorías de Votaciones</h1>
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={subcategorias} />
      </div>
      <div className="overflow-x-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">Votaciones por Categoría y Grupo</h2>
        {categorias.map((categoria: string) => {
          const categoriaData = proponentes.filter((p: any) => p.nombre_categoria === categoria);
          const grupos : string[] = Array.from(new Set(categoriaData.map((p: any) => p.nombre)));

          const barData = {
            labels: grupos,
            datasets: [
              {
                label: categoria,
                data: grupos.map((grupo: string) => {
                  const proponente = categoriaData.find((p: any) => p.nombre === grupo);
                  return proponente ? proponente.total_proposiciones : 0;
                }),
                backgroundColor: grupos.map((grupo: string) => {
                  return categoriaData.find((p: any) => p.nombre === grupo)?.color || '#000000';
                })
              },
            ],
          };

          return (
            <div key={categoria} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">{categoria}</h3>
              <Bar data={barData} options={barOptions} style={{  maxHeight: '300px' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subcategorias;