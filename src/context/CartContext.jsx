import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState(() => {

  const savedCart = localStorage.getItem("cart");

  return savedCart
    ? JSON.parse(savedCart)
    : [];
});

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}, [cart]);

  // ================= ADD TO CART =================
  function addToCart(product) {

    setCart((prev) => {

      const existing = prev.find(
        (item) => item.id === product.id
      );

      // IF EXISTS
      if (existing) {

        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // NEW PRODUCT
      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // OPEN SIDEBAR
    setIsCartOpen(true);
  }

  // ================= REMOVE =================
  function removeFromCart(id) {

    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  }

  // ================= INCREASE =================
  function increaseQuantity(id) {

    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  // ================= DECREASE =================
  function decreaseQuantity(id) {

    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // ================= TOTAL =================
  const total = cart.reduce(
    (acc, item) =>
      acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}