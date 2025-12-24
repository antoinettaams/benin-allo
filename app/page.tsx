// app/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Sparkles,
  X,
  Phone,
  Zap,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Briefcase,
  Heart
} from 'lucide-react';
import findRightService from './services/serviceMatcher';
import { CategoryType } from '@/app/lib/type';
import { MOCK_CONTACTS, CATEGORIES } from '@/data';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<{
    category: CategoryType;
    explanation: string;
  } | null>(null);

  const router = useRouter();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setAiLoading(true);
    const result = await findRightService(searchQuery);
    setAiLoading(false);
    
    if (result) {
      setSuggestion(result);
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const emergencyContacts = MOCK_CONTACTS.filter(
    c => c.category === CategoryType.URGENCES
  );

  return (
    <div className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-28 md:pb-40 px-4 hero-gradient">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-black mb-8 animate-reveal stagger-1 border border-blue-100 shadow-sm">
            <Zap size={14} className="fill-blue-600" /> Plateforme n°1 au Bénin
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[1] animate-reveal stagger-2">
            Le bon service, <br className="hidden md:block" />
            <span className="text-blue-600">au bon moment.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium animate-reveal stagger-3">
            Trouvez instantanément les professionnels certifiés et les numéros d&apos;urgence partout au Bénin.
          </p>

          <form
            onSubmit={handleSearch}
            className="relative max-w-2xl mx-auto mb-10 animate-reveal stagger-4"
          >
            <div className="flex items-center bg-white border border-gray-100 rounded-[2rem] p-3 shadow-2xl shadow-blue-900/10 hover:border-blue-300 transition-all group">
              <div className="pl-4 pr-3 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                <Search size={24} strokeWidth={2.5} />
              </div>

              <input
                type="text"
                placeholder="Pharmacie, plombier..."
                className="flex-1 py-4 text-lg md:text-xl outline-none text-gray-700 w-full font-bold placeholder:text-gray-300"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />

              <button
                type="submit"
                disabled={aiLoading}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-2 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
              >
                {aiLoading ? '...' : 'Chercher'}
              </button>
            </div>
          </form>

          {suggestion && (
            <div className="max-w-xl mx-auto bg-gray-900 text-white p-6 rounded-[2.5rem] flex items-start gap-5 text-left shadow-2xl animate-reveal border border-white/10">
              <div className="bg-blue-600 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-blue-500/20">
                <Sparkles size={24} />
              </div>

              <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-2">
                  IA AllôBénin
                </p>
                <p className="text-sm font-bold leading-relaxed mb-4">
                  {suggestion.explanation}
                </p>
                <button
                  onClick={() =>
                    router.push(
                      `/search?category=${encodeURIComponent(
                        suggestion.category
                      )}`
                    )
                  }
                  className="bg-white text-gray-900 px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-blue-50 transition-colors"
                >
                  Explorer {suggestion.category} <ArrowRight size={16} />
                </button>
              </div>

              <button
                onClick={() => setSuggestion(null)}
                className="opacity-40 hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SERVICES POPULAIRES */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Services populaires
            </h2>
            <Link
              href="/search"
              className="text-sm font-black text-blue-600 flex items-center gap-2"
            >
              Toutes les catégories <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() =>
                  router.push(
                    `/search?category=${encodeURIComponent(cat.type)}`
                  )
                }
                className="bg-white p-10 rounded-[2.5rem] border border-gray-100 flex flex-col items-center justify-center gap-5 hover:shadow-2xl hover:border-blue-100 transition-all group animate-reveal"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="text-5xl group-hover:scale-125 transition-transform">
                  {cat.icon}
                </div>
                <span className="font-black text-gray-900 text-sm uppercase tracking-wider">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-24 bg-white px-4 md:px-8 border-b border-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 animate-reveal">
            <div className="max-w-xl text-left">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tighter">
                Comment ça marche ?
              </h2>
              <p className="text-lg text-gray-500 font-medium">
                Trois étapes simples pour transformer vos urgences en solutions.
              </p>
            </div>
          </div>
          
          <div className="flex md:hidden items-center gap-2 mb-6 text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] bg-blue-50 w-fit px-4 py-2 rounded-full animate-reveal stagger-3">
            <span>Glissez pour voir</span>
            <ArrowRight size={14} className="animate-swipe" />
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-3 gap-6 md:gap-8 pb-8">
            {[
              { 
                step: "01", 
                title: "Recherchez", 
                desc: "Décrivez votre besoin en quelques mots dans notre moteur intelligent.", 
                icon: <Search size={28} className="text-blue-600 animate-icon-scan" /> 
              },
              { 
                step: "02", 
                title: "Choisissez", 
                desc: "Comparez les professionnels selon leurs avis et leur localisation.", 
                icon: <CheckCircle2 size={28} className="text-green-600 animate-icon-pop" /> 
              },
              { 
                step: "03", 
                title: "Contactez", 
                desc: "Lancez l'appel ou ouvrez un chat WhatsApp instantanément.", 
                icon: <Phone size={28} className="text-blue-600 animate-icon-wiggle" /> 
              }
            ].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[85%] md:w-full snap-start relative group animate-reveal bg-gray-50/70 p-10 rounded-[3rem] border border-transparent hover:border-blue-100 hover:bg-white transition-all duration-500">
                <div className="mb-10 inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="absolute top-10 right-10 text-5xl font-black text-blue-600/5">
                  {item.step}
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="animate-reveal">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-10 tracking-tighter">
              Une plateforme pour <span className="text-blue-600">votre sécurité.</span>
            </h2>
            <div className="grid gap-6">
              {[
                { 
                  title: "Contacts Vérifiés", 
                  desc: "Équipe dédiée à la vérification des informations.", 
                  icon: <ShieldCheck className="text-green-500" size={24} /> 
                },
                { 
                  title: "Gain de Temps", 
                  desc: "Trouvez une solution en moins de 10 secondes.", 
                  icon: <Zap className="text-yellow-500" size={24} /> 
                },
                { 
                  title: "Modèle Solidaire", 
                  desc: "Urgences gratuites pour tous, sans exception.", 
                  icon: <Users className="text-blue-500" size={24} /> 
                }
              ].map((f, i) => (
                <div key={i} className="flex gap-6 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="mt-1 bg-gray-50 p-4 rounded-2xl group-hover:bg-blue-50 transition-colors">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-gray-900 mb-2">
                      {f.title}
                    </h4>
                    <p className="text-sm text-gray-500 font-medium">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative animate-reveal stagger-2">
            <div className="bg-blue-600 rounded-[3.5rem] p-12 text-white aspect-square flex flex-col justify-center items-center text-center shadow-2xl">
              <div className="text-8xl font-black mb-6 tracking-tighter">
                24/7
              </div>
              <p className="text-2xl font-black mb-10 px-6">
                Toujours là quand vous en avez besoin.
              </p>
              <p className="text-sm font-black uppercase tracking-widest opacity-60">
                Utilisateurs actifs au Bénin
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* URGENCES */}
      <section className="px-4 md:px-8 py-24">
        <div className="max-w-6xl mx-auto bg-red-600 rounded-[4rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full text-xs font-black mb-8 uppercase tracking-widest border border-white/20">
                🚨 Urgence Absolue
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                Votre sécurité <br /> n&apos;attend pas.
              </h2>
              <p className="text-xl text-red-50 font-medium mb-12 opacity-90">
                Accès gratuit aux secours publics : Police, SAMU, Pompiers.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={() => router.push('/urgences')} 
                  className="bg-white text-red-600 px-12 py-5 rounded-2xl font-black text-xl hover:bg-red-50 transition-all shadow-xl"
                >
                  Voir les numéros
                </button>
                <button 
                  onClick={() => window.location.href = 'tel:117'} 
                  className="bg-red-700/50 text-white px-12 py-5 rounded-2xl font-black text-xl border-2 border-white/30 flex items-center justify-center gap-3"
                >
                  Appeler 117
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {emergencyContacts.slice(0, 2).map(contact => (
                <div key={contact.id} className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] flex items-center justify-between group hover:bg-white/20 transition-all">
                  <div>
                    <span className="text-[10px] font-black uppercase opacity-60 tracking-widest block mb-2">
                      {contact.subCategory}
                    </span>
                    <h4 className="text-2xl font-black">
                      {contact.name}
                    </h4>
                  </div>
                  <button 
                    onClick={() => window.location.href = `tel:${contact.phone}`} 
                    className="w-16 h-16 bg-white text-red-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-all"
                  >
                    <Phone size={28} strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="py-24 bg-white px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-black text-blue-600 uppercase tracking-[0.4em] mb-16">
            Ils nous font confiance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 p-12 rounded-[3.5rem] text-left border border-gray-100 italic font-medium text-gray-600 relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <p className="relative z-10 leading-relaxed">
                &quot;J&apos;ai pu trouver un dépanneur moto à Calavi en moins de 2 minutes alors que j&apos;étais bloqué en pleine nuit. AllôBénin m&apos;a sauvé la mise !&quot;
              </p>
              <div className="mt-8 not-italic font-black text-gray-900 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 font-black">
                  M
                </div>
                <div>
                  <p className="text-sm">Marius K.</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Cotonou
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-12 rounded-[3.5rem] text-left border border-gray-100 italic font-medium text-gray-600 relative group hover:bg-white hover:shadow-2xl transition-all duration-500">
              <p className="relative z-10 leading-relaxed">
                &quot;Simple et efficace. On devrait tous avoir ça sur notre écran d&apos;accueil.&quot;
              </p>
              <div className="mt-8 not-italic font-black text-gray-900 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 font-black">
                  S
                </div>
                <div>
                  <p className="text-sm">Sophie D.</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Parakou
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BECOME PARTNER */}
      <section className="py-24 bg-white px-4 md:px-8 border-t border-gray-50">
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-[4rem] p-10 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 animate-reveal relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
          
          <div className="max-w-xl text-center md:text-left relative z-10">
            <div className="w-16 h-16 bg-white/10 text-blue-400 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mx-0 border border-white/10 backdrop-blur-sm">
              <Briefcase size={32} />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">
              Vous êtes un <span className="text-blue-400">professionnel ?</span>
            </h2>
            
            <p className="text-lg text-gray-400 font-medium leading-relaxed mb-8">
              Rejoignez la plateforme de confiance au Bénin. Augmentez votre visibilité et recevez des appels directs de clients qualifiés dans votre zone.
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {["Profil Vérifié", "Statuts WhatsApp", "Localisation Maps"].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                  <CheckCircle2 size={14} className="text-blue-400" /> {text}
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-auto relative z-10">
            <button className="w-full md:w-auto bg-blue-600 text-white px-12 py-6 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3">
              Devenir Partenaire <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}