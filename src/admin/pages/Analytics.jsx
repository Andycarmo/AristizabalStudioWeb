import AdminLayout from "../layouts/AdminLayout";
import { BarChart3, TrendingUp, Eye, ShoppingBag } from "lucide-react";

export default function Analytics() {

  const stats = [
    { title: "Total Sales", value: "$12,450", icon: TrendingUp },
    { title: "Views", value: "24,300", icon: Eye },
    { title: "Orders", value: "356", icon: ShoppingBag },
    { title: "Conversion", value: "3.2%", icon: BarChart3 },
  ];

  return (
    <AdminLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <p className="text-gray-400 mt-2">
          Overview of your store performance.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">

        {stats.map((s, i) => {
          const Icon = s.icon;

          return (
            <div key={i} className="bg-gray-800 p-5 rounded-2xl">

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-sm">{s.title}</p>
                  <h2 className="text-2xl text-white font-bold">{s.value}</h2>
                </div>

                <Icon />
              </div>

            </div>
          );
        })}

      </div>

      {/* CHART PLACEHOLDER */}
      <div className="bg-gray-800 p-10 rounded-2xl text-center text-gray-400">
        Charts will go here (Recharts / Chart.js)
      </div>

    </AdminLayout>
  );
}