"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

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
      header: "Nombre Categoría",
      cell: ({ row }) => 
        <a href={`/categorias/${row.original.categorias.id_categoria}`} className="text-blue-500 underline">
            {row.original.categorias.nombre_categoria}
        </a>,
    },
    {
        accessorKey: "nombre_subcategoria",
        header: "Nombre Subcategoría",
        cell: ({ row }) => 
          <a href={`/subcategorias/${row.original.id_subcategoria}`} className="text-blue-500 underline">
              {row.original.nombre_subcategoria}
          </a>,
    },
    {
        accessorKey: "votaciones_subcategorias",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Votaciones
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => <span>{row.original.votaciones_subcategorias.length}</span>,
    }

];