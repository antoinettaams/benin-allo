// hooks/useUserStats.ts
'use client';

import { useState, useEffect } from 'react';
import { SubscriptionPlan, UserState } from '@/app/lib/type';

export const useUserStats = () => {
  const [userState, setUserState] = useState<UserState>(() => {
    if (typeof window === 'undefined') {
      return {
        plan: SubscriptionPlan.FREE,
        isLoggedIn: false,
        favorites: [],
        dailyContacts: { count: 0, lastReset: new Date().toISOString() }
      };
    }
    
    const saved = localStorage.getItem('allo_benin_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const lastReset = new Date(parsed.dailyContacts.lastReset);
        const now = new Date();
        if (lastReset.toDateString() !== now.toDateString()) {
          parsed.dailyContacts.count = 0;
          parsed.dailyContacts.lastReset = now.toISOString();
        }
        return parsed;
      } catch {
        // En cas d'erreur, retourner l'état par défaut
      }
    }
    return {
      plan: SubscriptionPlan.FREE,
      isLoggedIn: false,
      favorites: [],
      dailyContacts: { count: 0, lastReset: new Date().toISOString() }
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('allo_benin_user', JSON.stringify(userState));
    }
  }, [userState]);

  const incrementContact = () => {
    setUserState(prev => ({
      ...prev,
      dailyContacts: { ...prev.dailyContacts, count: prev.dailyContacts.count + 1 }
    }));
  };

  const finalizeSubscription = (plan: SubscriptionPlan, identity: string) => {
    setUserState(prev => ({ 
      ...prev, 
      plan, 
      isLoggedIn: true, 
      emailOrPhone: identity 
    }));
  };

  return { userState, incrementContact, finalizeSubscription, setUserState };
};