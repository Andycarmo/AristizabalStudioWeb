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
     <img
        src="/Cuadro-Hero.webp"
        alt="Hero"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          transform: `translateY(${offset * 0.3}px)`
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-20">
        <div className="fade-up-3 max-w-xl text-left">
          
          <h1 className="text-white -mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cocomat tracking-wide leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
            A <span className="block-orange">creative</span> space for storytelling through <span className="block-fucsia">vibrant</span> illustrations and thoughtful design.
          </h1>

         
        </div>
      </div>

    </section>
  );
}