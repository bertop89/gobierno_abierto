'use client';


import { DataTable } from "../../../components/data-table";
import VotosBarChart from "../../../components/VotosBarChart";
import CategoryBarChart from "../../../components/CategoryBarChart";
import { columns } from "./columns";
import Link from 'next/link';

// Add a condition to render the BarChart only if there is data in groupedData
const CategoriaDetail = ({ categoria, proponentes }: { categoria: any, proponentes: any }) => {
  // Group votos by grupo_parlamentario
  const groupedData = categoria.subcategorias.reduce((acc: any, subcategoria: any) => {
    subcategoria.votaciones_subcategorias.forEach((votacion: any) => {
      votacion.votaciones.votos.forEach((voto: any) => {
        const grupo = voto.diputados.grupos_parlamentarios.nombre;
        const order = voto.diputados.grupos_parlamentarios.order;
        if (!acc[grupo]) {
          acc[grupo] = { si: 0, no: 0, abstenciones: 0, order };
        }
        if (voto.voto === 'Sí') acc[grupo].si++;
        if (voto.voto === 'No') acc[grupo].no++;
        if (voto.voto === 'Abstención') acc[grupo].abstenciones++;
      });
    });
    return acc;
  }, {});

  // Convert groupedData to an array, sort by order, and then convert back to an object
  const sortedGroupedData = Object.entries(groupedData)
    .sort(([, a]: any, [, b]: any) => a.order - b.order)
    .reduce((acc: any, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  return (
    <div className="p-4">
      <Link href="/subcategorias" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Categorias</Link>
      <h1 className="text-2xl font-semibold mb-4">Categoría: {categoria.nombre_categoria}</h1>
      {Object.keys(sortedGroupedData).length > 0 && (
        <div className="mt-6">
          <VotosBarChart groupedData={sortedGroupedData} />
          <CategoryBarChart data={proponentes} />
        </div>
      )}
      <div className="overflow-x-auto mb-6">
        <DataTable columns={columns} data={categoria.subcategorias.flatMap((subcategoria: any) => subcategoria.votaciones_subcategorias)} />
      </div>
    </div>
  );
};

export default CategoriaDetail;