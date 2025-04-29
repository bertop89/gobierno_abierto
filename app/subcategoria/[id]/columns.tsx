"use client"

import { ColumnDef } from "@tanstack/react-table";

export type Votacion = {
  id_votacion: string;
  titulo: string;
  texto_expediente: string;
  fecha: string;
  sesiones: {
    fecha: string;
  };
};

export const columns: ColumnDef<Votacion>[] = [
    {
        accessorKey: "id_votacion",
        header: "ID Votación",
        cell: ({ row }) => (
            <a href={`/votaciones/${row.original.id_votacion}`} className="text-blue-500 underline">
                {row.original.id_votacion}
            </a>
        ),
    },
    {
        accessorKey: "fecha",
        header: "Fecha",
        cell: ({ row }) => <span>{new Date(row.original.sesiones.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>,
    },
    {
        accessorKey: "titulo",
        header: "Título",
        cell: ({ row }) => <span>{row.original.titulo}</span>,
    },
    {
        accessorKey: "texto_expediente",
        header: "Texto del Expediente",
        cell: ({ row }) => <span>{row.original.texto_expediente}</span>,
    },

];