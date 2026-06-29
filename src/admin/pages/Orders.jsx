import { useState, useEffect } from "react";
import { supabase } from "../../config/supabase";
import AdminLayout from "../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import {
  ShoppingCart,
  Clock3,
  CheckCircle2,
  Truck,
  Trash2
} from "lucide-react";

export default function OrdersDashboard() {

  // ================= MOCK ORDERS =================
  
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

useEffect(() => {

  getOrders();

}, []);

// Función para obtener los pedidos junto con sus items
async function getOrders() {
  try {
    setLoading(true);
    // ===== ORDERS =====
    const { data: ordersData, error: ordersError } =
      await supabase
        .from("orders")
        .select(`
          *,
          customers (
            name
          )
        `)
        .order("created_at", {
          ascending: false
        });

    if (ordersError)
      throw ordersError;


    // ===== ORDER ITEMS =====
    const { data: itemsData, error: itemsError } =
      await supabase
        .from("order_items")
        .select("*");

    if (itemsError)
      throw itemsError;

console.log("itemsData: ", itemsData);
    // ===== COMBINAR =====
    const formattedOrders = ordersData.map(order => ({

      ...order,

      order_items:
        itemsData.filter(
          item => item.order_id === order.id
        )

    }));


    console.log(formattedOrders);

    setOrders(formattedOrders);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

}

// Función para eliminar un pedido
async function deleteOrder(orderId) {

  const result = await Swal.fire({
  title: "¿Eliminar pedido?",
  text: "Esta acción eliminará el pedido y sus productos asociados.",
  icon: "warning",
  showCancelButton: true,
  buttonsStyling: false,
  customClass: {
    popup: "rounded-3xl",
    confirmButton:
      "bg-red-600 hover:bg-red-500 text-white font-medium px-5 py-3 rounded-xl mx-2",

    cancelButton:
      "bg-gray-700 hover:bg-gray-600 text-white font-medium px-5 py-3 rounded-xl"
  },
  confirmButtonText: "Sí, eliminar",
  cancelButtonText: "Cancelar"
});

  if (!result.isConfirmed)
    return;
  try {
    // Eliminar items primero
    await supabase
      .from("order_items")
      .delete()
      .eq("order_id", orderId);

    // Eliminar pedido
    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", orderId);

    if (error)
      throw error;

    // Actualizar estado local
    setOrders(
      orders.filter(
        order => order.id !== orderId
      )
    );

    // Mensaje de éxito
    Swal.fire({
      title: "Pedido eliminado",
      text: "El pedido fue eliminado correctamente.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false
    });
  } catch (err) {
    console.error(err);
    Swal.fire({
      title: "Error",
      text: "No fue posible eliminar el pedido.",
      icon: "error"
    });
  }

}

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
            grid-cols-8
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
          <p>Payment</p>
          <p>Total</p>
          <p>Status</p>
          <p>Date</p>
          <p>Action</p>
        </div>

        {/* TABLE BODY */}
        {orders.map((order) => (

          <div
            key={order.id}
              onClick={() =>
              navigate(
                `/studio-dashboard/orders/${order.id}`
              )
            }
            className="
              grid
              grid-cols-8
              gap-4
              p-4
              border-b
              border-gray-700
              items-center
              cursor-pointer
              hover:bg-gray-700/30
              transition
            "
          >

            <p className="text-white font-medium">
              #{order.id.slice(0,8)}
            </p>

            <p className="text-gray-300">
              {order.customers?.name}
            </p>

            <p className="text-gray-300">
              {
            order.order_items.length > 1
              ? `${order.order_items[0].product_name} +${order.order_items.length - 1}`
              : order.order_items[0]?.product_name
          }
            </p>

            <p className="text-gray-300">
              {order.payment_method}
            </p>

            <p className="text-white font-semibold">
              COP $
              {Number(order.total).toLocaleString("es-CO")}
            </p>

              <p className="text-gray-400 text-sm">
                {
                  new Date(order.created_at)
                    .toLocaleDateString("es-CO")
                }
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
                  order.status === "paid"
                    ? "bg-green-500/20 text-green-400"

                  : order.status === "pending"
                    ? "bg-yellow-500/20 text-yellow-400"

                  : order.status === "shipped"
                    ? "bg-blue-500/20 text-blue-400"

                  : order.status === "delivered"
                    ? "bg-gray-500/20 text-gray-300"

                  : "bg-red-500/20 text-red-400"
                }
              `}
              >
                {order.status}

              </span>
            

            </div>
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOrder(order.id);
                  }}
                  className="
                    text-red-400
                    hover:text-red-300
                    transition
                    cursor-pointer
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
          </div>

        ))}

      </div>

    </AdminLayout>

  );
}