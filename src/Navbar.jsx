import React from 'react';
import logo from './assets/logo.png'; // Asegúrate de que la ruta sea correcta
import ytIcon from './assets/youtube.png';
import igIcon from './assets/instagram.png';
import tkIcon from './assets/tik-tok.png';

const Navbar = () => {
  return (
    <nav className="bg-[#00473e] text-[#fbc6d0] px-6 py-4 flex items-center justify-between shadow-lg">
      
      {/* LADO IZQUIERDO: Logo */}
      <div className="flex items-center w-1/4">
        <img src={logo} alt="Aristizabal Studio Logo" className="h-16 w-auto" />
      </div>

      {/* CENTRO: Título con fuente personalizada */}
      <div className="flex-1 text-center">
        <h1 className="text-4xl md:text-5xl font-custom tracking-wide">
          Aristizabal Studio
        </h1>
      </div>

      {/* LADO DERECHO: Redes Sociales */}
      <div className="flex items-center justify-end gap-4 w-1/4">
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img src={ytIcon} alt="YouTube" className="h-8 w-8" />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img src={igIcon} alt="Instagram" className="h-8 w-8" />
        </a>
        <a href="#" className="hover:opacity-80 transition-opacity">
          <img src={tkIcon} alt="TikTok" className="h-8 w-8" />
        </a>
      </div>

    </nav>
  );
};

export default Navbar;