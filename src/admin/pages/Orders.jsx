import AdminLayout from "../layouts/AdminLayout";

import {
  ShoppingCart,
  Clock3,
  CheckCircle2,
  Truck,
} from "lucide-react";

export default function OrdersDashboard() {

  // ================= MOCK ORDERS =================
  const orders = [
    {
      id: "#1024",
      customer: "Sophia Miller",
      product: "Golden Horizon",
      total: "$1,200",
      status: "Completed",
    },
    {
      id: "#1025",
      customer: "Daniel Smith",
      product: "Abstract Waves",
      total: "$850",
      status: "Pending",
    },
    {
      id: "#1026",
      customer: "Emma Johnson",
      product: "Studio Brush Set",
      total: "$120",
      status: "Shipped",
    },
  ];

  // ================= KPIs =================
  const metrics = [
    {
      title: "Total Orders",
      value: "128",
      icon: ShoppingCart,
    },
    {
      title: "Pending",
      value: "12",
      icon: Clock3,
    },
    {
      title: "Completed",
      value: "98",
      icon: CheckCircle2,
    },
    {
      title: "Shipped",
      value: "18",
      icon: Truck,
    },
  ];

  return (

    <AdminLayout>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Orders
        </h1>

        <p className="text-gray-400 mt-2">
          Manage and track customer orders.
        </p>

      </div>

      {/* METRICS */}
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
                  <Icon size={24} />
                </div>

              </div>

            </div>

          );
        })}

      </div>

      {/* ORDERS TABLE */}
      <div
        className="
          bg-gray-800
          border
          border-gray-700
          rounded-2xl
          overflow-hidden
        "
      >

        {/* TABLE HEADER */}
        <div
          className="
            grid
            grid-cols-5
            gap-4
            p-4
            border-b
            border-gray-700
            text-gray-400
            text-sm
            font-medium
          "
        >
          <p>Order ID</p>
          <p>Customer</p>
          <p>Product</p>
          <p>Total</p>
          <p>Status</p>
        </div>

        {/* TABLE BODY */}
        {orders.map((order) => (

          <div
            key={order.id}
            className="
              grid
              grid-cols-5
              gap-4
              p-4
              border-b
              border-gray-700
              items-center
              hover:bg-gray-700/30
              transition
            "
          >

            <p className="text-white font-medium">
              {order.id}
            </p>

            <p className="text-gray-300">
              {order.customer}
            </p>

            <p className="text-gray-300">
              {order.product}
            </p>

            <p className="text-white font-semibold">
              {order.total}
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
                    order.status === "Completed"
                      ? "bg-green-500/20 text-green-400"

                    : order.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"

                    : "bg-blue-500/20 text-blue-400"
                  }
                `}
              >
                {order.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>

  );
}