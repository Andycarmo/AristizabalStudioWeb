import { Route } from "react-router-dom";
import Home from "../pages/Home";
import RecentWorks from "../pages/RecentWorks";
import ShopPage from "../pages/ShopPage";
import AboutPage from "../pages/AboutPage";
import Contact from "../pages/Contact";

export default function PublicRoutes() {
  return (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/works" element={<RecentWorks />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<Contact />} />
    </>
  );
}

