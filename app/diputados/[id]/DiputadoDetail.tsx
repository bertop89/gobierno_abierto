'use client';

import Link from 'next/link';
import { DataTable } from "../../../components/data-table"
import { columns } from "./columns"

const DiputadoDetail = ({ diputado }: { diputado: any }) => {
  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left break-words">{diputado?.nombre}</h2>
      <p className="text-sm text-muted-foreground mb-4 text-center md:text-left break-words">
        Grupo Parlamentario:
        <Link
          href={`/grupos_parlamentarios/${diputado?.grupos_parlamentarios?.id_grupo}`}
          className="text-blue-500 hover:underline"
        >
          {diputado?.grupos_parlamentarios?.nombre}
        </Link>
      </p>
      <h3 className="font-semibold mb-2 text-center md:text-left">Votos</h3>
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={diputado.votos} />
      </div>

    </div>
  );
};

export default DiputadoDetail;
