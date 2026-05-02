import { useState, useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const artworks = [
  { id: 1, title: "Peces Azules", category: "peces", price: 350, image: "/gallery/obras/peces/fish-01.webp",},
  { id: 2, title: "Flores Rosadas", category: "flores", price: 280, image: "/gallery/obras/flores/bouquet-gouache.webp",},
  { id: 3, title: "Ave Tropical", category: "aves", price: 420, image: "/gallery/obras/aves/tucan-sketch.webp",},
  { id: 4, title: "Abstracto Dorado", category: "otros", price: 500, image: "/gallery/obras/miscelaneous/collage-01.webp",},
  { id: 5, title: "Peces Azules", category: "peces", price: 350, image: "/gallery/obras/peces/fish-02.webp",},
  { id: 6, title: "Flores Rosadas", category: "flores", price: 280, image: "/gallery/obras/flores/bouquet-acuarela.webp",},
  { id: 7, title: "Ave Tropical", category: "aves", price: 420, image: "/gallery/obras/aves/aves-marcadores.webp",},
  { id: 8, title: "Abstracto Dorado", category: "otros", price: 500, image: "/gallery/obras/miscelaneous/collage-02.webp",},
  { id: 9, title: "Peces Azules", category: "peces", price: 350, image: "/gallery/obras/peces/fish-03.webp",},
  { id: 10, title: "Flores Rosadas", category: "flores", price: 280, image: "/gallery/obras/flores/dahlia-sketch.webp",},
  { id: 11, title: "Ave Tropical", category: "aves", price: 420, image: "/gallery/obras/aves/ave-y-tulipanes-marcador-sketch.webp",},
  { id: 12, title: "Abstracto Dorado", category: "otros", price: 500, image: "/gallery/obras/miscelaneous/Granada-sketch.webp",},
  { id: 13, title: "Motmot del sol", category: "aves", price: 150, image: "/gallery/obras/aves/momot.webp"},
  { id: 14, title: "Detalle 1 tulipanes", category: "flores", price: 150, image: "/gallery/obras/flores/Detalle-Tulipanes-sketch-grande.webp"},
  { id: 15, title: "Zorro", category: "otros", price: 150, image: "/gallery/obras/miscelaneous/animal-01.webp"},
  { id: 16, title: "Loros", category: "aves", price: 150, image: "/gallery/obras/aves/bird-01.webp"},
  { id: 17, title: "Detalle 2 tulipanes", category: "flores", price: 150, image: "/gallery/obras/flores/Detalle-2-tulipanes-sketch-grande.webp"},
  { id: 18, title: "Oso", category: "otros", price: 150, image: "/gallery/obras/miscelaneous/animal-02.webp"},
  { id: 19, title: "Loro Azul", category: "aves", price: 150, image: "/gallery/obras/aves/bird-02.webp"},
  { id: 20, title: "Gouache", category: "flores", price: 150, image: "/gallery/obras/flores/flores-gouache.webp"},
  { id: 21, title: "Flores Rosa", category: "flores", price: 280, image: "/gallery/obras/flores/flores-sketch-(2).webp",},
  { id: 22, title: "Aves varias", category: "aves", price: 420, image: "/gallery/obras/aves/Lovebirds-sketch.webp",},
  { id: 23, title: "Buho", category: "otros", price: 500, image: "/gallery/obras/miscelaneous/animal-03.webp",},
  { id: 24, title: "Flores Rosa 2", category: "flores", price: 280, image: "/gallery/obras/flores/flores-sketch.webp",},
  { id: 25, title: "Tangara", category: "aves", price: 420, image: "/gallery/obras/aves/Tangara-Multicolor-sketch.webp",},
  { id: 27, title: "Dino", category: "otros", price: 500, image: "/gallery/obras/miscelaneous/animal-04.webp",},
  { id: 28, title: "Orquidea completa", category: "flores", price: 280, image: "/gallery/obras/flores/flower-01.webp",},
  { id: 29, title: "Tucan y flores", category: "aves", price: 420, image: "/gallery/obras/aves/Tucan-y-flores-sketch.webp",},
  { id: 30, title: "Venado", category: "otros", price: 500, image: "/gallery/obras/miscelaneous/animal-05.webp",},
  { id: 31, title: "Tulipanes", category: "flores", price: 150, image: "/gallery/obras/flores/flower-02.webp"},
  { id: 32, title: "Ardilla", category: "otros", price: 150, image: "/gallery/obras/miscelaneous/animal-06.webp"},
  { id: 33, title: "Flores Caballete", category: "flores", price: 150, image: "/gallery/obras/flores/flower-03.webp"},
  { id: 34, title: "Manos y Orquedea", category: "otros", price: 150, image: "/gallery/obras/miscelaneous/Manos-con-orquidea-sketch-grande.webp"},
  { id: 35, title: "Pinturas", category: "flores", price: 150, image: "/gallery/obras/flores/flower-04.webp"},
  { id: 36, title: "Mujer y Ave", category: "otros", price: 500, image: "/gallery/obras/miscelaneous/Mujer-con-Ave-en-lapiz-sketch-grande.webp",},
  { id: 37, title: "Background", category: "flores", price: 150, image: "/gallery/obras/flores/flower-05.webp"},
  { id: 38, title: "Mujer y flores color", category: "otros", price: 150, image: "/gallery/obras/miscelaneous/Mujer-y-Flores-lapiz-de-color-sketch.webp"},
  { id: 39, title: "Flores pequeñas", category: "flores", price: 150, image: "/gallery/obras/flores/flower-06.webp"},
  { id: 40, title: "Flores Naranja", category: "flores", price: 150, image: "/gallery/obras/flores/flower-08.webp"},
  { id: 41, title: "Flor Detalle", category: "flores", price: 150, image: "/gallery/obras/flores/flower-09.webp"},
  { id: 42, title: "Flor Detalle 2", category: "flores", price: 150, image: "/gallery/obras/flores/flower-10.webp"},
  { id: 43, title: "Orquidea Detalle 1", category: "flores", price: 150, image: "/gallery/obras/flores/flower-11.webp"},
  { id: 44, title: "Orquidea Detalle lapiz", category: "flores", price: 150, image: "/gallery/obras/flores/flower-12.webp"},
  { id: 45, title: "Orquidea Mano", category: "flores", price: 150, image: "/gallery/obras/flores/flower-13.webp"},
  { id: 46, title: "Mariposa flor", category: "flores", price: 150, image: "/gallery/obras/flores/flower-14.webp"},
  { id: 47, title: "Manos Flor", category: "flores", price: 150, image: "/gallery/obras/flores/flower-15.webp"},
  { id: 48, title: "Tulipanes", category: "flores", price: 150, image: "/gallery/obras/flores/flower-16.webp"},
  { id: 49, title: "Girasol", category: "flores", price: 150, image: "/gallery/obras/flores/flower-17.webp"},
  { id: 50, title: "Flor", category: "flores", price: 150, image: "/gallery/obras/flores/flower-18.webp"},
  { id: 51, title: "Gerberas", category: "flores", price: 150, image: "/gallery/obras/flores/Gerberas-acuarela.webp"},
  { id: 52, title: "Hojas", category: "flores", price: 150, image: "/gallery/obras/flores/hojas-marcadores-sketch.webp"},
  { id: 53, title: "Hydrangeas", category: "flores", price: 150, image: "/gallery/obras/flores/hydrangeas-sketch.webp"},
  { id: 54, title: "Orquideas", category: "flores", price: 150, image: "/gallery/obras/flores/Orquideas-Sketch.webp"},
  { id: 55, title: "Tulipanes Sketch", category: "flores", price: 150, image: "/gallery/obras/flores/Tulipanes-Sketch.webp"},


];

export default function Store() {
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  // 🔥 FILTRADO
  const filtered =
    filter === "all"
      ? artworks
      : artworks.filter((a) => a.category === filter);

  // 🔥 SOLO LOS VISIBLES
  const visibleItems = filtered.slice(0, visibleCount);

  // 🔥 CARGAR MÁS
  const loadMore = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setLoading(false);
    }, 300);
  };

  const [scrolled, setScrolled] = useState(false);

  // 🔥 OBSERVER (scroll automático)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [filtered]); // importante

  // 🔥 RESET cuando cambias filtro
  useEffect(() => {
    setVisibleCount(12);
  }, [filter]);

  // 🔥 PRECARGA (opcional pero recomendado)
  useEffect(() => {
    artworks.forEach((art) => {
      const img = new Image();
      img.src = art.image;
    });
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#e9dfd8] text-studio-green pt-18 md:pt-24">

      <Header />

      <main className="flex-1 px-6 py-12 max-w-7xl mx-auto">

        {/* TÍTULO 
        <h1 className="font-cocomat text-4xl md:text-5xl mb-8 text-center">
          Colección
        </h1>*/}

        {/* FILTROS */}
        {/*<div className="flex flex-wrap justify-center gap-4 mb-10">*/}
        {/* <div className="sticky top-24 z-40 bg-[#e9dfd8] py-4 mb-10">*/}
         <div className={`
            sticky 
            top-[calc(5rem+12px)] 
            md:top-[calc(6rem+20px)] 
            z-40 
            bg-[#e9dfd8]/90 
            backdrop-blur-md 
            border-b border-black/10
            transition-all duration-500 ease-in-out
            ${scrolled ? "py-2" : "py-4"}
          `}>

         {/* TÍTULO */}
        <h1 
        className={`
          font-cocomat text-center transition-all duration-500 ease-in-out
          ${scrolled 
              ? "text-2xl md:text-3xl mb-1 scale-95 opacity-90" 
              : "text-3xl md:text-4xl mb-4 scale-100"}
        `}
      >
          Colección
        </h1>

        {/* BOTONES */}
          <div 
          className={`
            flex flex-wrap justify-center gap-3 transition-all duration-500
            ${scrolled ? "gap-2 mb-2" : "gap-3 mb-4"}
          `}
>
            {["all", "flores", "aves", "peces", "otros"].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setVisibleCount(12);
                }}
                className={`
                  rounded-full border transition-all duration-300
                  ${scrolled ? "text-sm px-3 py-1" : "text-sm px-4 py-2"}
                  ${
                    filter === cat
                      ? "bg-studio-green text-white"
                      : "border-studio-green hover:bg-studio-green hover:text-white"
                  }
                `}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
         </div>

        {/* MASONRY */}
        <div 
        key={filter}
        className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 mt-4">

          {visibleItems.map((art) => (
            <div key={art.id} className="break-inside-avoid mb-6">
              <img
                src={art.image}
                alt={art.title}
                loading="eager"
                decoding="async"
                className="w-full h-auto object-cover rounded-xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl"
                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                />
            </div>
          ))}

        </div>

        {/* 🔥 TRIGGER SCROLL */}
        <div ref={loaderRef} className="h-16 flex justify-center items-center">
       {/*   {loading && (
            <p className="animate-pulse">Cargando más obras...</p>
          )}*/}
        </div>

      </main>

      <Footer />

    </div>
  );
}