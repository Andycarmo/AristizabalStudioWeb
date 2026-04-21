{/*export default function Hero() {
  return (
    //<section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
    //  {/* 🔥 Seccion con responsive
    // mobile: 70vh
    // tablet: 75-85vh
    // Desktop: Pantalla completa 
      <section className="relative h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-screen overflow-hidden">

       🔥 FONDO FIJO 
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Cuadro-Hero.webp')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* 🔥 OVERLAY OSCURO 
      <div className="absolute inset-0 bg-black/30" />

      {/* 🔥 CONTENIDO 
      <div className="relative z-10 flex items-center justify-center h-full">
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wide">
          Arte que inspira
        </h2>
      </div>

    </section>
  );
}

*/}
export default function Hero() {
  return (
    <section className="relative h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-screen overflow-hidden">

      {/* 🔥 FONDO */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat lg:bg-fixed"
        style={{
          backgroundImage: "url('/Cuadro-Hero.webp')",
        }}
      />

      {/* 🔥 OVERLAY OSCURO */}
      <div className="absolute inset-0 bg-black/40" />

      {/* 🔥 CONTENIDO */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-20">
        
        <div className="max-w-xl text-left">
          
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight">
            Arte que inspira
          </h1>

          <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg">
            Expresiones artísticas únicas que transforman espacios y emociones
          </p>

        </div>

      </div>

    </section>
  );
}