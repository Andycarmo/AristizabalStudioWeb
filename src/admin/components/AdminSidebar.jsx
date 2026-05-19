import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 p-5">
      <h1 className="text-xl font-bold mb-8">⚡ Aristizabal Admin</h1>

      <nav className="flex flex-col gap-3 text-gray-300">
        <Link className="hover:text-white" to="/studio-dashboard">
          Dashboard
        </Link>

        <Link
          to="/studio-dashboard/products"
          className="text-gray-300 hover:text-white"
        >
          Productos para venta
        </Link>

        <Link className="hover:text-white" to="/studio-dashboard/orders">
          Ordenes
        </Link>

        <Link className="hover:text-white" to="/studio-dashboard/settings">
          Configuración
        </Link>
      </nav>
    </aside>
  );
}