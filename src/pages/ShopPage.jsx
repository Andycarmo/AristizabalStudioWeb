import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const products = [
  {
    id: 1,
    title: "Pez Coy Dorado - 13x18 cm.",
    price: "160,00€",
    image: "/gallery/obras/peces/fish-01.webp",
    hoverImage: "/gallery/obras/peces/fish-01-detail.webp",
  },
  {
    id: 2,
    title: "Acuarela",
    price: "200,00€",
    image: "/gallery/obras/flores/bouquet-acuarela.webp",
  },
];

export default function Shop() {
  return (
    <div className="min-h-screen flex flex-col bg-[#e9dfd8] pt-24">

      <Header />

      <main className="flex-1 px-6 py-12 max-w-7xl mx-auto">

        <h1 className="font-cocomat text-4xl md:text-5xl mb-10 text-center">
          Shop
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          {products.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
>

              {/* CARD */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md">

                {/* IMAGEN */}
                <div className="relative w-full aspect-[3/4] bg-[#f5f2ee] p-4 flex items-center justify-center">

                  <img
                    src={item.image}
                    alt={item.title}
                      className="
                        absolute inset-0 w-full h-full 
                        object-cover object-center
                        transition-opacity duration-500
                        group-hover:opacity-0
                      "
                    />

                    {/* Imagen hover */}
                    <img
                      src={item.hoverImage}
                      alt={item.title}
                      className="
                        absolute inset-0 w-full h-full 
                        object-cover object-center
                        opacity-0
                        transition-opacity duration-500
                        group-hover:opacity-100
                      "
                    />
                </div>

                {/* INFO */}
                <div className="p-4">
                  <h2 className="text-sm md:text-base">
                    {item.title}
                  </h2>
                {/* FILA PRECIO + BOTÓN */}
                  <p className="mt-2 font-bold">
                    {item.price}
                  </p>

                    {/* BOTÓN SIEMPRE VISIBLE */}
                  <button className="mt-4 px-5 py-2 border border-studio-green rounded-full hover:bg-studio-green hover:text-white transition">
                    Buy
                  </button>
                </div>

                <div
                  className="
                    absolute inset-0 
                    flex items-end justify-end
                    p-4
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity duration-500
                  "
                >
                  <button
                    onClick={() => window.location.href = "/basket"}
                    className="
                      bg-white/90 backdrop-blur-md
                      text-studio-green
                      px-4 py-2 rounded-full
                      flex items-center gap-2
                      shadow-md
                      hover:bg-studio-green hover:text-white
                      transition
                    "
                  >
                    Add to Basket 🛒
                  </button>
                </div>

              </div>

            </div>
          ))}

        </div>

      </main>

      <Footer />

    </div>
  );
}