import Logo from "../../assets/logo.svg?react";
import YoutubeIcon from "../../assets/youtube.svg?react";
import InstagramIcon from "../../assets/instagram.svg?react";
import TikTokIcon from "../../assets/tik-tok.svg?react";

export default function Footer() {
  return (
    <footer className="bg-studio-green text-studio-pink">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Contenido principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <div className="flex items-center gap-4">

            <Logo
              className="
                w-16 md:w-20
                h-auto
                transition-transform
                duration-500
                hover:scale-105
              "
            />

            <div>

              <h3 className="font-cocomat text-2xl">
                Aristizabal Studio
              </h3>

              <p className="text-sm opacity-70">
                Contemporary Art
              </p>

            </div>

          </div>

          {/* Redes */}
          <div className="flex items-center gap-5">

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@aristizabalstudio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="
                opacity-70
                hover:opacity-100
                transition-all
                duration-300
                hover:scale-110
              "
            >
              <YoutubeIcon className="h-7 w-auto" />
            </a>

            {/* Instagram */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="
                opacity-70
                hover:opacity-100
                transition-all
                duration-300
                hover:scale-110
              "
            >
              <InstagramIcon className="h-6 w-auto" />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@aristizabal.studio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="
                opacity-70
                hover:opacity-100
                transition-all
                duration-300
                hover:scale-110
              "
            >
              <TikTokIcon className="h-6 w-auto" />
            </a>

          </div>

        </div>

        {/* Separador */}
        <div className="border-t border-studio-pink/20 mt-8 pt-5">

          <div className="flex flex-col md:flex-row items-center justify-between gap-2">

            <p className="text-sm opacity-60 text-center md:text-left">
              © {new Date().getFullYear()} Aristizabal Studio. All rights reserved.
            </p>

            <p className="text-xs opacity-50">
              Made with ❤ by myself.
            </p>

          </div>

        </div>

      </div>

    </footer>

  );
}