import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const artworks = [
  {
    id: 1,
    title: "Peces Azules",
    category: "peces",
    price: 350,
    image: "/gallery/obras/peces/obra-peces-azules-01.webp",
  },
  {
    id: 2,
    title: "Flores Rosadas",
    category: "flores",
    price: 280,
    image: "/gallery/obras/flores/obra-flores-rosas-01.webp",
  },
  {
    id: 3,
    title: "Ave Tropical",
    category: "aves",
    price: 420,
    image: "/gallery/obras/aves/obra-aves-coloridas-01.webp",
  },
  {
    id: 4,
    title: "Abstracto Dorado",
    category: "miscelaneos",
    price: 500,
    image: "/gallery/obras/miscelaneos/obra-abstracto-01.webp",
  },
];

export default function Store() {
  const [filter, setFilter] = useState("all");

  const filtered =
    filter === "all"
      ? artworks
      : artworks.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen bg-white pt-24">
    <div className="min-h-screen flex flex-col bg-[#e9dfd8] text-studio-green">
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
              className={`px-4 py-2 rounded-full border transition
                ${
                  filter === cat
                    ? "bg-studio-green text-white"
                    : "border-studio-green hover:bg-studio-green hover:text-white"
                }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <div
              key={art.id}
              className="group cursor-pointer"
            >
              {/* IMAGEN */}
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={art.image}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-[350px] object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              {/* INFO */}
              <div className="mt-4 text-center">
                <h2 className="text-xl font-semibold">{art.title}</h2>
                <p className="text-sm opacity-70">{art.category}</p>
                <p className="mt-2 font-bold">${art.price}</p>

                <button
                  className="mt-4 px-6 py-2 border border-studio-green rounded-full hover:bg-studio-green hover:text-white transition"
                  onClick={() => alert(`Interesado en: ${art.title}`)}
                >
                  Ver obra
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
    </div>
  );
}