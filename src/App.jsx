import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import Home from "./pages/Home";
import RecentWorks from "./pages/RecentWorks";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <ScrollToTop />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<RecentWorks />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<Contact />} />
    </Routes>
     </>
  );
}

export default App;