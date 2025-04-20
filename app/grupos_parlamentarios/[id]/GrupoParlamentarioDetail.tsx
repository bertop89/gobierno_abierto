"use client";

import Link from "next/link";

const GrupoParlamentarioDetail = ({ grupo_parlamentario }: { grupo_parlamentario: any }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">{grupo_parlamentario?.nombre}</h2>
      <h3 className="font-semibold mb-2">Diputados</h3>
      <ul className="list-disc pl-5">
        {grupo_parlamentario?.diputados?.map((diputado: any) => (
          <li key={diputado.id_diputado}>
            <Link href={`/diputados/${diputado.id_diputado}`} className="text-blue-500 hover:underline">
              {diputado.nombre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GrupoParlamentarioDetail;