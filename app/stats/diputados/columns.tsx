"use client"

import { ColumnDef } from '@tanstack/react-table';
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge";

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
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Diputado
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
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
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                Grupo
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
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
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                % Sí
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
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
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                % No
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
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
            return (
              <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              >
                % Abstención
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
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