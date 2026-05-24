import ScrollToTop from "./components/ui/ScrollToTop";
import AppRouter from "./routes/AppRouter";
import CartSidebar from "./components/cart/CartSidebar";

function App() {

  return (
    <>
      <ScrollToTop />
      {/* GLOBAL CART */}
      <CartSidebar />
      <AppRouter />
    </>
  );
}

export default App;