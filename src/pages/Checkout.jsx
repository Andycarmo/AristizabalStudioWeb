import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { supabase } from "../config/supabase";
import { useCart } from "../context/CartContext";

import NequiLogo from "../assets/payments/nequi.png";
import DaviplataLogo from "../assets/payments/daviplata.png";

export default function Checkout() {

  const navigate = useNavigate();

  const {
    cart,
    total,
    clearCart
  } = useCart();

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("Nequi");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });


useEffect(() => {

  const savedCustomer =
    localStorage.getItem("customerInfo");

  if (!savedCustomer) return;

  try {

    setFormData(
      JSON.parse(savedCustomer)
    );

  } catch {

    localStorage.removeItem(
      "customerInfo"
    );

  }

}, []);


  // Shipping
  const shipping = 0;
  const finalTotal = total + shipping;

  // Handle change
function handleChange(e) {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

}

// handleCheckout
async function handleCheckout() {

  try {

    setLoading(true);
    setError("");

    const {
      name,
      email,
      phone,
      city,
      address
    } = formData;

    // VALIDACIONES
    if (
      !name ||
      !email ||
      !phone ||
      !city ||
      !address
    ) {
      throw new Error(
        "Completa todos los campos"
      );
    }

    if (cart.length === 0) {
      throw new Error(
        "El carrito está vacío"
      );
    }

    // ================= FIND CUSTOMER =================
    const { data: existingCustomer } =
      await supabase
        .from("customers")
        .select("*")
        .eq("email", email)
        .maybeSingle();

    let customerId;

    // ================= CREATE CUSTOMER =================
    if (!existingCustomer) {

      const {
        data: newCustomer,
        error: customerError
      } = await supabase
        .from("customers")
        .insert([
          {
            name,
            email,
            phone,
            customer_type: "customer",
            source: "Compra directa",
            total_purchases: 1,
            total_spent: finalTotal,
          },
        ])
        .select()
        .single();

      if (customerError)
        throw customerError;

      customerId = newCustomer.id;

    } else {

      customerId = existingCustomer.id;

    }





    


    //PRUEBA DE ERROR
console.log("CUSTOMER ID:", customerId);

console.log({
  customer_id: customerId,
  status: "pending",

  subtotal: total,
  shipping,

  total: finalTotal,

  shipping_city: city,
  shipping_address: address,
  shipping_phone: phone,

  payment_method: paymentMethod,
});









    // ================= CREATE ORDER =================
    const {
      data: order,
      error: orderError
    } = await supabase
      .from("orders")
      .insert([
        {
          customer_id: customerId,
          status: "pending",

          subtotal: total,
          shipping,

          total: finalTotal,

          shipping_city: city,
          shipping_address: address,
          shipping_phone: phone,

          payment_method: paymentMethod,
        },
      ])
      .select()
      .single();

    if (orderError) {
  console.log("ORDER ERROR", orderError);
  throw orderError;
}

    // ================= ORDER ITEMS =================
    const items = cart.map((item) => ({
      order_id: order.id,

      product_id: item.id,
      product_name: item.name,

      quantity: item.quantity,

      unit_price: item.price,

      subtotal:
        item.quantity * item.price,
    }));

    const {
      error: itemsError
    } = await supabase
      .from("order_items")
      .insert(items);

    if (itemsError)
      throw itemsError;

    // ================= UPDATE CUSTOMER =================
    if (existingCustomer) {

      await supabase
        .from("customers")
        .update({
          total_purchases:
            existingCustomer.total_purchases + 1,

          total_spent:
            Number(existingCustomer.total_spent) +
            Number(finalTotal),
        })
        .eq("id", customerId);

    }

// ================= SAVE CUSTOMER INFO =================
    localStorage.setItem(
      "customerInfo",
      JSON.stringify({
        name,
        email,
        phone,
        city,
        address
      })
    );

    // ================= CLEAR CART =================
    clearCart();

    // ================= REDIRECT =================
    navigate("/thank-you", {
      state: {
        orderId: order.id,
        total: finalTotal,
        paymentMethod,
      },
    });

  } catch (err) {

    console.error(err);

    setError(
      err.message ||
      "Error al crear el pedido"
    );

  } finally {

    setLoading(false);

  }
}

  return (
    <div className="min-h-screen bg-[#f5eee8]">

      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <main className="
        max-w-7xl
        mx-auto
        px-6
        pt-36
        pb-20
      ">

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-12">
          Checkout
        </h1>

        <div className="
          grid
          lg:grid-cols-[1fr_420px]
          gap-12
        ">

{/* LEFT - ORDER DETAILS */}
<div className="space-y-7">

  {/* TITULO */}
  <div>

    <h2 className="text-3xl font-semibold">
      Información de contacto
    </h2>

    <p className="text-gray-500 mt-2">
      Ingresa tus datos para finalizar tu compra.
    </p>

  </div>


  {/* NOMBRE */}
  <div className="space-y-2">

    <label className="font-medium text-sm">
      Nombre completo *
    </label>

    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="
        w-full
        bg-white
        border
        border-gray-300
        rounded-2xl
        px-5
        py-4
        outline-none
        transition
        focus:ring-2
        focus:ring-black
      "
    />

  </div>


  {/* EMAIL */}
  <div className="space-y-2">

    <label className="font-medium text-sm">
      Correo electrónico *
    </label>

    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="
        w-full
        bg-white
        border
        border-gray-300
        rounded-2xl
        px-5
        py-4
        outline-none
        transition
        focus:ring-2
        focus:ring-black
      "
    />

  </div>


  {/* WHATSAPP */}
  <div className="space-y-2">

    <label className="font-medium text-sm">
      WhatsApp *
    </label>

    <div className="flex gap-3">

      {/* INDICATIVO */}
      <div
        className="
          w-24
          bg-white
          border
          border-gray-300
          rounded-2xl
          py-4

          flex
          items-center
          justify-center

          font-medium
        "
      >
        +57
      </div>


      {/* TELEFONO */}
      <div
        className="
          flex-1

          bg-white
          border
          border-gray-300

          rounded-2xl

          px-5

          flex
          items-center
          gap-3
        "
      >

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="
            flex-1
            py-4
            outline-none
          "
        />

        <span className="text-xl">
          🇨🇴
        </span>

      </div>
      
    </div>

    <p className="text-xs text-gray-400">
      ⓘ Este número se usará para contactarte por WhatsApp y enviarte actualizaciones de tu pedido.
    </p>

  </div>


  {/* CIUDAD */}
  <div className="space-y-2">

    <label className="font-medium text-sm">
      Ciudad *
    </label>

    <input
      type="text"
      name="city"
      value={formData.city}
      onChange={handleChange}
      className="
        w-full
        bg-white
        border
        border-gray-300
        rounded-2xl
        px-5
        py-4
        outline-none
        transition
        focus:ring-2
        focus:ring-black
      "
    />

<p className="text-xs text-gray-400">
      ⓘ En este momento solo realizamos envíos a ciudades de Colombia.
    </p>
  </div>


  {/* DIRECCION */}
  <div className="space-y-2">

    <label className="font-medium text-sm">
      Dirección *
    </label>

    <input
      type="text"
      name="address"
      value={formData.address}
      onChange={handleChange}
      className="
        w-full
        bg-white
        border
        border-gray-300
        rounded-2xl
        px-5
        py-4
        outline-none
        transition
        focus:ring-2
        focus:ring-black
      "
    />

    <p className="text-xs text-gray-400">
      Incluye calle, número, apartamento, barrio, etc.
    </p>

  </div>

{/* MÉTODO DE PAGO */}
<div className="pt-4">

  <h2 className="text-3xl font-semibold mb-2">
    Método de pago
  </h2>

  <p className="text-gray-500 mb-8">
    Selecciona cómo deseas realizar tu pago.
  </p>


  <div className="flex gap-5">

    {/* NEQUI */}
    <label
      className={`
        flex
        items-center
        gap-4

        px-6
        py-5

        bg-white

        rounded-3xl

        border-2

        cursor-pointer

        transition-all
        duration-300

        hover:shadow-md

        ${
          paymentMethod === "Nequi"
            ? "border-black shadow-md"
            : "border-gray-200"
        }
      `}
    >

      <input
        type="radio"
        value="Nequi"
        checked={paymentMethod === "Nequi"}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
        }
      />

      <img
        src={NequiLogo}
        alt="Nequi"
        className="h-10 object-contain"
      />

    </label>



    {/* DAVIPLATA */}
    <label
      className={`
        flex
        items-center
        gap-4

        px-6
        py-5

        bg-white

        rounded-3xl

        border-2

        cursor-pointer

        transition-all
        duration-300

        hover:shadow-md

        ${
          paymentMethod === "Daviplata"
            ? "border-black shadow-md"
            : "border-gray-200"
        }
      `}
    >

      <input
        type="radio"
        value="Daviplata"
        checked={paymentMethod === "Daviplata"}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
        }
      />

      <img
        src={DaviplataLogo}
        alt="Daviplata"
        className="h-10 object-contain"
      />

    </label>

  </div>

