import Hero from './components/sections/Hero';
import Navbar from './components/layout/Navbar';
import Gallery from "./components/sections/Gallery";
import About from './components/sections/About';
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/*<div className="pt-32 md:pt-40">*/}
        <Hero />
      {/*</div>
      {/* BLOQUE EN BLANCO 
      <div className="h-[10vh] bg-white"></div>*/}
      <Gallery />
      <About />
      <Footer />

    </div>
    
  );
}

export default App