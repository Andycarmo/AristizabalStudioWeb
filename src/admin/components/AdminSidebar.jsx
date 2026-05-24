import { Link } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 p-5">
      <h1 className="text-xl font-bold mb-8">⚡ Aristizabal Admin</h1>

      <nav className="flex flex-col gap-3 text-gray-300">

        <Link 
        to="/studio-dashboard"
        className="flex items-center gap-2 hover:text-white" >
        <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/studio-dashboard/products"
          className= "flex items-center gap-2 hover:text-white"
          >
        <ShoppingBag size={18} />
          Productos para venta
        </Link>

        <Link 
        to="/studio-dashboard/orders"
        className="flex items-center gap-2 hover:text-white"
        >
        <ClipboardList size={18} />
          Ordenes
        </Link>

        <Link
        to="/studio-dashboard/settings"
         className="flex items-center gap-2 hover:text-white"
          >
          <Settings size={18} />
          Configuración
        </Link>
      </nav>
    </aside>
  );
}