</div>



{/* INSTRUCCIONES */}
<div
  className="
    bg-white
    rounded-3xl
    p-7
    border
    border-gray-200
    shadow-sm
  "
>

  <h3 className="text-xl font-semibold mb-6">
    Instrucciones de pago
  </h3>


  <div className="space-y-4">

    <div className="flex justify-between">

      <span className="text-gray-500">
        Método seleccionado
      </span>

      <span className="font-semibold">
        {paymentMethod}
      </span>

    </div>


    <div className="flex justify-between">

      <span className="text-gray-500">
        Número de transferencia
      </span>

      <span className="font-semibold">
        321 464 9248
      </span>

    </div>

  </div>


  <div
    className="
      mt-8

      p-5

      rounded-2xl

      bg-[#f8f8f8]
    "
  >

    <p className="text-sm text-gray-600 leading-7">

      Una vez realices la transferencia por

      <span className="font-semibold">
        {" "}
        {paymentMethod}
      </span>

      , verificaremos el pago y confirmaremos tu pedido.

    </p>

  </div>

</div>

            <button
  onClick={handleCheckout}
  disabled={loading}
  className="
    w-full

    bg-black
    hover:bg-neutral-800

    text-white
    font-semibold

    py-5

    rounded-full

    shadow-lg

    transition-all
    duration-300

    disabled:opacity-50
  "
>
  {
    loading
      ? "Procesando..."
      : "Confirmar pedido"
  }
</button>

          </div>

{/* RIGHT - SUMMARY */}
<div>

  <div
    className="
      bg-white
      rounded-3xl
      p-8
      shadow-sm
      sticky
      top-36
      border
      border-gray-200
    "
  >

    {/* TITULO */}
    <div className="mb-8">

      <h2 className="text-3xl font-semibold">
        Tu pedido
      </h2>

      <p className="text-gray-500 mt-2">
        Resumen de tu compra.
      </p>

    </div>


{/* PRODUCTOS */}
<div className="space-y-5 mb-8">

  {cart.map((item) => (

    <div
      key={item.id}
      className="
        flex
        gap-4
        items-center
      "
    >
      {/* IMAGEN */}
      <img
        src={item.image}
        alt={item.name}
        className="
          w-20
          h-20
          object-cover
          rounded-2xl
          border
        "
      />

      {/* INFO */}
      <div className="flex-1">

        <h4
          className="
            font-medium
            text-sm
          "
        >
          {item.name}
        </h4>

        <p
          className="
            text-sm
            text-gray-500
            mt-1
          "
        >
          {item.quantity} × COP $
          {item.price.toLocaleString("es-CO")}
        </p>

      </div>

    </div>

  ))}

</div>

    {/* SUBTOTAL */}
    <div className="space-y-5">

      <div className="flex justify-between">

        <span className="text-gray-500">
          Subtotal
        </span>

        <span className="font-medium">
          COP ${total.toLocaleString("es-CO")}
        </span>

      </div>


      {/* ENVÍO */}
      <div className="flex justify-between">

        <span className="text-gray-500">
          Envío
        </span>

        <span className="font-medium text-green-600">
          Gratis
        </span>

      </div>

    </div>


    {/* LINEA */}
    <div className="border-t my-8"></div>


    {/* TOTAL */}
    <div className="flex justify-between items-center">

      <span className="text-2xl font-semibold">
        Total
      </span>

      <span className="text-2xl font-bold">
        COP ${finalTotal.toLocaleString("es-CO")}
      </span>

    </div>


    {/* ERROR */}
    {error && (

      <div
        className="
          mt-8
          bg-red-50
          border
          border-red-200
          rounded-2xl
          p-4
        "
      >

        <p className="text-red-600">
          {error}
        </p>

      </div>

    )}


    {/* SEGURIDAD */}
    <div className="mt-10 space-y-6">

      <div className="flex gap-4">

        <div className="text-xl">
          🔒
        </div>

        <div>

          <h4 className="font-semibold">
            Pago 100% seguro
          </h4>

          <p className="text-sm text-gray-500">
            Tus datos están protegidos.
          </p>

        </div>

      </div>


      <div className="flex gap-4">

        <div className="text-xl">
          🛡️
        </div>

        <div>

          <h4 className="font-semibold">
            Compra protegida
          </h4>

          <p className="text-sm text-gray-500">
            Verificamos cada pedido manualmente.
          </p>

        </div>

      </div>


      <div className="flex gap-4">

        <div className="text-xl">
          🎨
        </div>

        <div>

          <h4 className="font-semibold">
            Procesado por Aristizabal Studio
          </h4>

          <p className="text-sm text-gray-500">
            Arte exclusivo y atención personalizada.
          </p>

        </div>

      </div>

    </div>


    {/* MENSAJE */}
    <div
      className="
        mt-10
        bg-[#f8f8f8]
        rounded-2xl
        p-5
      "
    >

      <p className="text-sm text-gray-600 leading-7">

        Una vez recibamos tu transferencia por

        <span className="font-semibold">
          {" "}
          {paymentMethod}
        </span>

        , te enviaremos la confirmación y comenzaremos el proceso de preparación y envío de tu pedido.

      </p>

    </div>

  </div>

</div>

        </div>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}