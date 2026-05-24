import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
export default function CartSidebar() {

  const {
    cart,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <>

      {/* BACKDROP */}
      <div
        onClick={() => setIsCartOpen(false)}
        className={`
          fixed
          inset-0
          bg-black/40
          backdrop-blur-sm
          z-40
          transition-all
          duration-300

          ${isCartOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
          }
        `}
      />

      {/* SIDEBAR */}
      <aside
        className={`
          fixed
          right-0
          top-[88px]
          md:top-[120px]
          h-[calc(100vh-88px)]
          md:h-[calc(100vh-120px)]
          w-full
          sm:w-[420px]
          bg-[#f5eee8]
          z-50
          shadow-2xl
          transition-transform
          duration-300
          flex
          flex-col

          ${isCartOpen
            ? "translate-x-0"
            : "translate-x-full"
          }
        `}
      >

        {/* HEADER */}
        <div className="
          flex
          items-center
          justify-between
          p-6
          border-b
        ">

          <h2 className="text-2xl font-semibold">
            Shopping Cart
          </h2>

          <button
            onClick={() => setIsCartOpen(false)}
          >
            ✕
          </button>

        </div>

        {/* ITEMS */}
        <div className="
          flex-1
          overflow-y-auto
          p-6
          space-y-6
        ">

          {cart.length === 0 && (

            <div className="text-center mt-20">

              <p className="text-gray-500">
                Your cart is empty
              </p>

            </div>
          )}

          {cart.map((item) => (

            <CartItem
              key={item.id}
              item={item}
            />

          ))}

        </div>

        {/* FOOTER */}
        <div className="
          border-t
          p-6
          space-y-4
        ">

          {/* TOTAL */}
          <div className="
            flex
            justify-between
            text-lg
            font-semibold
          ">

            <span>Subtotal</span>

            <span>
              COP ${total.toLocaleString("es-CO")}
            </span>

          </div>

          {/* BUTTONS */}
          <div className="space-y-3">

            {/* VIEW CART */}
            <Link to="/cart">

              <button
                onClick={() => setIsCartOpen(false)}
                className="
                  w-full
                  border
                  border-black
                  py-4
                  rounded-xl
                  hover:bg-black
                  hover:text-white
                  transition
                "
              >
                View Cart
              </button>

            </Link>

            {/* CHECKOUT */}
            <button
              className="
                w-full
                bg-black
                text-white
                py-4
                rounded-xl
                hover:bg-gray-800
                transition
              "
            >
              Checkout
            </button>

            {/* CONTINUE SHOPPING */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="
                w-full
                border
                border-black
                py-4
                rounded-xl
                hover:bg-black
                hover:text-white
                transition
              "
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </aside>

    </>
  );
}