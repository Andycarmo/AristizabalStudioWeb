import {
  Package,
  ShoppingBag,
  CheckCircle,
  Coins,
} from "lucide-react";

export default function DashboardMetrics({
  products = [],
}) {

  // ================= KPIs =================

  // TOTAL PRODUCTS
  const totalProducts = products.length;

  // SOLD PRODUCTS
  const soldProducts = products.filter(
    (p) => p.sold
  ).length;

  // AVAILABLE PRODUCTS
  const availableProducts = products.filter(
    (p) => !p.sold
  ).length;

    // REVENUE
  const revenue = products
    .filter((p) => p.sold)
    .reduce(
      (acc, p) => acc + Number(p.price),
      0
    );

  // ================= METRICS ARRAY =================

  const metrics = [
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
    },
    {
      title: "Sold",
      value: soldProducts,
      icon: ShoppingBag,
    },
    {
      title: "Available",
      value: availableProducts,
      icon: CheckCircle,
    },

    {
      title: "Revenue",
      value: `$${revenue}`,
      icon: Coins,
    },
  ];

  return (

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
                <Icon
                    size={24}
                    className={
                      metric.title === "Revenue"
                       ? "text-yellow-400"
                        : "text-white"
                    }
                  />
              </div>

            </div>

          </div>

        );
      })}

    </div>

  );
}