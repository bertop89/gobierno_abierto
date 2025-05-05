"use client"

import { ColumnDef } from '@tanstack/react-table';
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { SortingButton } from "@/components/ui/sorting-button";

export type Grupo = {
    grupo_parlamentario: string;
    diputados: number;
    id_grupo: number;
    color: string; 
    porcentaje_si: number;
    porcentaje_no: number;
    porcentaje_abstencion: number;
};

export const columns: ColumnDef<Grupo>[] = [
    {
        accessorKey: 'grupo_parlamentario',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
              <SortingButton
                isSorted={isSorted}
                onClick={() => column.toggleSorting(isSorted === "asc")}
                label="Grupo"
              />
            );
        },
        cell: ({ row }) => {
            const grupo = row.original.grupo_parlamentario
            const id_grupo = row.original.id_grupo
            const color = row.original.color // Assuming the color is part of the data
            return (
                <a href={`/grupos_parlamentarios/${id_grupo}`} className="text-blue-500 hover:underline flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                    {grupo}
                </a>
            );
        }
    },
    {
        accessorKey: 'diputados',
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <SortingButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting(isSorted === "asc")}
              label="Diputados"
            />
          );
      },
    },
    {
      accessorKey: 'proposiciones_presentadas',
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <SortingButton
            isSorted={isSorted}
            onClick={() => column.toggleSorting(isSorted === "asc")}
            label="Proposiciones"
          />
        );
    },
  },
    {
        accessorKey: 'porcentaje_si',
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <SortingButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting(isSorted === "asc")}
              label="% Sí"
            />
          );
      },
        cell: ({ row }) => {
            const porcentaje = row.original.porcentaje_si
            return (
                <Badge className="text-white-500" style={{ backgroundColor: `rgba(40, 167, 69, ${porcentaje / 100})` }} variant="outline">
                    {porcentaje}%
                </Badge>
            );
        }
        
    },
    {
        accessorKey: 'porcentaje_no',
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <SortingButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting(isSorted === "asc")}
              label="% No"
            />
          );
      },
        cell: ({ row }) => {
            const porcentaje = row.original.porcentaje_no
            return (
                <Badge className="text-white-500" style={{ backgroundColor: `rgba(220, 53, 69, ${porcentaje / 100})` }} variant="outline">
                    {porcentaje}%
                </Badge>
            );
        }
    },
    {
        accessorKey: 'porcentaje_abstencion',
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <SortingButton
              isSorted={isSorted}
              onClick={() => column.toggleSorting(isSorted === "asc")}
              label="% Abstención"
            />
          );
      },
        cell: ({ row }) => {
            const porcentaje = row.original.porcentaje_abstencion
            return (
                <Badge className="text-white-500" style={{ backgroundColor: `rgba(108, 117, 125, ${porcentaje / 100})` }} variant="outline">
                    {porcentaje}%
                </Badge>
            );
        }
    }
]