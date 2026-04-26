import { useEffect, useState } from "react";

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 2); // velocidad del parallax
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">

      {/* FONDO PARALLAX */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/Cuadro-Hero.webp')",
          transform: `translateY(${offset * 0.3}px)`
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENIDO */}
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