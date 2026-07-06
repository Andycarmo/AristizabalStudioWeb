import { useEffect, useState } from "react";
import { getSection } from "../../services/websiteService";

export default function Hero() {
  const [offset, setOffset] = useState(0);
const [hero, setHero] = useState({
  intro_text: "",
  highlight_1: "",
  middle_text: "",
  highlight_2: "",
  ending_text: "",
  image: "",
});

async function loadHero() {
    try {
        const data = await getSection("hero");
        console.log("HERO:", data);
        setHero(data);
    }
    catch (err) {
        console.error(err);
    }
}

useEffect(() => {
    loadHero();
    const handleScroll = () => {
        setOffset(window.scrollY * 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () =>
        window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <section className="
    relative h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] 
    overflow-hidden">

      {/* FONDO PARALLAX */}
     <img
        src="/Cuadro-Hero.webp"
        alt="Hero"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        style={{
          transform: `translateY(${offset * 0.3}px)`
        }}
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* CONTENIDO */}
      <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-20">
        <div className="fade-up-3 max-w-xl text-left">
          
         <h1
            className="
              text-white
              -mt-4
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-cocomat
              tracking-wide
              leading-tight
              drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]
            "
          >
            {hero.intro_text}{" "}

            <span className="block-orange">
              {hero.highlight_1}
            </span>{" "}

            {hero.middle_text}{" "}

            <span className="block-fucsia">
              {hero.highlight_2}
            </span>{" "}

            {hero.ending_text}
          </h1>
         
        </div>
      </div>

    </section>
  );
}