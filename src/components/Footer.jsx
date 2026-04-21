import Logo from '../assets/logo.svg?react';
import YoutubeIcon from '../assets/youtube.svg?react';
import InstagramIcon from '../assets/instagram.svg?react';
import TikTokIcon from '../assets/tik-tok.svg?react';

export default function Footer() {
  return (
    <footer className="bg-studio-green text-studio-pink py-10 px-4">

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">

        {/* LOGO */}
        <Logo className="w-20 h-auto" />

        {/* NOMBRE */}
        <h3 className="text-xl md:text-2xl font-semibold text-center">
          Aristizabal Studio
        </h3>

        {/* REDES */}
        <div className="flex items-center gap-6">
          
          <a href="#" className="group">
            <YoutubeIcon className="h-6 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125" />
          </a>

          <a href="#" className="group">
            <InstagramIcon className="h-6 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125" />
          </a>

          <a href="#" className="group">
            <TikTokIcon className="h-6 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:brightness-125" />
          </a>

        </div>

        {/* COPYRIGHT */}
        <p className="text-sm text-center opacity-80">
          © {new Date().getFullYear()} Aristizabal Studio. Todos los derechos reservados.
        </p>

      </div>

    </footer>
  );
}