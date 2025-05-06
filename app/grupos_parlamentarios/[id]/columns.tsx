"use client"

import { ColumnDef } from '@tanstack/react-table';
import { SortingButton } from "@/components/ui/sorting-button";

export type Proposicion = {
    id_votacion: number;
    fecha: string;
    titulo: string;
    texto_expediente: string;
    categoria: string;
};

export const columns: ColumnDef<Proposicion>[] = [
    {
        accessorKey: 'fecha',
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
    },
    {
        accessorKey: 'categoria',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
              <SortingButton
                isSorted={isSorted}
                onClick={() => column.toggleSorting(isSorted === "asc")}
                label="Categoría"
              />
            );
        },
    },
    {
        accessorKey: 'titulo',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
              <SortingButton
                isSorted={isSorted}
                onClick={() => column.toggleSorting(isSorted === "asc")}
                label="Título"
              />
            );
        },
        cell: ({ row }) => <a href={`/votaciones/${row.original.id_votacion}`} className="text-blue-500 underline">
          {row.original.titulo}
          </a>,
    },
    {
        accessorKey: 'texto_expediente',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
              <SortingButton
                isSorted={isSorted}
                onClick={() => column.toggleSorting(isSorted === "asc")}
                label="Texto Expediente"
              />
            );
        },
    },
];