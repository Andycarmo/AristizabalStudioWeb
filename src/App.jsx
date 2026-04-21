import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Gallery from "./components/Gallery";
import About from './components/About';
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 md:pt-40">
        <Hero />
      </div>
      {/* BLOQUE EN BLANCO */}
      <div className="h-[10vh] bg-white"></div>
      <About />
      <Gallery />
      <Footer />

    </div>
    
  );
}

export default App