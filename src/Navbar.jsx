//import React from 'react';
import Logo from './assets/logo.svg?react'; // Asegúrate de que la ruta sea correcta
//import ytIcon from './assets/youtube.svg';
//import igIcon from './assets/instagram.svg';
//import tkIcon from './assets/tik-tok.svg';

function Navbar() {
  return (
   <nav className="bg-studio-green text-studio-pink px-6 py-4 shadow-md">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">

        {/* LOGO */}
        <div className="flex items-center z-10">
          <Logo className="text-studio-pink w-24 h-auto" />
        </div>

        {/* TÍTULO CENTRADO REAL */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-cocomat text-xl md:text-3xl tracking-wide">
            Aristizabal Studio
          </h1>
        </div>

        {/* DERECHA (RESERVADO PARA REDES O MENÚ) */}
        <div className="flex items-center gap-4 z-10">
          {/* futuro contenido */}
        </div>

          {/* REDES SOCIALES 
        <div className="flex items-center gap-4 z-10">
          
          <a href="#" className="group">
            <img 
              src={ytIcon} 
              alt="YouTube" 
              className="h-6 md:h-8 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125"
            />
          </a>

          <a href="#" className="group">
            <img 
              src={igIcon} 
              alt="Instagram" 
              className="h-6 md:h-8 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125"
            />
          </a>

          <a href="#" className="group">
            <img 
              src={tkIcon} 
              alt="TikTok" 
              className="h-6 md:h-8 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125"
            />
          </a>

        </div>*/}
      </div>
    </nav>
  );
}

export default Navbar;