import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

const Subcategorias = ({ subcategorias }: { subcategorias: any })=> {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Categorías de Votaciones</h1>
      <div className="overflow-x-auto">
        <DataTable columns={columns} data={subcategorias} />
      </div>
    </div>
  );
};

export default Subcategorias;