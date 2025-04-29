import { DataTable } from "../../../components/data-table";
import { columns } from "./columns";

const SubcategoriaDetail = ({ subcategoria }: { subcategoria: {  nombre_subcategoria: string; votaciones: any[] } }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Subcategoría: {subcategoria.nombre_subcategoria}</h1>
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={subcategoria.votaciones} />
      </div>
    </div>
  );
};

export default SubcategoriaDetail;