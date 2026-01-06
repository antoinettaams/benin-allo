'use client';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-white py-16 sm:py-20 px-5 sm:px-8 border-t border-gray-100 overflow-hidden">

      {/* Illustrations légères animées en arrière-plan */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/20 rounded-full -translate-x-1/3 -translate-y-1/3 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100/20 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 sm:gap-12">

        {/* Logo et slogan */}
        <div className="flex flex-col gap-3">
          <span className="font-black text-gray-900 text-2xl sm:text-3xl uppercase tracking-tighter rounded-lg">
            AllôBénin
          </span>
          <p className="text-xs sm:text-sm font-bold text-gray-400 italic max-w-xs rounded-lg">
            Plateforme solidaire pour tous les Béninois.
          </p>
        </div>

        {/* Icônes sociales */}
        <div className="flex flex-col gap-4">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">Suivez-nous</p>
          <div className="flex gap-4">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-all transform hover:scale-110 rounded-full shadow-md p-2"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 transition-all transform hover:scale-110 rounded-full shadow-md p-2"
            >
              <Instagram size={20} />
            </a>
            {/* TikTok avec SVG personnalisé car non disponible dans lucide-react */}
            <a 
              href="https://www.tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-black hover:text-gray-800 transition-all transform hover:scale-110 rounded-full shadow-md p-2"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.33 6.33 0 0 0-1-.05A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm font-bold text-gray-300 text-left md:text-right mt-6 md:mt-0">
          © {new Date().getFullYear()} AllôBénin.
        </p>
      </div>
    </footer>
  );
};

export default Footer;