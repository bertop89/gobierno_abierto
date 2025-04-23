"use client"

import { ColumnDef } from '@tanstack/react-table';
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge";

export type Votos = {
    id_voto: number;
    asiento: number;
    diputados: {
        id_diputado: number;
        nombre: string;
        grupos_parlamentarios: {
            id_grupo: number;
            nombre: string;
        };
    };
    voto: string;
};

export const columns: ColumnDef<Votos>[] = [
    {
        accessorKey: 'asiento',
        header: 'Asiento',
    },
    {
        accessorKey: 'diputados.nombre',
        header: 'Diputado',
        cell: ({ row }) => {
            const nombre = row.original.diputados.nombre
            const id_diputado = row.original.diputados.id_diputado
            return (
                <a href={`/diputados/${id_diputado}`} className="text-blue-500 hover:underline">
                    {nombre}
                </a>
            );
        }
    },
    {
        accessorKey: 'diputados.grupos_parlamentarios.nombre',
        header: 'Grupo',
        cell: ({ row }) => {
            const grupo = row.original.diputados.grupos_parlamentarios.nombre
            const id_grupo = row.original.diputados.grupos_parlamentarios.id_grupo
            return (
                <a href={`/grupos_parlamentarios/${id_grupo}`} className="text-blue-500 hover:underline">
                    {grupo}
                </a>
            );
        }
    },
    {
        accessorKey: 'voto',
        header: 'Voto',
        cell: ({ row }) => {
            const voto = row.original.voto as string;
            let color = "gray";

            if (voto === "Sí") {
                color = "green";
            } else if (voto === "No") {
                color = "red";
            }
            

            return (
                <Badge className={`bg-${color}-500 text-white`}>{voto}</Badge>
            );
        }
    }
]