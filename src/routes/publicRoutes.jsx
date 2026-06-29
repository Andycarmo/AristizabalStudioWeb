import { Route } from "react-router-dom";
import Home from "../pages/Home";
import RecentWorks from "../pages/RecentWorks";
import ShopPage from "../pages/ShopPage";
import ArtworkDetail from "../pages/ArtworkDetail";
import AboutPage from "../pages/AboutPage";
import Contact from "../pages/Contact";
import CartPage from "../pages/CartPage";
import Checkout from "../pages/Checkout";
import ThankYou from "../pages/Thankyou";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/works" element={<RecentWorks />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/obra/:slug" element={<ArtworkDetail />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<CartPage />}/>
      <Route path="/checkout" element={<Checkout />}/>
      <Route path="/thank-you" element={<ThankYou />}/>
    </>
  );
}

