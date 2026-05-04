import { Link } from "react-router-dom";
import Button, { buttonColors } from "../../components/ui/Button.jsx";
import AveMarcadores from '../../assets/ave-marcadores.svg?react';

export default function Shop() {
  return (
    <section 
    className="
    relative bg-[#DE5D83] 
    -mt-16 md:-mt-20 
    py-16 px-4
    overflow-hidden">

      {/* CONTENEDOR */}
      <div 
      className="
      max-w-7xl mx-auto 
      flex flex-col md:flex-row-reverse  
      gap-12
      ">

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
        <Link to="/shop">
        <img
          src="/gallery/obras/flores/flower-15.webp"
          alt="Shop preview"
          loading="lazy"
          className="
          w-full 
          h-full 
          object-cover"
        />
        </Link>
          </div>
        </div>

          <AveMarcadores
              className="
              absolute pointer-events-none
              w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] h-auto
              -left-20 sm:-left-36 md:-left-40 lg:-left-60
              top-[60%] sm:top-[50%] md:top-[45%] lg:top-[10%]
              opacity-60"

                style={{
                color: '#ffa2b3',                  
                      }}
              preserveAspectRatio="xMidYMid meet"
            />

        {/* TEXTO */}
        <div 
        className="
        w-full md:w-1/2 
        flex flex-col 
        justify-center
        z-10 ">
          
          <h2 
          className="
          font-cocomat font-bold 
          text-white 
          text-3xl md:text-5xl 
          mb-6">
            Shop
          </h2>

          <p 
          className="
          font-cocomat
          text-white/90 
          text-sm sm:text-base md:text-lg 
          mb-8 
          leading-relaxed">
            Discover prints, illustrations and creative pieces available for purchase.
            Bring art into your space with unique handmade designs.
          </p>

          {/* BOTÓN */}
          <Button to="/shop" color={buttonColors.invertedPink}>
            Visit Shop
          </Button>

        </div>
      </div>
    </section>
  );
}