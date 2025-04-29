"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

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
        accessorKey: "id_votacion",
        header: "ID Votación",
        cell: ({ row }) => (
            <a href={`/votaciones/${row.original.votaciones.id_votacion}`} className="text-blue-500 underline">
                {row.original.votaciones.id_votacion}
            </a>
        ),
    },
    {
        accessorKey: "fecha",
        header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Fecha
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
        cell: ({ row }) => <span>{new Date(row.original.votaciones.sesiones.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}</span>,
    },
    {
        accessorKey: "titulo",
        header: "Título",
        cell: ({ row }) => <span>{row.original.votaciones.titulo}</span>,
    },
    {
        accessorKey: "texto_expediente",
        header: "Texto del Expediente",
        cell: ({ row }) => <span>{row.original.votaciones.texto_expediente}</span>,
    },

];