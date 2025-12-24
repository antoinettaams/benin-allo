// components/PaymentPage.tsx
'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CreditCard, Check, ArrowLeft, AlertCircle } from 'lucide-react';
import { PLANS, SubscriptionPlan } from '@/app/lib/type';
import { useUserStats } from '@/hooks/useUserStats';

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { finalizeSubscription } = useUserStats();
  const planId = searchParams.get('plan') as SubscriptionPlan;
  const identity = searchParams.get('id') || '';
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePayment = () => {
    if (!planId || !identity) {
      setError('Informations de paiement incomplètes');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    // Simulation du délai de vérification du paiement
    setTimeout(() => {
      finalizeSubscription(planId, identity);
      router.push('/');
    }, 2500);
  };

  if (!planId) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Plan non spécifié</h2>
          <p className="text-gray-600 mt-2">Veuillez sélectionner un plan d'abonnement.</p>
          <button 
            onClick={() => router.push('/premium')}
            className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Choisir un plan
          </button>
        </div>
      </div>
    );
  }

  const plan = PLANS[planId];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gray-50/30">
      <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 max-w-lg w-full animate-reveal">
        {isProcessing ? (
          <div className="text-center py-10">
            <div className="w-20 h-20 border-8 border-blue-50 border-t-blue-600 rounded-full animate-spin mx-auto mb-10"></div>
            <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Vérification...</h2>
            <p className="text-gray-500 font-medium">Nous confirmons la réception de votre paiement. Ne fermez pas cette page.</p>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-10">
              <CreditCard size={28} />
            </div>
            <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Paiement Sécurisé</h1>
            <p className="text-gray-500 font-medium mb-12">
              Montant à régler : <span className="text-gray-900 font-black">{plan.price}</span>
            </p>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3 border border-red-100">
                <AlertCircle size={20} /> {error}
              </div>
            )}
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-blue-600 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-blue-600 shadow-sm">
                    MTN
                  </div>
                  <span className="font-bold text-gray-900">Mobile Money</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <Check size={14} className="text-white" />
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-transparent opacity-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-orange-600 shadow-sm">
                    Moov
                  </div>
                  <span className="font-bold text-gray-900">Moov Money</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-2xl border-2 border-transparent opacity-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center font-black text-green-600 shadow-sm">
                    Carte
                  </div>
                  <span className="font-bold text-gray-900">Carte Bancaire</span>
                </div>
              </div>
              
              <p className="text-[11px] text-center text-gray-400 font-bold px-10">
                Vous recevrez une demande de confirmation sur votre téléphone après avoir cliqué sur le bouton ci-dessous.
              </p>
              
              <button 
                onClick={handlePayment}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
              >
                Payer {plan.price}
              </button>
              
              <button 
                onClick={() => router.back()} 
                className="w-full text-gray-400 font-bold hover:text-gray-600 transition-colors py-2 flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} /> Retour
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;