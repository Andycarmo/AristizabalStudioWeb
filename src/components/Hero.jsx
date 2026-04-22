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
      className="
        absolute inset-0 
        bg-no-repeat bg-fixed 
        bg-[length:260%] sm:bg-[length:220%] md:bg-[length:180%] lg:bg-[length:130%] xl:bg-[length:120%]
        bg-[center_20%] sm:bg-[center_25%] md:bg-[center_30%] lg:bg-center
      "
      style={{
        backgroundImage: "url('/Cuadro-Hero.webp')",
      }}
    >
      {/* 🔥 OVERLAY 
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />*/}
    </div>
      {/* 🔥 CONTENIDO */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-20">
        
        <div className="max-w-xl text-left">
          
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            Arte que inspira
          </h1>

          <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            Expresiones artísticas únicas que transforman espacios y emociones
          </p>

        </div>

      </div>

    </section>
  );
}