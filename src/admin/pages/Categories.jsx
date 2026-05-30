import AdminLayout from "../layouts/AdminLayout";
import { LayoutGrid, Plus, Tag } from "lucide-react";

export default function Categories() {

  const categories = [
    { id: 1, name: "Art", products: 32 },
    { id: 2, name: "Prints", products: 18 },
    { id: 3, name: "Supplies", products: 54 },
    { id: 4, name: "Accessories", products: 12 },
  ];

  return (
    <AdminLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Categories</h1>
        <p className="text-gray-400 mt-2">
          Organize your products by categories.
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-gray-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Categories</p>
            <h2 className="text-2xl text-white font-bold">{categories.length}</h2>
          </div>
          <LayoutGrid />
        </div>

      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {categories.map(cat => (

          <div key={cat.id} className="bg-gray-800 p-5 rounded-2xl">

            <div className="flex items-center justify-between">

              <h3 className="text-white font-semibold flex items-center gap-2">
                <Tag size={18} />
                {cat.name}
              </h3>

              <span className="text-gray-400 text-sm">
                {cat.products} products
              </span>

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>
  );
}