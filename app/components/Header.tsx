'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight, Zap, BarChart3, AlertTriangle } from 'lucide-react';
import { PLANS, SubscriptionPlan } from '@/types';

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{count: number, limit: number, plan: string, isLoggedIn: boolean} | null>(null);
  
  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const updateHeader = () => {
      const saved = localStorage.getItem('allo_benin_user');
      if (saved) {
        const state = JSON.parse(saved);
        setUserData({
          count: state.dailyContacts.count,
          limit: PLANS[state.plan as SubscriptionPlan].limit,
          plan: PLANS[state.plan as SubscriptionPlan].name,
          isLoggedIn: state.isLoggedIn
        });
      }
    };
    updateHeader();
    const interval = setInterval(updateHeader, 500);
    return () => clearInterval(interval);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`sticky top-0 z-[100] border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center transition-all shadow-sm ${isMenuOpen ? 'bg-white' : 'glass-nav'}`}>
      <Link href="/" className="flex items-center gap-2 group z-[110]">
        <span className="text-xl font-black tracking-tight text-gray-900">AllôBénin</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
        <nav className="flex gap-8">
          <Link href="/" className={`hover:text-blue-600 transition-colors ${isActive('/') ? 'text-blue-600' : ''}`}>Accueil</Link>
          <Link href="/search" className={`hover:text-blue-600 transition-colors ${isActive('/search') ? 'text-blue-600' : ''}`}>Explorer</Link>
          
          {/* Lien Urgences avec mise en avant spéciale */}
          <Link 
            href="/urgences" 
            className={`
              relative flex items-center gap-1.5 transition-all duration-300
              ${isActive('/urgences') ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}
            `}
          >
            {/* Badge d'urgence - visible uniquement sur le lien Urgences */}
            <div className="relative">
              <AlertTriangle size={14} className="inline mr-1" />
              <span className="font-black">Urgences</span>
              
              {/* Badge rouge animé */}
              <div className="absolute -top-1 -right-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
            </div>
            
            {/* Bordure rouge au survol/actif */}
            {isActive('/urgences') && (
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            )}
          </Link>
        </nav>

        {userData && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-4 py-2 rounded-2xl shadow-sm">
              <div className={`w-2 h-2 rounded-full ${userData.isLoggedIn ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
              <div className="text-[14px] leading-tight font-black uppercase tracking-tighter">
                <p className="text-blue-600">{userData.plan}</p>
                <p className="text-gray-400">{userData.limit === -1 ? 'Illimité' : `${userData.count} / ${userData.limit}`}</p>
              </div>
            </div>
            {!userData.isLoggedIn && (
              <Link 
                href="/premium" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all font-black text-xs shadow-lg shadow-blue-100 hover:shadow-blue-200"
              >
                S'abonner
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Mobile Header Elements */}
      <div className="flex items-center gap-2 md:hidden z-[110]">
        {userData && (
          <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 px-3 py-2 rounded-xl shadow-sm">
            <BarChart3 size={14} className="text-blue-600" />
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-blue-600 uppercase leading-none mb-0.5">{userData.plan}</span>
              <span className="text-[11px] font-black text-gray-900 leading-none">
                {userData.limit === -1 ? '∞' : `${userData.count}/${userData.limit}`}
              </span>
            </div>
          </div>
        )}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="p-3 text-gray-900 bg-gray-100 rounded-xl active:scale-90 transition-all border border-gray-200 shadow-sm hover:shadow-md"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[105] md:hidden transition-all duration-500 flex flex-col ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-25 px-4">
          <nav className="flex flex-col gap-6 text-2xl font-black mb-12">
            <Link href="/" onClick={closeMenu} className="flex items-center justify-between py-2 border-b border-gray-100">
              Accueil <ChevronRight size={24} className="text-gray-200" />
            </Link>
            <Link href="/search" onClick={closeMenu} className="flex items-center justify-between py-2 border-b border-gray-100">
              Explorer <ChevronRight size={24} className="text-gray-200" />
            </Link>
            
            {/* Lien Urgences avec mise en avant dans le menu mobile */}
            <Link 
              href="/urgences" 
              onClick={closeMenu} 
              className={`
                flex items-center justify-between py-2 px-4 rounded-2xl transition-all
                ${isActive('/urgences') 
                  ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-600 border border-red-200' 
                  : 'bg-red-50/50 text-gray-900 hover:bg-red-50 border border-transparent hover:border-red-100'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isActive('/urgences') ? 'bg-red-100' : 'bg-red-50'}`}>
                  <AlertTriangle size={20} className={isActive('/urgences') ? 'text-red-600' : 'text-red-500'} />
                </div>
                <span className="font-black">Urgences</span>
              </div>
              
              
            </Link>
          </nav>
          
          <div className="mt-auto pb-50">
            <Link 
              href="/premium" 
              onClick={closeMenu} 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 rounded-[2.5rem] font-black text-sm flex items-center justify-center gap-3 shadow-2xl shadow-blue-200 active:scale-95 transition-all mb-4"
            >
              <Zap size={24} className="fill-white" /> Offres Premium
            </Link>
            <p className="text-center text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-8 opacity-60">
              Accès prioritaire • Bénin 229
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;