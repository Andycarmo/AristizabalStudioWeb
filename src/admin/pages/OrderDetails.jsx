import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import { supabase } from "../../config/supabase";
import { useNavigate } from "react-router-dom";


export default function OrderDetails() {

  const { orderId } = useParams();

  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState({});
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    getOrder();

  }, []);


 async function getOrder() {

  try {

    setLoading(true);

    // ORDER
    const {
      data: orderData,
      error: orderError
    } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError)
      throw orderError;

    setOrder(orderData);

    setStatus(orderData.status);


    // CUSTOMER
    const {
      data: customerData,
      error: customerError
    } = await supabase
      .from("customers")
      .select("*")
      .eq("id", orderData.customer_id)
      .single();

    if (customerError)
      throw customerError;

    setCustomer(customerData);


    // ORDER ITEMS
    const {
      data: itemsData,
      error: itemsError
    } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    if (itemsError)
      throw itemsError;

    setItems(itemsData);

// PRODUCTS
const productIds = itemsData.map(
  item => item.product_id
);

const {
  data: productsData,
  error: productsError
} = await supabase
  .from("products")
  .select(`
    id,
    images
  `)
  .in("id", productIds);

if (productsError)
  throw productsError;


// Convertir a objeto
const productsMap = {};

productsData.forEach(product => {

  productsMap[product.id] = product;

});

setProducts(productsMap);


  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

}

 async function updateStatus() {

  try {

    setSaving(true);

    const { error } = await supabase
      .from("orders")
      .update({
        status
      })
      .eq("id", orderId);

    if (error)
      throw error;

    setSuccess(true);

    setTimeout(() => {

      setSuccess(false);

    }, 3000);

  } catch (err) {

    console.error(err);

  } finally {

    setSaving(false);

  }

}

  if (loading) {

  return (

    <AdminLayout>

      <h1 className="text-3xl text-white">
        Loading...
      </h1>

    </AdminLayout>

  );

}return (

  <AdminLayout>

<div className="space-y-8">

  {/* HEADER */}
  <div className="flex items-center justify-between">

    <h1 className="text-3xl font-bold text-white">

      Pedido #

      {order.id.slice(0,8)}

    </h1>


    <button

      onClick={() => navigate("/studio-dashboard/orders")}


  className="
    px-5
    py-3

    rounded-xl

    bg-[#055651]
    hover:bg-[#0a6e68]

    text-white
    font-medium

    shadow-lg
    shadow-[#055651]/30

    transition-all
    duration-300
  "
>

      ← Volver a pedidos

    </button>

  </div>
      {/* CLIENTE */}
      <div
        className="
          bg-gray-800
          border
          border-gray-700
          rounded-2xl
          p-6
        "
      >

  <h2 className="text-lg font-semibold text-white mb-4">
    Cliente
  </h2>

  <div className="space-y-2 text-gray-300 text-sm">

    <p>
      👤 {customer?.name}
    </p>

    <p>
      📧 {customer?.email}
    </p>

    <p>
      📱 {order?.shipping_phone}
    </p>

    <p>
      📍 {order?.shipping_city}
    </p>

    <p>
      🏠 {order?.shipping_address}
    </p>

  </div>

  </div>


  {/* PRODUCTOS  - TEXT LEFT */}
  <div
    className="
      bg-gray-800
      border
      border-gray-700
      rounded-2xl
      p-6
    "
  >
  <h2 className="text-lg font-semibold text-white mb-4">
    Productos
  </h2>

  <div className="space-y-3">

    {items.map((item) => {

  const product = products[item.product_id];

  const imageUrl =
    product?.images?.find(
      img => img.role === "MAIN"
    )?.url
    ||
    product?.images?.[0]?.url;

  return (

    <div

      key={item.id}

      className="
        flex
        justify-between
        items-center

        border-b
        border-gray-700

        py-4
      "

    >

      {/* LEFT */}
      <div className="flex items-center gap-4">

        <img

          src={imageUrl}

          alt={item.product_name}

          className="
            w-20
            h-20

            rounded-xl

            object-cover

            border
            border-gray-700
          "

        />


        <div>

          <h3 className="text-white font-medium">

            {item.product_name}

          </h3>

          <p className="text-sm text-gray-400">

            Qty: {item.quantity}

          </p>

        </div>

      </div>


      {/* RIGHT */}
      <div className="text-right">

        <p className="text-white font-semibold">

          COP $

          {Number(item.subtotal)
            .toLocaleString("es-CO")}

        </p>

        <p className="text-xs text-gray-500">

          Unitario:

          COP $

          {Number(item.unit_price)
            .toLocaleString("es-CO")}

        </p>

      </div>

    </div>

  );

})}

  </div>

</div>
{/* RESUMEN */}
<div
  className="
    bg-gray-800
    border
    border-gray-700
    rounded-2xl
    p-6
  "
>

  <h2 className="text-lg font-semibold text-white mb-4">
    Resumen
  </h2>

  <div className="space-y-4">

    <div className="flex justify-between">

      <span className="text-gray-400">
        Subtotal
      </span>

      <span className="text-white">
        COP $
        {Number(order.subtotal)
          .toLocaleString("es-CO")}
      </span>

    </div>


    <div className="flex justify-between">

      <span className="text-gray-400">
        Envío
      </span>

      <span className="text-green-400">
        Gratis
      </span>

    </div>


    <div className="border-t border-gray-700 pt-4">

      <div className="flex justify-between">

        <span className="text-xl font-semibold text-white">
          Total
        </span>

        <span className="text-xl font-bold text-white">

          COP $

          {Number(order.total)
            .toLocaleString("es-CO")}

        </span>

      </div>

    </div>

  </div>

</div>
{/* PAGO */}
<div
  className="
    bg-gray-800
    border
    border-gray-700
    rounded-2xl
    p-6
  "
>

  <h2 className="text-lg font-semibold text-white mb-4">
    Método de pago
  </h2>

  <p className="text-gray-300">

    {order.payment_method}

  </p>

</div>
{/* ESTADO */}
<div
  className="
    bg-gray-800
    border
    border-gray-700
    rounded-2xl
    p-6
  "
>

  <h2 className="text-lg font-semibold text-white mb-4">
    Estado del pedido
  </h2>


  {/* BADGE */}
  <div className="mb-6">

    <span
      className={`
        px-4
        py-2
        rounded-full
        text-sm
        font-medium

        ${
          status === "paid"
            ? "bg-green-500/20 text-green-400"

          : status === "pending"
            ? "bg-yellow-500/20 text-yellow-400"

          : status === "shipped"
            ? "bg-blue-500/20 text-blue-400"

          : status === "delivered"
            ? "bg-gray-500/20 text-gray-300"

          : "bg-red-500/20 text-red-400"
        }
      `}
    >
      {status}
    </span>

  </div>


  {/* SELECT */}
  <select

    value={status}

    onChange={(e) =>
      setStatus(e.target.value)
    }

    className="
      w-full

      bg-gray-900
      border
      border-gray-700

      rounded-xl

      px-4
      py-3

      text-white
      outline-none
    "
  >

    <option value="pending">
      Pending
    </option>

    <option value="paid">
      Paid
    </option>

    <option value="shipped">
      Shipped
    </option>

    <option value="delivered">
      Delivered
    </option>

    <option value="cancelled">
      Cancelled
    </option>

  </select>


  {/* BOTON */}
  <button
    onClick={updateStatus}
    disabled={saving}
    className="
      mt-6
      w-full
      bg-green-500
      text-black
      font-semibold
      py-3
      rounded-xl
      hover:bg-green-400
      transition
      disabled:opacity-50
    "
  >
    {

      saving
        ? "Guardando..."
        : "Guardar cambios"
    }
  </button>

  {/* MENSAJE */}
  {

    success && (
      <p
        className="
          text-green-400
          mt-4
        "
      >
        Pedido actualizado correctamente.
      </p>
    )
  }
    </div>
</div>

  </AdminLayout>    
  
);
}