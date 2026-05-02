import { Link } from "react-router-dom";
import AveMarcadores from '../../assets/ave-marcadores.svg?react';

export default function Shop() {
  return (
    <section 
    className="
    relative bg-[#DE5D83] 
    -mt-16 md:-mt-20 
    py-16 px-4 ">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">

                  

        {/* IMAGEN (invertida vs Works) */}
        <div className="z-10 flex-1 flex justify-center">
          <div className="inline-block rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/gallery/obras/flores/flower-15.webp"
              alt="Shop preview"
              className="w-auto h-auto max-w-[360px] object-contain"
              loading="lazy"
            />
          </div>
        </div>

                <AveMarcadores
                    className="absolute pointer-events-none
                     w-[80%] sm:w-[50%] md:w-[50%] lg:w-[50%] h-auto
                      -left-20 sm:-left-36 md:-left-40 lg:-left-60
                      top-52 sm:top-32 md:top-6 lg:top-0
                      opacity-50 md:opacity-60"

                      style={{
                      color: '#ffa2b3',                  
                           }}
                    preserveAspectRatio="xMidYMid meet"
                  />

        {/* TEXTO */}
        <div className="z-20 w-full md:w-1/2 flex flex-col justify-center">
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Shop
          </h2>

          <p className="text-white/90 text-lg mb-8 leading-relaxed">
            Discover prints, illustrations and creative pieces available for purchase.
            Bring art into your space with unique handmade designs.
          </p>

          {/* BOTÓN */}
          <Link to="/shop">
            <button className="px-6 py-3 bg-white text-pink-600 font-semibold rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
              Visit Shop
            </button>
          </Link>

        </div>

      </div>
    </section>
  );
}