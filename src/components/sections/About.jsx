import { useEffect, useRef } from "react";

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        bg-studio-pink text-studio-green
        -mt-16 md:-mt-20   {/* 👈 CLAVE */}
        py-16 px-4
        opacity-0 translate-y-10
        transition-all duration-700 ease-out
      "
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        
        {/* IMAGEN */}
        <div className="w-full flex justify-center items-center py-10">
            <div className="relative w-[70%] sm:w-[60%] md:w-[60%] lg:w-[60%] aspect-[1/1.5] overflow-hidden rounded-2xl shadow-lg">
            
            <img
              src="/Artista.jpg"
              alt="Artista"
              className="w-full h-full object-cover"
            />

          </div>
        </div>

        {/* TEXTO */}
        <div className="text-center md:text-left">
          
          <h2 className="font-cocomat text-3xl md:text-4xl font-bold mb-6">
            About Me
          </h2>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed">
            My art is born from emotion, the connection with spaces and the search
            to transmit unique sensations in each work.
          </p>

          <p className="mt-4 text-sm sm:text-base md:text-lg leading-relaxed">
            I work on customized pieces that transform environments.
          </p>

        </div>

      </div>
    </section>
  );
}