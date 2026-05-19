import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">
        Hola de nuevo 👋
      </h1>

      <Outlet />

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Products" value="128" />
        <Card title="Orders" value="356" />
        <Card title="Revenue" value="$12,450" />
        <Card title="Customers" value="842" />
      </div>

      {/* DASHBOARD METRICS SECTION */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ================= LEFT: CHARTS ================= */}
        <div className="lg:col-span-2 space-y-4">

          {/* GANANCIAS TOTALES CHART */}
          <div className="bg-gray-800 p-4 rounded-xl h-64">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-semibold">
                Ganancias Totales (USD)
              </h3>
              <Link
                to="/studio-dashboard/earnings/daily"
                className="text-sm text-blue-400 hover:underline"
              >
                Ver detalle
              </Link>
            </div>

            {/* Recharts placeholder */}
            <div className="flex items-center justify-center h-full text-gray-400">
              Line Chart: Ingresos mes actual vs mes anterior
            </div>
          </div>

          {/* VISITAS CHART */}
          <div className="bg-gray-800 p-4 rounded-xl h-64">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-white font-semibold">Visitas</h3>
              <Link
                to="/studio-dashboard/earnings/traffic"
                className="text-sm text-blue-400 hover:underline"
              >
                Ver tráfico diario
              </Link>
            </div>

            <div className="flex items-center justify-center h-full text-gray-400">
              Line Chart: Visitas actuales vs mes anterior
            </div>
          </div>

        </div>

        {/* ================= RIGHT: BREAKDOWN + LINKS ================= */}
        <div className="space-y-4">

          {/* GANANCIAS BREAKDOWN */}
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-3">
              Ganancias (USD) - Mes actual
            </h3>

            <div className="space-y-2 text-sm text-gray-300">
              <MetricRow label="Artículos tienda" value="$2,450" />
              <MetricRow label="Pinturas personalizadas" value="$3,120" />
              <MetricRow label="Otros" value="$1,800" />
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>

            <div className="flex flex-col space-y-2 text-sm">
              <Link to="/studio-dashboard/earnings" className="text-blue-400 hover:underline">
                Mis ganancias
              </Link>
              <Link to="/studio-dashboard/earnings/daily" className="text-blue-400 hover:underline">
                Ventas diarias
              </Link>
              <Link to="/studio-dashboard/earnings/traffic" className="text-blue-400 hover:underline">
                Tráfico diario
              </Link>
              <Link to="/studio-dashboard/top-earners" className="text-blue-400 hover:underline">
                Top Earners
              </Link>
            </div>
          </div>

        </div>

        <div className="bg-gray-800 p-4 rounded-xl h-64">
          Activity / Orders
        </div>
      </div>
    </AdminLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-400">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}