import { Link } from "react-router-dom";

export default function Shop() {
  return (
    <section className="bg-[#DE5D83] -mt-16 md:-mt-20 py-16 px-4 ">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">

        {/* IMAGEN (invertida vs Works) */}
        <div className="flex-1 flex justify-center">
          <div className="inline-block rounded-2xl overflow-hidden shadow-xl">
            <img
              src="/gallery/obras/flores/flower-15.webp"
              alt="Shop preview"
              className="w-auto h-auto max-w-[360px] object-contain"
              loading="lazy"
            />
          </div>
        </div>

        {/* TEXTO */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          
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