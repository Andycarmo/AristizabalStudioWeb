import Navbar from './Navbar';
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Contenido principal */}
      <main className="flex flex-col items-center justify-center mt-20">
        <h2 className="text-gray-400 text-xl uppercase tracking-widest">
          Próximamente
        </h2>
      </main>
    </div>
  );
}

export default App;