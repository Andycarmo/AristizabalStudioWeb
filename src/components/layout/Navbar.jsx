import Logo from '../../assets/logo.svg?react'; // Asegúrate de que la ruta sea correcta
import YoutubeIcon from '../../assets/youtube.svg?react';
import InstagramIcon from '../../assets/instagram.svg?react';
import TikTokIcon from '../../assets/tik-tok.svg?react';
import { useState } from "react";

function Navbar() {
  //const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
   //<nav className="bg-studio-green text-studio-pink px-6 py-4 shadow-md">
    //<nav className="fixed top-0 left-0 w-full bg-studio-green text-studio-pink px-6 py-4 shadow-md z-50">
    //nav con gradiente y transparencia
    //<nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-studio-green via-studio-green/90 to-studio-green/70 text-studio-pink px-6 py-4 shadow-md z-50">
    //nav con gradiente y transparencia mejorada  
    //<nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-studio-green to-studio-pink text-white px-6 py-4 shadow-md z-50">
    //nav con gradiente y transparencia mejorada y borde inferior efecto blur
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-studio-green/80 to-studio-green/60 backdrop-blur-md text-studio-pink px-6 py-4 shadow-md z-50 border-b border-white/10">
    {/*//nav con gradiente y transparencia mejorada y borde inferior efecto blur mejorado
    //<nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-studio-green to-studio-green/80 text-studio-pink px-6 py-4 shadow-md z-50">
    //nav con gradiente y transparencia mejorada y borde inferior efecto blur mejorado y sombra personalizada
    //<nav className="fixed top-0 left-0 w-full bg-gradient-to-b from-studio-green to-studio-green/80 text-studio-pink px-6 py-[clamp(0.5rem,1vw,0.75rem)] z-50 shadow-[0_6px_30px_rgba(0,0,0,0.35)]">
    //nav con gradiente y transparencia mejorada y borde inferior efecto blur mejorado y sombra personalizada y padding responsive
    //<nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0f3d2e] via-studio-green to-[#0f3d2e] text-studio-pink px-[clamp(1rem,4vw,2rem)] py-[clamp(0.5rem,1vw,0.75rem)] z-50 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
    //nav con gradiente y transparencia mejorada y borde inferior efecto blur mejorado y sombra personalizada y padding responsive mejorado
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0f3d2e] via-studio-green to-[#0f3d2e] text-studio-pink px-[clamp(1rem,4vw,2rem)] py-2 md:py-2 lg:py-1.5 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
    nav con gradiente y transparencia mejorada y borde inferior efecto blur mejorado y sombra personalizada y padding responsive mejorado y altura fija
    //<nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#0f3d2e] via-studio-green to-[#0f3d2e] text-studio-pink px-[clamp(1rem,4vw,2rem)] h-14 md:h-16 lg:h-14 flex items-center z-50 shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
    */}
    {/* MENU MOBILE 
      {menuOpen && (*/}
      <div
        className={`fixed inset-0 bg-studio-green/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 z-50 transform transition-all duration-500 ease-in-out ${
          menuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <a href="#" className="text-studio-pink text-xl">YouTube</a>
        <a href="#" className="text-studio-pink text-xl">Instagram</a>
        <a href="#" className="text-studio-pink text-xl">TikTok</a>
      </div>


      <div className="max-w-7xl mx-auto flex items-center justify-between relative">

        {/* LOGO */}
        {/* Contenedor con logo posible compresion 
        <div className="flex items-center z-10">*/}
        <div className="flex items-center z-[60] shrink-0">
          {/*Logo con responsive
          //<Logo className="text-studio-pink w-20 sm:w-24 md:w-28 lg:w-32 h-auto" />*/}
          {/*Logo con efecto emboss
          <Logo className="logo-emboss w-20 sm:w-24 md:w-28 lg:w-32 h-auto" />*/}
          {/*Logo mas reducido*/}
          <Logo className="logo-emboss w-16 sm:w-20 md:w-22 lg:w-24 h-auto" />
          {/*Logo fijo
          <Logo className="text-studio-pink w-24 h-auto" />*/}
        </div>

        {/* TÍTULO CENTRADO REAL 
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-cocomat text-3xl md:text-5xl tracking-wide">*/}
        <div className="flex-1 flex z-[60] justify-center">
        <h1 className="title-emboss font-cocomat text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide text-center">
          Aristizabal Studio
        </h1>
        </div>

        {/* BURGUER MENU */}
        <div className="md:hidden flex items-center z-[60]">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center gap-2"
          >
            <span
              className={`w-8 h-[1px] bg-studio-pink transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            ></span>

            <span
              className={`w-8 h-[1px] bg-studio-pink transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            ></span>
          </button>
        </div>

          {/* REDES SOCIALES - version anterior
        <div className="flex items-center gap-6 z-10">*/}
        <div className="hidden md:flex items-center gap-6 z-10">  

          <a href="https://www.youtube.com/@aristizabalstudio" className="group">
            {/*<YoutubeIcon className="h-6 md:h-8 w-auto text-studio-pink transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125"*/}
            <YoutubeIcon className="icon-emboss h-6 md:h-8 w-auto transition-transform duration-300 hover:scale-110 hover:brightness-125" />
          </a>

          <a href="#" className="group">
            <InstagramIcon className="icon-emboss h-6 md:h-6 w-auto transition-transform duration-300 hover:scale-110 hover:brightness-125" />
            {/*<InstagramIcon className="h-6 md:h-6 w-auto text-studio-pink transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125"*/}
            
          </a>

          <a href="https://www.tiktok.com/@aristizabal.studio" className="group">
           <TikTokIcon className="icon-emboss h-6 md:h-7 w-auto transition-transform duration-300 hover:scale-110 hover:brightness-125" />
           {/*<TikTokIcon className="h-6 md:h-7 w-auto text-studio-pink transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125"*/}
            
          </a>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;