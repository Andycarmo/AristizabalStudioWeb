import {
  Package,
  ShoppingBag,
  CheckCircle,
  Briefcase,
  Coins,
} from "lucide-react";

export default function DashboardMetrics({
  products = [],
}) {

  // ================= KPIs =================

  // TOTAL PRODUCTS
  const totalProducts = products.filter(
  (p) => p.type === "product"
).length;

  // SOLD PRODUCTS
  const soldProducts = products.filter(
    (p) => p.sold
  ).length;

console.log(
  products.map((p) => ({
    id: p.id,
    type: p.type,
    typeJson: JSON.stringify(p.type),
  }))
);

  // RECENT WORKS
  const recentworks = products.filter(
    (p) => p.type === "recent_work"
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
    bg: "bg-gradient-to-br from-blue-500 to-blue-700",
    iconBg: "bg-blue-600/20",
    iconColor: "text-blue-200",
  },
  {
    title: "Sold",
    value: soldProducts,
    icon: ShoppingBag,
    bg: "bg-gradient-to-br from-emerald-500 to-green-600",
    iconBg: "bg-green-600/20",
    iconColor: "text-green-200",
  },
  {
    title: "Recent Works",
    value: recentworks,
    icon: Briefcase,
    bg: "bg-gradient-to-br from-purple-500 to-indigo-600",
    iconBg: "bg-purple-600/20",
    iconColor: "text-purple-200",
  },
  {
    title: "Revenue",
    value: `$${revenue}`,
    icon: Coins,
    bg: "bg-gradient-to-br from-orange-500 to-pink-600",
    iconBg: "bg-orange-600/20",
    iconColor: "text-orange-200",
  },
];

  return (

    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

      {metrics.map((metric) => {

        const Icon = metric.icon;

        return (

          <div
             key={metric.title}
              className={`
                ${metric.bg}
                rounded-2xl
                p-5
                text-white
                shadow-lg
                hover:scale-[1.02]
                transition
              `}
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm opacity-90">
                  {metric.title}
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {metric.value}
                </h2>

              </div>

              <div
                className={`
                  w-12 h-12 rounded-xl
                  flex items-center justify-center
                  ${metric.iconBg}
                `}
              >
                <Icon size={22} className={metric.iconColor} />
              </div>

            </div>

          </div>

        );
      })}

    </div>

  );
}