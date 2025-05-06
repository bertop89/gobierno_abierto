"use client";

import Link from "next/link";
import PieChart from '@/components/PieChart';
import TimeSeriesBarChart from '@/components/TimeSeriesBarChart';
import { DataTable } from "@/components/data-table";
import { columns, Proposicion } from "./columns";

export const buildProposiciones = (grupoParlamentario: any): Proposicion[] => {
  return grupoParlamentario.proponentes.map((proponente: any) => {
      const votacion = proponente.votaciones;
      const categoria = votacion.votaciones_subcategorias.length > 0
          ? votacion.votaciones_subcategorias[0].subcategorias.categorias.nombre_categoria
          : "";

      return {
          id_votacion: votacion.id_votacion,
          fecha: votacion.sesiones.fecha,
          titulo: votacion.titulo,
          texto_expediente: votacion.texto_expediente,
          categoria: categoria,
      };
  });
};

const GrupoParlamentarioDetail = ({ grupo_parlamentario }: { grupo_parlamentario: any }) => {
  const categoriasData = grupo_parlamentario?.proponentes?.flatMap((proponente: any) =>
    proponente.votaciones?.votaciones_subcategorias?.flatMap((votacion: any) =>
      votacion.subcategorias?.categorias
    )
  ) || [];

  const categoriasCount = categoriasData.reduce((acc: Record<string, { count: number; color: string }>, categoria: any) => {
    if (categoria?.nombre_categoria) {
      acc[categoria.nombre_categoria] = acc[categoria.nombre_categoria] || { count: 0, color: categoria.color };
      acc[categoria.nombre_categoria].count += 1;
    }
    return acc;
  }, {});

  const fechasData = grupo_parlamentario?.proponentes?.flatMap((proponente: any) =>
    proponente.votaciones?.sesiones?.fecha ? [new Date(proponente.votaciones.sesiones.fecha)] : []
  ) || [];

  const groupedFechasData = fechasData.reduce((acc: Record<string, number>, date: Date) => {
    const key = date.toISOString(); // YYYY-MM format
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const proposiciones = buildProposiciones(grupo_parlamentario);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4" style={{ color: grupo_parlamentario?.color }}>
        {grupo_parlamentario?.nombre}
      </h2>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Fechas Proposiciones</h3>
        <TimeSeriesBarChart data={groupedFechasData} color={grupo_parlamentario?.color} />
      </div>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Categorías Proposiciones</h3>
        <PieChart categoriasCount={categoriasCount} />
      </div>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Proposiciones</h3>
        <DataTable columns={columns} data={proposiciones} />
      </div>
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Diputados</h3>
        <ul className="list-disc pl-5">
          {grupo_parlamentario?.diputados?.map((diputado: any) => (
            <li key={diputado.id_diputado}>
              <Link href={`/diputados/${diputado.id_diputado}`} className="text-blue-500 hover:underline">
                {diputado.nombre}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default GrupoParlamentarioDetail;