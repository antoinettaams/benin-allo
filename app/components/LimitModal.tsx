// components/LimitModal.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Crown, Zap } from 'lucide-react';
import { PLANS, SubscriptionPlan } from '../lib/type';

interface LimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan: SubscriptionPlan;
}

const LimitModal: React.FC<LimitModalProps> = ({ isOpen, onClose, currentPlan }) => {
  const router = useRouter();
  
  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    router.push('/premium');
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-10 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <AlertCircle size={40} />
        </div>
        
        <h3 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Limite atteinte</h3>
        
        <p className="text-gray-500 font-medium mb-10 leading-relaxed">
          Vous avez utilisé vos {PLANS[currentPlan].limit} contacts autorisés pour aujourd&apos;hui. 
          Passez au plan supérieur pour continuer à appeler sans attendre demain !
        </p>

        <div className="flex flex-col gap-4">
          <button 
            onClick={handleUpgrade}
            className="bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-2"
          >
            <Crown size={20} />
            Découvrir les Plans Premium
          </button>
          
          <button 
            onClick={onClose} 
            className="text-gray-400 font-bold hover:text-gray-600 transition-colors py-2 flex items-center justify-center gap-2"
          >
            <Zap size={16} />
            Continuer avec le plan actuel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitModal;