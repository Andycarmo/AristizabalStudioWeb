export default function Gallery() {
  return (
    <section className="bg-white py-16 px-4">
      
      {/* CONTENEDOR */}
      <div className="max-w-7xl mx-auto">
        
        {/* TÍTULO */}
        <h2 className="font-cocomat text-studio-green text-3xl md:text-4xl font-bold text-center mb-12">
          Gallery
        </h2>

        {/* GRID DE IMÁGENES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* ITEM */}
          <div className="overflow-hidden rounded-xl">
            <img
              src="/Cuadro-Peces.jpg"
              alt="obra"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              src="/Cuadro-Peces.jpg"
              alt="obra"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              src="/Cuadro-Peces.jpg"
              alt="obra"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="overflow-hidden rounded-xl">
            <img
              src="/Cuadro-Peces.jpg"
              alt="obra"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>

        </div>

      </div>
    </section>
  );
}