import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/products";
import AdminLayout from "../layouts/AdminLayout";
import DashboardMetrics from "../components/DashboardMetrics";

export default function Dashboard() {

  const [products, setProducts] = useState([]);
      useEffect(() => {
      loadProducts();
    }, []);

    async function loadProducts() {

      const { data, error } = await getAllProducts();

      if (data) {
        setProducts(data);
      }
    }

 return (

  <AdminLayout>

    {/* HEADER */}
    <div className="mb-8">

      <h1 className="text-3xl font-bold text-white">
        Welcome back Angelica 👋
      </h1>

      <p className="text-gray-400 mt-2">
        Here's what's happening with your store today.
      </p>

    </div>

    {/* METRICS */}
    <DashboardMetrics products={products} />

    {/* MAIN GRID 
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* LEFT SIDE 
      <div className="xl:col-span-2 space-y-6">

        {/* REVENUE CHART 
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h3 className="text-xl font-semibold text-white">
                Revenue Overview
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Current month vs previous month
              </p>
            </div>

            <Link
              to="/studio-dashboard/earnings"
              className="
                text-sm
                text-blue-400
                hover:text-blue-300
              "
            >
              View Details
            </Link>

          </div>

          <div className="h-72 flex items-center justify-center text-gray-500">
            Revenue Chart
          </div>

        </div>

        {/* TRAFFIC 
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h3 className="text-xl font-semibold text-white">
                Store Traffic
              </h3>

              <p className="text-sm text-gray-400 mt-1">
                Visitors and engagement
              </p>
            </div>

            <Link
              to="/studio-dashboard/earnings/traffic"
              className="
                text-sm
                text-blue-400
                hover:text-blue-300
              "
            >
              View Traffic
            </Link>

          </div>

          <div className="h-72 flex items-center justify-center text-gray-500">
            Traffic Chart
          </div>

        </div>

      </div>

      {/* RIGHT SIDE 
      <div className="space-y-6">

        {/* BREAKDOWN 
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">

          <h3 className="text-lg font-semibold text-white mb-5">
            Revenue Breakdown
          </h3>

          <div className="space-y-4">

            <MetricRow
              label="Store Products"
              value="$2,450"
            />

            <MetricRow
              label="Custom Paintings"
              value="$3,120"
            />

            <MetricRow
              label="Other Services"
              value="$1,800"
            />

          </div>

        </div>

        {/* QUICK LINKS 
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">

          <h3 className="text-lg font-semibold text-white mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-4">

            <Link
              to="/studio-dashboard/products"
              className="text-gray-300 hover:text-white"
            >
              Products
            </Link>

            <Link
              to="/studio-dashboard/orders"
              className="text-gray-300 hover:text-white"
            >
              Orders
            </Link>

            <Link
              to="/studio-dashboard/earnings"
              className="text-gray-300 hover:text-white"
            >
              Earnings
            </Link>

            <Link
              to="/studio-dashboard/settings"
              className="text-gray-300 hover:text-white"
            >
              Settings
            </Link>

          </div>

        </div>

        {/* ACTIVITY 
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">

          <h3 className="text-lg font-semibold text-white mb-5">
            Recent Activity
          </h3>

          <div className="space-y-4 text-sm text-gray-400">

            <p>New artwork uploaded</p>

            <p>Product updated</p>

            <p>New order received</p>

          </div>

        </div>

      </div>

    </div>
*/}
  </AdminLayout>

);

}
function MetricRow({ label, value }) {
  return (

    <div className="flex items-center justify-between">

      <span className="text-gray-400">
        {label}
      </span>

      <span className="text-white font-semibold">
        {value}
      </span>

    </div>

  );
}