import { Link } from "react-router-dom"; // si usas React Router
import Button, { buttonColors } from "../../components/ui/Button.jsx";
import Bouquet from '../../assets/bouquet.svg?react';

export default function Gallery() {
  return (
    <section className="
    relative bg-[#FFE091] 
    -mt-16 md:-mt-20 
    py-16 px-4 
    overflow-hidden
   ">
      
      {/* CONTENEDOR */}
      <div 
      className="
      max-w-7xl mx-auto 
      flex flex-col md:flex-row 
      gap-12">
      {/*<div className="max-w-7xl mx-auto px-6 sm:px-4 md:px-6 lg:px-8 bg-red-500">*/}
    

         {/* IMAGEN */}
        <div 
        className="
        flex-1 flex
        z-10 
        transition-transform duration-500 ease-out
        hover:scale-105">
          
          <div 
          className="
          rounded-2xl 
          overflow-hidden 
          shadow-xl">

    {/* IMAGEN PRINCIPAL */}
    <Link to="/works">
    <img
      src="/gallery/obras/miscelaneous/collage-01.webp"
      alt="Recent work preview"
      loading="lazy"
      className="
      w-full h-full 
      object-cover"
    />
    </Link>
  </div>
        </div>

            <Bouquet    
              className="
              absolute pointer-events-none
              w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] h-auto
              -right-20 sm:-right-36 md:-right-40 lg:-right-60
              top-[50%] sm:top-[50%] md:top-[45%] lg:top-[10%]
              opacity-60"

                style={{
                color: '#e9bf55',                  
                      }}
              preserveAspectRatio="xMidYMid meet"
            />

        {/* TEXTO */}
        <div className="
         w-full md:w-1/2 
         flex flex-col 
         justify-center
         z-10">
          
          <h2 
          className="
          font-cocomat font-bold
          text-studio-green
          text-3xl md:text-5xl 
          mb-6">
            Recent Works
          </h2>

          <p 
          className="
          font-cocomat
          text-studio-green/80 
          text-sm sm:text-base md:text-lg  
          mb-8
          leading-relaxed">
            Explore a curated selection of my latest illustrations and creative studies.
            Each piece reflects experimentation with texture, color and composition.
          </p>

          {/* BOTÓN */}
          <Button to="/works" color={buttonColors.green}>
            View Recent Works
          </Button>
          
        </div>
      </div>
    </section>
  );
}