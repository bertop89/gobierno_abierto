"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';


interface Votacion {
    id_votacion: number;
    titulo: string;
    texto_expediente: string;
    numero_votacion: number;
    presentes: number;
    a_favor: number;
    en_contra: number;
    abstenciones: number;
    sesiones: Sesion;
}

interface Sesion {
    id_sesion: number;
    fecha: string;
}

const ListVotaciones = () => {
    const [votaciones, setVotaciones] = useState<Votacion[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchVotaciones = async () => {
            const supabase = await createClient();
            const { data, error } = await supabase
                .from('votaciones')
                .select('*, sesiones(fecha)');
            if (error) {
                console.error('Error fetching votaciones:', error);
            } else {
                const sortedData = (data || []).sort((a, b) => {
                    const dateA = new Date(a.sesiones.fecha);
                    const dateB = new Date(b.sesiones.fecha);
                    return dateB.getTime() - dateA.getTime();
                });
                setVotaciones(sortedData);
            }
            setLoading(false);
        };

        fetchVotaciones();
    }, []);

    if (loading) return <p>Cargando votaciones...</p>;

    return (
        <div>
            <ul>
                {votaciones.map((votacion, index) => {
                    const showDate =
                        index === 0 ||
                        new Date(votacion.sesiones.fecha).toLocaleDateString() !==
                            new Date(votaciones[index - 1].sesiones.fecha).toLocaleDateString();

                    return (
                        <div key={votacion.id_votacion}>
                            {showDate && (
                                <>
                                    <span className="text-sm text-muted-foreground mb-4 flex items-center">
                                        {new Date(votacion.sesiones.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                        <hr className="mx-2 flex-grow" />
                                    </span>
                                </>
                            )}
                            <div className="flex flex-col md:flex-row border rounded-xl mb-4 shadow-md h-full cursor-pointer" onClick={() => router.push(`/votaciones/${votacion.id_votacion}`)}>
                                <div className="flex flex-col gap-2 p-4 mb-4 w-full md:w-3/4">
                                    <span className="text-xl font-semibold">{votacion.titulo}</span>
                                    <p className="text-sm text-muted-foreground">
                                        {votacion.texto_expediente.length > 350
                                            ? `${votacion.texto_expediente.slice(0, 350)}...`
                                            : votacion.texto_expediente}
                                    </p>
                                </div>
                                <div className="flex flex-col text-sm border p-2 w-full md:w-1/4 bg-gray-100">
                                    <h3 className="font-semibold">Resultados de la votación</h3>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="h-3 w-3 rounded-full bg-green-500"></span>
                                            <p>Sí: {votacion.a_favor}</p>
                                        </div>
                                        <p className="text-right text-muted-foreground">({Math.round((votacion.a_favor / votacion.presentes) * 100)}%)</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="h-3 w-3 rounded-full bg-red-500"></span>
                                            <p>No: {votacion.en_contra}</p>
                                        </div>
                                        <p className="text-right text-muted-foreground">({Math.round((votacion.en_contra / votacion.presentes) * 100)}%)</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="h-3 w-3 rounded-full bg-gray-500"></span>
                                            <p>Abstenciones: {votacion.abstenciones}</p>
                                        </div>
                                        <p className="text-right text-muted-foreground">({Math.round((votacion.abstenciones / votacion.presentes) * 100)}%)</p>
                                    </div>
                                    <div className="mt-2 h-4 w-full bg-gray-200 rounded-full overflow-hidden relative">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-green-500"
                                            style={{ width: `${(votacion.a_favor / votacion.presentes) * 100}%` }}
                                        ></div>
                                        <div
                                            className="absolute top-0 left-0 h-full bg-red-500"
                                            style={{ width: `${(votacion.en_contra / votacion.presentes) * 100}%`, left: `${(votacion.a_favor / votacion.presentes) * 100}%` }}
                                        ></div>
                                        <div
                                            className="absolute top-0 left-0 h-full bg-gray-500"
                                            style={{ width: `${(votacion.abstenciones / votacion.presentes) * 100}%`, left: `${((votacion.a_favor + votacion.en_contra) / votacion.presentes) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
};

export default ListVotaciones;