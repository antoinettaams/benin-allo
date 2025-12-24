'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, Search } from 'lucide-react';
import { MOCK_CONTACTS, CATEGORIES } from '@/data';
import ContactCard from '../components/ContactCard';
import { useUserStats } from '../../hooks/useUserStats'; 
import { PLANS, Contact, CategoryType, SubscriptionPlan } from '@/types';
import LimitModal from '../components/LimitModal';

// Create a component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { userState, incrementContact } = useUserStats();
  
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const [localQuery, setLocalQuery] = useState(queryParam);
  const [isLimitModalOpen, setLimitModalOpen] = useState(false);
  
  useEffect(() => { 
    setLocalQuery(queryParam); 
  }, [queryParam]);

  const filteredContacts = useMemo(() => {
    return MOCK_CONTACTS.filter((c) => {
      const matchCategory = !categoryParam || c.category === categoryParam;
      const matchQuery = !queryParam || 
        c.name.toLowerCase().includes(queryParam.toLowerCase()) || 
        c.subCategory?.toLowerCase().includes(queryParam.toLowerCase());
      return matchCategory && matchQuery;
    });
  }, [categoryParam, queryParam]);

  const handleContactAction = (contact: Contact, action: () => void) => {
    if (contact.category === CategoryType.URGENCES) { 
      action(); 
      return; 
    }
    
    if (!userState) return;
    
    const planDetails = PLANS[userState.plan as SubscriptionPlan];
    if (planDetails.limit !== -1 && userState.dailyContacts.count >= planDetails.limit) { 
      setLimitModalOpen(true); 
      return; 
    }
    
    incrementContact(); 
    action();
  };

  const updateSearchParams = (params: { q?: string; category?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (params.q !== undefined) {
      if (params.q) newParams.set('q', params.q);
      else newParams.delete('q');
    }
    if (params.category !== undefined) {
      if (params.category) newParams.set('category', params.category);
      else newParams.delete('category');
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <LimitModal 
        isOpen={isLimitModalOpen} 
        onClose={() => setLimitModalOpen(false)} 
        currentPlan={userState?.plan || SubscriptionPlan.FREE} 
      />
      
      <div className="mb-12">
        <div className="flex items-center gap-6 mb-8">
          <button 
            onClick={() => router.push('/')} 
            className="p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-black">Explorer</h1>
            <p className="text-blue-600 font-black text-[10px] uppercase tracking-widest">
              Quota: {userState ? (PLANS[userState.plan].limit === -1 ? 'Illimité' : `${userState.dailyContacts.count} / ${PLANS[userState.plan].limit}`) : 'Chargement...'}
            </p>
          </div>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault();
            updateSearchParams({ q: localQuery, category: categoryParam || undefined });
          }} 
          className="flex items-center bg-white border border-gray-100 rounded-2xl p-2 mb-8 shadow-xl"
        >
          <input 
            type="text" 
            placeholder="Rechercher..." 
            className="flex-1 px-4 py-3 outline-none font-bold" 
            value={localQuery} 
            onChange={(e) => setLocalQuery(e.target.value)} 
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black"
          >
            Chercher
          </button>
        </form>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          <button 
            onClick={() => updateSearchParams({})} 
            className={`px-6 py-2.5 rounded-2xl text-sm font-black flex-shrink-0 ${
              !categoryParam ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-400'
            }`}
          >
            Tout
          </button>
          {CATEGORIES.map(cat => (
            <button 
              key={cat.id} 
              onClick={() => updateSearchParams({ category: cat.type })} 
              className={`px-6 py-2.5 rounded-2xl text-sm font-black flex-shrink-0 flex items-center gap-2 ${
                categoryParam === cat.type ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-400'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredContacts.length > 0 ? filteredContacts.map(contact => (
          <ContactCard 
            key={contact.id} 
            contact={contact} 
            onCall={(p) => handleContactAction(contact, () => window.location.href = `tel:${p}`)}
            onWhatsApp={(p) => handleContactAction(contact, () => window.open(`https://wa.me/${p}`, '_blank'))}
          />
        )) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">Aucun résultat trouvé</h3>
            <p className="text-gray-500 font-medium">Réessayez avec d&apos;autres mots-clés.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-8">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <ChevronLeft size={24} />
            </div>
            <div className="animate-pulse">
              <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-32 bg-gray-100 rounded"></div>
            </div>
          </div>
          <div className="h-16 bg-gray-100 rounded-2xl mb-8 animate-pulse"></div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}