"use client"

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from "@/components/ui/badge";
import { SortingButton } from "@/components/ui/sorting-button";

export type Diputado = {
    diputado: string;
    id_diputado: number;
    id_grupo: number;
    grupo_parlamentario: string;
    porcentaje_si: number;
    porcentaje_no: number;
    porcentaje_abstencion: number;
};

export const columns: ColumnDef<Diputado>[] = [

    {
        accessorKey: 'diputado',
        header: ({ column }) => {
            const isSorted = column.getIsSorted();
            return (
              <SortingButton
                isSorted={isSorted}
                onClick={() => column.toggleSorting(isSorted === "asc")}
                label="Diputado"
              />
            );
        },
        cell: ({ row }) => {
            const nombre = row.original.diputado
            const id_diputado = row.original.id_diputado
            return (
                <a href={`/diputados/${id_diputado}`} className="text-blue-500 hover:underline">
                    {nombre}
                </a>
            );
        }
    },
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
            return (
                <a href={`/grupos_parlamentarios/${id_grupo}`} className="text-blue-500 hover:underline">
                    {grupo}
                </a>
            );
        }
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