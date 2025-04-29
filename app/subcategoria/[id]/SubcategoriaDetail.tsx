import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";

const SubcategoriaDetail = ({ subcategoria }: { subcategoria: any }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Subcategoría: {subcategoria.nombre_subcategoria}</h1>
      <p className="text-sm text-muted-foreground mb-4 text-center md:text-left break-words">
        Categoría: {subcategoria.categorias.nombre_categoria}
      </p>
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={subcategoria.votaciones_subcategorias} />
      </div>
    </div>
  );
};

export default SubcategoriaDetail;