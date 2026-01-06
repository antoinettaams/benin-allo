'use client';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

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
            <a href="https://facebook.com" target="_blank" className="text-blue-600 hover:text-blue-800 transition-all transform hover:scale-110 rounded-full shadow-md p-2">
              <FaFacebookF size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" className="text-pink-500 hover:text-pink-700 transition-all transform hover:scale-110 rounded-full shadow-md p-2">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.tiktok.com" target="_blank" className="text-black hover:text-gray-800 transition-all transform hover:scale-110 rounded-full shadow-md p-2">
              <FaTiktok size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm font-bold text-gray-300 text-left md:text-right mt-6 md:mt-0">
          © {new Date().getFullYear()} AllôBénin. Fait à Cotonou.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
