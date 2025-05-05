"use client"

import { ColumnDef } from "@tanstack/react-table";
import { SortingButton } from "@/components/ui/sorting-button";

export type Subcategoria = {
  id_subcategoria: string;
  nombre_subcategoria: string;
  categorias: {
    nombre_categoria: string;
    id_categoria: string;
  };
  votaciones_subcategorias: any[]; // Adjust the type of the array elements as needed
};

export const columns: ColumnDef<Subcategoria>[] = [
    {
      accessorKey: "nombre_categoria",
      header: "Categoría",
      cell: ({ row }) => 
        <a href={`/categorias/${row.original.categorias.id_categoria}`} className="text-blue-500 underline">
            {row.original.categorias.nombre_categoria}
        </a>,
    },
    {
        accessorKey: "nombre_subcategoria",
        header: "Subcategoría",
        cell: ({ row }) => 
          <a href={`/subcategorias/${row.original.id_subcategoria}`} className="text-blue-500 underline">
              {row.original.nombre_subcategoria}
          </a>,
    },
    {
        accessorKey: "votaciones_subcategorias",
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
              <SortingButton
                isSorted={isSorted}
                onClick={() => column.toggleSorting(isSorted === "asc")}
                label="Votaciones"
              />
            );
        },
        cell: ({ row }) => <span>{row.original.votaciones_subcategorias.length}</span>,
    }

];