
'use client';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-16 px-6 border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">A</div>
          <span className="font-black text-gray-900 uppercase tracking-tighter">AllôBénin</span>
        </div>
        <p className="text-xs font-bold text-gray-400 italic">Plateforme solidaire pour tous les Béninois.</p>
        <p className="text-xs font-bold text-gray-300">© {new Date().getFullYear()} AllôBénin. Fait à Cotonou.</p>
      </div>
    </footer>
  );
};

export default Footer;
