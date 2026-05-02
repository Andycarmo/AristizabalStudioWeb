import { useEffect, useRef } from "react";
import Orquidea from '../../assets/logos/Orquidea.svg?react';
import Ave from '../../assets/ave.svg?react';

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
        relative bg-studio-pink text-studio-green
        -mt-16 md:-mt-20   {/* 👈 CLAVE */}
        py-16 px-4
        opacity-0 translate-y-10
        transition-all duration-700 ease-out
      "
    >
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        

                  <Ave
                    className="absolute pointer-events-none
                     w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] h-auto
                      -right-20 sm:-right-36 md:-right-40 lg:-right-60
                      top-52 sm:top-32 md:top-6 lg:top-0
                      opacity-50 md:opacity-60"

                      style={{
                      color: '#ffa2b3',                  
                           }}
                    preserveAspectRatio="xMidYMid meet"
                  />

        {/* IMAGEN */}
        <div className="w-full flex justify-center items-center py-10">
            <div className="relative w-[70%] sm:w-[60%] md:w-[60%] lg:w-[60%] aspect-[1/1.5] rounded-2xl shadow-lg">
            
            {/* IMAGEN PRINCIPAL */}
            <img
                src="/gallery/artista/exterior-01.webp"
                alt="Artista pintando exterior"
                loading="lazy"
                className="w-full h-full object-cover
                rounded-2xl
                shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                transition-transform duration-500 ease-out
                hover:scale-105"
            />
                       {/* SVG OVERLAY */}
                <Orquidea
                  className="absolute pointer-events-none 
                      w-[80%] sm:w-[80%] md:w-[70%] lg:w-[70%] h-auto
                      -left-20 sm:-left-31.5 md:left-75
                      top-[70%] md:top-[70%]
                      opacity-80 md:opacity-80"

                      style={{
                      color: '#f1748b',                  
                           }}
                    preserveAspectRatio="xMidYMid meet"
                    />



          </div>

        </div>

        {/* TEXTO */}
        <div className="text-center md:text-left z-10">
          
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