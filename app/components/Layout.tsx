'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronRight,
  Zap,
  BarChart3, 
} from 'lucide-react';
import { PLANS, SubscriptionPlan  } from '@/types';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{
    count: number;
    limit: number;
    plan: string;
    isLoggedIn: boolean;
  } | null>(null);

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
          isLoggedIn: state.isLoggedIn,
        });
      }
    };

    updateHeader();
    const interval = setInterval(updateHeader, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header
        className={`sticky top-0 z-[100] border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center transition-all ${
          isMenuOpen ? 'bg-white' : 'glass-nav'
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group z-[110]">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
            A
          </div>
          <span className="text-xl font-black tracking-tight text-gray-900">
            AllôBénin
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
          <nav className="flex gap-8">
            <Link href="/" className={isActive('/') ? 'text-blue-600' : ''}>
              Accueil
            </Link>
            <Link
              href="/search"
              className={isActive('/search') ? 'text-blue-600' : ''}
            >
              Explorer
            </Link>
            <Link
              href="/urgences"
              className={isActive('/urgences') ? 'text-red-600' : ''}
            >
              Urgences
            </Link>
          </nav>

          {userData && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 border px-4 py-2 rounded-2xl">
                <div
                  className={`w-2 h-2 rounded-full ${
                    userData.isLoggedIn
                      ? 'bg-green-500 animate-pulse'
                      : 'bg-gray-300'
                  }`}
                />
                <div className="text-[10px] font-black uppercase">
                  <p className="text-blue-600">{userData.plan}</p>
                  <p className="text-gray-400">
                    {userData.limit === -1
                      ? 'Illimité'
                      : `${userData.count}/${userData.limit}`}
                  </p>
                </div>
              </div>

              {!userData.isLoggedIn && (
                <Link
                  href="/premium"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-2xl text-xs font-black shadow-lg"
                >
                  S&apos;abonner
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2 z-[110]">
          {userData && (
            <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
              <BarChart3 size={14} className="text-blue-600" />
              <span className="text-xs font-black">
                {userData.limit === -1
                  ? '∞'
                  : `${userData.count}/${userData.limit}`}
              </span>
            </div>
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 bg-gray-100 rounded-xl"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 bg-white z-[105] md:hidden transition-all ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="pt-28 px-8 flex flex-col h-full">
            <nav className="flex flex-col gap-6 text-2xl font-black">
              <Link href="/" onClick={closeMenu}>
                Accueil <ChevronRight />
              </Link>
              <Link href="/search" onClick={closeMenu}>
                Explorer <ChevronRight />
              </Link>
              <Link href="/urgences" onClick={closeMenu}>
                Urgences <ChevronRight />
              </Link>
            </nav>

            <div className="mt-auto pb-20">
              <Link
                href="/premium"
                onClick={closeMenu}
                className="w-full bg-blue-600 text-white py-5 rounded-[2.5rem] font-black flex justify-center gap-3"
              >
                <Zap /> Offres Premium
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      <footer className="bg-white py-16 border-t">
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} AllôBénin – Cotonou
        </p>
      </footer>
    </div>
  );
};

export default Layout;
