import { Link } from "react-router-dom"; // si usas React Router
import Bouquet from '../../assets/bouquet.svg?react';

export default function Gallery() {
  return (
    <section className="
    relative bg-[#FFE091] 
    -mt-16 md:-mt-20 
    py-16 px-4 ">
      
      {/* CONTENEDOR */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
      {/*<div className="max-w-7xl mx-auto px-6 sm:px-4 md:px-6 lg:px-8 bg-red-500">*/}
        
        {/* TÍTULO 
        <h2 className="font-cocomat text-studio-green text-3xl md:text-4xl font-bold text-center mb-12">
          Gallery
        </h2>*/}

         {/* IMAGEN */}
        <div className="z-10 w-full md:w-1/2">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/gallery/obras/miscelaneous/collage-01.webp"
              alt="Recent work preview"
              className="w-full h-[320px] md:h-[420px] object-cover transform hover:scale-105 transition duration-500"
              loading="lazy"
            />
          </div>
        </div>

                  <Bouquet    
                    className="absolute pointer-events-none
                     w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] h-auto
                      -right-20 sm:-right-36 md:-right-40 lg:-right-60
                      top-52 sm:top-32 md:top-6 lg:top-0
                      opacity-50 md:opacity-60"

                      style={{
                      color: '#e9bf55',                  
                           }}
                    preserveAspectRatio="xMidYMid meet"
                  />

        {/* TEXTO */}
        <div className="z-20 w-full md:w-1/2 flex flex-col justify-center">
          
          <h2 className="text-3xl md:text-5xl font-bold text-studio-green mb-6">
            Recent Works
          </h2>

          <p className="text-studio-green/80 text-lg mb-8 leading-relaxed">
            Explore a curated selection of my latest illustrations and creative studies.
            Each piece reflects experimentation with texture, color and composition.
          </p>

          {/* BOTÓN */}
          <Link to="/works">
            <button className="px-6 py-3 bg-studio-green text-white rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
              View Recent Works
            </button>
          </Link>

        </div>


      </div>
    </section>
  );
}