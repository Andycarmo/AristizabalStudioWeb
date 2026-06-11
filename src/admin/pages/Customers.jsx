import { useState, useEffect } from "react";
import { getCustomers } from "../../services/customers";
import AdminLayout from "../layouts/AdminLayout";

import {
  Users,
  UserPlus,
  ShoppingCart,
  DollarSign,
  Search,
} from "lucide-react";

export default function Customers() {

  // ================= MOCK CUSTOMERS =================
const [customers, setCustomers] = useState([]);
const [loading, setLoading] = useState(true);
  // ================= KPIs =================
const totalCustomers = customers.length;

const totalLeads = customers.filter(
  (c) => c.customer_type === "lead"
).length;

const totalCustomersReal = customers.filter(
  (c) => c.customer_type === "customer"
).length;

const totalRevenue = customers.reduce(
  (sum, c) => sum + Number(c.total_spent || 0),
  0
);

const [error, setError] = useState("");

const metrics = [
  {
    title: "Total Contacts",
    value: totalCustomers,
    icon: Users,
  },
  {
    title: "Leads",
    value: totalLeads,
    icon: UserPlus,
  },
  {
    title: "Customers",
    value: totalCustomersReal,
    icon: ShoppingCart,
  },
  {
    title: "Revenue",
    value: `$${totalRevenue.toLocaleString()}`,
    icon: DollarSign,
  },
];

  useEffect(() => {
  loadCustomers();
}, []);

async function loadCustomers() {
  try {
    console.log("🚀 Starting Supabase request...");
    setLoading(true);

    const { data, error } = await getCustomers();

    console.log("📦 Supabase RAW response:");
    console.log("DATA:", data);
    console.log("ERROR:", error);
    console.log("COUNT:", data?.length);

    if (error) {
      console.error("❌ Supabase error:", error);
      setError(error.message);
      throw error;
    }
    setCustomers(data || []);

  } catch (error) {
    console.error("💥 Catch error:", error);
    setError(error.message);
  } finally {
    console.log("🏁 Finished loading");
    setLoading(false);
  }
}

// Debug info
if (error) {
  console.log("ERROR:", error);
}

if (loading) {
  return (

    <AdminLayout>
       <p className="text-white">
        Loading customers...
      </p>
          </AdminLayout>
  );
}
return (
  <AdminLayout>
      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Customers
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your customers and sales activity.
        </p>

      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        {metrics.map((metric) => {

          const Icon = metric.icon;

          return (

            <div
              key={metric.title}
              className="
                bg-gray-800
                border
                border-gray-700
                rounded-2xl
                p-5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-400">
                    {metric.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2 text-white">
                    {metric.value}
                  </h2>

                </div>

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-gray-700
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon size={22} />
                </div>

              </div>

            </div>

          );
        })}

      </div>

      {/* CUSTOMERS TABLE */}
      <div
        className="
          bg-gray-800
          border
          border-gray-700
          rounded-2xl
          overflow-hidden
        "
      >

        {/* TOP BAR */}
        <div
          className="
            flex
            items-center
            justify-between

            p-4
            border-b
            border-gray-700
          "
        >

          <h2 className="text-lg font-semibold text-white">
            Customer List
          </h2>

          {/* SEARCH */}
          <div className="relative">

            <Search
              size={16}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Search customer..."
              className="
                bg-gray-900
                border
                border-gray-700
                rounded-xl

                pl-10
                pr-4
                py-2

                text-sm
                outline-none

                focus:border-blue-500
              "
            />

          </div>

        </div>

        {/* TABLE HEADER */}
        <div
          className="
            grid
            grid-cols-6
            gap-4

            px-4
            py-3

            border-b
            border-gray-700

            text-sm
            text-gray-400
            font-medium
          "
        >

          <p>Name</p>
          <p>Email</p>
          <p>Source</p>
          <p>Interactions</p>
          <p>Purchases</p>
          <p>Type</p>

        </div>

        {/* TABLE BODY */}
        {Array.isArray(customers) &&
        customers.map((customer) => (

          <div
            key={customer.id}
            className="
              grid
              grid-cols-6
              gap-4

              px-4
              py-4

              border-b
              border-gray-700

              items-center
              hover:bg-gray-700/30
              transition
            "
          >

            <p className="text-white font-medium">
              {customer.name}
            </p>

            <p className="text-gray-300">
              {customer.email}
            </p>

            <p className="text-gray-300">
              {customer.source}
            </p>

            <p className="text-gray-300">
              {customer.interactions_count}
            </p>

            <p className="text-white font-semibold">
              {customer.total_purchases}
            </p>

            <div>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-medium

                  ${
                    customer.customer_type === "vip"
                    ? "bg-purple-500/20 text-purple-400"
                  : customer.customer_type === "customer"
                    ? "bg-green-500/20 text-green-400"
                  : customer.customer_type === "prospect"
                    ? "bg-blue-500/20 text-blue-400"
                  : "bg-orange-500/20 text-orange-400"
                  }
                `}
              >
                {customer.customer_type}
              </span>

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>

  );
}