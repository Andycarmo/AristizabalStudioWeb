import Hero from './components/Hero';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 md:pt-40">
        <Hero />
      </div>
      {/* BLOQUE EN BLANCO */}
      <div className="h-[60vh] bg-white"></div>
    </div>
    
  );
}

export default App