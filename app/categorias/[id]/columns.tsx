"use client"

import { ColumnDef } from "@tanstack/react-table";
import { SortingButton } from "@/components/ui/sorting-button";

export type Votacion = {
  votaciones: {
    id_votacion: string;
    titulo: string;
    texto_expediente: string;
    fecha: string;
    sesiones: {
      fecha: string;
    };
  };
};

export const columns: ColumnDef<Votacion>[] = [
    {
        accessorKey: "votaciones.sesiones.fecha",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
              <SortingButton
                isSorted={isSorted}
                onClick={() => column.toggleSorting(isSorted === "asc")}
                label="Fecha"
              />
            );
        },
        cell: ({ row }) => <span>{new Date(row.original.votaciones.sesiones.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>,
    },
    {
        accessorKey: "titulo",
        header: "Título",
        cell: ({ row }) => <a href={`/votaciones/${row.original.votaciones.id_votacion}`} className="text-blue-500 underline">
          {row.original.votaciones.titulo}
          </a>,
    },
    {
        accessorKey: "texto_expediente",
        header: "Texto del Expediente",
        cell: ({ row }) => <span>{row.original.votaciones.texto_expediente}</span>,
    },

];