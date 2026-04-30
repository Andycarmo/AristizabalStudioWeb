import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const artworks = [
  { id: 1, title: "Peces Azules", category: "peces", price: 350, image: "/gallery/obras/peces/fish-01.webp",},
  { id: 2, title: "Flores Rosadas", category: "flores", price: 280, image: "/gallery/obras/flores/bouquet-gouache.webp",},
  { id: 3, title: "Ave Tropical", category: "aves", price: 420, image: "/gallery/obras/aves/tucan-sketch.webp",},
  { id: 4, title: "Abstracto Dorado", category: "miscelaneos", price: 500, image: "/gallery/obras/miscelaneous/collage-01.webp",},
  { id: 5, title: "Peces Azules", category: "peces", price: 350, image: "/gallery/obras/peces/fish-02.webp",},
  { id: 6, title: "Flores Rosadas", category: "flores", price: 280, image: "/gallery/obras/flores/bouquet acuarela.webp",},
  { id: 7, title: "Ave Tropical", category: "aves", price: 420, image: "/gallery/obras/aves/aves-marcadores.webp",},
  { id: 8, title: "Abstracto Dorado", category: "miscelaneos", price: 500, image: "/gallery/obras/miscelaneous/collage-02.webp",},
  { id: 9, title: "Peces Azules", category: "peces", price: 350, image: "/gallery/obras/peces/fish-03.webp",},
  { id: 10, title: "Flores Rosadas", category: "flores", price: 280, image: "/gallery/obras/flores/dahlia-sketch.webp",},
  { id: 11, title: "Ave Tropical", category: "aves", price: 420, image: "/gallery/obras/aves/ave y tulipanes marcador sketch.webp",},
  { id: 12, title: "Abstracto Dorado", category: "miscelaneos", price: 500, image: "/gallery/obras/miscelaneous/Granada sketch.webp",},
];

export default function Store() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? artworks
      : artworks.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-[#e9dfd8] text-studio-green pt-24">

      <Header />

      <main className="flex-1 px-6 py-12 max-w-7xl mx-auto">

        {/* TÍTULO */}
        <h1 className="font-cocomat text-4xl md:text-5xl mb-8 text-center">
          Colección
        </h1>

        {/* FILTROS */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {["all", "peces", "flores", "aves", "miscelaneos"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full border transition ${
                filter === cat
                  ? "bg-studio-green text-white"
                  : "border-studio-green hover:bg-studio-green hover:text-white"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* MASONRY */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">

          {filtered.map((art) => (
            <div key={art.id} className="break-inside-avoid mb-6">
              <img
                src={art.image}
                alt="obra"
                loading="lazy"
                className="w-full h-auto object-cover rounded-xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl"
              />
            </div>
          ))}

        </div>

      </main>

      <Footer />

    </div>
  );
}