"use client"

import { ColumnDef } from '@tanstack/react-table';
import { SortingButton } from "@/components/ui/sorting-button";
import { Badge } from "@/components/ui/badge";

export type Votos = {
    asiento: string;
    votaciones: {
        id_sesion: number;
        id_votacion: number;
        titulo: string;
        sesiones: {
            fecha: string;
        };
    };
    voto: string;
};

export const columns: ColumnDef<Votos>[] = [
    {
        accessorKey: 'votaciones.sesiones.fecha',
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
        cell: ({ row }) => {
            // Format the date to DD/MM/YYYY
            const fecha = new Date(row.original.votaciones.sesiones.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
            return <span>{fecha}</span>;
        }
    },
    {
        accessorKey: 'votaciones.id_sesion',
        header: 'ID Sesión'
    },
    {
        accessorKey: 'votaciones.titulo',
        header: 'Titulo',
        size: 100,
        cell: ({ row }) => {
            const titulo = row.original.votaciones.titulo
            const id_votacion = row.original.votaciones.id_votacion
            return (
                <a href={`/votaciones/${id_votacion}`} className="text-blue-500 hover:underline">
                    {titulo}
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
