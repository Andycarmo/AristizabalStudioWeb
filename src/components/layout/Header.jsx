import Logo from '../../assets/logo.svg?react';
import YoutubeIcon from '../../assets/youtube.svg?react';
import InstagramIcon from '../../assets/instagram.svg?react';
import TikTokIcon from '../../assets/tik-tok.svg?react';
import { useState } from "react";
import Navbar from "./Navbar";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
          {/* MENU MOBILE */}
      <div className={`fixed top-[88px] left-0 w-full h-[calc(100vh-88px)]
        bg-studio-green backdrop-blur-md
        flex flex-col items-center justify-center gap-10
        z-40 transition-all duration-500
        ${
          menuOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
        >

          {/* NAV MOBILE */}
          <Navbar isMobile onNavigate={() => setMenuOpen(false)} />

          {/* REDES MOBILE */}
          <div className="flex items-center gap-8 mt-6">

            <a href="https://www.youtube.com/@aristizabalstudio" target="_blank" rel="noopener noreferrer" className="group">
              <YoutubeIcon className="h-8 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-125" />
            </a>

            <a href="https://www.instagram.com/aristizabal.studio" target="_blank" rel="noopener noreferrer" className="group">
              <InstagramIcon className="h-7 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-125" />
            </a>

            <a href="https://www.tiktok.com/@aristizabal.studio" target="_blank" rel="noopener noreferrer" className="group">
              <TikTokIcon className="h-7 w-auto transition-all duration-300 group-hover:scale-110 group-hover:brightness-125" />
            </a>

          </div>

      </div>
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-studio-green/80 to-studio-green/60 backdrop-blur-md text-studio-pink px-6 py-4 shadow-md z-50 border-b border-white/10">



      <div className="max-w-7xl mx-auto flex items-center justify-between relative">

        {/* LOGO */}
        <div className="fade-up-05 flex items-center z-[60] shrink-0">
          <Logo className="logo-emboss w-16 sm:w-20 md:w-22 lg:w-24 h-auto" />
        </div>

        {/* TÍTULO + NAV */}
        <div className="fade-up-05 flex flex-col items-center justify-center z-[60] flex-1">
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
        <div className="fade-up-2 hidden md:flex items-center gap-6 z-10">

          {/* >>>>>>>>>>>>>   YOUTUBE    <<<<<<<<<<<<<<<*/}
          <a href="https://www.youtube.com/@aristizabalstudio" target="_blank" rel="noopener noreferrer" className="group">
            <YoutubeIcon className="h-7 md:h-8 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125" />
          </a>

          {/* >>>>>>>>>>>>>   INSTAGRAM    <<<<<<<<<<<<<<<*/}
          <a href="https://www.instagram.com/aristizabal.studio" target="_blank" rel="noopener noreferrer" className="group">
            <InstagramIcon className="h-6 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125" />
          </a>

          {/* >>>>>>>>>>>>>   TIKTOK    <<<<<<<<<<<<<<<*/}
          <a href="https://www.tiktok.com/@aristizabal.studio" target="_blank" rel="noopener noreferrer" className="group">
            <TikTokIcon className="h-6 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125" />
          </a>

        </div>

      </div>
    </header>
    </>
  );
}

export default Header;