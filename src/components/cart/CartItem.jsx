import { useCart } from "../../context/CartContext";

export default function CartItem({ item }) {

  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  return (

    <div className="flex gap-4 border-b pb-4">

      {/* IMAGE */}
      <img
        src={item.image_url}
        alt={item.name}
        className="
          w-24
          h-24
          object-cover
          rounded-xl
        "
      />

      {/* INFO */}
      <div className="flex-1">

        <h3 className="font-semibold">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {item.technique}
        </p>

        <p className="mt-2 font-bold">
          COP ${Number(item.price).toLocaleString("es-CO")}
        </p>

        {/* QUANTITY */}
        <div className="flex items-center gap-3 mt-3">

          <button
            onClick={() => decreaseQuantity(item.id)}
            className="
              w-8
              h-8
              rounded-full
              border
              flex
              items-center
              justify-center
            "
          >
            -
          </button>

          <span>
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className="
              w-8
              h-8
              rounded-full
              border
              flex
              items-center
              justify-center
            "
          >
            +
          </button>

        </div>

      </div>

      {/* REMOVE */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="
          text-red-500
          hover:text-red-700
          self-start
        "
      >
        ✕
      </button>

    </div>
  );
}