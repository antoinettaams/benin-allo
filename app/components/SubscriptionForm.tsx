// components/SubscriptionForm.tsx
'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PLANS, SubscriptionPlan } from '@/app/lib/type';

const SubscriptionForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan') as SubscriptionPlan || SubscriptionPlan.STANDARD;
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identity || !password || !confirmPassword) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    // Validation email ou téléphone
    const isEmail = identity.includes('@');
    const isPhone = /^[0-9]+$/.test(identity.replace(/\s/g, ''));
    
    if (!isEmail && !isPhone) {
      setError('Veuillez entrer un email valide ou un numéro de téléphone.');
      return;
    }

    router.push(`/payment?plan=${planId}&id=${encodeURIComponent(identity)}`);
  };

  const plan = PLANS[planId];

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gray-50/30">
      <div className="bg-white p-10 md:p-16 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 max-w-lg w-full animate-reveal">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-10">
          <Lock size={28} />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Créez votre compte</h1>
        <p className="text-gray-500 font-medium mb-8">
          Activez votre Pass <span className="text-blue-600 font-black">{plan.name}</span>.
        </p>
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold flex items-center gap-3 border border-red-100 animate-in slide-in-from-top-2 duration-300">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
              Email ou Téléphone
            </label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type="text" 
                required
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="Ex: 229XXXXXXXX ou jean@mail.com"
                className="w-full pl-16 pr-8 py-5 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 border-2 border-transparent focus:border-blue-600 focus:bg-white transition-all"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
              Mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full pl-16 pr-14 py-5 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 border-2 border-transparent focus:border-blue-600 focus:bg-white transition-all"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">
              Confirmer le mot de passe
            </label>
            <div className="relative group">
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="********"
                className={`w-full pl-16 pr-8 py-5 bg-gray-50 rounded-2xl outline-none font-bold text-gray-700 border-2 transition-all ${
                  confirmPassword && password !== confirmPassword 
                  ? 'border-red-300 focus:border-red-500' 
                  : confirmPassword && password === confirmPassword 
                  ? 'border-green-300 focus:border-green-500' 
                  : 'border-transparent focus:border-blue-600 focus:bg-white'
                }`}
              />
              {confirmPassword && password === confirmPassword && (
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-green-500">
                  <CheckCircle2 size={20} />
                </div>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
          >
            S'abonner
          </button>
          
          <button 
            type="button" 
            onClick={() => router.back()}
            className="w-full text-gray-400 font-bold hover:text-gray-600 transition-colors py-2"
          >
            Retour
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;