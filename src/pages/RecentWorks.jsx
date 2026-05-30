import { useState, useEffect, useRef } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { supabase } from "../config/supabase";

export default function Store() {

  // ================= STATE =================
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);
  const [artworks, setArtworks] = useState([]);


  // 🔥 FILTRADO
  const filtered = artworks;

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
      img.src = art.images?.[0];
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

  // ================= CARGAR DESDE SUPABASE =================
    async function fetchRecentWorks() {

          const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("type", "recent_work")
            .order("created_at", { ascending: false });

          if (error) {

            console.error(error);

            return;

          }

          setArtworks(data || []);

        }

        // ================= FETCH ON LOAD =================
        useEffect(() => {

          fetchRecentWorks();

}, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#e9dfd8] text-studio-green pt-18 md:pt-24">

      <Header />

      <main 
      className="
      flex-1 
      px-6 
      py-12 
      max-w-7xl 
      mx-auto">

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
            z-30 
            bg-[#e9dfd8]/90 
            backdrop-blur-md 
            border-b border-black/10
            transition-all duration-500 ease-in-out
            ${scrolled ? "py-2" : "py-4"}
          `}>

         {/* TÍTULO */}
        <h1 
        className={`
          font-cocomat
          text-studio-green 
          text-center 
          transition-all 
          duration-500 
          ease-in-out
          ${scrolled 
              ? "text-2xl md:text-4xl mb-1 scale-95 opacity-90" 
              : "text-3xl md:text-5xl mb-4 scale-100"}
        `}
      >
          Colección
        </h1>

        {/* BOTONES 
        <div
          className={`
            flex justify-center items-center
            gap-1 sm:gap-3
            overflow-x-auto
            whitespace-nowrap
            transition-all duration-500
            ${scrolled ? "mb-2" : "mb-4"}
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
                rounded-full border transition-all duration-300 shrink-0

                px-2 py-[4px] text-[11px]
                sm:text-sm sm:px-4 sm:py-2

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
        </div>*/}
         </div>

        {/* MASONRY */}
        <div 
        key={filter}
        className="
        columns-1 
        sm:columns-2 
        md:columns-3 
        lg:columns-4 
        gap-6 mt-4">

          {visibleItems.map((art) => (
            <div key={art.id} className="break-inside-avoid mb-6">
              <img
                src={
                  art.images?.[0] ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={art.name}
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