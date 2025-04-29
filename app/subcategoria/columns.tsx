"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

export type Subcategoria = {
  id_subcategoria: string;
  nombre_subcategoria: string;
  nombre_categoria: string;
  categorias: {
    nombre_categoria: string;
  };
  votaciones_subcategorias: any[]; // Adjust the type of the array elements as needed
};

export const columns: ColumnDef<Subcategoria>[] = [
    {
        accessorKey: "id_subcategoria",
        header: "ID Subcategoría",
        cell: ({ row }) => (
            <a href={`/subcategoria/${row.original.id_subcategoria}`} className="text-blue-500 underline">
                {row.original.id_subcategoria}
            </a>
        ),
    },
    {
      accessorKey: "nombre_categoria",
      header: "Nombre Categoría",
      cell: ({ row }) => <span>{row.original.categorias.nombre_categoria}</span>,
    },
    {
        accessorKey: "nombre_subcategoria",
        header: "Nombre Subcategoría",
        cell: ({ row }) => <span>{row.original.nombre_subcategoria}</span>,
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