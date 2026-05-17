import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 p-5">
      <h1 className="text-xl font-bold mb-8">⚡ Aristizabal Admin</h1>

      <nav className="flex flex-col gap-3 text-gray-300">
        <Link className="hover:text-white" to="/studio-dashboard">
          Dashboard
        </Link>

        <Link className="hover:text-white" to="/studio-dashboard/products">
          Products
        </Link>

        <Link className="hover:text-white" to="/studio-dashboard/orders">
          Orders
        </Link>

        <Link className="hover:text-white" to="/studio-dashboard/settings">
          Settings
        </Link>
      </nav>
    </aside>
  );
}