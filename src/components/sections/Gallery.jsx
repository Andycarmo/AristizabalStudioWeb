export default function Gallery() {
  return (
    <section className="bg-[#FFE091] -mt-16 md:-mt-20 py-16 px-4 ">
      
      {/* CONTENEDOR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-0">
      {/*<div className="max-w-7xl mx-auto px-6 sm:px-4 md:px-6 lg:px-8 bg-red-500">*/}
        
        {/* TÍTULO 
        <h2 className="font-cocomat text-studio-green text-3xl md:text-4xl font-bold text-center mb-12">
          Gallery
        </h2>*/}

        {/* GRID DE IMÁGENES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* ITEM */}
          <div className="
            rounded-xl
            overflow-hidden
            transform transition-all duration-500
            hover:scale-105 hover:shadow-xl
          ">
            <img
              src="/Cuadro-Peces.jpg"
              alt="obra"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="
            rounded-xl
            overflow-hidden
            transform transition-all duration-500
            hover:scale-105 hover:shadow-xl
          ">
            <img
              src="/Cuadro-Peces.jpg"
              alt="obra"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="
            rounded-xl
            overflow-hidden
            transform transition-all duration-500
            hover:scale-105 hover:shadow-xl
          ">
            <img
              src="/Cuadro-Peces.jpg"
              alt="obra"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="
            rounded-xl
            overflow-hidden
            transform transition-all duration-500
            hover:scale-105 hover:shadow-xl
          ">
            <img
              src="/Cuadro-Peces.jpg"
              alt="obra"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
}