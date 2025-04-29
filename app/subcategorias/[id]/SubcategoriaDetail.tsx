'use client';


import { DataTable } from "../../../components/data-table";
import BarChart from "../../../components/BarChart";
import { columns } from "./columns";
import Link from 'next/link';

// Add a condition to render the BarChart only if there is data in groupedData
const SubcategoriaDetail = ({ subcategoria }: { subcategoria: any }) => {

  // Group votos by grupo_parlamentario
  const groupedData = subcategoria.votaciones_subcategorias.reduce((acc: any, votacion: any) => {
    votacion.votaciones.votos.forEach((voto: any) => {
      const grupo = voto.diputados.grupos_parlamentarios.nombre;
      if (!acc[grupo]) {
        acc[grupo] = { si: 0, no: 0, abstenciones: 0 };
      }
      if (voto.voto === 'Sí') acc[grupo].si++;
      if (voto.voto === 'No') acc[grupo].no++;
      if (voto.voto === 'Abstención') acc[grupo].abstenciones++;
    });
    return acc;
  }, {});

  return (
    <div className="p-4">
      <Link href="/subcategorias" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Categorias</Link>
      <h1 className="text-2xl font-semibold mb-4">Subcategoría: {subcategoria.nombre_subcategoria}</h1>
      <p className="text-sm text-muted-foreground mb-4 text-center md:text-left break-words">
        Categoría: {subcategoria.categorias.nombre_categoria}
      </p>
      {Object.keys(groupedData).length > 0 && (
        <div className="mt-6">
          <BarChart groupedData={groupedData} />
        </div>
      )}
      <div className="overflow-x-auto mb-6">
        <DataTable columns={columns} data={subcategoria.votaciones_subcategorias} />
      </div>
    </div>
  );
};

export default SubcategoriaDetail;