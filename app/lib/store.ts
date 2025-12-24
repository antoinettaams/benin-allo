
'use client';
import { useState, useEffect } from 'react';
import { UserState } from '@/types';
import { SubscriptionPlan } from '@/types';

export const useUserStats = () => {
  const [userState, setUserState] = useState<UserState | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('allo_benin_user');
    let state: UserState;
    if (saved) {
      state = JSON.parse(saved);
      const lastReset = new Date(state.dailyContacts.lastReset);
      const now = new Date();
      if (lastReset.toDateString() !== now.toDateString()) {
        state.dailyContacts.count = 0;
        state.dailyContacts.lastReset = now.toISOString();
      }
    } else {
      state = {
        plan: SubscriptionPlan.FREE,
        isLoggedIn: false,
        favorites: [],
        dailyContacts: { count: 0, lastReset: new Date().toISOString() }
      };
    }
    setUserState(state);
  }, []);

  useEffect(() => {
    if (userState) {
      localStorage.setItem('allo_benin_user', JSON.stringify(userState));
    }
  }, [userState]);

  const incrementContact = () => {
    if (!userState) return;
    setUserState(prev => prev ? ({
      ...prev,
      dailyContacts: { ...prev.dailyContacts, count: prev.dailyContacts.count + 1 }
    }) : null);
  };

  const finalizeSubscription = (plan: SubscriptionPlan, identity: string) => {
    setUserState(prev => prev ? ({ 
      ...prev, 
      plan, 
      isLoggedIn: true, 
      emailOrPhone: identity 
    }) : null);
  };

  return { userState, incrementContact, finalizeSubscription, setUserState };
};
