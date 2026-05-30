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
  const customers = [
    {
      id: 1,
      name: "Sophia Miller",
      email: "sophia@example.com",
      orders: 12,
      spent: "$2,450",
      status: "Active",
    },
    {
      id: 2,
      name: "Daniel Smith",
      email: "daniel@example.com",
      orders: 5,
      spent: "$840",
      status: "Active",
    },
    {
      id: 3,
      name: "Emma Johnson",
      email: "emma@example.com",
      orders: 1,
      spent: "$120",
      status: "New",
    },
  ];

  // ================= KPIs =================
  const metrics = [
    {
      title: "Total Customers",
      value: "842",
      icon: Users,
    },
    {
      title: "New Customers",
      value: "24",
      icon: UserPlus,
    },
    {
      title: "Orders",
      value: "356",
      icon: ShoppingCart,
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: DollarSign,
    },
  ];

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
            grid-cols-5
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
          <p>Orders</p>
          <p>Total Spent</p>
          <p>Status</p>

        </div>

        {/* TABLE BODY */}
        {customers.map((customer) => (

          <div
            key={customer.id}
            className="
              grid
              grid-cols-5
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
              {customer.orders}
            </p>

            <p className="text-white font-semibold">
              {customer.spent}
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
                    customer.status === "Active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-blue-500/20 text-blue-400"
                  }
                `}
              >
                {customer.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </AdminLayout>

  );
}