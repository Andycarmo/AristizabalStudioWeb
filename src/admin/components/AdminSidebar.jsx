import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  LayoutGrid,
  BarChart3,
  Settings,
  Images,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 p-5">
      <h1 className="text-xl font-bold mb-8">⚡ Aristizabal Admin</h1>

      <nav className="flex flex-col gap-3 text-gray-300">

        <NavLink 
        to="/studio-dashboard"
        end
       className={({ isActive }) =>
            `
              flex
              items-center
              gap-2

              px-3
              py-2
              rounded-xl

              transition-all
              duration-200

              ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }
            `
          }
        >

        <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/studio-dashboard/products"
          className={({ isActive }) =>
            `
              flex
              items-center
              gap-2

              px-3
              py-2
              rounded-xl

              transition-all
              duration-200

              ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }
            `
          }
        >

          <ShoppingBag size={18} />

          Productos

        </NavLink>

        <NavLink 
        to="/studio-dashboard/works"
        className={({ isActive }) =>
            `
              flex
              items-center
              gap-2

              px-3
              py-2
              rounded-xl

              transition-all
              duration-200

              ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }
            `
          }
        >

        <Images size={20} />

          Recent Works

        </NavLink>

        <NavLink 
        to="/studio-dashboard/orders"
        className={({ isActive }) =>
            `
              flex
              items-center
              gap-2

              px-3
              py-2
              rounded-xl

              transition-all
              duration-200

              ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }
            `
          }
        >

        <ClipboardList size={18} />
          Ordenes
        </NavLink>

        <NavLink 
        to="/studio-dashboard/customers"
       className={({ isActive }) =>
            `
              flex
              items-center
              gap-2

              px-3
              py-2
              rounded-xl

              transition-all
              duration-200

              ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }
            `
          }
        >

        <Users size={18} />
          Customers
        </NavLink>

        <NavLink 
        to="/studio-dashboard/categories"
        className={({ isActive }) =>
            `
              flex
              items-center
              gap-2

              px-3
              py-2
              rounded-xl

              transition-all
              duration-200

              ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }
            `
          }
        >

        <LayoutGrid size={18} />
          Categories
        </NavLink>

        <NavLink 
        to="/studio-dashboard/analytics"
        className={({ isActive }) =>
            `
              flex
              items-center
              gap-2

              px-3
              py-2
              rounded-xl

              transition-all
              duration-200

              ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }
            `
          }
        >

        <BarChart3 size={18} />
          Analytics
        </NavLink>

        <NavLink
          to="/studio-dashboard/settings"
         className={({ isActive }) =>
            `
              flex
              items-center
              gap-2

              px-3
              py-2
              rounded-xl

              transition-all
              duration-200

              ${
                isActive
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:text-white hover:bg-gray-800"
              }
            `
          }
        >

          <Settings size={18} />
          Configuración
        </NavLink>
      </nav>
    </aside>
  );
}