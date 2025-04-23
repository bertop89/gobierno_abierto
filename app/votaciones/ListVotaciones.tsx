"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ListVotaciones = ({ votaciones }: { votaciones: any }) => {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 25;
    const router = useRouter();

    const paginatedVotaciones = votaciones.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div>
            <ul>
                {paginatedVotaciones.map((votacion: any, index: number) => {
                    const showDate =
                        index === 0 ||
                        new Date(votacion.sesiones.fecha).toLocaleDateString() !==
                            new Date(paginatedVotaciones[index - 1]?.sesiones.fecha).toLocaleDateString();

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
                            <div className="flex flex-col md:flex-row border rounded-xl mb-4 shadow-md h-full cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700" onClick={() => router.push(`/votaciones/${votacion.id_votacion}`)}>
                                <div className="flex flex-col gap-2 p-4 mb-4 w-full md:w-3/4">
                                    <span className="text-xl font-semibold">{votacion.titulo}</span>
                                    <p className="text-sm text-muted-foreground">
                                        {votacion.texto_expediente.length > 350
                                            ? `${votacion.texto_expediente.slice(0, 350)}...`
                                            : votacion.texto_expediente}
                                    </p>
                                </div>
                                <div className="flex flex-col text-sm border p-2 w-full md:w-1/4 bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                                    <h3 className="font-semibold dark:text-white">Resultados de la votación</h3>
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
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700"
                >
                    Anterior
                </button>
                <span>Página {currentPage}</span>
                <button
                    onClick={() => setCurrentPage((prev) => (prev * rowsPerPage < votaciones.length ? prev + 1 : prev))}
                    disabled={currentPage * rowsPerPage >= votaciones.length}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-800 dark:border-gray-700"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default ListVotaciones;