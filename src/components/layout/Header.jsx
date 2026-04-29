import Logo from '../../assets/logo.svg?react';
import YoutubeIcon from '../../assets/youtube.svg?react';
import InstagramIcon from '../../assets/instagram.svg?react';
import TikTokIcon from '../../assets/tik-tok.svg?react';
import { useState } from "react";
import Navbar from "./Navbar";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-studio-green/80 to-studio-green/60 backdrop-blur-md text-studio-pink px-6 py-4 shadow-md z-50 border-b border-white/10">

      {/* MENU MOBILE */}
      <div className={`fixed inset-0 bg-studio-green/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 z-50 transition-all duration-500 ${
        menuOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
      }`}>
        <Navbar isMobile onNavigate={() => setMenuOpen(false)} />
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between relative">

        {/* LOGO */}
        <div className="flex items-center z-[60] shrink-0">
          <Logo className="logo-emboss w-16 sm:w-20 md:w-22 lg:w-24 h-auto" />
        </div>

        {/* TÍTULO + NAV */}
        <div className="flex flex-col items-center justify-center z-[60] flex-1">
          <h1 className="title-emboss font-cocomat text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide text-center">
            Aristizabal Studio
          </h1>

          {/* NAV DESKTOP */}
          <div className="hidden md:block mt-2">
            <Navbar />
          </div>
        </div>

        {/* BURGER */}
        <div className="md:hidden flex items-center z-[60]">
          <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-2">
            <span className={`w-8 h-[1px] bg-studio-pink ${menuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <span className={`w-8 h-[1px] bg-studio-pink ${menuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>
        </div>

        {/* REDES */}
        <div className="hidden md:flex items-center gap-6 z-10">
          <a href="https://www.youtube.com/@aristizabalstudio" target="_blank" rel="noopener noreferrer">
            <YoutubeIcon className="icon-emboss h-6 md:h-8" />
          </a>

          <a href="#">
            <InstagramIcon className="icon-emboss h-6 md:h-6" />
          </a>

          <a href="https://www.tiktok.com/@aristizabal.studio" target="_blank" rel="noopener noreferrer">
            <TikTokIcon className="icon-emboss h-6 md:h-7" />
          </a>
        </div>

      </div>
    </header>
  );
}

export default Header;