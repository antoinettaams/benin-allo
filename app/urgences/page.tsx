// app/urgences/page.tsx
'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShieldCheck, Phone, AlertCircle } from 'lucide-react';
import ContactCard from '../components/ContactCard';
import { CategoryType } from '../lib/type';
import { MOCK_CONTACTS } from '@/data';

export default function UrgencesPage() {
  const router = useRouter();
  
  const emergencyContacts = useMemo(() => {
    return MOCK_CONTACTS.filter(c => c.category === CategoryType.URGENCES);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
      <div className="flex items-center gap-6 mb-12">
        <button 
          onClick={() => router.push('/')} 
          className="p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-black">Numéros d&apos;Urgence</h1>
          <p className="text-red-600 font-black text-[10px] uppercase tracking-widest">
            Accès gratuit illimité • 24h/7j
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {emergencyContacts.map(contact => (
          <ContactCard 
            key={contact.id} 
            contact={contact} 
            onCall={(p) => window.location.href = `tel:${p}`} 
            onWhatsApp={(p) => window.open(`https://wa.me/${p}`, '_blank')} 
          />
        ))}
      </div>

      {/* Ajoutez la section d'alerte si nécessaire */}
      <div className="mt-20 p-10 bg-red-50 rounded-[3rem] border border-red-100 text-center">
        <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-200">
          <ShieldCheck size={32} />
        </div>
        <h3 className="text-xl font-black text-red-900 mb-4">Ces numéros sont gratuits</h3>
        <p className="text-red-700/60 font-medium max-w-xl mx-auto">
          Conformément à la réglementation béninoise, les appels vers les secours publics ne sont jamais décomptés de votre quota AllôBénin.
        </p>
      </div>
    </div>
  );
}