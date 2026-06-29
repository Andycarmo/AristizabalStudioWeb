import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function ThankYou() {

  const navigate = useNavigate();
  const location = useLocation();

  const {
    orderId,
    total,
    paymentMethod
  } = location.state || {};

  return (

    <div className="min-h-screen bg-[#f5eee8]">

      {/* HEADER */}
      <Header />

      {/* CONTENT */}
      <main
        className="
          max-w-4xl
          mx-auto
          px-6
          pt-40
          pb-20
        "
      >

        <div
          className="
            bg-white
            rounded-3xl
            p-10
            shadow-sm
            text-center
          "
        >

          {/* ICON */}
          <div
            className="
              w-24
              h-24
              mx-auto
              rounded-full
              bg-green-100
              flex
              items-center
              justify-center
              text-5xl
              mb-8
            "
          >
            ✓
          </div>

          {/* TITLE */}
          <h1
            className="
              text-4xl
              font-bold
              mb-4
            "
          >
            Thank You!
          </h1>

          <p
            className="
              text-gray-500
              mb-10
            "
          >
            Your order has been created successfully.
          </p>

          {/* ORDER INFO */}
          <div
            className="
              bg-[#f5eee8]
              rounded-2xl
              p-8
              text-left
              space-y-4
            "
          >

            <div className="flex justify-between">
              <span>Order ID</span>

              <strong>
                {orderId}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Total</span>

              <strong>
                COP ${Number(total).toLocaleString("es-CO")}
              </strong>
            </div>

            <div className="flex justify-between">
              <span>Payment Method</span>

              <strong>
                {paymentMethod}
              </strong>
            </div>

          </div>

          {/* PAYMENT INSTRUCTIONS */}
          <div
            className="
              mt-10
              bg-gray-50
              rounded-2xl
              p-8
            "
          >

            <h2
              className="
                text-2xl
                font-semibold
                mb-6
              "
            >
              Payment Instructions
            </h2>

            <p className="mb-3">
              Transfer to:
            </p>

            <div
              className="
                text-2xl
                font-bold
                mb-6
              "
            >
              321 464 9248
            </div>

            <p
              className="
                text-gray-500
              "
            >
              Once the payment has been made, send us the receipt and we will confirm your order.
            </p>

          </div>

          {/* BUTTONS */}
          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-4
              mt-12
            "
          >

            {/* SHOP */}
            <button
              onClick={() => navigate("/shop")}
              className="
                flex-1
                bg-black
                text-white
                py-4
                rounded-full
                font-semibold
                hover:bg-neutral-800
                transition-all
              "
            >
              Continue Shopping
            </button>

            {/* WHATSAPP */}
            <button
              onClick={() =>
                window.open(
                  "https://wa.me/573214649248",
                  "_blank"
                )
              }
              className="
                flex-1
                bg-green-600
                text-white
                py-4
                rounded-full
                font-semibold
                hover:bg-green-700
                transition-all
              "
            >
              Send Receipt
            </button>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>

  );

}