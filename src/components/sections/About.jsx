import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Button, { buttonColors } from "../../components/ui/Button.jsx";
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
        relative bg-studio-pink 
        -mt-16 md:-mt-20  
        py-16 px-4
        overflow-hidden
        opacity-0 translate-y-10
        transition-all duration-700 ease-out
      "
    >
      {/* CONTENEDOR */}
      <div 
      className="
        max-w-7xl mx-auto
        flex flex-col md:flex-row 
        gap-12">
        

          <Ave
            className="
            absolute pointer-events-none
            w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] h-auto
            right-[0%] sm:right-[-20%] md:right-[-25%] lg:right-0 translate-x-[25%]
            top-[65%] sm:top-[50%] md:top-[45%] lg:top-[10%]
            opacity-60"

            style={{
            color: '#ffa2b3',                  
                  }}
            preserveAspectRatio="xMidYMid meet"
          />

        {/* IMAGEN */}
        <div 
        className="
        w-full flex 
        justify-center
        transition-transform duration-500 ease-out
        hover:scale-105" >

        <div 
        className="
        w-full max-w-md aspect-[3/4] 
        rounded-2xl 
        overflow-hidden
        shadow-xl">
            
          {/* IMAGEN PRINCIPAL */}
          <Link to="/about">
          <img
              src="/gallery/artista/floor-01.webp"
              alt="Artista pintando exterior"
              loading="lazy"
              className="
              w-full h-full 
              object-cover"
          />
        </Link>
          </div>           
        </div>

        {/* SVG OVERLAY */}
      <Orquidea
        className="
        absolute pointer-events-none 
        w-[60%] sm:w-[60%] md:w-[50%] lg:w-[40%] h-auto
        -left-10 sm:-left-31.5 md:-left-75
        top-[40%] sm:top-[50%] md:top-[45%] lg:top-[50%]
        opacity-80 md:opacity-80"

            style={{
            color: '#f1748b',                  
                  }}
          preserveAspectRatio="xMidYMid meet"
          />

        {/* TEXTO */}
        <div className="
          w-full sm:w-[50%] md:w-[50%] lg:w-[110%]
          flex flex-col 
          justify-center
          z-10">
          
          <h2 
          className="
          font-cocomat font-bold
          text-studio-green 
          text-3xl md:text-5xl 
          mb-6">
            About Me
          </h2>

          <p 
          className="
          font-cocomat
          text-studio-green/80 
          text-sm sm:text-base md:text-lg 
          mb-8
          leading-relaxed">
            My art is born from emotion, the connection with spaces and the search
            to transmit unique sensations in each work.
            I work on customized pieces that transform environments.
          </p>

           {/* BOTÓN */}
            <Button to="/about" color={buttonColors.green}>
              View About Me
            </Button>

        </div>
      </div>
    </section>
  );
}