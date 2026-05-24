import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CartItem from "../components/cart/CartItem";
import VisaLogo from "../assets/payments/visa.svg";
import MastercardLogo from "../assets/payments/mastercard.svg";
import PaypalLogo from "../assets/payments/paypal.svg";
import MercadoPagoLogo from "../assets/payments/mercadopago.svg";
import { useCart } from "../context/CartContext";

// ================= SHIPPING RATES =================
const shippingRates = {
  Colombia: 0,
  USA: 180000,
  Spain: 240000,
  Mexico: 120000,
  Canada: 200000
};

export default function CartPage() {

  const { cart, total } = useCart();

  // ================= SHIPPING =================
      const [country, setCountry] = useState("Colombia");

      const shipping =
        shippingRates[country] || 0;

      const finalTotal =
        total + shipping;


  // ================= WHATSAPP CHECKOUT =================
function handleWhatsAppCheckout() {

              const phoneNumber = "573214649248"; // Replace with your WhatsApp number

              const message = `
              🎨 *ARISTIZABAL STUDIO*
              Hola,
              Me gustaría consultar sobre las siguientes obras de arte:

              ━━━━━━━━━━━━━━━━━━

              ${cart
                .map(
                  (item) => `
              🖼 *${item.name}*

              • Cantidad: ${item.quantity}
              • Precio: ${currencyFormat(item.price)}

              `
                )
                .join("\n")}

              ━━━━━━━━━━━━━━━━━━

              💰 SHIPPING COUNTRY:
                  ${country}

                  SHIPPING:
                  ${shipping === 0 ? "FREE" : `$ ${shipping}`}

                  TOTAL:
                  ${currencyFormat(finalTotal)}

              ━━━━━━━━━━━━━━━━━━

              Por favor, hágame saber:
              • Disponibilidad
              • Opciones de envío
              • Proceso de pago

              Gracias.
              `;

              const encodedMessage =
                encodeURIComponent(message);

              const url =
                `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

              window.open(url, "_blank");
            }

            // ================= FORMAT PRICE =================
            function currencyFormat(value) {

              return `COP $ ${Number(value).toLocaleString("es-CO")}`;
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
        <h1 className="
          text-4xl
          font-bold
          mb-12
        ">
          Shopping Cart
        </h1>

        {/* GRID */}
        <div className="
          grid
          lg:grid-cols-[1fr_420px]
          gap-12
        ">

          {/* LEFT */}
          <div className="space-y-6">

            {cart.length === 0 && (

              <div className="
                bg-white
                rounded-3xl
                p-10
                text-center
              ">

                <p className="text-gray-500">
                  Your cart is empty
                </p>

              </div>
            )}

            {cart.map((item) => (

              <div
                key={item.id}
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                "
              >

                <CartItem item={item} />

              </div>

            ))}

          </div>

          {/* RIGHT */}
          <div>

            <div className="
              bg-white
              rounded-3xl
              p-8
              shadow-sm
              sticky
              top-36
            ">

              {/* TITLE */}
              <h2 className="
                text-2xl
                font-semibold
                mb-8
              ">
                Order Summary
              </h2>

              {/* SUBTOTAL */}
              <div className="
                flex
                justify-between
                mb-4
              ">

                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold">
                  COP ${total.toLocaleString("es-CO")}
                </span>

              </div>

              {/* SHIPPING */}
                <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">

                  <h2 className="text-xl font-semibold mb-4">
                    Shipping
                  </h2>

                  {/* COUNTRY */}
                  <select
                    value={country}
                    onChange={(e) =>
                      setCountry(e.target.value)
                    }
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-xl
                      p-3
                      outline-none
                    "
                  >
                    {Object.keys(shippingRates).map((item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    ))}
                  </select>

          {/* SHIPPING PRICE */}
          <div className="mt-6 space-y-2">

            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>
                COP $ {total.toLocaleString("es-CO")}
              </span>
            </div>

            <div className="flex justify-between">
              <span>
                Shipping ({country})
              </span>

              <span>
                {shipping === 0 ? (
                  <span
                    className="
                      inline-flex
                      items-center

                      px-3
                      py-1

                      rounded-full

                      bg-green-600
                      text-white

                      text-xs
                      font-semibold
                      tracking-wide

                      shadow-sm
                    "
                  >
                    FREE
                  </span>

                ) : (

                  <span className="font-medium">
                    $ {shipping}
                  </span>

                )}

              </span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold text-lg">

              <span>Total</span>

              <span>
                COP $ {finalTotal.toLocaleString("es-CO")}
              </span>

            </div>

          </div>

        </div>

             {/* BUTTONS */}
              <div className="flex flex-col gap-4 mt-8">

                {/* WHATSAPP CHECKOUT */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="
                    w-full

                    bg-green-600
                    hover:bg-green-700

                    text-white
                    font-semibold
                    tracking-wide

                    py-4

                    rounded-full

                    shadow-md
                    hover:shadow-lg

                    transition-all
                    duration-300
                  "
                >
                  Checkout via WhatsApp
                </button>

                {/* CHECKOUT */}
                <button
                  className="
                    w-full

                    bg-black
                    hover:bg-neutral-800

                    text-white
                    font-semibold
                    tracking-wide

                    py-4

                    rounded-full

                    shadow-md
                    hover:shadow-lg

                    transition-all
                    duration-300
                  "
                >
                  Proceed to Checkout
                </button>

              </div>

              {/* PAYMENT METHODS */}
              <div className="mt-10">

                <p className="text-sm text-gray-500 mb-4">
                  Payment Methods
                </p>

                <div className="flex flex-wrap items-center gap-4 opacity-80">

                  {/* VISA */}
                  <div className="h-10 w-16 flex items-center justify-center border rounded-lg bg-white">
                    <img
                      src={VisaLogo}
                      alt="Visa"
                      className="h-13 w-auto"
                    />
                  </div>

                  {/* MASTERCARD */}
                  <div className="h-10 w-16 flex items-center justify-center border rounded-lg bg-white">
                    <img
                      src={MastercardLogo}
                      alt="Mastercard"
                      className="h-10 w-auto"
                    />
                  </div>

                  {/* PAYPAL */}
                  <div className="h-10 w-16 flex items-center justify-center border rounded-lg bg-white">
                    <img
                      src={PaypalLogo}
                      alt="PayPal"
                      className="h-15 translate-y-[10px]"
                    />
                  </div>

                  {/* MERCADOPAGO */}
                  <div className="h-10 w-20 flex items-center justify-center border rounded-lg bg-white">
                    <img
                      src={MercadoPagoLogo}
                      alt="MercadoPago"
                      className="h-13 w-auto"
                    />
                  </div>

                </div>
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