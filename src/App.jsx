import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Store />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default App;