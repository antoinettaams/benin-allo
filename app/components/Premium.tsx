// components/Premium.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Check, ArrowRight, Zap, Shield, Users, Globe } from 'lucide-react';
import { PLANS, SubscriptionPlan } from '@/app/lib/type';
import { useUserStats } from '@/hooks/useUserStats';

const Premium: React.FC = () => {
  const { userState } = useUserStats();
  const router = useRouter();

  const features = [
    { icon: <Zap className="text-yellow-500" size={20} />, text: 'Accès instantané' },
    { icon: <Shield className="text-green-500" size={20} />, text: 'Contacts vérifiés' },
    { icon: <Users className="text-blue-500" size={20} />, text: 'Support prioritaire' },
    { icon: <Globe className="text-purple-500" size={20} />, text: 'Couverture nationale' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 px-6 py-2 rounded-full text-xs font-black mb-6">
          <Crown size={18} /> TARIFS ALLÔBÉNIN
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter leading-[1]">
          Choisissez le <span className="text-blue-600">bon plan.</span>
        </h1>
        
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12 font-medium">
          Soutenez le service et débloquez plus de possibilités au quotidien.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              {feature.icon}
              <span className="text-sm font-medium">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 items-stretch">
        {Object.values(PLANS).map((plan) => (
          <div 
            key={plan.id} 
            className={`p-10 rounded-[3.5rem] border-2 flex flex-col transition-all duration-500 ${
              userState.plan === plan.id 
                ? 'border-blue-600 bg-blue-50/30 scale-105 z-10 shadow-2xl shadow-blue-100' 
                : 'border-gray-50 bg-white hover:shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black">{plan.name}</h3>
              {userState.plan === plan.id && (
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Actuel
                </span>
              )}
            </div>
            
            <div className="flex items-baseline justify-center gap-1 mb-10">
              <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
              {plan.id !== SubscriptionPlan.FREE && (
                <span className="text-gray-400 font-bold text-lg">/ mois</span>
              )}
            </div>
            
            <ul className="space-y-4 mb-12 text-left flex-grow">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex gap-3 text-sm font-bold text-gray-600">
                  <Check size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                  {feature}
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => {
                if (userState.plan === plan.id) return;
                if (plan.id === SubscriptionPlan.FREE) {
                  router.push('/');
                } else {
                  router.push(`/subscribe?plan=${plan.id}`);
                }
              }}
              className={`w-full py-5 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-2 ${
                userState.plan === plan.id 
                  ? 'bg-gray-100 text-gray-400 cursor-default' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-200 active:scale-95'
              }`}
            >
              {userState.plan === plan.id ? (
                'Plan actuel'
              ) : plan.id === SubscriptionPlan.FREE ? (
                'Continuer gratuitement'
              ) : (
                <>
                  Choisir ce plan
                  <ArrowRight size={20} />
                </>
              )}
            </button>
            
            {plan.id !== SubscriptionPlan.FREE && (
              <p className="text-xs text-gray-400 text-center mt-4">
                Paiement sécurisé • Sans engagement
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-[3rem] p-10 md:p-16 text-center">
        <h3 className="text-2xl font-black text-gray-900 mb-4">
          Questions fréquentes
        </h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="text-left">
            <h4 className="font-bold text-gray-900 mb-2">Puis-je changer de plan ?</h4>
            <p className="text-gray-600 text-sm">
              Oui, vous pouvez changer de plan à tout moment. La différence sera ajustée au prorata.
            </p>
          </div>
          <div className="text-left">
            <h4 className="font-bold text-gray-900 mb-2">Paiement sécurisé ?</h4>
            <p className="text-gray-600 text-sm">
              Tous les paiements sont cryptés et sécurisés via MTN Mobile Money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;